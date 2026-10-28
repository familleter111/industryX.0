/**
 * Fournisseur Azure OpenAI de l'assistant (CHAT_PROVIDER=azure), par l'API
 * Responses en flux (SSE). Appel direct par `fetch` : pas de SDK de plus.
 *
 * Réglages :
 *   AZURE_OPENAI_ENDPOINT    https://<ressource>.services.ai.azure.com/openai/v1
 *   AZURE_OPENAI_API_KEY     clé de la ressource (jamais exposée au navigateur)
 *   AZURE_OPENAI_DEPLOYMENT  nom du déploiement créé dans Azure AI Foundry
 *   AZURE_OPENAI_REASONING_EFFORT  facultatif, modèles à raisonnement seulement
 *                                  (gpt-5, o4-mini…) : low conseillé
 */

type Env = Record<string, string | undefined>

export type AzureConfig = { endpoint: string; apiKey: string; deployment: string; reasoningEffort?: string }

export function azureConfig(env: Env = process.env): AzureConfig | null {
  // L'adresse peut être collée avec son chemin final (…/openai/v1/responses).
  const endpoint = env.AZURE_OPENAI_ENDPOINT?.trim().replace(/\/+$/, '').replace(/\/responses$/, '')
  const apiKey = env.AZURE_OPENAI_API_KEY?.trim()
  const deployment = env.AZURE_OPENAI_DEPLOYMENT?.trim()
  if (!endpoint || !apiKey || !deployment) return null
  return { endpoint, apiKey, deployment, reasoningEffort: env.AZURE_OPENAI_REASONING_EFFORT?.trim() || undefined }
}

export class AzureError extends Error {
  constructor(readonly status: number | string) {
    super(`azure ${status}`)
  }
}

type Turn = { role: 'user' | 'assistant'; content: string }

/**
 * Texte de la réponse, morceau par morceau. `refused` passe à `true` si le
 * modèle décline (refus ou filtre de contenu Azure).
 */
export async function* streamAzure(
  config: AzureConfig,
  request: { system: string; messages: Turn[]; maxTokens: number; signal: AbortSignal },
  outcome: { refused: boolean },
): AsyncGenerator<string> {
  const response = await fetch(`${config.endpoint}/responses`, {
    method: 'POST',
    headers: { 'api-key': config.apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: config.deployment,
      instructions: request.system,
      input: request.messages,
      max_output_tokens: request.maxTokens,
      stream: true,
      // Rien n'est gardé chez Azure au-delà de la réponse.
      store: false,
      ...(config.reasoningEffort ? { reasoning: { effort: config.reasoningEffort } } : {}),
    }),
    signal: request.signal,
  })
  if (!response.ok || !response.body) throw new AzureError(response.status)

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  // Chaque morceau attend le suivant avant de partir. Quand le filtre de
  // contenu d'Azure bloque une réponse (tentative de jailbreak…), il envoie
  // d'un seul bloc une phrase anglaise toute faite (« I'm sorry, but I cannot
  // assist… »), puis `response.incomplete` : ce bloc retenu est alors jeté,
  // et la route répond par son propre message, dans la langue de la page.
  let pending: string | null = null
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    // Un évènement SSE se termine par une ligne vide.
    let end: number
    while ((end = buffer.search(/\r?\n\r?\n/)) !== -1) {
      const block = buffer.slice(0, end)
      buffer = buffer.slice(end).replace(/^\r?\n\r?\n/, '')
      const data = block
        .split(/\r?\n/)
        .filter((line) => line.startsWith('data:'))
        .map((line) => line.slice(5).trim())
        .join('')
      if (!data || data === '[DONE]') continue
      let event: { type?: string; delta?: unknown; response?: { incomplete_details?: { reason?: string } } }
      try {
        event = JSON.parse(data)
      } catch {
        continue
      }
      if (event.type === 'response.output_text.delta' && typeof event.delta === 'string') {
        if (pending) yield pending
        pending = event.delta
      } else if (event.type === 'response.refusal.delta') outcome.refused = true
      else if (event.type === 'response.incomplete' && event.response?.incomplete_details?.reason === 'content_filter') {
        outcome.refused = true
        pending = null
      } else if (event.type === 'response.failed' || event.type === 'error') throw new AzureError('flux')
    }
  }
  if (pending) yield pending
}
