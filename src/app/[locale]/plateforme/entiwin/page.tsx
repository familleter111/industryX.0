import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import {
  BrainCircuit,
  Check,
  CloudUpload,
  FileText,
  History,
  Minus,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Timer,
  UserCheck,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react'

import Footer from '@/components/layout/Footer'
import { Link } from '@/i18n/navigation'
import { ENTIWIN_DOCUMENTS, ENTIWIN_FORMATS, entiwinHref } from '@/lib/data/entiwin'
import { useCopy, type Locale } from '@/lib/i18n'
import { ROUTES } from '@/lib/routes'

/**
 * Enti Win — page de présentation du produit (badge « Nouveau » dans le menu
 * Plateforme). L'outil lui-même est hébergé ailleurs : les boutons « Lancer
 * mon analyse » y mènent (voir lib/data/entiwin.ts), le bouton démo reste sur
 * /contact.
 *
 * La page reprend l'identité du site Enti Win (entiwin.cipa-web.com) : palette
 * `ew-…` (lib/tokens.ts, relevée dans sa feuille de style), police Inter,
 * boutons et cartes à l'identique, logo et signature « Une solution
 * Industry X.0 ». Barre de navigation et pied de page restent ceux du site.
 * Seuls écarts voulus : les petits textes verts passent en green.700 (le
 * green.600 d'Enti Win n'atteint que 4,0:1 sur fond vert pâle) et le chiffre
 * orange en amber.700.
 *
 * Les valeurs du visuel du hero (15 / 6 / 3, 68 %) sont des exemples, et le
 * visuel le dit.
 */

type Item = { title: string; text: string }

const COPY = {
  fr: {
    product: 'Évaluation qualité pharmaceutique assistée par IA',
    tagline: 'Évaluation qualité assistée par IA',
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
    journey: {
      eyebrow: 'Le parcours sur la plateforme',
      title: 'Un parcours guidé en 4 étapes',
      lead: 'De l’organisation au rapport, l’utilisateur garde la main à chaque étape et valide les thèmes détectés avant l’analyse.',
      items: [
        { title: 'Documents', text: `Renseignez votre organisation puis chargez vos fichiers (${ENTIWIN_FORMATS.join(', ')}).` },
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
      solution: 'Une solution',
      title: 'Envie de tester sur un de vos documents ?',
      text: 'Lancez votre première analyse en quelques minutes. Un aperçu du résultat s’affiche immédiatement, et le rapport complet est accessible en ligne.',
      demo: 'Demander une démo',
    },
    newTab: '(nouvel onglet)',
  },
  en: {
    product: 'AI-assisted pharmaceutical quality assessment',
    tagline: 'AI-assisted quality assessment',
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
    journey: {
      eyebrow: 'The journey on the platform',
      title: 'A guided journey in 4 steps',
      lead: 'From your organisation to the report, users stay in control at every step and validate the detected topics before the analysis.',
      items: [
        { title: 'Documents', text: `Enter your organisation, then upload your files (${ENTIWIN_FORMATS.join(', ')}).` },
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
      solution: 'A solution by',
      title: 'Want to try it on one of your documents?',
      text: 'Run your first analysis in minutes. A preview of the result appears right away, and the full report is available online.',
      demo: 'Book a demo',
    },
    newTab: '(opens in a new tab)',
  },
}

const PRINCIPLE_ICONS: LucideIcon[] = [UserRound, FileText, ShieldCheck, History]
const HIGHLIGHT_ICONS: LucideIcon[] = [Timer, ShieldCheck, UserCheck]
/* Statuts : pastille (couleur vive, pictogramme blanc) et chiffre (nuance
   foncée, lisible en petit texte). */
const RESULT_TONES = [
  { badge: 'bg-ew-green-500', text: 'text-ew-green-700', icon: Check, value: 15 },
  { badge: 'bg-ew-amber-500', text: 'text-ew-amber-700', icon: Minus, value: 6 },
  { badge: 'bg-ew-ko', text: 'text-ew-ko', icon: X, value: 3 },
]


/** Logo Enti Win : bulle et point vert, tracés repris du site du produit. */
function EntiWinMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path
        d="M20 3.5c9.1 0 16.5 6.9 16.5 15.4S29.1 34.3 20 34.3c-1.9 0-3.7-.3-5.4-.8l-8 3 2.3-6.4C5.4 27.3 3.5 23.3 3.5 18.9 3.5 10.4 10.9 3.5 20 3.5Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="20" cy="18.9" r="6" className="fill-ew-green-500" />
    </svg>
  )
}

/** Flèche pointillée des schémas d'Enti Win. */
function DottedArrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 12" fill="none" aria-hidden="true" className={className}>
      <path d="M2 6h46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" />
      <path d="m50 2 5 4-5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Bouton vers l'outil Enti Win. `data-cta` déclenche `entiwin_clicked`
 * (analytics). Marine sur fond clair, blanc sur le bandeau sombre.
 */
function LaunchButton({
  content,
  label,
  newTab,
  onDark = false,
}: {
  content: string
  label: string
  newTab: string
  onDark?: boolean
}) {
  return (
    <a
      href={entiwinHref(content)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={`entiwin_${content}`}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold transition-colors ${
        onDark
          ? 'bg-white text-ew-navy-900 hover:bg-ew-navy-50'
          : 'bg-ew-navy-800 text-white hover:bg-ew-navy-900'
      }`}
    >
      <CloudUpload size={20} aria-hidden="true" />
      {label}
      <span className="sr-only">{newTab}</span>
    </a>
  )
}

/** Petite coche verte en pastille, la marque des listes d'Enti Win. */
function CheckPill() {
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ew-green-50 text-ew-green-600 ring-1 ring-ew-green-100">
      <Check size={14} strokeWidth={2.5} aria-hidden="true" />
    </span>
  )
}

/** Surtitre vert foncé (green.700 : 5,8:1 même sur fond vert pâle). */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.14em] text-ew-green-700">{children}</p>
}

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-ew-navy-900 sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-ew-ink-500">{lead}</p>}
    </div>
  )
}

/** Document → IA → répartition des exigences. Valeurs d'exemple, signalées comme telles. */
function AnalysisVisual({ t }: { t: (typeof COPY)['fr']['visual'] }) {
  return (
    <div className="min-w-0 rounded-2xl border border-ew-line bg-ew-surface p-2.5 sm:p-3.5">
      <div className="rounded-xl border border-ew-line bg-white p-5 shadow-sm shadow-ew-navy-900/5 sm:p-6">
        <p className="flex items-center gap-2 text-[13px] font-medium text-ew-ink-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-ew-blue-500" /> {t.running}
        </p>

        <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[auto_auto_auto_auto_minmax(0,1fr)] sm:gap-0">
          <div className="flex w-24 flex-col items-center rounded-xl border border-ew-line bg-white px-2 py-4 text-center shadow-sm sm:w-28">
            <FileText size={32} className="text-ew-ko" aria-hidden="true" />
            <span className="mt-2 text-[12px] font-medium leading-tight text-ew-ink-700">{t.file}</span>
          </div>

          <DottedArrow className="mx-2 hidden h-3 w-10 text-ew-blue-500 sm:block" />

          {/* Le cerveau dans son halo, comme sur Enti Win. */}
          <span className="hidden h-16 w-16 items-center justify-center rounded-full bg-ew-blue-500 text-white ring-8 ring-ew-blue-100 sm:flex">
            <BrainCircuit size={28} aria-hidden="true" />
          </span>

          <DottedArrow className="mx-2 hidden h-3 w-10 text-ew-blue-500 sm:block" />

          <ul className="min-w-0 space-y-2">
            {t.results.map(([label, sub], i) => {
              const tone = RESULT_TONES[i]
              const Icon = tone.icon
              return (
                <li key={label} className="flex items-center gap-3 rounded-xl border border-ew-line bg-white px-3 py-2 shadow-sm">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white ${tone.badge}`}>
                    <Icon size={16} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ew-ink-700">
                      <span className={`mr-1.5 text-xl font-extrabold ${tone.text}`}>{tone.value}</span>
                      {label}
                    </p>
                    <p className="hidden text-[12px] leading-snug text-ew-ink-500 sm:block">{sub}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-5 rounded-xl border border-ew-line bg-white px-4 py-3">
          <div className="flex justify-between text-[13px] text-ew-ink-700">
            <span>{t.progress}</span>
            <span className="font-semibold">68 %</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-ew-line">
            <div className="h-1.5 w-[68%] rounded-full bg-ew-green-500" />
          </div>
        </div>
      </div>
      <p className="px-2 pt-2 text-center text-[12px] text-ew-ink-500">{t.caption}</p>
    </div>
  )
}

export default function EntiWinPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = useCopy(COPY)

  return (
    <main className="overflow-x-hidden bg-white font-inter text-ew-ink-700">
      {/* HERO */}
      <section data-cta-location="hero" className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-[calc(82px+2.5rem)] sm:px-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)] lg:px-8 lg:pb-20 lg:pt-[calc(82px+4rem)]">
          <div>
            {/* Signature du produit, comme l'en-tête d'Enti Win. */}
            <p className="flex items-center gap-2.5 text-ew-navy-900">
              <EntiWinMark className="h-8 w-8" />
              <span className="text-[21px] font-bold tracking-tight">ENTI WiN</span>
            </p>

            {/* Un seul texte : sur mobile, il passe à la ligne d'un bloc. */}
            <p className="mt-5 inline-flex items-start gap-2 rounded-2xl bg-ew-green-50 px-4 py-1.5 text-[13px] font-semibold leading-snug text-ew-green-700 ring-1 ring-ew-green-100 sm:items-center sm:rounded-full">
              <Sparkles size={16} className="mt-px shrink-0 text-ew-green-500 sm:mt-0" aria-hidden="true" />
              <span>
                <span className="font-bold text-ew-navy-900">ENTI WIN</span> — {t.product}
              </span>
            </p>

            <h1 className="mt-4 text-[clamp(2.25rem,4.6vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ew-navy-900">
              {t.title}
              <br className="hidden lg:block" /> {t.accent}
            </h1>
            <p className="mt-5 max-w-[48ch] text-[clamp(1rem,1.1vw,1.1rem)] leading-[1.6] text-ew-ink-500">{t.lead}</p>

            <div className="mt-7 flex flex-col gap-3.5 sm:flex-row">
              <LaunchButton content="hero" label={t.launch} newTab={t.newTab} />
              <a
                href="#fonctionnement"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-ew-line bg-white px-6 py-3.5 text-[15px] font-semibold text-ew-navy-900 transition-colors hover:border-ew-navy-200 hover:bg-ew-navy-50"
              >
                <PlayCircle size={20} className="text-ew-navy-800" aria-hidden="true" />
                {t.how}
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-3 text-sm font-medium text-ew-ink-700">
              {t.highlights.map((label, i) => {
                const Icon = HIGHLIGHT_ICONS[i]
                return (
                  <li key={label} className="flex items-center gap-2.5">
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ew-green-50 text-ew-green-500 ring-1 ring-ew-green-100">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      {label}
                    </span>
                    {i < t.highlights.length - 1 && (
                      <span aria-hidden="true" className="hidden h-1.5 w-1.5 rounded-full bg-ew-green-400 sm:block" />
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <AnalysisVisual t={t.visual} />
        </div>
      </section>

      {/* CONSTAT */}
      <section className="border-t border-ew-line bg-ew-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8 lg:py-20">
          <div>
            <Eyebrow>{t.problem.eyebrow}</Eyebrow>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-ew-navy-900">{t.problem.title}</h2>
          </div>
          <div className="space-y-4 text-base leading-8 text-ew-ink-500 lg:text-lg">
            <p>{t.problem.text}</p>
            <p>
              <strong className="font-semibold text-ew-navy-900">{t.problem.strong}</strong> {t.problem.end}
            </p>
          </div>
        </div>
      </section>

      {/* PARCOURS — cible du bouton « Voir comment ça marche » du hero.
          La section « Trois étapes » qui la précédait a été retirée : elle
          redisait ce parcours en plus court et prêtait à confusion. */}
      {/* Pas de scroll-mt : le scroll-padding-top global (globals.css)
          dégage déjà la barre de navigation fixe. */}
      <section id="fonctionnement" className="border-t border-ew-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionTitle eyebrow={t.journey.eyebrow} title={t.journey.title} lead={t.journey.lead} />

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
            <ol className="relative ml-4 space-y-6 border-l-2 border-ew-navy-100 pl-8">
              {t.journey.items.map((step, i) => (
                <li key={step.title} className="relative">
                  <span className="absolute -left-[49px] flex h-8 w-8 items-center justify-center rounded-full bg-ew-navy-800 text-sm font-bold text-white ring-4 ring-white">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-ew-navy-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ew-ink-500">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="rounded-2xl border border-ew-line bg-ew-surface p-6">
              <h3 className="text-base font-bold text-ew-navy-900">{t.journey.pipelineTitle}</h3>
              <p className="mt-1 text-sm text-ew-ink-500">{t.journey.pipelineLead}</p>
              <ul className="mt-5 space-y-3">
                {t.journey.pipeline.map((step) => (
                  <li key={step} className="flex items-center gap-3 text-sm text-ew-ink-700">
                    <CheckPill />
                    {step}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-ew-line pt-4 text-[13px] text-ew-ink-500">{t.journey.pipelineNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS & RAPPORT */}
      <section className="border-t border-ew-line bg-ew-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="rounded-2xl border border-ew-line bg-white p-6 shadow-sm shadow-ew-navy-900/5 sm:p-8">
            <Eyebrow>{t.documents.eyebrow}</Eyebrow>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-ew-navy-900">{t.documents.title}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {ENTIWIN_DOCUMENTS[locale].map((doc) => (
                <li key={doc} className="flex items-start gap-2.5 text-sm text-ew-ink-700">
                  <CheckPill />
                  {doc}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {ENTIWIN_FORMATS.map((format) => (
                <span
                  key={format}
                  className="rounded-md bg-ew-navy-50 px-2.5 py-1 text-xs font-semibold text-ew-navy-800 ring-1 ring-ew-navy-100"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-ew-line bg-white p-6 shadow-sm shadow-ew-navy-900/5 sm:p-8">
            <Eyebrow>{t.report.eyebrow}</Eyebrow>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-ew-navy-900">{t.report.title}</h2>
            <ul className="mt-6 space-y-4">
              {t.report.items.map((result, i) => {
                const tone = RESULT_TONES[i]
                const Icon = tone.icon
                return (
                  <li key={result.title} className="flex gap-3">
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${tone.badge}`}>
                      <Icon size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-ew-navy-900">{result.title}</p>
                      <p className="text-sm text-ew-ink-500">{result.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="mt-6 rounded-xl bg-ew-surface p-4 text-sm text-ew-ink-500 ring-1 ring-ew-line">
              {t.report.note[0]}
              <strong className="text-ew-navy-900">{t.report.note[1]}</strong>
              {t.report.note[2]}
              <strong className="text-ew-navy-900">{t.report.note[3]}</strong>
              {t.report.note[4]}
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPES */}
      <section className="border-t border-ew-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionTitle eyebrow={t.principles.eyebrow} title={t.principles.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.principles.items.map(({ title, text }, i) => {
              const Icon = PRINCIPLE_ICONS[i]
              return (
                <div key={title} className="rounded-2xl border border-ew-line bg-white p-6 shadow-sm shadow-ew-navy-900/5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ew-green-50 text-ew-green-600 ring-1 ring-ew-green-100">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-ew-navy-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ew-ink-500">{text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className="border-t border-ew-line bg-gradient-to-b from-ew-green-50/70 to-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <Eyebrow>{t.audience.eyebrow}</Eyebrow>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-ew-navy-900">{t.audience.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-ew-ink-500">{t.audience.text}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.audience.roles.map((role) => (
              <li
                key={role}
                className="flex items-center gap-3 rounded-xl border border-ew-line bg-white px-4 py-3 text-sm font-medium text-ew-ink-700"
              >
                <CheckPill />
                {role}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* APPEL FINAL — bandeau marine d'Enti Win : filet vert, halos, signature */}
      <section data-cta-location="cta_band" className="relative overflow-hidden bg-ew-navy-950">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ew-green-400 to-transparent" />
        {/* Halos en dégradé radial plutôt qu'en flou (coût de peinture). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(18,161,80,0.16),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(30,58,115,0.45),transparent)]"
        />

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
          {/* Signature : « ENTI WiN · Une solution Industry X.0 ». */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2.5 text-left text-white">
              <EntiWinMark className="h-9 w-9" />
              <div>
                <p className="text-xl font-extrabold tracking-tight">ENTI WiN</p>
                <p className="text-[13px] text-white/60">{t.tagline}</p>
              </div>
            </div>
            <span aria-hidden="true" className="hidden h-8 w-px bg-white/15 sm:block" />
            <span className="flex items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{t.cta.solution}</span>
              <Image src="/logo.png" alt="Industry X.0" width={8625} height={3202} sizes="140px" className="h-auto w-[140px]" />
            </span>
          </div>

          <h2 className="mt-10 text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl">{t.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">{t.cta.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
            <LaunchButton content="footer" label={t.launch} newTab={t.newTab} onDark />
            <Link
              href={ROUTES.demo}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
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
