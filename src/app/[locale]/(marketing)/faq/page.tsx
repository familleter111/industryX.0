'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  MonitorPlay,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'

import SectionHeading from '@/components/ui/SectionHeading'
import { viewport } from '@/lib/motion'
import Footer from '@/components/layout/Footer'
import { useCopy } from '@/lib/i18n'

/* ============================================================
   DONNÉES
   ============================================================ */

const HIGHLIGHT_ICONS = [MonitorPlay, Users, TrendingUp]

const COPY = {
  fr: {
    highlights: [
      ['Démo adaptée à votre contexte', 'Une démonstration guidée centrée sur vos enjeux, vos priorités et votre secteur industriel.'],
      ['Accompagnement au déploiement', 'Un expert dédié vous accompagne à chaque étape, du cadrage au passage à l’échelle.'],
      ['Approche progressive par pilote', 'Démarrer petit, prouver la valeur rapidement et industrialiser avec confiance.'],
    ],
    faqs: [
      {
        question: 'Combien de temps dure une démonstration CIPA ?',
        answer:
          'La démonstration CIPA dure en moyenne 45 minutes. Elle est entièrement guidée par un expert Industry X.0 et adaptée à votre secteur, vos enjeux et vos priorités. Vous repartez avec une vision claire de la valeur que CIPA peut apporter à vos opérations industrielles.',
      },
      {
        question: 'CIPA s’intègre-t-elle à nos outils existants ?',
        answer:
          'Oui. CIPA se connecte à votre écosystème existant — ERP, MES, GMAO, outils de BI et bases de données métier — pour éviter les doubles saisies et conserver une source de vérité unique. Les échanges se font par API ou par connecteurs dédiés, définis pendant la phase de cadrage.',
      },
      {
        question: 'Proposez-vous un accompagnement au déploiement ?',
        answer:
          'Oui. Un expert dédié vous accompagne du cadrage initial jusqu’à la pleine maîtrise de la plateforme : paramétrage des processus, formation des équipes terrain, conduite du changement et suivi des premiers résultats.',
      },
      {
        question: 'Quels secteurs industriels sont couverts ?',
        answer:
          'CIPA est déployée dans la pharmaceutique, l’agroalimentaire et les boissons, la cosmétique et les dispositifs médicaux, l’automobile et les composants, l’électronique et le câblage, ainsi que le packaging et la plasturgie. La plateforme s’adapte aux référentiels et exigences propres à chaque secteur.',
      },
      {
        question: 'Combien de temps avant un premier déploiement pilote ?',
        answer:
          'Un premier périmètre pilote est généralement opérationnel en quelques semaines. Nous démarrons sur un processus à forte valeur — audits, inspections, non-conformités ou contrôles production — afin de démontrer l’impact rapidement avant d’étendre progressivement à l’ensemble du site.',
      },
    ],
    photoAlt: 'Équipes terrain utilisant CIPA sur tablette',
    panelEyebrow: 'Avant votre démo',
    panelTitle: 'Ce que vous pouvez attendre de nous.',
    confidential: 'Échanges confidentiels — aucune information n’est partagée sans votre accord.',
    notListed: 'Votre question n’est pas dans la liste ?',
    ask: 'Poser votre question',
    title: 'Questions',
    accent: 'fréquentes',
    subtitle: 'Des réponses claires pour avancer en toute confiance vers vos opérations industrielles performantes.',
  },
  en: {
    highlights: [
      ['A demo tailored to your context', 'A guided demo focused on your challenges, your priorities and your industry.'],
      ['Deployment support', 'A dedicated expert supports you at every step, from scoping to scale-up.'],
      ['A step-by-step pilot approach', 'Start small, prove the value quickly and scale with confidence.'],
    ],
    faqs: [
      {
        question: 'How long does a CIPA demo take?',
        answer:
          'A CIPA demo lasts about 45 minutes on average. It is fully guided by an Industry X.0 expert and tailored to your industry, your challenges and your priorities. You leave with a clear view of the value CIPA can bring to your industrial operations.',
      },
      {
        question: 'Does CIPA integrate with our existing tools?',
        answer:
          'Yes. CIPA connects to your existing ecosystem — ERP, MES, CMMS, BI tools and business databases — to avoid double entry and keep a single source of truth. Data is exchanged through APIs or dedicated connectors, defined during the scoping phase.',
      },
      {
        question: 'Do you offer deployment support?',
        answer:
          'Yes. A dedicated expert supports you from initial scoping until you fully master the platform: process configuration, training for shop-floor teams, change management and follow-up of the first results.',
      },
      {
        question: 'Which industries are covered?',
        answer:
          'CIPA is deployed in pharmaceuticals, food and beverage, cosmetics and medical devices, automotive and components, electronics and wiring, and packaging and plastics. The platform adapts to the standards and requirements specific to each industry.',
      },
      {
        question: 'How long until a first pilot deployment?',
        answer:
          'A first pilot scope is usually up and running within a few weeks. We start with a high-value process — audits, inspections, non-conformities or production checks — to show the impact quickly before gradually extending to the whole site.',
      },
    ],
    photoAlt: 'Shop-floor teams using CIPA on a tablet',
    panelEyebrow: 'Before your demo',
    panelTitle: 'What you can expect from us.',
    confidential: 'Confidential conversations — no information is shared without your consent.',
    notListed: 'Is your question not on the list?',
    ask: 'Ask your question',
    title: 'Frequently asked',
    accent: 'questions',
    subtitle: 'Clear answers to move forward with confidence toward high-performing industrial operations.',
  },
}

/* ============================================================
   PANNEAU DE GAUCHE

   Un seul bloc sombre au lieu de trois cartes blanches. Trois raisons :
   les trois photos, recadrées chacune à sa façon, se contredisaient
   visuellement ; des cartes blanches sur fond crème face à un accordéon blanc
   n'offraient aucun contraste ; et surtout ce bloc unique peut absorber la
   hauteur qui lui manque dans sa photo (`flex-1`), ce qui aligne exactement
   les deux colonnes quel que soit l'état de l'accordéon.

   Le noir #0C0D12 est celui des blocs sombres de /partners et /team : ce
   n'est pas une couleur inventée pour cette page.
   ============================================================ */

function HighlightsPanel() {
  const t = useCopy(COPY)
  const HIGHLIGHTS = HIGHLIGHT_ICONS.map((icon, i) => ({ icon, title: t.highlights[i][0], desc: t.highlights[i][1] }))
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="order-2 flex h-full flex-col overflow-hidden rounded-[28px] bg-[#0C0D12] shadow-[0_28px_70px_rgba(15,23,42,0.20)] lg:order-1"
    >
      {/* PHOTO — c'est elle qui s'étire pour égaliser les deux colonnes */}
      <div className="relative min-h-[210px] flex-1 sm:min-h-[240px] lg:min-h-[150px]">
        <Image
          src="/c1%20(4).png"
          alt={t.photoAlt}
          fill
          sizes="(min-width: 1024px) 480px, 100vw"
          className="object-cover object-[50%_30%]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0C0D12] via-[#0C0D12]/55 to-[#0C0D12]/10"
        />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
            {t.panelEyebrow}
          </p>

          <p className="mt-3 max-w-sm font-display text-[20px] font-black leading-[1.15] tracking-[-0.03em] text-white sm:text-[23px]">
            {t.panelTitle}
          </p>
        </div>
      </div>

      {/* TROIS POINTS CLÉS */}
      <ul className="divide-y divide-white/[0.07] px-6 sm:px-7">
        {HIGHLIGHTS.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.title} className="flex items-start gap-4 py-5 lg:py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/[0.08] text-gold">
                <Icon size={18} strokeWidth={1.9} />
              </span>

              <div className="min-w-0">
                <h3 className="text-[14.5px] font-bold tracking-[-0.01em] text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-[1.65] text-white/50">
                  {item.desc}
                </p>
              </div>
            </li>
          )
        })}
      </ul>

      {/* CONFIDENTIALITÉ — l'ancien bandeau isolé, rapatrié là où il a du sens */}
      <div className="flex items-center gap-3 border-t border-white/[0.07] px-6 py-4 sm:px-7">
        <ShieldCheck size={16} className="shrink-0 text-gold" />
        <p className="text-[11.5px] leading-[1.6] text-white/50">
          {t.confidential}
        </p>
      </div>
    </motion.aside>
  )
}

/* ============================================================
   ACCORDÉON

   Restylé : une seule carte, des questions séparées par un filet, au lieu de
   cinq boîtes bordées empilées dans une sixième — c'est cet emboîtement qui
   alourdissait la page. La question ouverte se signale par un fond crème et
   un liseré doré à gauche, pas par une bordure supplémentaire.

   Le pied de carte est en `mt-auto` : si l'accordéon est plus court que le
   panneau de gauche, c'est lui qui absorbe la différence.
   ============================================================ */

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const t = useCopy(COPY)
  const FAQS = t.faqs

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="order-1 flex h-full flex-col overflow-hidden rounded-[28px] border border-[#EDEAE3] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)] lg:order-2"
    >
      <div className="divide-y divide-[#F0EDE6]">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index
          const buttonId = `faq-question-${index}`
          const panelId = `faq-answer-${index}`

          return (
            <div
              key={faq.question}
              className={`relative transition-colors duration-300 ${
                isOpen ? 'bg-[#FCF9F2]' : 'bg-white hover:bg-[#FAFAF8]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 w-[3px] bg-gold transition-opacity duration-300 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/50 sm:gap-5 sm:px-7 sm:py-[22px] lg:py-4"
                >
                  <span
                    className={`shrink-0 font-display text-[13px] font-black tabular-nums tracking-[0.02em] transition-colors duration-300 ${
                      isOpen ? 'text-gold' : 'text-[#C7C2B8]'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="min-w-0 flex-1 text-pretty text-[14.5px] font-bold leading-snug tracking-[-0.015em] text-[#111827] sm:text-[15.5px]">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-gold/15 text-gold-ink'
                        : 'bg-[#F5F4F1] text-subtle'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={panelId}
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-6 pl-[46px] text-[13.5px] leading-[1.75] text-[#57534E] sm:px-7 sm:pb-7 sm:pl-[64px] sm:text-[14.5px] lg:pb-5">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* PIED — absorbe l'écart de hauteur avec le panneau de gauche */}
      <div className="mt-auto flex flex-col gap-4 border-t border-[#F0EDE6] bg-[#FDFCF9] px-5 py-5 lg:py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="text-[13.5px] leading-[1.6] text-[#57534E]">
          {t.notListed}
        </p>

        <Link
          href="/contact"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0C0D12] px-5 py-3 text-[13.5px] font-bold text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
        >
          {t.ask}
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function FaqPage() {
  const t = useCopy(COPY)
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FDFBF6] font-body text-dark selection:bg-gold/30">

      {/* Sur desktop, titre et colonnes tiennent dans un ecran de ~1080 px :
          navbar 82 + marge 30, titre ~155, ecart 40, colonnes ~520. */}
      <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-20 lg:pt-[112px]">
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-gold/[0.06] blur-[120px]" />
        <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-gold/[0.04] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-7 lg:px-8">
          <SectionHeading
            title={t.title}
            accent={t.accent}
            subtitle={t.subtitle}
          />

          {/* `items-stretch` (défaut) + `h-full` sur les deux enfants : les
              colonnes font exactement la même hauteur, la photo à gauche et le
              pied de carte à droite absorbant chacun leur écart. Sur mobile
              l'accordéon passe en premier — c'est l'objet de la page. */}
          <div className="mt-12 grid gap-5 lg:mt-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-6">
            <HighlightsPanel />
            <FaqAccordion />
          </div>
        </div>
      </section>

      <Footer />

    </main>
  )
}
