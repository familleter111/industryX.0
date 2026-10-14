'use client'

import { useRef, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { AlertCircle, ArrowRight, Check, CheckCircle2, Loader2, Mail } from 'lucide-react'

import { useCopy, useCurrentLocale } from '@/lib/i18n'
import { getAttribution } from '@/lib/analytics/attribution'
import { distinctId, track } from '@/lib/analytics/posthog'

/**
 * « Recevoir les prochains guides » : la capture de prospects de /resources.
 *
 * Deux champs seulement — email et societe, cette derniere facultative —
 * parce que la contrepartie est legere : des guides, pas une demonstration.
 * La demande part dans le meme classeur que le formulaire de contact
 * (app/api/subscribe/route.ts), avec sa propre origine.
 *
 * On ne promet pas de telechargement : aucun PDF n'existe a ce jour. La
 * promesse est d'etre prevenu, et c'est celle que l'equipe peut tenir.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Errors = { email?: string; consent?: string }

const COPY = {
  fr: {
    emailRequired: 'Email requis',
    emailInvalid: 'Adresse email invalide',
    consentRequired: 'Merci d’accepter le traitement de vos données',
    failed: 'L’envoi a échoué. Merci de réessayer.',
    offline: 'Connexion impossible. Vérifiez votre réseau, puis réessayez.',
    title: 'Recevez les prochains guides',
    lead: 'Un email à chaque nouvelle publication : méthodes terrain, qualité et pilotage, écrites par nos experts. Rien d’autre.',
    doneTitle: 'Inscription confirmée',
    doneText: 'Merci ! Vous serez prévenu dès la parution du prochain guide.',
    emailLabel: 'Email professionnel (obligatoire)',
    emailPlaceholder: 'Email professionnel *',
    companyLabel: 'Société (facultatif)',
    consent: 'J’accepte de recevoir les guides d’Industry X.0 par email. Voir notre',
    privacy: 'politique de confidentialité',
    honeypot: 'Ne remplissez pas ce champ',
    sending: 'Inscription…',
    submit: 'M’inscrire',
  },
  en: {
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email address',
    consentRequired: 'Please accept the processing of your data',
    failed: 'Sending failed. Please try again.',
    offline: 'Unable to connect. Check your network, then try again.',
    title: 'Get the next guides',
    lead: 'One email per new guide: shop-floor, quality and performance methods, written by our experts. Nothing else.',
    doneTitle: 'You’re subscribed',
    doneText: 'Thank you! We’ll let you know as soon as the next guide is out.',
    emailLabel: 'Work email (required)',
    emailPlaceholder: 'Work email *',
    companyLabel: 'Company (optional)',
    consent: 'I agree to receive Industry X.0 guides by email. See our',
    privacy: 'privacy policy',
    honeypot: 'Leave this field empty',
    sending: 'Subscribing…',
    submit: 'Subscribe',
  },
}

export default function SubscribeBand({ source }: { source: string }) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const t = useCopy(COPY)
  const locale = useCurrentLocale()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    setSubmitError(null)

    const next: Errors = {}
    if (!email.trim()) next.email = t.emailRequired
    else if (!EMAIL.test(email.trim())) next.email = t.emailInvalid
    if (!consent) next.consent = t.consentRequired
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('sending')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          company: company.trim(),
          consent,
          source,
          attribution: getAttribution(),
          posthogId: distinctId(),
          locale,
          website: honeypot.current?.value ?? '',
        }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        fields?: Errors
      }

      if (!response.ok || !data.ok) {
        if (data.fields) setErrors(data.fields)
        setSubmitError(data.error ?? t.failed)
        setStatus('idle')
        return
      }
      setStatus('sent')
      track('newsletter_subscribed', { page: window.location.pathname })
    } catch {
      setSubmitError(t.offline)
      setStatus('idle')
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[30px] bg-[#0C0D12] p-7 sm:p-10 lg:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full"
        style={{ background: 'rgba(218,162,80,0.15)', filter: 'blur(90px)' }}
      />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.08] text-gold">
            <Mail size={18} aria-hidden="true" />
          </span>

          <h2 className="mt-5 font-display text-[24px] font-black leading-[1.12] tracking-[-0.035em] text-white sm:text-[30px]">
            {t.title}
          </h2>

          <p className="mt-3 max-w-md text-[14px] leading-[1.7] text-white/55">
            {t.lead}
          </p>
        </div>

        {status === 'sent' ? (
          <div
            role="status"
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
          >
            <CheckCircle2 size={24} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-[15px] font-bold text-white">{t.doneTitle}</p>
              <p className="mt-1.5 text-[13.5px] leading-[1.65] text-white/55">
                {t.doneText}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="relative">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="subscribe-email" className="sr-only">
                  {t.emailLabel}
                </label>
                <input
                  id="subscribe-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  aria-required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'subscribe-email-error' : undefined}
                  className={`h-12 w-full rounded-xl border bg-white/[0.06] px-4 text-[14px] text-white outline-none transition placeholder:text-white/40 focus:border-gold focus:ring-4 focus:ring-gold/15 ${
                    errors.email ? 'border-red-400' : 'border-white/15'
                  }`}
                />
                {errors.email && (
                  <p id="subscribe-email-error" role="alert" className="mt-1.5 text-[12px] font-medium text-red-300">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subscribe-company" className="sr-only">
                  {t.companyLabel}
                </label>
                <input
                  id="subscribe-company"
                  type="text"
                  autoComplete="organization"
                  placeholder={t.companyLabel}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-[14px] text-white outline-none transition placeholder:text-white/40 focus:border-gold focus:ring-4 focus:ring-gold/15"
                />
              </div>
            </div>

            {/* Case native masquee + carre dessine : meme schema que /contact. */}
            <div className="mt-4">
              <label htmlFor="subscribe-consent" className="flex cursor-pointer gap-3">
                <input
                  id="subscribe-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked)
                    setErrors((prev) => ({ ...prev, consent: undefined }))
                  }}
                  aria-required
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'subscribe-consent-error' : undefined}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-gold ${
                    consent
                      ? 'border-gold bg-gold text-dark'
                      : errors.consent
                        ? 'border-red-400'
                        : 'border-white/30 hover:border-gold'
                  }`}
                >
                  {consent && <Check size={12} strokeWidth={3.2} />}
                </span>
                <span className="text-[12.5px] leading-relaxed text-white/55">
                  {t.consent}{' '}
                  <Link
                    href="/privacy"
                    onClick={(event) => event.stopPropagation()}
                    className="font-medium text-gold underline-offset-2 hover:underline"
                  >
                    {t.privacy}
                  </Link>
                  .
                </span>
              </label>
              {errors.consent && (
                <p id="subscribe-consent-error" role="alert" className="mt-1.5 text-[12px] font-medium text-red-300">
                  {errors.consent}
                </p>
              )}
            </div>

            {/* Pot de miel : voir /contact. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
            >
              <label htmlFor="subscribe-website">{t.honeypot}</label>
              <input
                ref={honeypot}
                id="subscribe-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            {submitError && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-400/40 bg-red-500/10 px-3.5 py-3 text-[12.5px] leading-relaxed text-red-200"
              >
                <AlertCircle size={16} className="mt-px shrink-0" aria-hidden="true" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[14px] font-bold text-[#0C0D12] shadow-[0_14px_36px_rgba(218,162,80,0.25)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  {t.sending}
                </>
              ) : (
                <>
                  {t.submit}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
