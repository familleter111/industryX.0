import Image from 'next/image'
import { Link, homeAnchorHref } from '@/i18n/navigation'
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
import { SECTORS, sectorHref } from '@/lib/data/sectors'
import { useCopy, useCurrentLocale } from '@/lib/i18n'

// Chaque lien mene a une page existante (L1-04). Les anciens libelles sans
// page (Mises a jour, Notre equipe, Blog, Cookies) pointaient tous vers
// l'accueil : ils sont retires plutot que redirigés vers « / ».
// Mentions legales : a ajouter quand la page sera publiee (voir son en-tete).
const FOOTER_HREFS = [
  [
    '/plateforme/remontee-terrain',
    '/plateforme/planification-maintenance',
    '/plateforme/gestion-ecarts',
    '/plateforme/conformite-tracabilite',
    '/plateforme/pilotage-performance',
    '/plateforme/intelligence-operationnelle',
    '/plateforme/integrations',
    '/resources#securite',
    '/plateforme/entiwin',
  ],
  ['/entreprise', '/partners', '/customers', '/resources', '/contact'],
  ['/privacy', '/conditions-utilisation', '/faq'],
]

const COPY = {
  fr: {
    sections: [
      ['Plateforme', ['Remontée terrain', 'Planification', 'Gestion des écarts', 'Conformité', 'Pilotage', 'Intelligence opérationnelle', 'Intégrations', 'Sécurité', 'Enti Win']],
      ['Entreprise', ['À propos', 'Partenaires', 'Cas clients', 'Guides & analyses', 'Contact']],
      ['Ressources & légal', ['Confidentialité', 'Conditions d’utilisation', 'FAQ']],
    ] as [string, string[]][],
    about:
      'Plateforme de transformation digitale dédiée à l’industrie africaine et méditerranéenne, conçue pour accélérer l’adoption des technologies Industrie 4.0 et optimiser les performances industrielles.',
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'Email',
    industries: 'Industries',
    follow: 'Suivez-nous',
    navLabel: 'Plan du site',
    linkedin: 'Industry X.0 sur LinkedIn',
    rights: 'Tous droits réservés',
    cookies: 'Gérer les cookies',
    startupAct: 'Labellisée Startup Act (Tunisie)',
    madeIn: 'Conçu à Tunis',
  },
  en: {
    sections: [
      ['Platform', ['Shop-floor capture', 'Planning', 'Deviation management', 'Compliance', 'Performance', 'Operational intelligence', 'Integrations', 'Security', 'Enti Win']],
      ['Company', ['About us', 'Partners', 'Customer stories', 'Guides & analysis', 'Contact']],
      ['Resources & legal', ['Privacy', 'Terms of use', 'FAQ']],
    ] as [string, string[]][],
    about:
      'A digital transformation platform for African and Mediterranean industry, built to speed up the adoption of Industry 4.0 technologies and improve industrial performance.',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    industries: 'Industries',
    follow: 'Follow us',
    navLabel: 'Site map',
    linkedin: 'Industry X.0 on LinkedIn',
    rights: 'All rights reserved',
    cookies: 'Cookie settings',
    startupAct: 'Startup Act label (Tunisia)',
    madeIn: 'Designed in Tunis',
  },
}

/**
 * Pied de page unique, identique sur toutes les pages (L1-04) : l'ancienne
 * variante « compact » des pages secteurs n'avait aucun lien de navigation.
 */
export default function Footer() {
  const t = useCopy(COPY)
  const locale = useCurrentLocale()
  const footerLinks = t.sections.map(([title, labels], s) => ({
    title,
    items: labels.map((label, i) => ({ label, href: FOOTER_HREFS[s][i] })),
  }))
  // Les six pages sectorielles, après la colonne Solution.
  footerLinks.splice(1, 0, {
    title: t.industries,
    // Source unique des secteurs (lib/data/sectors.ts), comme la grille et la FAQ.
    items: SECTORS.map(({ slug, name }) => ({ label: name[locale], href: sectorHref(slug) })),
  })

  return (
    <footer
      className="font-inter relative overflow-hidden bg-black text-white [contain-intrinsic-size:auto_800px] [content-visibility:auto]"
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

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-10 sm:pb-10 lg:px-8">
        {/* MAIN GRID */}

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.6fr]">
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

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
              {t.about}
            </p>

          </div>

          {/* RIGHT SIDE */}

          <nav aria-label={t.navLabel} className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <div className="mb-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide">
                    {section.title}
                  </h3>

                  <div className="mt-2 h-[2px] w-8 rounded-full bg-yellow-500" />
                </div>

                <ul className="sm:space-y-4 lg:space-y-3">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={homeAnchorHref(item.href)}
                        className="
                        group flex min-h-11 items-center gap-2 py-1
                        text-sm sm:min-h-0 sm:py-0
                        text-white/65
                        transition-all duration-300
                        hover:text-yellow-400
                        "
                      >
                        <ChevronRight
                          size={13}
                          className="
                          shrink-0 text-yellow-500
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                          "
                        />

                        <span>{item.label}</span>
                      </Link>

                      <div className="h-px w-full bg-white/10 sm:mt-3 lg:mt-2.5" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
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
          sm:backdrop-blur-xl
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
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-yellow-400">
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
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-yellow-400">
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
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-yellow-400">
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
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-yellow-400">
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
          <p className="text-sm text-white/60">
            © 2026 Industry X.0 — {t.rights}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
            <span>{t.startupAct}</span>

            <div className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />

            <span>{t.madeIn}</span>

            {/* Rien n'apparaît tant que la mesure d'audience n'est pas configurée. */}
            <CookieSettingsButton
              label={t.cookies}
              className="min-h-11 border-l border-white/20 pl-3 underline-offset-2 sm:min-h-0 transition-colors hover:text-white hover:underline"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}