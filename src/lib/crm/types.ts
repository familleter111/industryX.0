import { escapeHtml } from '@/lib/leads/http'
import type { Lead } from '@/services/leads'

/**
 * Lead tel que les CRM et le webhook le reçoivent : la ligne du tableur, avec
 * les champs propres aux demandes de démo rendus obligatoires.
 */
export type ContactLead = Lead & {
  industryKey: string
  locale: string
  consentAt: string
  /** Date ISO de l'envoi. */
  submittedAt: string
}

/** Branchement d'un CRM. Crée ou met à jour le contact, puis ouvre l'affaire. */
export interface CrmProvider {
  readonly name: string
  upsertLead(lead: ContactLead): Promise<void>
}

/** Variables d'environnement : `process.env`, ou un objet simple dans les tests. */
export type Env = Record<string, string | undefined>

/** Variable d'environnement obligatoire : son absence est une erreur de configuration. */
export function requiredEnv(env: Env, name: string): string {
  const value = env[name]?.trim()
  if (!value) throw new Error(`Variable ${name} manquante`)
  return value
}

/** Variable facultative, `undefined` si vide. */
export function optionalEnv(env: Env, name: string): string | undefined {
  return env[name]?.trim() || undefined
}

/** Titre de l'affaire, identique dans tous les CRM. */
export function dealTitle(lead: ContactLead): string {
  return `${lead.company} — Demande de démo CIPA`
}

/** Corps de note commun : le message, puis le contexte de la demande. */
export function noteLines(lead: ContactLead): { message: string; context: string[] } {
  const campaign = [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(' / ')
  const context = [
    `Industrie : ${lead.industry} (${lead.industryKey})`,
    lead.phone && `Téléphone : ${lead.phone}`,
    `Page : ${lead.source}`,
    campaign && `Campagne : ${campaign}`,
    lead.utmTerm && `utm_term : ${lead.utmTerm}`,
    lead.utmContent && `utm_content : ${lead.utmContent}`,
    lead.ref && `ref : ${lead.ref}`,
    lead.referrer && `Site référent : ${lead.referrer}`,
    lead.firstTouch && `Première visite : ${lead.firstTouch}`,
    `Langue : ${lead.locale}`,
    `Consentement RGPD : ${lead.consentAt}`,
  ].filter((line): line is string => Boolean(line))
  return { message: lead.message, context }
}

/** Note au format HTML (HubSpot, Brevo, Pipedrive), texte saisi échappé. */
export function noteHtml(lead: ContactLead): string {
  const { message, context } = noteLines(lead)
  return `<p>${escapeHtml(message)}</p><p>${context.map(escapeHtml).join('<br>')}</p>`
}
