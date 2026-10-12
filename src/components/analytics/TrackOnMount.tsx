'use client'

import { useEffect } from 'react'

import type { AnalyticsEvents, EventName } from '@/lib/analytics/events'
import { track } from '@/lib/analytics/posthog'

/**
 * Envoie un événement à l'affichage d'une page, depuis un composant serveur :
 *
 *   <TrackOnMount event="guide_viewed" properties={{ slug, category }} />
 */
export default function TrackOnMount<E extends EventName>({
  event,
  properties,
}: {
  event: E
  properties: AnalyticsEvents[E]
}) {
  const key = JSON.stringify(properties)
  useEffect(() => {
    track(event, JSON.parse(key) as AnalyticsEvents[E])
  }, [event, key])
  return null
}
