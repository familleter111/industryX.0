'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  MonitorPlay,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionHeading from '@/components/ui/SectionHeading'

/* ============================================================
   DONNÉES
   ============================================================ */

const HIGHLIGHTS = [
  {
    icon: MonitorPlay,
    title: 'Démo adaptée à votre contexte',
    desc: 'Une démonstration guidée centrée sur vos enjeux, vos priorités et votre secteur industriel.',
  },
  {
    icon: Users,
    title: 'Accompagnement au déploiement',
    desc: 'Un expert dédié vous accompagne à chaque étape, du cadrage au passage à l’échelle.',
  },
  {
    icon: TrendingUp,
    title: 'Approche progressive par pilote',
    desc: 'Démarrer petit, prouver la valeur rapidement et industrialiser avec confiance.',
  },
]

const FAQS = [
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
]

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
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="order-2 flex h-full flex-col overflow-hidden rounded-[28px] bg-[#0C0D12] shadow-[0_28px_70px_rgba(15,23,42,0.20)] lg:order-1"
    >
      {/* PHOTO — c'est elle qui s'étire pour égaliser les deux colonnes */}
      <div className="relative min-h-[210px] flex-1 sm:min-h-[240px] lg:min-h-[180px]">
        <Image
          src="/c1%20(4).png"
          alt="Équipes terrain utilisant CIPA sur tablette"
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
            Avant votre démo
          </p>

          <p className="mt-3 max-w-sm font-display text-[20px] font-black leading-[1.15] tracking-[-0.03em] text-white sm:text-[23px]">
            Ce que vous pouvez attendre de nous.
          </p>
        </div>
      </div>

      {/* TROIS POINTS CLÉS */}
      <ul className="divide-y divide-white/[0.07] px-6 sm:px-7">
        {HIGHLIGHTS.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.title} className="flex items-start gap-4 py-5">
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
        <p className="text-[11.5px] leading-[1.6] text-white/45">
          Échanges confidentiels — aucune information n’est partagée sans votre
          accord.
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
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
                  className="flex w-full items-center gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/50 sm:gap-5 sm:px-7 sm:py-[22px]"
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
                        ? 'rotate-180 bg-gold/15 text-[#B6842B]'
                        : 'bg-[#F5F4F1] text-[#A8A29E]'
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
                    <p className="px-5 pb-6 pl-[46px] text-[13.5px] leading-[1.75] text-[#57534E] sm:px-7 sm:pb-7 sm:pl-[64px] sm:text-[14.5px]">
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
      <div className="mt-auto flex flex-col gap-4 border-t border-[#F0EDE6] bg-[#FDFCF9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="text-[13.5px] leading-[1.6] text-[#57534E]">
          Votre question n’est pas dans la liste ?
        </p>

        <Link
          href="/contact"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0C0D12] px-5 py-3 text-[13.5px] font-bold text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
        >
          Poser votre question
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
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FDFBF6] font-body text-dark selection:bg-gold/30">
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-gold/[0.06] blur-[120px]" />
        <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-gold/[0.04] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-7 lg:px-8">
          <SectionHeading
            title="Questions"
            accent="fréquentes"
            subtitle="Des réponses claires pour avancer en toute confiance vers vos opérations industrielles performantes."
          />

          {/* `items-stretch` (défaut) + `h-full` sur les deux enfants : les
              colonnes font exactement la même hauteur, la photo à gauche et le
              pied de carte à droite absorbant chacun leur écart. Sur mobile
              l'accordéon passe en premier — c'est l'objet de la page. */}
          <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-6">
            <HighlightsPanel />
            <FaqAccordion />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
