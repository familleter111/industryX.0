/**
 * Appel de /api/chat depuis le widget : envoie l'historique, lit la réponse
 * en flux et la transmet morceau par morceau.
 *
 * La route termine le flux par un caractère NUL suivi de la signature de la
 * réponse (lib/chat/server.ts) : elle est rendue à part, pour être renvoyée
 * avec cette réponse dans l'historique de la question suivante.
 *
 * Lève une erreur si la route refuse (désactivée, limite atteinte, spam) ou
 * si le réseau tombe avant le premier morceau : le widget répond alors en
 * mode local. Une coupure en cours de réponse garde ce qui est déjà arrivé.
 */

import type { ChatLocale } from '@/lib/chat/config'

export type ChatTurn = { role: 'user' | 'assistant'; content: string; sig?: string }

const SIGNATURE_MARK = '\u0000'

/** Renvoie la signature de la réponse, ou `undefined` si le flux a été coupé avant. */
export async function askAssistant(
  messages: ChatTurn[],
  locale: ChatLocale,
  onText: (chunk: string) => void,
  signal?: AbortSignal,
): Promise<string | undefined> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // `website` : champ piège, toujours vide depuis le widget (voir la route).
    body: JSON.stringify({ messages, locale, website: '' }),
    signal,
  })
  if (!response.ok || !response.body) throw new Error(`chat ${response.status}`)

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let sig: string | undefined
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    let text = decoder.decode(value, { stream: true })
    if (sig !== undefined) {
      sig += text
      continue
    }
    const mark = text.indexOf(SIGNATURE_MARK)
    if (mark !== -1) {
      sig = text.slice(mark + 1)
      text = text.slice(0, mark)
    }
    if (text) onText(text)
  }
  return sig
}
