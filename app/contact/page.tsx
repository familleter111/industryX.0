'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock4,
  ClipboardCheck,
  Crosshair,
  Info,
  LineChart,
  Loader2,
  Lock,
  MessageSquare,
  Presentation,
  ShieldCheck,
  Users,
  UserSearch,
  Zap,
} from 'lucide-react'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SectionBadge } from '@/components/ui/SectionHeading'
import { CLIENT_LOGOS, logoFrameWidth } from '@/lib/data/clientLogos'

/* ============================================================
   DONNÉES STATIQUES
   ============================================================ */

// Logos clients — voir components/clientLogos.ts (source unique, /public/logos)

const PROMISES = [
  {
    icon: LineChart,
    title: 'Démo personnalisée',
    desc: 'Adaptée à vos enjeux',
  },
  {
    icon: Clock4,
    title: 'Réponse en 24h',
    desc: 'Un expert vous recontacte',
  },
  {
    icon: Users,
    title: 'Accompagnement métier',
    desc: 'De l’analyse à la réussite',
  },
]

const INDUSTRIES = [
  'Pharmaceutique',
  'Agroalimentaire & boissons',
  'Cosmétique & dispositifs médicaux',
  'Automobile & composants',
  'Électronique & câblage',
  'Packaging & plasturgie',
  'Chimie',
  'Distribution & logistique',
  'Autre secteur',
]

const STEPS = [
  {
    num: '01',
    icon: UserSearch,
    title: 'Qualification',
    desc: 'Identification des enjeux terrain, qualité, production, maintenance.',
  },
  {
    num: '02',
    icon: Presentation,
    title: 'Démonstration ciblée',
    desc: 'Présentation des cas d’usage CIPA adaptés au contexte du client.',
  },
  {
    num: '03',
    icon: Crosshair,
    title: 'Cadrage',
    desc: 'Priorités, périmètre pilote, données, intégrations.',
  },
  {
    num: '04',
    icon: ClipboardCheck,
    title: 'Plan d’action',
    desc: 'Proposition de déploiement progressive et orientée valeur.',
  },
]

const IMPACT_STATS = [
  { value: '92%', label: 'Projets livrés dans les délais' },
  { value: '-28%', label: 'Arrêts non planifiés en moyenne' },
  { value: '+18%', label: 'Performance opérationnelle' },
]

const ENGAGEMENTS = [
  {
    icon: Zap,
    title: 'Réponse rapide',
    desc: 'Sous 24h ouvrées',
  },
  {
    icon: Users,
    title: 'Approche métier',
    desc: 'Alignée sur vos enjeux',
  },
  {
    icon: ShieldCheck,
    title: 'Vision Ops + Quality',
    desc: 'Du terrain à la décision',
  },
]

const MESSAGE_MAX = 1000

/* ============================================================
   FORMULAIRE
   ============================================================ */

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  industry: string
  message: string
  consent: boolean
}

const EMPTY_FORM: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  industry: '',
  message: '',
  consent: false,
}

const inputBase =
  'w-full rounded-xl border bg-white px-4 text-[14px] text-[#1C1917] outline-none transition-all duration-200 placeholder:text-[#A8A29E] focus:border-gold focus:ring-4 focus:ring-gold/10'

function FieldLabel({
  htmlFor,
  children,
  required = true,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[12.5px] font-semibold tracking-[-0.01em] text-[#292524] sm:text-[13px]"
    >
      {children}
      {required && <span className="ml-0.5 text-[#DC2626]">*</span>}
    </label>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1.5 text-[12px] font-medium text-[#DC2626]">{message}</p>
  )
}

function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {}

    if (!form.firstName.trim()) next.firstName = 'Prénom requis'
    if (!form.lastName.trim()) next.lastName = 'Nom requis'
    if (!form.email.trim()) next.email = 'Email requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = 'Adresse email invalide'
    if (!form.company.trim()) next.company = 'Société requise'
    if (!form.industry) next.industry = 'Sélectionnez votre industrie'
    if (!form.message.trim()) next.message = 'Message requis'
    if (!form.consent)
      next.consent = 'Merci d’accepter le traitement de vos données'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    if (!validate()) return

    setStatus('sending')

    // TODO — brancher ici l’endpoint réel (route API /api/contact ou CRM).
    await new Promise((resolve) => setTimeout(resolve, 900))

    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center px-2 text-center sm:min-h-[500px]">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#111827] text-gold">
          <CheckCircle2 size={28} />
        </div>

        <h3 className="mt-6 font-display text-[20px] font-black tracking-[-0.03em] text-[#111827] sm:text-[22px]">
          Demande bien reçue
        </h3>

        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#57534E]">
          Merci {form.firstName.trim()} — un expert Industry X.0 revient vers
          vous sous 24h pour organiser votre démonstration CIPA.
        </p>

        <button
          type="button"
          onClick={() => {
            setForm(EMPTY_FORM)
            setStatus('idle')
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] px-5 py-2.5 text-[13px] font-semibold text-[#44403C] transition-all duration-300 hover:border-gold/40 hover:text-[#111827]"
        >
          Envoyer une autre demande
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-5 lg:mt-6">
      {/* PRÉNOM / NOM */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="firstName">Prénom</FieldLabel>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Votre prénom"
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className={`${inputBase} h-11 ${
              errors.firstName ? 'border-[#DC2626]' : 'border-[#E7E5E4]'
            }`}
          />
          <FieldError message={errors.firstName} />
        </div>

        <div>
          <FieldLabel htmlFor="lastName">Nom</FieldLabel>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Votre nom"
            value={form.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className={`${inputBase} h-11 ${
              errors.lastName ? 'border-[#DC2626]' : 'border-[#E7E5E4]'
            }`}
          />
          <FieldError message={errors.lastName} />
        </div>
      </div>

      {/* EMAIL / TÉLÉPHONE */}
      <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="exemple@entreprise.com"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={`${inputBase} h-11 ${
              errors.email ? 'border-[#DC2626]' : 'border-[#E7E5E4]'
            }`}
          />
          <FieldError message={errors.email} />
        </div>

        <div>
          <FieldLabel htmlFor="phone" required={false}>
            Téléphone
          </FieldLabel>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+33 6 12 34 56 78"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={`${inputBase} h-11 border-[#E7E5E4]`}
          />
        </div>
      </div>

      {/* SOCIÉTÉ */}
      <div className="mt-3.5">
        <FieldLabel htmlFor="company">Société</FieldLabel>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Nom de votre entreprise"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
          className={`${inputBase} h-11 ${
            errors.company ? 'border-[#DC2626]' : 'border-[#E7E5E4]'
          }`}
        />
        <FieldError message={errors.company} />
      </div>

      {/* INDUSTRIE */}
      <div className="mt-3.5">
        <FieldLabel htmlFor="industry">Industrie</FieldLabel>
        <div className="relative">
          <select
            id="industry"
            name="industry"
            value={form.industry}
            onChange={(e) => update('industry', e.target.value)}
            className={`${inputBase} h-11 appearance-none pr-11 ${
              form.industry ? 'text-[#1C1917]' : 'text-[#A8A29E]'
            } ${errors.industry ? 'border-[#DC2626]' : 'border-[#E7E5E4]'}`}
          >
            <option value="">Sélectionnez votre industrie</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E]"
          />
        </div>
        <FieldError message={errors.industry} />
      </div>

      {/* MESSAGE */}
      <div className="mt-3.5">
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={MESSAGE_MAX}
            placeholder="Parlez-nous de vos enjeux, projets ou objectifs."
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            className={`${inputBase} min-h-[88px] resize-y py-3 pb-8 leading-relaxed lg:min-h-[96px] ${
              errors.message ? 'border-[#DC2626]' : 'border-[#E7E5E4]'
            }`}
          />

          <span className="pointer-events-none absolute bottom-2.5 right-4 text-[11px] font-medium text-[#A8A29E]">
            {form.message.length} / {MESSAGE_MAX}
          </span>
        </div>
        <FieldError message={errors.message} />
      </div>

      {/* CONSENTEMENT */}
      <div className="mt-4">
        <div className="flex gap-3">
          <button
            type="button"
            role="checkbox"
            aria-checked={form.consent}
            aria-labelledby="consent-label"
            onClick={() => update('consent', !form.consent)}
            className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-all duration-200 ${
              form.consent
                ? 'border-[#111827] bg-[#111827] text-white'
                : errors.consent
                  ? 'border-[#DC2626] bg-white'
                  : 'border-[#D6D3D1] bg-white hover:border-gold'
            }`}
          >
            {form.consent && <Check size={12} strokeWidth={3.2} />}
          </button>

          <p
            id="consent-label"
            className="text-[12.5px] leading-relaxed text-[#57534E] sm:text-[13px]"
          >
            J’accepte que Industry X.0 collecte et traite mes données pour
            répondre à ma demande. Voir notre{' '}
            <Link
              href="/privacy"
              className="font-medium text-[#B6842B] underline-offset-2 hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
        <FieldError message={errors.consent} />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#111827] px-5 py-3.5 text-[14px] font-bold tracking-[-0.01em] text-white shadow-[0_16px_40px_rgba(17,24,39,0.20)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black disabled:cursor-not-allowed disabled:opacity-70 sm:text-[15px]"
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            Planifier une démonstration
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </>
        )}
      </button>

      <div className="mt-3.5 flex items-center justify-center gap-2 text-center text-[12px] text-[#78716C] sm:text-[12.5px]">
        <ShieldCheck size={15} className="shrink-0 text-[#A8A29E]" />
        Vos données sont sécurisées et 100% confidentielles.
      </div>
    </form>
  )
}

/* ============================================================
   SECTION SOMBRE — « CE QUI SE PASSE APRÈS »
   ============================================================ */

/** Courbe « Impact attendu » — SVG statique, 6 points Jan → Juin. */
function ImpactChart() {
  const points = [24, 50, 44, 66, 63, 78, 72, 100]
  const width = 260
  const height = 120
  const stepX = width / (points.length - 1)

  const coords = points.map((value, index) => ({
    x: index * stepX,
    y: height - (value / 100) * height,
  }))

  const line = coords
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const area = `${line} L ${width} ${height} L 0 ${height} Z`

  return (
    <div className="flex min-w-0 flex-1 gap-2">
      {/* axe Y */}
      <div className="flex flex-col justify-between py-[2px] text-[9px] font-medium text-white/35">
        {['100%', '75%', '50%', '25%', '0%'].map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-[110px] w-full"
          role="img"
          aria-label="Courbe de progression de la performance de janvier à juin"
        >
          <defs>
            <linearGradient id="impactFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DAA250" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#DAA250" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1="0"
              x2={width}
              y1={ratio * height}
              y2={ratio * height}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path d={area} fill="url(#impactFill)" />
          <path
            d={line}
            fill="none"
            stroke="#DAA250"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={coords[coords.length - 1].x}
            cy={coords[coords.length - 1].y}
            r="4"
            fill="#FFFFFF"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="mt-2 flex justify-between text-[9px] font-medium text-white/35">
          {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function AfterContactSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0C] py-16 sm:py-20 lg:py-24">
      {/* photo de fond */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block">
        <Image
          src="/c1%20(1).png"
          alt=""
          aria-hidden="true"
          fill
          sizes="50vw"
          className="object-cover opacity-45"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #0A0A0C 8%, rgba(10,10,12,0.72) 45%, rgba(10,10,12,0.45) 100%)',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full"
        style={{ background: 'rgba(218,162,80,0.07)', filter: 'blur(120px)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1380px] px-5 sm:px-7 lg:px-8">
        {/* EN-TÊTE */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <SectionBadge tone="dark" />

          <h2 className="mt-6 max-w-3xl font-display text-[28px] font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-[38px] lg:text-[48px]">
            Ce qui se passe après votre{' '}
            <span className="text-gold">prise de contact</span>
          </h2>

          <p className="mt-5 max-w-xl text-[14px] leading-[1.7] text-white/55 sm:text-[15px]">
            Nous transformons votre échange en un plan d’actions structuré,
            concret et orienté impact opérationnel.
          </p>
        </motion.div>

        {/* 4 ÉTAPES */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-10">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                {/* connecteur */}
                {index < STEPS.length - 1 && (
                  <div className="pointer-events-none absolute left-full top-1/2 hidden h-px w-10 -translate-y-1/2 bg-gold/35 lg:block">
                    <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
                  </div>
                )}

                <div className="relative h-full overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.03] p-6 pb-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-gold/25 hover:bg-white/[0.05]">
                  {/* numéro */}
                  <span className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-gold/35 text-[11px] font-bold text-gold">
                    {step.num}
                  </span>

                  <div className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.05] text-gold">
                    <Icon size={28} strokeWidth={1.6} />
                  </div>

                  <h3 className="mt-6 text-[17px] font-bold tracking-[-0.02em] text-white sm:text-[18px]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-[13px] leading-[1.65] text-white/50">
                    {step.desc}
                  </p>

                  <span className="absolute bottom-0 left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-t-full bg-gold" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* BAS DE SECTION */}
        <div className="mt-6 grid gap-5 lg:mt-8 lg:grid-cols-2">
          {/* IMPACT ATTENDU */}
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-bold text-white">
                Impact attendu
              </h3>
              <Info size={14} className="text-gold/70" />
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="grid grid-cols-3 gap-4 lg:w-[58%] lg:shrink-0">
                {IMPACT_STATS.map((stat, index) => (
                  <div
                    key={stat.value}
                    className={
                      index > 0 ? 'border-l border-white/[0.08] pl-4' : ''
                    }
                  >
                    <p className="font-display text-[24px] font-black leading-none tracking-[-0.04em] text-gold sm:text-[28px]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[11.5px] leading-[1.45] text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <ImpactChart />
            </div>
          </div>

          {/* ENGAGEMENTS + CTA */}
          <div className="flex flex-col gap-5">
            <div className="grid gap-5 rounded-[26px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm sm:grid-cols-3 sm:gap-0">
              {ENGAGEMENTS.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className={`flex items-center gap-3 ${
                      index > 0 ? 'sm:border-l sm:border-white/[0.08] sm:pl-4' : ''
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.08] text-gold">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[13.5px] font-bold text-white">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[11.5px] text-white/45">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Le bouton occupe toute la largeur : c'est la seule action de la
                section, l'aperçu produit qui l'accompagnait ne faisait que la
                rétrécir. */}
            <div>
              <a
                href="#contact-form"
                className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gold px-6 py-4 text-[15px] font-bold tracking-[-0.01em] text-[#0C0D12] shadow-[0_18px_45px_rgba(218,162,80,0.28)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-gold-400"
              >
                Décrire mon projet
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-white/45">
                <Lock size={14} className="shrink-0" />
                Vos données sont sécurisées et 100% confidentielles.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   BANDEAU « ILS NOUS FONT CONFIANCE »

   Les 21 clients ne tiennent pas dans le hero, et une liste figée en montre
   toujours les cinq mêmes. Le bandeau affiche donc quatre pastilles et fait
   défiler la liste entière par groupes de quatre, en boucle.

   La fenêtre avance de 4 à chaque tour et repart à zéro par modulo : 21 n'étant
   pas multiple de 4, les groupes se décalent d'un tour à l'autre — chaque logo
   finit par apparaître à chaque position, et on ne revoit jamais deux fois la
   même composition d'affilée.

   Deux garde-fous d'accessibilité : la rotation s'arrête au survol et au focus
   clavier, et ne démarre pas du tout sous `prefers-reduced-motion` (les quatre
   premiers logos restent alors affichés).
   ============================================================ */

const TRUST_WINDOW = 4
const TRUST_INTERVAL = 3400

function TrustStrip() {
  const [start, setStart] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const id = window.setInterval(() => {
      setStart((current) => (current + TRUST_WINDOW) % CLIENT_LOGOS.length)
    }, TRUST_INTERVAL)

    return () => window.clearInterval(id)
  }, [paused])

  const visible = Array.from(
    { length: TRUST_WINDOW },
    (_, offset) => CLIENT_LOGOS[(start + offset) % CLIENT_LOGOS.length]
  )

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="-mx-5 mt-2.5 flex snap-x gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:overflow-visible sm:px-0"
    >
      {visible.map((logo, slot) => (
        <div
          key={slot}
          className="relative flex h-[60px] w-[116px] shrink-0 snap-start items-center justify-center overflow-hidden rounded-full border border-[#EFEDE8] bg-white px-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-[1px] hover:border-gold/30 sm:h-[64px] sm:w-[122px]"
        >
          {/* `mode="wait"` ferait clignoter la pastille : on laisse les deux
              logos se croiser en absolu, le sortant s'efface pendant que le
              suivant monte. */}
          <AnimatePresence initial={false}>
            <motion.span
              key={logo.src}
              initial={{ opacity: 0, y: 9 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -9 }}
              transition={{
                duration: 0.45,
                delay: slot * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 flex items-center justify-center px-2.5"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={512}
                height={512}
                /* contenu inscrit dans 70×34 — cadre max ≈ 81 px, sous les
                   96 px utiles de la pastille */
                style={{ width: logoFrameWidth(logo, 70, 34) }}
                className="h-auto max-w-full shrink-0 object-contain"
              />
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">
      <Navbar />

      {/* ==================== HERO — PLEIN ÉCRAN ==================== */}
      <section className="relative flex items-center overflow-hidden bg-mesh-light pb-14 pt-24 sm:pt-28 lg:min-h-[100svh] lg:py-10 lg:pt-[104px]">
        {/* halos décoratifs */}
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-[110px]" />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/[0.07] blur-[110px]" />

        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 sm:px-7 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 xl:gap-14">
            {/* ==================== COLONNE GAUCHE ==================== */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0"
            >
              <SectionBadge />

              {/* TITRE */}
              <h1 className="mt-4 font-display text-[32px] font-black leading-[1.03] tracking-[-0.04em] text-[#111827] sm:text-[44px] lg:mt-4 lg:text-[40px] xl:text-[48px]">
                Parlons de vos
                <br />
                <span className="text-gold">opérations</span>
              </h1>

              <p className="mt-3.5 max-w-[540px] text-pretty text-[14.5px] leading-[1.65] text-[#57534E] sm:text-[15.5px] lg:text-[15px]">
                Industry X.0 aide les organisations industrielles à connecter le
                terrain, la qualité, la production, la maintenance et la
                décision grâce à CIPA, pour des opérations plus performantes et
                durables.
              </p>

              {/* LOGOS CLIENTS */}
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#78716C] sm:text-[11px] lg:mt-4">
                Ils nous font confiance
              </p>

              <TrustStrip />

              {/* PROMESSES */}
              <div className="mt-5 grid gap-4 border-y border-[#E7E5E4] py-3.5 sm:grid-cols-3 sm:gap-0 lg:mt-4">
                {PROMISES.map((promise, index) => {
                  const Icon = promise.icon
                  return (
                    <div
                      key={promise.title}
                      className={`flex items-start gap-2.5 ${
                        index > 0
                          ? 'sm:border-l sm:border-[#E7E5E4] sm:pl-3.5'
                          : ''
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111827] text-gold">
                        <Icon size={17} strokeWidth={2} />
                      </div>

                      <div className="min-w-0 pt-0.5">
                        <p className="text-[12.5px] font-bold leading-[1.25] tracking-[-0.015em] text-[#111827] sm:text-[13px]">
                          {promise.title}
                        </p>
                        <p className="mt-1 text-[11.5px] leading-[1.25] text-[#78716C]">
                          {promise.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* ==================== COLLAGE VISUEL ==================== */}
              <div className="relative mt-5 lg:mt-4">
                {/*
                  Hauteur pilotée explicitement : les deux captures produit sont
                  des PNG 4:3 avec de larges marges blanches. En `object-cover`
                  dans une boîte plus large, la marge est rognée — la carte
                  apparaît plus grande et le collage tient dans la hauteur d'écran.
                  La variante de hauteur d'écran gère les portables 1080p.
                */}
                <div className="grid grid-cols-2 gap-3 lg:h-[236px] lg:grid-cols-[1fr_1fr_1.2fr] xl:h-[278px] [@media(min-width:1024px)_and_(max-height:940px)]:h-[196px]">
                  {/* raffinerie */}
                  <div className="relative aspect-[230/300] overflow-hidden rounded-[22px] shadow-[0_22px_55px_rgba(15,23,42,0.16)] sm:aspect-[230/335] lg:aspect-auto lg:h-full">
                    <Image
                      src="/c1%20(1).png"
                      alt="Site industriel en exploitation"
                      fill
                      sizes="(max-width: 1024px) 45vw, 16vw"
                      className="object-cover"
                    />
                  </div>

                  {/* opérateurs terrain */}
                  <div className="relative aspect-[230/300] overflow-hidden rounded-[22px] shadow-[0_22px_55px_rgba(15,23,42,0.16)] sm:aspect-[230/335] lg:aspect-auto lg:h-full">
                    <Image
                      src="/c1%20(4).png"
                      alt="Équipes terrain utilisant CIPA sur tablette"
                      fill
                      sizes="(max-width: 1024px) 45vw, 16vw"
                      className="object-cover object-[50%_35%]"
                    />
                  </div>

                  {/* cartes produit */}
                  <div className="col-span-2 flex flex-col gap-3 lg:col-span-1 lg:h-full">
                    <div className="relative h-[150px] shrink-0 overflow-hidden rounded-[18px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)] sm:h-[190px] lg:h-auto lg:flex-1">
                      <Image
                        src="/c1%20(2).png"
                        alt="Tableau de bord Performance CIPA — conformité globale 92%"
                        fill
                        sizes="(max-width: 1024px) 92vw, 20vw"
                        className="scale-[1.08] object-cover"
                      />
                    </div>

                    <div className="relative h-[150px] shrink-0 overflow-hidden rounded-[18px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)] sm:h-[190px] lg:h-auto lg:flex-1">
                      <Image
                        src="/c1%20(3).png"
                        alt="Courbe des tendances d’amélioration continue"
                        fill
                        sizes="(max-width: 1024px) 92vw, 20vw"
                        className="scale-[1.08] object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* CARTE CHIFFRES */}
                <div className="mt-3 rounded-[18px] bg-[#111827] p-4 text-white shadow-[0_24px_55px_rgba(15,23,42,0.32)] lg:absolute lg:left-[21%] lg:top-1/2 lg:mt-0 lg:w-[118px] lg:-translate-y-1/2 lg:px-4 lg:py-3.5">
                  <div className="flex items-end gap-8 lg:block">
                    <div>
                      <p className="font-display text-[26px] font-black leading-none tracking-[-0.04em] text-gold lg:text-[24px]">
                        15+
                      </p>
                      <p className="mt-1 text-[11px] leading-[1.25] text-white/70">
                        clients industriels
                      </p>
                    </div>

                    <div className="hidden bg-white/10 lg:my-2.5 lg:block lg:h-px lg:w-full" />

                    <div>
                      <p className="font-display text-[26px] font-black leading-none tracking-[-0.04em] text-gold lg:text-[24px]">
                        5
                      </p>
                      <p className="mt-1 text-[11px] leading-[1.25] text-white/70">
                        pays
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 h-px w-full bg-white/10 lg:mt-2.5" />

                  <div className="mt-3 flex items-center gap-2 lg:mt-2.5">
                    <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-gold" />
                    <span className="text-[10.5px] font-semibold text-white/80">
                      Ops + Quality
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ==================== COLONNE DROITE — FORMULAIRE ==================== */}
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="min-w-0 scroll-mt-24"
            >
              <div className="rounded-[26px] border border-white/60 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.10)] sm:rounded-[32px] sm:p-6 xl:p-7">
                {/* EN-TÊTE */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#111827] text-gold sm:h-[52px] sm:w-[52px]">
                    <MessageSquare size={20} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-display text-[20px] font-black tracking-[-0.03em] text-[#111827] sm:text-[22px]">
                      Contactez-nous
                    </h2>
                    <p className="mt-1 text-[13px] text-[#57534E] sm:text-[13.5px]">
                      Un expert Industry X.0 vous accompagne.
                    </p>
                    <div className="mt-2 h-[3px] w-12 rounded-full bg-gold" />
                  </div>
                </div>

                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AfterContactSection />

      <Footer />
    </main>
  )
}
