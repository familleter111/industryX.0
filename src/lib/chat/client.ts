/**
 * Appel de /api/chat depuis le widget : envoie l'historique, lit la réponse
 * en flux et la transmet morceau par morceau.
 *
 * Lève une erreur si la route refuse (désactivée, limite atteinte) ou si le
 * réseau tombe avant le premier morceau : le widget répond alors en mode
 * local. Une coupure en cours de réponse garde ce qui est déjà arrivé.
 */

import type { ChatLocale } from '@/lib/chat/config'

export type ChatTurn = { role: 'user' | 'assistant'; content: string }

export async function askAssistant(
  messages: ChatTurn[],
  locale: ChatLocale,
  onText: (chunk: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, locale }),
    signal,
  })
  if (!response.ok || !response.body) throw new Error(`chat ${response.status}`)

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    const text = decoder.decode(value, { stream: true })
    if (text) onText(text)
  }
}
