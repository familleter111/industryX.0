/**
 * Contrôle du numéro de téléphone selon le pays choisi, avec les métadonnées
 * « min » de libphonenumber-js (~20 ko compressés) : longueurs possibles et
 * premiers chiffres de chaque pays.
 *
 * Le serveur l'importe directement. Le formulaire le charge à la demande
 * (import dynamique au premier contact avec le champ) : ces métadonnées ne
 * pèsent sur aucune autre page.
 */

import { isValidPhoneNumber, validatePhoneNumberLength, type CountryCode } from 'libphonenumber-js/min'

import type { RuleError } from '@/lib/leads/rules'

/**
 * Numéro national (chiffres seuls, sans indicatif) pour le pays `iso`.
 * Vide = pas d'erreur : le téléphone est facultatif.
 */
export function checkPhone(digits: string, iso: string): RuleError | undefined {
  if (!digits) return undefined
  if (/\D/.test(digits)) return 'chars'
  const country = iso.toUpperCase() as CountryCode
  const length = validatePhoneNumberLength(digits, country)
  if (length === 'TOO_SHORT') return 'tooShort'
  if (length === 'TOO_LONG') return 'tooLong'
  if (length || !isValidPhoneNumber(digits, country)) return 'invalid'
  return undefined
}
