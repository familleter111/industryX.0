/**
 * Validation serveur du formulaire « Planifier une démonstration ».
 *
 * Mêmes règles que le formulaire (app/[locale]/(marketing)/contact) : la
 * validation du navigateur sert le confort de saisie, celle-ci protège —
 * n'importe qui peut poster directement sur /api/contact.
 *
 * Les messages d'erreur reviennent dans la langue de la page
 * (lib/server/messages.ts), un par champ, et s'affichent sous le champ.
 */

import { z } from 'zod'

import { findPhoneCountry, DEFAULT_PHONE_COUNTRY } from '@/lib/data/phoneCountries'
import { API_MESSAGES, type ApiLocale } from '@/lib/server/messages'
import { industryKey } from '@/lib/leads/industries'
import { checkPhone } from '@/lib/leads/phoneRules'
import { phoneDigits } from '@/lib/phone'
import {
  checkCompany,
  checkEmail,
  checkMessage,
  checkName,
  fieldMessage,
  isBlockedPhone,
  normalizeEmail,
  normalizeName,
  type FieldName,
  type RuleError,
} from '@/lib/leads/rules'

export { MESSAGE_MAX } from '@/lib/leads/rules'

/**
 * Champ texte toléré absent ou d'un autre type (lu comme vide), espaces
 * coupés et borné : une chaîne de 2 Mo ne va pas plus loin. La borne est
 * large — les vraies limites, et leurs messages, sont dans les règles.
 * `optional()` : sans lui, Zod 4 rejette une clé absente avant même la
 * transformation, avec un message générique au lieu du nôtre.
 */
const text = (max = 5000) =>
  z
    .unknown()
    .optional()
    .transform((value) => (typeof value === 'string' ? value.trim().slice(0, max) : ''))

function contactSchema(locale: ApiLocale) {
  const t = API_MESSAGES[locale]
  /** Champ contrôlé par une règle partagée avec le formulaire. */
  const ruled = (field: FieldName, check: (value: string) => RuleError | undefined) =>
    text().superRefine((value, ctx) => {
      const error = check(value)
      if (error) ctx.addIssue({ code: 'custom', message: fieldMessage(locale, field, error) })
    })

  return z
    .object({
      firstName: ruled('firstName', checkName).transform(normalizeName),
      lastName: ruled('lastName', checkName).transform(normalizeName),
      email: ruled('email', checkEmail).transform(normalizeEmail),
      company: ruled('company', checkCompany),
      industry: text(120).pipe(
        z.string().refine((value) => industryKey(value) !== undefined, t.industry),
      ),
      message: ruled('message', checkMessage),
      consent: z.literal(true, { error: t.consent }),
      phoneCountry: text(2).transform((code) => code.toUpperCase()),
      // Facultatif ; renseigné, il doit être valide pour le pays choisi.
      phone: text(40),
      source: text(200),
    })
    .superRefine((data, ctx) => {
      // Contrôlé sur la saisie brute : un « +972… » collé perdrait son
      // indicatif une fois réduit aux chiffres.
      const country = findPhoneCountry(data.phoneCountry) ?? findPhoneCountry(DEFAULT_PHONE_COUNTRY)!
      const error = isBlockedPhone(data.phone, data.phoneCountry)
        ? 'blocked'
        : checkPhone(phoneDigits(data.phone), country.iso)
      if (error) {
        ctx.addIssue({ code: 'custom', path: ['phone'], message: fieldMessage(locale, 'phone', error) })
      }
    })
}

export type ContactInput = {
  firstName: string
  lastName: string
  email: string
  company: string
  /** Libellé français reçu du formulaire. */
  industry: string
  industryKey: string
  message: string
  consent: true
  /** Pays de l'indicatif, en toutes lettres ; vide sans numéro. */
  phoneCountry: string
  /** Indicatif avec « + » ; vide sans numéro. */
  phoneDial: string
  /** E.164 : +21620123456 ; vide sans numéro. */
  phone: string
  /** URL de la page d'envoi, sans paramètres. */
  source: string
}

export type ParseResult =
  | { ok: true; data: ContactInput }
  | { ok: false; fields: Record<string, string> }

/** Valide le corps d'une demande et normalise téléphone et industrie. */
export function parseContact(payload: unknown, locale: ApiLocale): ParseResult {
  const result = contactSchema(locale).safeParse(payload ?? {})

  if (!result.success) {
    const fields: Record<string, string> = {}
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? '')
      if (field && !fields[field]) fields[field] = issue.message
    }
    return { ok: false, fields }
  }

  const data = { ...result.data, phone: phoneDigits(result.data.phone) }
  const country =
    findPhoneCountry(data.phoneCountry) ?? findPhoneCountry(DEFAULT_PHONE_COUNTRY)!

  return {
    ok: true,
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      company: data.company,
      industry: data.industry,
      industryKey: industryKey(data.industry)!,
      message: data.message,
      consent: true,
      phoneCountry: data.phone ? country.name : '',
      phoneDial: data.phone ? `+${country.dial}` : '',
      phone: data.phone ? `+${country.dial}${data.phone}` : '',
      source: data.source || '/contact',
    },
  }
}
