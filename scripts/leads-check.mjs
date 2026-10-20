/**
 * Vérifie et prépare la livraison des leads (voir docs/leads-integration.md).
 *
 *   npm run leads:check                  # configuration + état du CRM
 *   npm run leads:check -- setup-hubspot # crée la propriété et le pipeline HubSpot
 *   npm run leads:check -- test          # envoie un lead de test au site local
 *
 * Les variables viennent de .env.local (puis de l'environnement). Rien n'est
 * écrit dans les fichiers : les identifiants à reporter sont affichés.
 *
 * `test` poste sur BASE_URL/api/contact (défaut http://localhost:3000) : le
 * site doit tourner (`npm run dev`). Le lead traverse alors tout le circuit
 * réel — tableur, CRM, webhook — et le résultat se lit dans les logs du
 * serveur. Adresse de test : LEAD_TEST_EMAIL, sinon test+<date>@industryx0.pro.
 */

import { readFileSync } from 'node:fs'

const env = process.env
const val = (name) => env[name]?.trim() || ''

const PIPELINE_LABEL = 'Leads site web'
/** Parcours de la page contact, puis issues. Probabilité exigée par HubSpot. */
const STAGES = [
  { label: 'Qualification', probability: '0.1' },
  { label: 'Démonstration', probability: '0.3' },
  { label: 'Cadrage', probability: '0.5' },
  { label: "Plan d'action", probability: '0.7' },
  { label: 'Gagné', probability: '1.0' },
  { label: 'Perdu', probability: '0.0' },
]

/** Industries lues dans src/lib/leads/industries.ts : une seule liste à tenir. */
function industries() {
  const source = readFileSync(new URL('../src/lib/leads/industries.ts', import.meta.url), 'utf8')
  const options = [...source.matchAll(/\{ key: '([^']+)', label: '([^']+)' \}/g)].map(([, key, label]) => ({ key, label }))
  if (options.length === 0) throw new Error('Industries introuvables dans src/lib/leads/industries.ts')
  return options
}

const ok = (text) => console.log(`  ✓ ${text}`)
const ko = (text) => console.log(`  ✗ ${text}`)
const info = (text) => console.log(`    ${text}`)
let problems = 0
const fail = (text) => {
  problems += 1
  ko(text)
}

async function api(url, init = {}) {
  const response = await fetch(url, { ...init, signal: AbortSignal.timeout(10_000) })
  const body = await response.text()
  let json = null
  try {
    json = body ? JSON.parse(body) : null
  } catch {
    // corps non JSON
  }
  return { status: response.status, ok: response.ok, json, body }
}

/* ------------------------------------------------------------ HubSpot */

const HUBSPOT = 'https://api.hubapi.com'
const hubspot = (path, init = {}) =>
  api(`${HUBSPOT}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${val('HUBSPOT_ACCESS_TOKEN')}`, 'Content-Type': 'application/json' },
  })

function explainHubspot(res) {
  if (res.status === 401) return 'jeton invalide ou expiré'
  if (res.status === 403) return 'portée manquante sur l’application privée (voir docs/leads-integration.md)'
  return `HTTP ${res.status} ${res.json?.message ?? ''}`.trim()
}

async function checkHubspot() {
  if (!val('HUBSPOT_ACCESS_TOKEN')) return fail('HUBSPOT_ACCESS_TOKEN manquant')

  const property = await hubspot('/crm/v3/properties/contacts/industrie')
  if (property.ok) {
    const values = new Set((property.json.options ?? []).map((o) => o.value))
    const missing = industries().filter((i) => !values.has(i.key)).map((i) => i.key)
    if (property.json.type === 'enumeration' && missing.length) {
      fail(`propriété « industrie » : options manquantes ${missing.join(', ')}`)
    } else ok('propriété de contact « industrie »')
  } else if (property.status === 404) {
    fail('propriété de contact « industrie » absente → npm run leads:check -- setup-hubspot')
  } else return fail(`HubSpot : ${explainHubspot(property)}`)

  const pipelines = await hubspot('/crm/v3/pipelines/deals')
  if (!pipelines.ok) return fail(`pipelines : ${explainHubspot(pipelines)}`)

  const pipelineId = val('HUBSPOT_PIPELINE_ID') || 'default'
  const stageId = val('HUBSPOT_DEAL_STAGE_ID')
  info('Pipelines et étapes du compte :')
  for (const p of pipelines.json.results) {
    info(`  ${p.label}  →  HUBSPOT_PIPELINE_ID=${p.id}`)
    for (const s of [...p.stages].sort((a, b) => a.displayOrder - b.displayOrder)) {
      info(`      ${s.label.padEnd(20)} HUBSPOT_DEAL_STAGE_ID=${s.id}`)
    }
  }

  const pipeline = pipelines.json.results.find((p) => p.id === pipelineId)
  if (!pipeline) return fail(`HUBSPOT_PIPELINE_ID=${pipelineId} : pipeline introuvable`)
  if (!stageId) return fail('HUBSPOT_DEAL_STAGE_ID manquant : reporter l’identifiant de l’étape Qualification ci-dessus')
  const stage = pipeline.stages.find((s) => s.id === stageId)
  if (!stage) return fail(`HUBSPOT_DEAL_STAGE_ID=${stageId} : étape absente du pipeline « ${pipeline.label} »`)
  ok(`affaires créées dans « ${pipeline.label} », étape « ${stage.label} »`)
}

async function setupHubspot() {
  if (!val('HUBSPOT_ACCESS_TOKEN')) {
    ko('HUBSPOT_ACCESS_TOKEN manquant dans .env.local')
    process.exitCode = 1
    return
  }
  console.log('\nHubSpot — préparation')

  // 1. Propriété de contact « industrie » (liste déroulante, valeurs stables).
  const options = industries().map(({ key, label }, displayOrder) => ({ label, value: key, displayOrder, hidden: false }))
  const existing = await hubspot('/crm/v3/properties/contacts/industrie')
  if (existing.status === 404) {
    const created = await hubspot('/crm/v3/properties/contacts', {
      method: 'POST',
      body: JSON.stringify({
        name: 'industrie',
        label: 'Industrie',
        groupName: 'contactinformation',
        type: 'enumeration',
        fieldType: 'select',
        options,
      }),
    })
    if (!created.ok) return fail(`création de la propriété : ${explainHubspot(created)}`)
    ok('propriété « industrie » créée')
  } else if (existing.ok) {
    ok('propriété « industrie » déjà présente (non modifiée)')
  } else return fail(`lecture de la propriété : ${explainHubspot(existing)}`)

  // 2. Pipeline « Leads site web » et ses étapes ; complété s'il existe déjà.
  const pipelines = await hubspot('/crm/v3/pipelines/deals')
  if (!pipelines.ok) return fail(`pipelines : ${explainHubspot(pipelines)}`)
  let pipeline = pipelines.json.results.find((p) => p.label === PIPELINE_LABEL)

  if (!pipeline) {
    const created = await hubspot('/crm/v3/pipelines/deals', {
      method: 'POST',
      body: JSON.stringify({
        label: PIPELINE_LABEL,
        displayOrder: pipelines.json.results.length,
        stages: STAGES.map((s, displayOrder) => ({ label: s.label, displayOrder, metadata: { probability: s.probability } })),
      }),
    })
    if (!created.ok) return fail(`création du pipeline : ${explainHubspot(created)}`)
    pipeline = created.json
    ok(`pipeline « ${PIPELINE_LABEL} » créé`)
  } else {
    for (const [displayOrder, s] of STAGES.entries()) {
      if (pipeline.stages.some((existingStage) => existingStage.label === s.label)) continue
      const created = await hubspot(`/crm/v3/pipelines/deals/${pipeline.id}/stages`, {
        method: 'POST',
        body: JSON.stringify({ label: s.label, displayOrder, metadata: { probability: s.probability } }),
      })
      if (!created.ok) return fail(`étape « ${s.label} » : ${explainHubspot(created)}`)
      pipeline.stages.push(created.json)
      ok(`étape « ${s.label} » ajoutée`)
    }
    ok(`pipeline « ${PIPELINE_LABEL} » prêt`)
  }

  const qualification = pipeline.stages.find((s) => s.label === 'Qualification')
  console.log('\nÀ reporter dans .env.local (et dans Azure) :')
  console.log(`  CRM_PROVIDER=hubspot`)
  console.log(`  HUBSPOT_PIPELINE_ID=${pipeline.id}`)
  console.log(`  HUBSPOT_DEAL_STAGE_ID=${qualification.id}`)
}

/* ---------------------------------------------------- Brevo, Pipedrive */

async function checkBrevo() {
  if (!val('BREVO_API_KEY')) return fail('BREVO_API_KEY manquant')
  const headers = { 'api-key': val('BREVO_API_KEY'), Accept: 'application/json' }

  const attributes = await api('https://api.brevo.com/v3/contacts/attributes', { headers })
  if (!attributes.ok) return fail(`Brevo : HTTP ${attributes.status} ${attributes.json?.message ?? ''}`)
  const names = new Set(attributes.json.attributes.map((a) => a.name))
  for (const name of ['INDUSTRIE', 'SOCIETE']) {
    if (names.has(name)) ok(`attribut ${name}`)
    else fail(`attribut ${name} absent (Contacts > Paramètres > Attributs de contact)`)
  }

  if (!val('BREVO_PIPELINE_ID')) return info('pas de pipeline configuré : contact seulement, sans affaire')
  const pipelines = await api('https://api.brevo.com/v3/crm/pipeline/details/all', { headers })
  if (!pipelines.ok) return fail(`pipelines Brevo : HTTP ${pipelines.status}`)
  for (const p of pipelines.json) {
    info(`${p.pipeline_name ?? p.pipeline}  →  BREVO_PIPELINE_ID=${p.pipeline}`)
    for (const s of p.stages ?? []) info(`    ${String(s.name).padEnd(20)} BREVO_DEAL_STAGE_ID=${s.id}`)
  }
}

async function checkPipedrive() {
  for (const name of ['PIPEDRIVE_API_TOKEN', 'PIPEDRIVE_COMPANY_DOMAIN', 'PIPEDRIVE_PIPELINE_ID']) {
    if (!val(name)) return fail(`${name} manquant`)
  }
  const base = `https://${val('PIPEDRIVE_COMPANY_DOMAIN')}.pipedrive.com/api/v2`
  const headers = { 'x-api-token': val('PIPEDRIVE_API_TOKEN'), Accept: 'application/json' }
  const stages = await api(`${base}/stages?pipeline_id=${encodeURIComponent(val('PIPEDRIVE_PIPELINE_ID'))}`, { headers })
  if (!stages.ok) return fail(`Pipedrive : HTTP ${stages.status}`)
  info(`Étapes du pipeline ${val('PIPEDRIVE_PIPELINE_ID')} :`)
  for (const s of stages.json.data ?? []) info(`    ${String(s.name).padEnd(20)} PIPEDRIVE_STAGE_ID=${s.id}`)
  if (!val('PIPEDRIVE_INDUSTRY_FIELD_KEY')) info('PIPEDRIVE_INDUSTRY_FIELD_KEY vide : champ Industrie non rempli')
}

/* -------------------------------------------------------------- check */

async function check() {
  const crm = val('CRM_PROVIDER').toLowerCase() || 'none'
  console.log(`\nCRM : ${crm}`)
  if (crm === 'hubspot') await checkHubspot()
  else if (crm === 'brevo') await checkBrevo()
  else if (crm === 'pipedrive') await checkPipedrive()
  else if (crm === 'none') {
    info('aucun CRM direct')
    if (val('HUBSPOT_ACCESS_TOKEN')) await checkHubspot()
  } else fail(`CRM_PROVIDER inconnu : ${crm}`)

  console.log('\nWebhook')
  if (!val('LEAD_WEBHOOK_URL')) info('LEAD_WEBHOOK_URL vide : pas de webhook')
  else if (!val('LEAD_WEBHOOK_SECRET')) fail('LEAD_WEBHOOK_SECRET manquant : le site refusera d’envoyer')
  else {
    try {
      new URL(val('LEAD_WEBHOOK_URL'))
      ok(`webhook configuré (${new URL(val('LEAD_WEBHOOK_URL')).host}), signé`)
    } catch {
      fail('LEAD_WEBHOOK_URL n’est pas une URL valide')
    }
  }
  if (val('LEAD_WEBHOOK_SECRET') && val('LEAD_WEBHOOK_SECRET').length < 32) fail('LEAD_WEBHOOK_SECRET trop court (32 caractères minimum)')

  console.log('\nEmail de secours')
  const fallback = ['LEAD_FALLBACK_EMAIL', 'LEAD_FALLBACK_FROM', 'RESEND_API_KEY'].filter((name) => !val(name))
  if (fallback.length === 3) info('non configuré : un échec de CRM ou de webhook sera seulement journalisé (le tableur garde le lead)')
  else if (fallback.length) fail(`incomplet, manque : ${fallback.join(', ')}`)
  else ok(`vers ${val('LEAD_FALLBACK_EMAIL')}`)

  console.log(problems ? `\n${problems} point(s) à corriger.` : '\nConfiguration cohérente.')
  if (problems) process.exitCode = 1
}

/* --------------------------------------------------------------- test */

async function sendTest() {
  const base = env.BASE_URL ?? 'http://localhost:3000'
  const email = val('LEAD_TEST_EMAIL') || `test+${Date.now()}@industryx0.pro`
  console.log(`\nLead de test → ${base}/api/contact (${email})`)
  let res
  try {
    res = await api(`${base}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'Intégration',
        email,
        company: 'TEST — Industry X.0',
        industry: 'Autre secteur',
        message: 'Lead de test envoyé par npm run leads:check -- test. À supprimer.',
        consent: true,
        phoneCountry: 'TN',
        phone: '20123456',
        locale: 'fr',
        source: `${base}/contact`,
        attribution: { last: { utm_source: 'test', utm_medium: 'script', landing: '/contact', at: new Date().toISOString() } },
      }),
    })
  } catch {
    ko(`site injoignable sur ${base} : lancer npm run dev d’abord`)
    process.exitCode = 1
    return
  }
  if (res.ok) {
    ok('accepté par le site')
    info('Le détail (tableur, crm, webhook, secours) est dans les logs du serveur : ligne « [leads] ».')
    info('Penser à supprimer le contact et l’affaire de test dans le CRM.')
  } else {
    ko(`refusé : HTTP ${res.status} ${res.json?.error ?? ''} ${res.json?.fields ? JSON.stringify(res.json.fields) : ''}`)
    process.exitCode = 1
  }
}

const command = process.argv[2] ?? 'check'
const commands = { check, 'setup-hubspot': setupHubspot, test: sendTest }
if (!commands[command]) {
  console.error(`Commande inconnue : ${command}. Choix : ${Object.keys(commands).join(', ')}`)
  process.exitCode = 1
} else {
  await commands[command]()
}
