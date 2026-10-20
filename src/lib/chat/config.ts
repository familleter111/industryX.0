/**
 * Réglages de l'assistant de chat, lus côté navigateur comme côté serveur.
 *
 * Deux interrupteurs, volontairement séparés :
 *   - NEXT_PUBLIC_CHAT_AI=on : le widget envoie les questions à /api/chat.
 *     Lu au build (NEXT_PUBLIC_) : il décide aussi des mentions affichées
 *     dans le widget, la politique de confidentialité et les CGU.
 *   - CHAT_PROVIDER=anthropic + ANTHROPIC_API_KEY : la route /api/chat
 *     accepte de répondre. Sans eux, elle refuse et le widget repasse en
 *     mode local.
 *
 * Voir docs/chatbot.md.
 */

export type ChatLocale = 'fr' | 'en'

/** `true` si le widget utilise l'IA (les messages quittent alors le navigateur). */
export function chatAiEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CHAT_AI === 'on'
}

/** Limites partagées par le widget et la route. */
export const CHAT_LIMITS = {
  /** Caractères par message. */
  messageMax: 1000,
  /**
   * Messages d'historique envoyés à chaque question (les plus récents).
   * Court : chaque message renvoyé est refacturé à chaque question.
   */
  historyMax: 10,
}
