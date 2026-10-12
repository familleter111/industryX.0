/**
 * Garde-fou anti-rafale en memoire, partage par les routes de formulaire.
 *
 * Volontairement rudimentaire — il tombe a chaque redeploiement et ne suit
 * pas plusieurs instances. C'est un ralentisseur contre un script naif, pas
 * une protection : celle-ci se met devant le site (WAF, Cloudflare).
 *
 * Chaque route cree son propre limiteur : un visiteur qui s'inscrit aux
 * guides ne consomme pas son quota de demandes de demonstration.
 */

export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>()

  return function rateLimited(ip: string): boolean {
    const now = Date.now()
    const recent = (hits.get(ip) ?? []).filter((time) => now - time < windowMs)
    recent.push(now)
    hits.set(ip, recent)

    // Purge : sans elle, la Map grossit indefiniment sur un serveur qui vit.
    if (hits.size > 500) {
      hits.forEach((times, key) => {
        if (times.every((time) => now - time >= windowMs)) hits.delete(key)
      })
    }

    return recent.length > max
  }
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip')?.trim() || 'inconnu'
}

/** Coupe et borne : une chaine de 2 Mo ne doit pas atteindre le classeur. */
export function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}
