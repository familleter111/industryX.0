/**
 * Anti-doublon des envois de formulaire (L1-09), en mémoire.
 *
 * Un double clic, un bouton « retour » ou un réseau qui rejoue la requête
 * envoient deux fois la même demande. `run(key, deliver)` ne livre qu'une
 * fois par clé et par fenêtre : un second appel pendant la livraison attend
 * son résultat, un appel suivant réussi est ignoré (réponse « ok »). Une
 * livraison échouée ne bloque rien : le visiteur peut renvoyer.
 *
 * Comme lib/server/rateLimit.ts : tombe au redéploiement, ne suit pas
 * plusieurs instances. C'est un garde-fou, pas une garantie d'unicité.
 */
import { createHash } from 'node:crypto'

export function createDedupe(windowMs: number, now: () => number = Date.now) {
  const recent = new Map<string, { at: number; result: Promise<boolean> }>()

  return async function run(parts: string[], deliver: () => Promise<boolean>): Promise<boolean> {
    // Empreinte seulement : la Map ne garde ni e-mail ni message en clair.
    const key = createHash('sha256').update(parts.join('\u0000')).digest('hex')
    const time = now()
    const previous = recent.get(key)
    if (previous && time - previous.at < windowMs && (await previous.result)) return true

    const result = deliver().catch(() => false)
    recent.set(key, { at: time, result })
    if (recent.size > 500) {
      recent.forEach((entry, k) => {
        if (time - entry.at >= windowMs) recent.delete(k)
      })
    }
    const stored = await result
    if (!stored) recent.delete(key)
    return stored
  }
}
