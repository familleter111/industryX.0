/**
 * Industries du formulaire de contact et leur valeur stable.
 *
 * Le formulaire envoie le libellé français (`label`, valeur du <select>) ; le
 * CRM et le webhook reçoivent `key`, qui ne bouge pas si le libellé est
 * reformulé ou traduit. C'est `key` qui sert à segmenter les leads : les
 * options des champs « industrie » des CRM doivent reprendre ces valeurs
 * (voir docs/leads-integration.md).
 *
 * L'ordre est celui de la liste déroulante.
 */

export const INDUSTRY_OPTIONS = [
  { key: 'pharma', label: 'Pharmaceutique' },
  { key: 'agroalimentaire', label: 'Agroalimentaire & boissons' },
  { key: 'cosmetique', label: 'Cosmétique & dispositifs médicaux' },
  { key: 'automobile', label: 'Automobile & composants' },
  { key: 'electronique', label: 'Électronique & câblage' },
  { key: 'packaging', label: 'Packaging & plasturgie' },
  { key: 'chimie', label: 'Chimie' },
  { key: 'logistique', label: 'Distribution & logistique' },
  { key: 'autre', label: 'Autre secteur' },
] as const

export type IndustryKey = (typeof INDUSTRY_OPTIONS)[number]['key']

/** Libellés français, valeurs du <select>. */
export const INDUSTRY_LABELS = INDUSTRY_OPTIONS.map((option) => option.label)

/**
 * Valeur stable d'une industrie reçue du formulaire : libellé français ou
 * déjà une clé. `undefined` si la valeur ne correspond à aucune option.
 */
export function industryKey(value: string): IndustryKey | undefined {
  const option = INDUSTRY_OPTIONS.find((o) => o.label === value || o.key === value)
  return option?.key
}

/** Libellé français d'une clé (pour le tableur, les notes CRM). */
export function industryLabel(key: IndustryKey): string {
  return INDUSTRY_OPTIONS.find((o) => o.key === key)!.label
}
