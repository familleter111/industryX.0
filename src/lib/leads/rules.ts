/**
 * Règles de saisie du formulaire de contact, partagées par le navigateur
 * (contrôle pendant la frappe) et le serveur (lib/leads/schema.ts) : une
 * valeur acceptée d'un côté l'est aussi de l'autre.
 *
 * Chaque contrôle renvoie un code d'erreur, pas un texte : la page et l'API
 * traduisent le code dans la langue du visiteur (FIELD_MESSAGES).
 *
 * Le téléphone est à part (lib/leads/phoneRules.ts) : il dépend des
 * métadonnées de libphonenumber-js, chargées seulement quand il sert.
 */

export const NAME_MIN = 2
export const NAME_MAX = 60
export const EMAIL_MAX = 160
export const COMPANY_MIN = 2
export const COMPANY_MAX = 120
export const MESSAGE_MIN = 10
export const MESSAGE_MAX = 1000

export type RuleError =
  | 'required'
  | 'tooShort'
  | 'tooLong'
  /** Caractère interdit : signalé dès la frappe. */
  | 'chars'
  | 'invalid'
  /** Indicatif non accepté (BLOCKED_DIAL_CODES). */
  | 'blocked'

/* -------------------------------------------------------------- noms */

// Expressions Unicode construites avec RegExp : tsconfig ne fixe pas de
// `target`, et TypeScript refuse alors le drapeau /u dans un littéral.

/** Lettres de toutes les écritures (accents, arabe…) et leurs signes combinants. */
const NAME_CHARS = new RegExp("^[\\p{L}\\p{M} '’.-]*$", 'u')
/** Des lettres, séparées par un espace, un tiret, une apostrophe ou un point. */
const NAME_SHAPE = new RegExp("^[\\p{L}\\p{M}]+(?:(?:[ '’-]|\\. ?)[\\p{L}\\p{M}]+)*\\.?$", 'u')
/** Tout ce qui n'est pas une lettre. */
const NOT_LETTER = new RegExp('[^\\p{L}]', 'gu')
/** Tout ce qui n'est ni une lettre ni un chiffre. */
const NOT_ALNUM = new RegExp('[^\\p{L}\\p{N}]', 'gu')

/** Nom rangé : espaces coupés, espaces multiples réduits à un seul. */
export function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

/** Prénom ou nom : « Ben Salah », « Jean-Pierre », « O’Neil », « محمد ». */
export function checkName(value: string): RuleError | undefined {
  const name = normalizeName(value)
  if (!name) return 'required'
  if (!NAME_CHARS.test(name)) return 'chars'
  if (name.length > NAME_MAX) return 'tooLong'
  if (name.replace(NOT_LETTER, '').length < NAME_MIN) return 'tooShort'
  if (!NAME_SHAPE.test(name)) return 'invalid'
  return undefined
}

/* ------------------------------------------------------------- email */

const EMAIL_LOCAL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/
const EMAIL_DOMAIN = /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/

/** Format d'adresse strict : une seule @, pas de point en double, extension en lettres. */
export function checkEmail(value: string): RuleError | undefined {
  const email = value.trim()
  if (!email) return 'required'
  if (/\s/.test(email)) return 'chars'
  if (email.length > EMAIL_MAX) return 'tooLong'
  const at = email.lastIndexOf('@')
  if (at <= 0 || email.indexOf('@') !== at) return 'invalid'
  const local = email.slice(0, at)
  const domain = email.slice(at + 1)
  if (local.length > 64 || !EMAIL_LOCAL.test(local) || !EMAIL_DOMAIN.test(domain)) return 'invalid'
  return undefined
}

/** Adresse rangée : espaces coupés, domaine en minuscules (la partie locale peut compter). */
export function normalizeEmail(value: string): string {
  const email = value.trim()
  const at = email.lastIndexOf('@')
  return at < 0 ? email : `${email.slice(0, at)}@${email.slice(at + 1).toLowerCase()}`
}

/** Fautes de frappe fréquentes sur les messageries grand public. */
const DOMAIN_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'hotmial.fr': 'hotmail.fr',
  'hotmal.fr': 'hotmail.fr',
  'yahooo.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'yahooo.fr': 'yahoo.fr',
  'yaho.fr': 'yahoo.fr',
  'outlok.com': 'outlook.com',
  'outllok.com': 'outlook.com',
  'outlook.co': 'outlook.com',
  'outlook.con': 'outlook.com',
  'outlok.fr': 'outlook.fr',
}

/**
 * Adresse corrigée si le domaine ressemble à une faute connue
 * (amel@gmial.com → amel@gmail.com). Simple suggestion : l'adresse saisie
 * reste acceptée, le visiteur choisit.
 */
export function suggestEmail(value: string): string | undefined {
  const email = value.trim()
  const at = email.lastIndexOf('@')
  if (at <= 0) return undefined
  const fixed = DOMAIN_TYPOS[email.slice(at + 1).toLowerCase()]
  return fixed ? `${email.slice(0, at)}@${fixed}` : undefined
}

/* --------------------------------------------------------- téléphone */

/** Indicatifs refusés par le formulaire. Le pays est aussi absent de la liste. */
export const BLOCKED_DIAL_CODES = ['972']
export const BLOCKED_COUNTRIES = ['IL']

/**
 * `true` si le numéro vise un indicatif refusé : pays choisi bloqué, ou
 * numéro collé au format international (« +972 50… », « 00972 50… ») dans le
 * champ du numéro national.
 */
export function isBlockedPhone(raw: string, iso: string): boolean {
  if (BLOCKED_COUNTRIES.includes(iso.toUpperCase())) return true
  const international = raw.trim().match(/^(?:\+|00)\s*([\d\s().-]+)/)
  if (!international) return false
  const digits = international[1].replace(/\D/g, '')
  return BLOCKED_DIAL_CODES.some((code) => digits.startsWith(code))
}

/* ---------------------------------------------------- société, message */

/** Nom de société : au moins deux lettres ou chiffres (« 3M », « Usine SA »). */
export function checkCompany(value: string): RuleError | undefined {
  const company = value.trim()
  if (!company) return 'required'
  if (company.length > COMPANY_MAX) return 'tooLong'
  if (company.replace(NOT_ALNUM, '').length < COMPANY_MIN) return 'tooShort'
  if (/<|>|https?:\/\//i.test(company)) return 'chars'
  return undefined
}

export function checkMessage(value: string): RuleError | undefined {
  const message = value.trim()
  if (!message) return 'required'
  if (message.length > MESSAGE_MAX) return 'tooLong'
  if (message.length < MESSAGE_MIN) return 'tooShort'
  return undefined
}

/* ---------------------------------------------------------- messages */

export type FieldName = 'firstName' | 'lastName' | 'email' | 'company' | 'message' | 'phone'

type Messages = Record<FieldName, Partial<Record<RuleError | 'incomplete', string>>>

/**
 * Textes des erreurs, par champ et par code. Le formulaire et l'API les
 * lisent ici : un message ne peut pas dire autre chose d'un côté que de
 * l'autre.
 */
export const FIELD_MESSAGES: Record<'fr' | 'en', Messages> = {
  fr: {
    firstName: {
      required: 'Prénom requis',
      tooShort: `Prénom trop court (${NAME_MIN} lettres minimum)`,
      tooLong: `Prénom trop long (${NAME_MAX} caractères maximum)`,
      chars: 'Lettres, espaces, tirets et apostrophes uniquement',
      invalid: 'Prénom invalide',
    },
    lastName: {
      required: 'Nom requis',
      tooShort: `Nom trop court (${NAME_MIN} lettres minimum)`,
      tooLong: `Nom trop long (${NAME_MAX} caractères maximum)`,
      chars: 'Lettres, espaces, tirets et apostrophes uniquement',
      invalid: 'Nom invalide',
    },
    email: {
      required: 'Email requis',
      tooLong: `Adresse trop longue (${EMAIL_MAX} caractères maximum)`,
      chars: 'L’adresse ne doit pas contenir d’espace',
      invalid: 'Adresse email invalide (ex. nom@entreprise.com)',
    },
    company: {
      required: 'Société requise',
      tooShort: `Nom de société trop court (${COMPANY_MIN} caractères minimum)`,
      tooLong: `Nom de société trop long (${COMPANY_MAX} caractères maximum)`,
      chars: 'Nom de société invalide',
    },
    message: {
      required: 'Message requis',
      tooShort: `Message trop court (${MESSAGE_MIN} caractères minimum)`,
      tooLong: `Message trop long (${MESSAGE_MAX} caractères maximum)`,
    },
    phone: {
      tooShort: 'Numéro incomplet',
      tooLong: 'Numéro trop long pour ce pays',
      invalid: 'Numéro invalide pour ce pays',
      chars: 'Chiffres uniquement',
      blocked: 'Cet indicatif n’est pas accepté',
    },
  },
  en: {
    firstName: {
      required: 'First name is required',
      tooShort: `First name is too short (${NAME_MIN} letters minimum)`,
      tooLong: `First name is too long (${NAME_MAX} characters maximum)`,
      chars: 'Letters, spaces, hyphens and apostrophes only',
      invalid: 'Invalid first name',
    },
    lastName: {
      required: 'Last name is required',
      tooShort: `Last name is too short (${NAME_MIN} letters minimum)`,
      tooLong: `Last name is too long (${NAME_MAX} characters maximum)`,
      chars: 'Letters, spaces, hyphens and apostrophes only',
      invalid: 'Invalid last name',
    },
    email: {
      required: 'Email is required',
      tooLong: `Address is too long (${EMAIL_MAX} characters maximum)`,
      chars: 'The address must not contain spaces',
      invalid: 'Invalid email address (e.g. name@company.com)',
    },
    company: {
      required: 'Company is required',
      tooShort: `Company name is too short (${COMPANY_MIN} characters minimum)`,
      tooLong: `Company name is too long (${COMPANY_MAX} characters maximum)`,
      chars: 'Invalid company name',
    },
    message: {
      required: 'Message is required',
      tooShort: `Message is too short (${MESSAGE_MIN} characters minimum)`,
      tooLong: `Message is too long (${MESSAGE_MAX} characters maximum)`,
    },
    phone: {
      tooShort: 'Incomplete number',
      tooLong: 'Number too long for this country',
      invalid: 'Invalid number for this country',
      chars: 'Digits only',
      blocked: 'This country code is not accepted',
    },
  },
}

/** Texte d'une erreur ; le code brut si un message manquait (ne doit pas arriver). */
export function fieldMessage(locale: 'fr' | 'en', field: FieldName, error: RuleError): string {
  return FIELD_MESSAGES[locale][field][error] ?? FIELD_MESSAGES[locale][field].invalid ?? error
}
