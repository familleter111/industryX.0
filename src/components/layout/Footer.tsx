import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import {
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
} from 'lucide-react'
import { CONTACT, MAILTO, TEL } from '@/lib/data/contact'
import { LINKEDIN_URL } from '@/lib/data/socials'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import CookieSettingsButton from '@/components/analytics/CookieSettingsButton'
import { useCopy } from '@/lib/i18n'

// Chaque lien mene a une page existante. Les anciens libelles sans page
// (Mises a jour, Blog, Conditions, Cookies) pointaient tous vers l'accueil.
const FOOTER_HREFS = [
  [
    '/plateforme/remontee-terrain',
    '/plateforme/planification-maintenance',
    '/plateforme/gestion-ecarts',
    '/plateforme/conformite-tracabilite',
    '/plateforme/pilotage-performance',
    '/plateforme/intelligence-operationnelle',
    '/plateforme/integrations',
    '/plateforme/integrations#securite',
    '/plateforme/entiwin',
  ],
  ['/entreprise', '/partners', '/resources', '/contact'],
  ['/privacy', '/conditions-utilisation', '/faq'],
]

const COPY = {
  fr: {
    sections: [
      ['Solution', ['Remontée terrain', 'Planification', 'Gestion des écarts', 'Conformité', 'Pilotage', 'Intelligence opérationnelle', 'Intégrations', 'Sécurité', 'Enti Win']],
      ['Entreprise', ['À propos', 'Partenaires', 'Guides & insights', 'Contact']],
      ['Légal', ['Politique de confidentialité', 'Conditions d’utilisation', 'FAQ']],
    ] as [string, string[]][],
    about:
      'Plateforme de transformation digitale dédiée à l’industrie africaine et méditerranéenne, conçue pour accélérer l’adoption des technologies Industrie 4.0 et optimiser les performances industrielles.',
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'Email',
    follow: 'Suivez-nous',
    linkedin: 'Industry X.0 sur LinkedIn',
    rights: 'Tous droits réservés',
    cookies: 'Gérer les cookies',
  },
  en: {
    sections: [
      ['Solution', ['Shop-floor capture', 'Planning', 'Deviation management', 'Compliance', 'Performance', 'Operational intelligence', 'Integrations', 'Security', 'Enti Win']],
      ['Company', ['About us', 'Partners', 'Guides & insights', 'Contact']],
      ['Legal', ['Privacy policy', 'Terms of use', 'FAQ']],
    ] as [string, string[]][],
    about:
      'A digital transformation platform for African and Mediterranean industry, built to speed up the adoption of Industry 4.0 technologies and improve industrial performance.',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    follow: 'Follow us',
    linkedin: 'Industry X.0 on LinkedIn',
    rights: 'All rights reserved',
    cookies: 'Cookie settings',
  },
}

// 'full' = footer complet (page d'accueil) — 'compact' = logos + informations + copyright (pages secteurs)
type FooterProps = {
  variant?: 'full' | 'compact'
}

export default function Footer({ variant = 'full' }: FooterProps) {
  const isCompact = variant === 'compact'
  const t = useCopy(COPY)
  const footerLinks = t.sections.map(([title, labels], s) => ({
    title,
    items: labels.map((label, i) => ({ label, href: FOOTER_HREFS[s][i] })),
  }))

  return (
    <footer
      className="font-inter relative overflow-hidden bg-black text-white"
    >
      {/* top glow line */}

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      {/* background glow — mesh animé */}

      <AnimatedMeshBackground
        grid={false}
        orbs={[
          { color: 'rgba(234,179,8,0.10)', size: 220, position: { left: '-60px', top: '-60px' }, duration: 9, parallax: 20 },
          { color: 'rgba(234,179,8,0.05)', size: 220, position: { right: '-60px', bottom: '-100px' }, duration: 11, parallax: 25 },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* MAIN GRID */}

        <div
          className={
            isCompact
              ? 'grid gap-10'
              : 'grid gap-10 lg:grid-cols-[1.2fr_0.8fr]'
          }
        >
          {/* LEFT SIDE */}

          <div>
            {/* logo */}

            <div className="flex flex-wrap items-center gap-4">
              <Image
                src="/logo.png"
                alt="Industry X.0"
                width={150}
                height={40}
                className="h-auto w-auto"
              />
            </div>

            {/* description */}

            {!isCompact && (
              <p className="mt-5 max-w-xl text-[13px] leading-7 text-white/60">
                {t.about}
              </p>
            )}

          </div>

          {/* RIGHT SIDE */}

          {!isCompact && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <div className="mb-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide">
                    {section.title}
                  </h3>

                  <div className="mt-2 h-[2px] w-8 rounded-full bg-yellow-500" />
                </div>

                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="
                        group flex items-center gap-2
                        text-sm
                        text-white/65
                        transition-all duration-300
                        hover:text-yellow-400
                        "
                      >
                        <ChevronRight
                          size={13}
                          className="
                          text-yellow-500
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                          "
                        />

                        <span>{item.label}</span>
                      </Link>

                      <div className="mt-3 h-px w-full bg-white/10" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* CONTACT BAR */}

        <div
          className="
          mt-10
          grid gap-5
          rounded-[20px]
          border border-white/10
          bg-white/[0.02]
          p-5
          backdrop-blur-xl
          lg:grid-cols-4
          "
        >
          {/* address */}

          <div className="flex items-center gap-4">
            <div
              className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl
              border border-yellow-500/20
              bg-yellow-500/10
              "
            >
              <MapPin
                size={18}
                className="text-yellow-400"
              />
            </div>

            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                {t.address}
              </p>

              <a
                href={CONTACT.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm leading-6 text-white/75 transition hover:text-yellow-400"
              >
                {CONTACT.address.street},
                <br />
                {CONTACT.address.city}
              </a>
            </div>
          </div>

          {/* phone */}

          <div className="flex items-center gap-4 lg:border-l lg:border-white/10 lg:pl-5">
            <div
              className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl
              border border-yellow-500/20
              bg-yellow-500/10
              "
            >
              <Phone
                size={18}
                className="text-yellow-400"
              />
            </div>

            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                {t.phone}
              </p>

              <a href={TEL} className="text-sm text-white/75 transition hover:text-yellow-400">
                {CONTACT.phone}
              </a>
            </div>
          </div>

          {/* email */}

          <div className="flex items-center gap-4 lg:border-l lg:border-white/10 lg:pl-5">
            <div
              className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl
              border border-yellow-500/20
              bg-yellow-500/10
              "
            >
              <Mail
                size={18}
                className="text-yellow-400"
              />
            </div>

            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                {t.email}
              </p>

              <a href={MAILTO} className="text-sm text-white/75 transition hover:text-yellow-400">
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* social */}

          <div className="flex items-center gap-3 lg:border-l lg:border-white/10 lg:pl-5">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                {t.follow}
              </p>

              <div className="flex gap-3">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.linkedin}
                  className="
                  flex h-12 w-12 items-center justify-center
                  rounded-2xl
                  border border-white/10
                  bg-black/40
                  text-white/60
                  transition-all duration-300
                  hover:border-yellow-500/40
                  hover:bg-yellow-500/10
                  hover:text-yellow-400
                  "
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}

        <div
          className="
          mt-6
          flex flex-col items-center justify-between gap-3
          border-t border-white/10
          pt-5
          text-center
          md:flex-row
          "
        >
          <p className="text-xs text-white/50">
            © 2026 Industry X.0 — {t.rights}
          </p>

          <div className="flex items-center gap-3 text-xs text-white/50">
            <span>Startup Act 🇹🇳</span>

            <div className="h-1 w-1 rounded-full bg-white/20" />

            <span>Designed in Tunis</span>

            {/* Rien n'apparaît tant que la mesure d'audience n'est pas configurée. */}
            <CookieSettingsButton
              label={t.cookies}
              className="border-l border-white/20 pl-3 underline-offset-2 transition-colors hover:text-white hover:underline"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}