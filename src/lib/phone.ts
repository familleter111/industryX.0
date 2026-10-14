/**
 * Mise en forme d'un numéro de téléphone selon le pays choisi.
 *
 * Aucun import : ces fonctions ne connaissent qu'un indicatif et un gabarit,
 * pas le composant qui les appelle ni la liste des pays. C'est ce qui les
 * rend testables seules — voir scripts/test-phone.mjs.
 */

/** Ce dont le format a besoin : un pays de lib/data/phoneCountries en fournit plus. */
export type PhoneFormat = {
  /** Indicatif, sans le « + ». */
  dial: string
  /** Gabarit national : '#' = un chiffre, le reste est un séparateur. */
  mask: string
  /** Préfixe interurbain ('0' en France), vide là où il n'existe pas. */
  trunk?: string
}

/** Ne garde que les chiffres — on colle souvent « (0)6-12.34 ». */
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, '')
}

/** Nombre de chiffres attendus par un gabarit. */
export function maskLength(mask: string): number {
  let count = 0
  for (const char of mask) if (char === '#') count += 1
  return count
}

/**
 * Applique le gabarit du pays aux chiffres saisis.
 *
 * Le préfixe interurbain part dès la frappe, mais SEULEMENT là où le pays en
 * a un : le 0 de « 06 12 … » ne se compose pas depuis l'étranger, alors que
 * le 0 italien de « +39 06 … » fait partie du numéro. C'est la métadonnée
 * `trunk` qui tranche, pays par pays — l'Italie, la Tunisie et l'Espagne
 * n'en ont pas, la France, l'Allemagne et le Maroc si.
 *
 * Un numéro plus long que l'exemple du pays (fixe, numéro spécial) n'est pas
 * amputé : le surplus est ajouté après un espace. Le gabarit guide la saisie,
 * il ne la censure pas.
 */
export function formatNationalPhone(value: string, country: PhoneFormat): string {
  let digits = phoneDigits(value)
  const expected = maskLength(country.mask)

  const trunk = country.trunk ?? ''
  if (trunk && digits.length > trunk.length && digits.startsWith(trunk)) {
    digits = digits.slice(trunk.length)
  }

  // Filet pour les pays dont le préfixe n'est pas connu : un 0 initial qui
  // fait déborder le gabarit était de trop.
  if (expected && digits.length > expected && digits.startsWith('0')) {
    digits = digits.replace(/^0+/, '')
  }

  // Garde-fou E.164 : 15 chiffres au total, indicatif compris.
  digits = digits.slice(0, Math.max(0, 15 - country.dial.length))

  if (!country.mask) return digits

  let out = ''
  let index = 0
  for (const char of country.mask) {
    if (index >= digits.length) break
    if (char === '#') {
      out += digits[index]
      index += 1
    } else {
      out += char
    }
  }
  if (index < digits.length) out += ' ' + digits.slice(index)

  return out
}

/** Forme canonique pour le stockage : +21620123456. */
export function toE164(country: PhoneFormat, value: string): string {
  const digits = phoneDigits(value)
  return digits ? '+' + country.dial + digits : ''
}

/** « Nigéria » doit se trouver en tapant « nigeria ». */
export function deburr(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}
