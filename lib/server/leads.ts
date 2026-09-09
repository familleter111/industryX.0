/**
 * Journal des demandes de démonstration, au format Excel.
 *
 * Une demande = une ligne dans data/contacts.xlsx. Le fichier est créé au
 * premier envoi, puis relu et réécrit à chaque fois : on ne garde rien en
 * mémoire entre deux requêtes, donc rien à perdre au redémarrage.
 *
 * Contraintes prises au sérieux ici :
 *
 *   - Écriture sérialisée. Deux envois simultanés qui liraient le même
 *     fichier puis l'écriraient chacun de leur côté en perdraient un. La
 *     file `queue` garantit qu'une écriture attend la précédente.
 *
 *   - Écriture atomique. On écrit dans un .tmp puis on renomme : une coupure
 *     en plein milieu ne laisse pas un .xlsx tronqué, donc illisible.
 *
 *   - Fichier ouvert dans Excel. Windows verrouille alors le fichier et le
 *     renommage échoue. Plutôt que de perdre le prospect, la ligne part dans
 *     data/contacts-secours.csv, et l'appelant est prévenu.
 *
 * Ce module suppose un serveur au système de fichiers persistant (VPS, Docker
 * avec volume, `next start` sur une machine). Sur une plateforme sans écriture
 * disque — Vercel, Netlify — il faut viser un stockage externe : voir la
 * variable CONTACT_XLSX_PATH, qui accepte un chemin monté.
 */

import { existsSync } from 'node:fs'
import { appendFile, mkdir, rename, unlink } from 'node:fs/promises'
import path from 'node:path'

import ExcelJS from 'exceljs'

export type Lead = {
  firstName: string
  lastName: string
  email: string
  /** Pays de l'indicatif, en toutes lettres. */
  phoneCountry: string
  /** Indicatif, avec le « + ». Vide si aucun numéro. */
  phoneDial: string
  /** Numéro complet au format E.164 : +21620123456. Vide si non renseigné. */
  phone: string
  company: string
  industry: string
  message: string
  consent: boolean
  /** Page d'où vient la demande. */
  source: string
}

const SHEET_NAME = 'Demandes'

const COLUMNS: Array<{ key: string; header: string; width: number }> = [
  { key: 'date', header: 'Date et heure', width: 18 },
  { key: 'firstName', header: 'Prénom', width: 16 },
  { key: 'lastName', header: 'Nom', width: 16 },
  { key: 'email', header: 'Email', width: 30 },
  { key: 'phone', header: 'Téléphone', width: 18 },
  { key: 'phoneCountry', header: 'Pays', width: 16 },
  { key: 'company', header: 'Société', width: 24 },
  { key: 'industry', header: 'Industrie', width: 26 },
  { key: 'message', header: 'Message', width: 60 },
  { key: 'consent', header: 'Consentement', width: 14 },
  { key: 'source', header: 'Origine', width: 22 },
]

/** data/contacts.xlsx, sauf si CONTACT_XLSX_PATH dit autre chose. */
export function leadsFilePath(): string {
  const configured = process.env.CONTACT_XLSX_PATH?.trim()
  if (configured) return path.resolve(process.cwd(), configured)
  return path.join(process.cwd(), 'data', 'contacts.xlsx')
}

function backupFilePath(): string {
  const file = leadsFilePath()
  return path.join(path.dirname(file), 'contacts-secours.csv')
}

/**
 * Date écrite comme une VRAIE date Excel, et non comme du texte : une colonne
 * de texte « 09/09/2026 » se trie dans le désordre, jour par jour.
 *
 * ExcelJS convertit un Date JS en numéro de série à partir de ses champs UTC.
 * On décale donc l'instant du fuseau du serveur pour qu'Excel affiche l'heure
 * locale — celle que la personne au bureau attend en ouvrant le fichier.
 */
function excelLocalDate(now: Date): Date {
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
}

function styleSheet(sheet: ExcelJS.Worksheet) {
  sheet.columns = COLUMNS.map(({ key, header, width }) => ({ key, header, width }))

  const header = sheet.getRow(1)
  header.height = 22
  header.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 }
  header.alignment = { vertical: 'middle', horizontal: 'left' }
  header.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF111827' },
    }
  })
  header.commit()

  // L'en-tête reste visible au défilement, et chaque colonne est filtrable.
  sheet.views = [{ state: 'frozen', ySplit: 1 }]
  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: COLUMNS.length } }
}

async function writeLead(lead: Lead): Promise<{ file: string; format: 'xlsx' | 'csv' }> {
  const file = leadsFilePath()
  await mkdir(path.dirname(file), { recursive: true })

  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'Industry X.0 — formulaire de contact'
  workbook.created = new Date()

  let sheet: ExcelJS.Worksheet
  if (existsSync(file)) {
    await workbook.xlsx.readFile(file)
    sheet = workbook.getWorksheet(SHEET_NAME) ?? workbook.addWorksheet(SHEET_NAME)
  } else {
    sheet = workbook.addWorksheet(SHEET_NAME)
  }

  // Réappliqué à chaque fois : un fichier créé par une version antérieure,
  // ou vidé à la main, retrouve ainsi ses en-têtes et ses clés de colonnes.
  styleSheet(sheet)

  const row = sheet.addRow({
    date: excelLocalDate(new Date()),
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    phoneCountry: lead.phoneCountry,
    company: lead.company,
    industry: lead.industry,
    message: lead.message,
    consent: lead.consent ? 'Oui' : 'Non',
    source: lead.source,
  })

  row.alignment = { vertical: 'top', wrapText: true }
  row.getCell('date').numFmt = 'dd/mm/yyyy hh:mm'
  // Le « + » en tête ferait passer la cellule pour une formule.
  row.getCell('phone').alignment = { vertical: 'top', horizontal: 'left' }
  row.commit()

  const temp = `${file}.tmp-${process.pid}-${Date.now()}`
  try {
    await workbook.xlsx.writeFile(temp)
    await rename(temp, file)
  } catch (error) {
    await unlink(temp).catch(() => {})
    throw error
  }

  return { file, format: 'xlsx' }
}

const CSV_HEADER = COLUMNS.map((column) => column.header).join(';')

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}

/** Filet de sécurité quand le .xlsx est verrouillé (ouvert dans Excel). */
async function writeBackup(lead: Lead): Promise<{ file: string; format: 'csv' }> {
  const file = backupFilePath()
  await mkdir(path.dirname(file), { recursive: true })

  const line = [
    new Date().toLocaleString('fr-FR'),
    lead.firstName,
    lead.lastName,
    lead.email,
    lead.phone,
    lead.phoneCountry,
    lead.company,
    lead.industry,
    lead.message.replace(/\r?\n/g, ' '),
    lead.consent ? 'Oui' : 'Non',
    lead.source,
  ]
    .map(csvCell)
    .join(';')

  // BOM : sans lui, Excel ouvre le CSV en ANSI et mange les accents.
  const prefix = existsSync(file) ? '' : `﻿${CSV_HEADER}\r\n`
  await appendFile(file, `${prefix}${line}\r\n`, 'utf8')

  return { file, format: 'csv' }
}

/**
 * File d'attente d'écriture : chaque appel attend le précédent, réussi ou non.
 * Sans elle, deux formulaires envoyés à la même seconde liraient le même
 * classeur et le second effacerait la ligne du premier.
 */
let queue: Promise<unknown> = Promise.resolve()

export type AppendResult = {
  file: string
  format: 'xlsx' | 'csv'
  /** Renseigné si le classeur était inaccessible et la ligne mise de côté. */
  warning?: string
}

export function appendLead(lead: Lead): Promise<AppendResult> {
  const run = queue.then(
    () => attempt(lead),
    () => attempt(lead),
  )
  queue = run.catch(() => {})
  return run
}

async function attempt(lead: Lead): Promise<AppendResult> {
  try {
    return await writeLead(lead)
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    const backup = await writeBackup(lead)
    return {
      ...backup,
      warning: `Classeur inaccessible (${reason}). Ligne enregistrée dans ${backup.file}.`,
    }
  }
}
