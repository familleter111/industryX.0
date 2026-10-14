import { setRequestLocale } from 'next-intl/server'
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock,
  ExternalLink,
  FileText,
  History,
  ScanLine,
  ShieldCheck,
  Upload,
  UserRound,
  type LucideIcon,
} from 'lucide-react'

import Footer from '@/components/layout/Footer'
import { Link } from '@/i18n/navigation'
import { entiwinHref } from '@/lib/data/entiwin'
import { useCopy, type Locale } from '@/lib/i18n'

/**
 * Enti Win — page de présentation du nouveau produit (badge « New » dans le
 * menu Plateforme). L'outil lui-même est hébergé ailleurs : les boutons
 * « Lancer mon analyse » y mènent (voir lib/data/entiwin.ts), le bouton démo
 * reste sur /contact.
 *
 * Les valeurs du visuel du hero (15 / 6 / 3, 68 %) sont des exemples, et le
 * visuel le dit.
 */

type Item = { title: string; text: string }

const COPY = {
  fr: {
    badge: 'Nouveau',
    product: 'Enti Win — Évaluation qualité pharmaceutique assistée par IA',
    title: 'Détectez vos écarts',
    accent: 'avant l’inspection',
    lead: 'L’IA confronte vos procédures, déviations et CAPA aux exigences BPF : chaque écart est justifié et traçable.',
    launch: 'Lancer mon analyse',
    how: 'Voir comment ça marche',
    highlights: ['Résultat en minutes', 'Chaque écart sourcé', 'Validation humaine'],
    visual: {
      running: 'Analyse IA en cours',
      file: 'Procédure Contrôle qualité.pdf',
      results: [
        ['Couvertes', 'Exigences entièrement couvertes'],
        ['Partielles', 'Exigences partiellement couvertes'],
        ['Non identifiées', 'Exigences non couvertes'],
      ],
      progress: 'Analyse des exigences en cours…',
      caption: 'Illustration — valeurs d’exemple',
    },
    problem: {
      eyebrow: 'Le constat',
      title: 'La revue documentaire mobilise vos experts sur la lecture, pas sur les écarts',
      text: 'Avant chaque audit ou inspection BPF, les équipes qualité passent des heures à croiser leurs procédures, déviations et CAPA avec les exigences du référentiel. C’est un travail long, répétitif et difficile à tracer.',
      strong: 'Enti Win automatise cette lecture croisée.',
      end: 'L’objectif n’est pas de remplacer l’expert qualité, mais de lui faire gagner du temps pour qu’il se concentre sur les écarts qui comptent.',
    },
    steps: {
      eyebrow: 'Comment ça marche',
      title: 'Trois étapes, de vos documents au plan d’action',
      items: [
        { title: 'Déposez vos documents', text: 'Procédures, déviations, CAPA… au format PDF, Word ou Excel. Vos fichiers restent confidentiels.' },
        { title: 'L’IA confronte les exigences', text: 'Chaque exigence du référentiel est vérifiée dans vos documents, passage par passage.' },
        { title: 'Décidez, preuves à l’appui', text: 'Écarts, preuves et plan d’action priorisé : un rapport que vos experts n’ont plus qu’à valider.' },
      ] as Item[],
    },
    journey: {
      eyebrow: 'Le parcours sur la plateforme',
      title: 'Un parcours guidé en 4 étapes',
      lead: 'De l’organisation au rapport, l’utilisateur garde la main à chaque étape et valide les thèmes détectés avant l’analyse.',
      items: [
        { title: 'Documents', text: 'Renseignez votre organisation puis chargez vos fichiers (PDF, DOCX, XLSX).' },
        { title: 'Thèmes détectés', text: 'L’IA identifie les thèmes BPF couverts par vos documents. Vous les vérifiez avant de lancer l’analyse.' },
        { title: 'Analyse IA', text: 'Chaque exigence du référentiel est confrontée au contenu de vos documents.' },
        { title: 'Rapport', text: 'Exigences couvertes, partielles ou non identifiées, avec l’extrait source de chaque conclusion.' },
      ] as Item[],
      pipelineTitle: 'Ce que fait l’IA pendant la détection des thèmes',
      pipelineLead: 'Généralement 2 à 5 minutes selon le volume de documents.',
      pipeline: ['Préparation', 'Extraction des documents', 'Analyse des éléments visuels', 'Consolidation', 'Détection des thèmes'],
      pipelineNote: 'Le contenu est ensuite rapproché du référentiel GMP / BPF sélectionné.',
    },
    documents: {
      eyebrow: 'Documents pris en charge',
      title: 'Vos documents qualité, tels qu’ils sont',
      items: [
        'Procédure de gestion des déviations',
        'Procédure CAPA',
        'Formulaire ou modèle de déviation',
        'Procédure de Change Control',
        'SOP approuvée',
        'Rapport d’audit',
        'Réclamation qualité',
        'Rapport APR / PQR',
      ],
    },
    report: {
      eyebrow: 'Le rapport',
      title: 'Une vision claire de votre conformité',
      items: [
        { title: 'Couvertes', text: 'L’exigence est entièrement traitée dans vos documents.' },
        { title: 'Partielles', text: 'L’exigence est abordée, mais incomplètement.' },
        { title: 'Non identifiées', text: 'Aucun élément ne couvre l’exigence : un écart à traiter.' },
      ] as Item[],
      note: ['Chaque résultat est accompagné de ', 'l’extrait source', ' et d’un ', 'plan d’action priorisé', '.'],
    },
    principles: {
      eyebrow: 'Nos principes',
      title: 'Une IA au service de l’expert qualité',
      items: [
        { title: 'La décision reste humaine', text: 'Analyse assistée par IA, jamais autonome : l’expert qualité valide chaque conclusion.' },
        { title: 'Résultats justifiés', text: 'Chaque conclusion cite l’extrait source du document concerné.' },
        { title: 'Confidentialité', text: 'Vos documents ne sont pas réutilisés pour entraîner de modèle.' },
        { title: 'Traçabilité', text: 'Version du référentiel, horodatage et historique des analyses conservés.' },
      ] as Item[],
    },
    audience: {
      eyebrow: 'Pour qui ?',
      title: 'Pensé pour l’industrie pharmaceutique africaine et méditerranéenne',
      text: 'Enti Win s’adresse aux équipes qui préparent des audits, des inspections réglementaires ou des revues documentaires périodiques.',
      roles: ['Assurance qualité (QA)', 'Contrôle qualité (QC)', 'Affaires réglementaires', 'Responsables conformité & audit'],
    },
    cta: {
      eyebrow: 'Une solution Industry X.0',
      title: 'Envie de tester sur un de vos documents ?',
      text: 'Lancez votre première analyse en quelques minutes. Un aperçu du résultat s’affiche immédiatement, et le rapport complet est accessible en ligne.',
      demo: 'Demander une démo',
    },
    newTab: '(nouvel onglet)',
  },
  en: {
    badge: 'New',
    product: 'Enti Win — AI-assisted pharmaceutical quality assessment',
    title: 'Find your gaps',
    accent: 'before the inspection',
    lead: 'AI checks your procedures, deviations and CAPAs against GMP requirements: every gap is justified and traceable.',
    launch: 'Run my analysis',
    how: 'See how it works',
    highlights: ['Results in minutes', 'Every gap sourced', 'Human validation'],
    visual: {
      running: 'AI analysis in progress',
      file: 'Quality control procedure.pdf',
      results: [
        ['Covered', 'Requirements fully covered'],
        ['Partial', 'Requirements partially covered'],
        ['Not found', 'Requirements not covered'],
      ],
      progress: 'Analysing requirements…',
      caption: 'Illustration — sample values',
    },
    problem: {
      eyebrow: 'The problem',
      title: 'Document reviews keep your experts reading, not fixing gaps',
      text: 'Before every GMP audit or inspection, quality teams spend hours cross-checking their procedures, deviations and CAPAs against the reference standard. It is long, repetitive work that is hard to trace.',
      strong: 'Enti Win automates this cross-check.',
      end: 'The goal is not to replace the quality expert, but to save them time so they can focus on the gaps that matter.',
    },
    steps: {
      eyebrow: 'How it works',
      title: 'Three steps, from your documents to an action plan',
      items: [
        { title: 'Upload your documents', text: 'Procedures, deviations, CAPAs… as PDF, Word or Excel files. Your files stay confidential.' },
        { title: 'AI checks the requirements', text: 'Every requirement of the standard is checked against your documents, passage by passage.' },
        { title: 'Decide, with evidence', text: 'Gaps, evidence and a prioritised action plan: a report your experts only need to validate.' },
      ] as Item[],
    },
    journey: {
      eyebrow: 'The journey on the platform',
      title: 'A guided journey in 4 steps',
      lead: 'From your organisation to the report, users stay in control at every step and validate the detected topics before the analysis.',
      items: [
        { title: 'Documents', text: 'Enter your organisation, then upload your files (PDF, DOCX, XLSX).' },
        { title: 'Detected topics', text: 'AI identifies the GMP topics covered by your documents. You review them before running the analysis.' },
        { title: 'AI analysis', text: 'Every requirement of the standard is compared with the content of your documents.' },
        { title: 'Report', text: 'Covered, partial or missing requirements, with the source excerpt behind each conclusion.' },
      ] as Item[],
      pipelineTitle: 'What the AI does during topic detection',
      pipelineLead: 'Usually 2 to 5 minutes, depending on the number of documents.',
      pipeline: ['Preparation', 'Document extraction', 'Visual element analysis', 'Consolidation', 'Topic detection'],
      pipelineNote: 'The content is then matched against the selected GMP standard.',
    },
    documents: {
      eyebrow: 'Supported documents',
      title: 'Your quality documents, as they are',
      items: [
        'Deviation management procedure',
        'CAPA procedure',
        'Deviation form or template',
        'Change control procedure',
        'Approved SOP',
        'Audit report',
        'Quality complaint',
        'APR / PQR report',
      ],
    },
    report: {
      eyebrow: 'The report',
      title: 'A clear view of your compliance',
      items: [
        { title: 'Covered', text: 'The requirement is fully addressed in your documents.' },
        { title: 'Partial', text: 'The requirement is addressed, but not completely.' },
        { title: 'Not found', text: 'Nothing covers the requirement: a gap to address.' },
      ] as Item[],
      note: ['Every result comes with ', 'the source excerpt', ' and a ', 'prioritised action plan', '.'],
    },
    principles: {
      eyebrow: 'Our principles',
      title: 'AI that works for the quality expert',
      items: [
        { title: 'Humans make the call', text: 'AI-assisted, never autonomous: the quality expert validates every conclusion.' },
        { title: 'Justified results', text: 'Every conclusion cites the source excerpt from the document concerned.' },
        { title: 'Confidentiality', text: 'Your documents are not reused to train any model.' },
        { title: 'Traceability', text: 'Standard version, timestamps and analysis history are kept.' },
      ] as Item[],
    },
    audience: {
      eyebrow: 'Who is it for?',
      title: 'Built for the African and Mediterranean pharmaceutical industry',
      text: 'Enti Win is for teams preparing audits, regulatory inspections or periodic document reviews.',
      roles: ['Quality assurance (QA)', 'Quality control (QC)', 'Regulatory affairs', 'Compliance & audit managers'],
    },
    cta: {
      eyebrow: 'An Industry X.0 solution',
      title: 'Want to try it on one of your documents?',
      text: 'Run your first analysis in minutes. A preview of the result appears right away, and the full report is available online.',
      demo: 'Book a demo',
    },
    newTab: '(opens in a new tab)',
  },
}

const STEP_ICONS: LucideIcon[] = [Upload, ScanLine, BarChart3]
const PRINCIPLE_ICONS: LucideIcon[] = [UserRound, FileText, ShieldCheck, History]
const HIGHLIGHT_ICONS: LucideIcon[] = [Clock, FileText, UserRound]
const RESULT_TONES = [
  { dot: 'bg-emerald-600', text: 'text-emerald-600', sign: '✓', value: 15 },
  { dot: 'bg-amber-500', text: 'text-amber-500', sign: '−', value: 6 },
  { dot: 'bg-red-600', text: 'text-red-600', sign: '✕', value: 3 },
]

/** Bouton vers l'outil Enti Win. `data-cta` déclenche `entiwin_clicked` (analytics). */
function LaunchButton({ content, label, newTab }: { content: string; label: string; newTab: string }) {
  return (
    <a
      href={entiwinHref(content)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={`entiwin_${content}`}
      className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-dark shadow-gold transition hover:bg-gold-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
    >
      {label}
      <ExternalLink size={16} aria-hidden="true" />
      <span className="sr-only">{newTab}</span>
    </a>
  )
}

/** Surtitre : or foncé sur fond clair, or vif sur fond sombre (contraste). */
function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${onDark ? 'text-gold' : 'text-gold-ink'}`}>
      {children}
    </p>
  )
}

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] text-dark sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-stone-600">{lead}</p>}
    </div>
  )
}

/** Document → IA → répartition des exigences. Valeurs d'exemple, signalées comme telles. */
function AnalysisVisual({ t }: { t: (typeof COPY)['fr']['visual'] }) {
  return (
    <div className="min-w-0 rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/30">
      <div className="rounded-2xl bg-stone-50 p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-stone-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold" /> {t.running}
        </div>

        <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:gap-5">
          <div className="flex w-24 flex-col items-center rounded-xl border border-stone-200 bg-white px-2 py-4 text-center shadow-sm sm:w-28">
            <FileText size={32} className="text-red-500" aria-hidden="true" />
            <span className="mt-2 text-[11px] font-medium leading-tight text-stone-700">{t.file}</span>
          </div>

          <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-dark text-gold ring-8 ring-gold/25 sm:flex">
            <ScanLine size={24} aria-hidden="true" />
          </div>

          <ul className="min-w-0 space-y-2">
            {t.results.map(([label, sub], i) => {
              const tone = RESULT_TONES[i]
              return (
                <li key={label} className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3 py-2 shadow-sm">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${tone.dot}`}>
                    {tone.sign}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stone-800">
                      <span className={`mr-1.5 text-lg ${tone.text}`}>{tone.value}</span>
                      {label}
                    </p>
                    <p className="hidden truncate text-[11px] text-stone-500 sm:block">{sub}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-5 rounded-xl border border-stone-200 bg-white px-4 py-3">
          <div className="flex justify-between text-xs text-stone-600">
            <span>{t.progress}</span>
            <span className="font-semibold">68 %</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-stone-100">
            <div className="h-1.5 w-[68%] rounded-full bg-gold" />
          </div>
        </div>
      </div>
      <p className="px-2 pt-2 text-center text-[11px] text-white/50">{t.caption}</p>
    </div>
  )
}

export default function EntiWinPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = useCopy(COPY)

  return (
    <main className="overflow-x-hidden bg-white font-body text-stone-800">
      {/* HERO */}
      <section
        data-cta-location="hero"
        className="relative overflow-hidden bg-dark bg-[radial-gradient(ellipse_at_top_right,rgba(218,162,80,0.16),transparent_55%)]"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-[calc(82px+3rem)] sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-24 lg:pt-[calc(82px+4.5rem)]">
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-dark">
                {t.badge}
              </span>
              {t.product}
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              {t.title} <span className="text-gold">{t.accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{t.lead}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LaunchButton content="hero" label={t.launch} newTab={t.newTab} />
              <a
                href="#fonctionnement"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t.how}
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {t.highlights.map((label, i) => {
                const Icon = HIGHLIGHT_ICONS[i]
                return (
                  <li key={label} className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                )
              })}
            </ul>
          </div>

          <AnalysisVisual t={t.visual} />
        </div>
      </section>

      {/* CONSTAT */}
      <section className="border-b border-stone-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8 lg:py-20">
          <div>
            <Eyebrow>{t.problem.eyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] text-dark">{t.problem.title}</h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-stone-600">
            <p>{t.problem.text}</p>
            <p>
              <strong className="font-semibold text-dark">{t.problem.strong}</strong> {t.problem.end}
            </p>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="fonctionnement" className="scroll-mt-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionTitle eyebrow={t.steps.eyebrow} title={t.steps.title} />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {t.steps.items.map(({ title, text }, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <li key={title} className="relative rounded-2xl border border-cream-border bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-ink">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-dark">
                    {i + 1}. {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{text}</p>
                  {i < t.steps.items.length - 1 && (
                    <ArrowRight
                      size={20}
                      aria-hidden="true"
                      className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-stone-300 md:block"
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* PARCOURS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionTitle eyebrow={t.journey.eyebrow} title={t.journey.title} lead={t.journey.lead} />

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
            <ol className="relative ml-4 space-y-6 border-l-2 border-gold/40 pl-8">
              {t.journey.items.map((step, i) => (
                <li key={step.title} className="relative">
                  <span className="absolute -left-[49px] flex h-8 w-8 items-center justify-center rounded-full bg-dark text-sm font-bold text-white ring-4 ring-white">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-dark">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
              <h3 className="text-base font-semibold text-dark">{t.journey.pipelineTitle}</h3>
              <p className="mt-1 text-sm text-stone-600">{t.journey.pipelineLead}</p>
              <ul className="mt-5 space-y-3">
                {t.journey.pipeline.map((step) => (
                  <li key={step} className="flex items-center gap-3 text-sm text-stone-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-dark">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-stone-200 pt-4 text-xs text-stone-500">{t.journey.pipelineNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS & RAPPORT */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="rounded-2xl border border-cream-border bg-white p-8">
            <Eyebrow>{t.documents.eyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-dark">{t.documents.title}</h2>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {t.documents.items.map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm text-stone-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                  {doc}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {['PDF', 'DOCX', 'XLSX'].map((format) => (
                <span
                  key={format}
                  className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-semibold text-stone-600"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-cream-border bg-white p-8">
            <Eyebrow>{t.report.eyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-dark">{t.report.title}</h2>
            <ul className="mt-6 space-y-4">
              {t.report.items.map((result, i) => (
                <li key={result.title} className="flex gap-3">
                  <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${RESULT_TONES[i].dot}`} />
                  <div>
                    <p className="font-semibold text-stone-800">{result.title}</p>
                    <p className="text-sm text-stone-600">{result.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-stone-50 p-4 text-sm text-stone-600">
              {t.report.note[0]}
              <strong className="text-stone-800">{t.report.note[1]}</strong>
              {t.report.note[2]}
              <strong className="text-stone-800">{t.report.note[3]}</strong>
              {t.report.note[4]}
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPES */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionTitle eyebrow={t.principles.eyebrow} title={t.principles.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.principles.items.map(({ title, text }, i) => {
              const Icon = PRINCIPLE_ICONS[i]
              return (
                <div key={title} className="rounded-2xl border border-stone-200 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-ink">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold text-dark">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <Eyebrow>{t.audience.eyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] text-dark">{t.audience.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600">{t.audience.text}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.audience.roles.map((role) => (
              <li
                key={role}
                className="flex items-center gap-3 rounded-xl border border-cream-border bg-white px-4 py-3 text-sm font-medium text-stone-700"
              >
                <Check size={16} className="text-gold-deep" aria-hidden="true" />
                {role}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* APPEL FINAL */}
      <section data-cta-location="cta_band" className="bg-dark">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <Eyebrow onDark>{t.cta.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">{t.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">{t.cta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LaunchButton content="footer" label={t.launch} newTab={t.newTab} />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t.cta.demo}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
