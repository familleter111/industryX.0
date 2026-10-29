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

/** Nom de l'assistant, affiché dans le widget et donné au modèle. */
export const CHAT_NAME = 'OmniduX'

/**
 * Limites partagées par le widget et la route. Le contexte envoyé au modèle
 * est borné de près : moins de texte libre, c'est moins de place pour une
 * injection d'instructions, et une facture plus basse.
 */
export const CHAT_LIMITS = {
  /** Caractères par question du visiteur. */
  messageMax: 500,
  /** Caractères par réponse de l'assistant renvoyée en historique. */
  replyMax: 1500,
  /**
   * Messages d'historique envoyés à chaque question (les plus récents).
   * Court : chaque message renvoyé est refacturé à chaque question.
   */
  historyMax: 8,
  /** Caractères de conversation au total : les plus anciens tombent au-delà. */
  contextMax: 4000,
  /** Délai minimal entre deux questions, en millisecondes. */
  cooldownMs: 2500,
  /** Questions par conversation (onglet) avant de renvoyer vers le formulaire. */
  sessionMax: 30,
}
