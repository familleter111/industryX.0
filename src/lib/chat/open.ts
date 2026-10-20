/**
 * Ouverture de l'assistant de chat depuis n'importe quelle page.
 *
 * Le chat vit dans la barre de navigation (components/layout/Navbar), qui
 * possède son état ouvert / fermé. Plutôt que de remonter cet état dans un
 * contexte global, un bouton ailleurs sur le site émet un événement que la
 * barre écoute : « Poser votre question » sur la FAQ, par exemple.
 */

export const CHAT_OPEN_EVENT = 'ix0:open-chat'

export type OpenChatDetail = {
  /** D'où vient l'ouverture, pour la mesure d'audience (« faq »…). */
  source?: string
}

export function openChat(detail: OpenChatDetail = {}) {
  window.dispatchEvent(new CustomEvent<OpenChatDetail>(CHAT_OPEN_EVENT, { detail }))
}
