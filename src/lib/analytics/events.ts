/**
 * Taxonomie des événements analytics — la seule liste autorisée.
 *
 * Convention : `objet_action`, en snake_case, au passé. `track()` n'accepte
 * que ces noms, avec exactement ces propriétés : un événement mal orthographié
 * ou une propriété oubliée ne compile pas, au lieu de créer en silence une
 * nouvelle série dans PostHog.
 *
 * Jamais de donnée personnelle dans les propriétés : ni email, ni nom, ni
 * texte libre saisi par le visiteur (message, question au chat).
 *
 * `$pageview` est envoyé à part (voir PageviewTracker), avec la propriété
 * `locale` enregistrée sur tous les événements.
 */
export type AnalyticsEvents = {
  /** Clic sur un appel à l'action (lien vers /contact, ou élément `data-cta`). */
  cta_clicked: {
    cta_id: string
    cta_label: string
    /** Zone de la page : hero, cta_band, navbar, footer, page… */
    location: string
    destination: string
  }
  /** Premier champ du formulaire de démo touché. */
  demo_form_started: { page: string }
  /** Demande de démo acceptée par le serveur. */
  demo_form_submitted: { industry: string; has_phone: boolean }
  /** Demande refusée (validation, quota) ou en échec (serveur, réseau). */
  demo_form_failed: { status: number; fields: string[] }
  newsletter_subscribed: { page: string }
  /** `source` : bouton flottant, faq… (lib/chat/open.ts). */
  chat_opened: { page: string; source?: string }
  /** Rang du message dans la conversation — jamais son contenu. */
  chat_message_sent: { message_index: number }
  guide_viewed: { slug: string; category: string }
  /** Clic vers l'outil Enti Win (élément `data-cta="entiwin…"`). */
  entiwin_clicked: { location: string }
  language_switched: { from: string; to: string }
}

export type EventName = keyof AnalyticsEvents
