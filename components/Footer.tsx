'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
} from 'lucide-react'

const inter = Inter({
  subsets: ['latin'],
})

const footerLinks = [
  {
    title: 'Produit',
    items: [
      'Fonctionnalités',
      'Solutions',
      'Sécurité',
      'Mises à jour',
    ],
  },
  {
    title: 'Entreprise',
    items: [
      'À propos',
      'Notre équipe',
      'Blog',
      'Contact',
    ],
  },
  {
    title: 'Légal',
    items: [
      'Confidentialité',
      'Conditions',
      'Cookies',
    ],
  },
]

// 'full' = footer complet (page d'accueil) — 'compact' = logos + informations + copyright (pages secteurs)
type FooterProps = {
  variant?: 'full' | 'compact'
}

export default function Footer({ variant = 'full' }: FooterProps) {
  const isCompact = variant === 'compact'

  return (
    <footer
      className={`${inter.className} relative overflow-hidden bg-black text-white`}
    >
      {/* top glow line */}

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      {/* background glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-60px] top-[-60px] h-[180px] w-[180px] rounded-full bg-yellow-500/10 blur-[90px]" />

        <div className="absolute bottom-[-100px] right-[-60px] h-[180px] w-[180px] rounded-full bg-yellow-500/5 blur-[100px]" />
      </div>

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
            {/* logos */}

            <div className="flex flex-wrap items-center gap-4">
              <Image
                src="/logo.png"
                alt="Industry X.0"
                width={150}
                height={40}
                className="h-auto w-auto"
              />

              <div className="hidden h-6 w-px bg-white/10 md:block" />

              <Image
                src="/logoCipa.png"
                alt="CIPA"
                width={80}
                height={35}
                className="h-auto w-auto"
              />
            </div>

            {/* description */}

            {!isCompact && (
              <p className="mt-5 max-w-xl text-[13px] leading-7 text-white/60">
                Plateforme de transformation digitale dédiée à
                l’industrie africaine et méditerranéenne,
                conçue pour accélérer l’adoption des
                technologies Industrie 4.0 et optimiser les
                performances industrielles.
              </p>
            )}

          </div>

          {/* RIGHT SIDE */}

          {!isCompact && (
          <div className="grid grid-cols-3 gap-8">
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
                    <li key={item}>
                      <Link
                        href="/"
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

                        <span>{item}</span>
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
                Adresse
              </p>

              <p className="text-sm leading-6 text-white/75">
                Cité les pins,
                <br />
                Tunis 1053
              </p>
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
                Téléphone
              </p>

              <p className="text-sm text-white/75">
                +216 90 199 823
              </p>
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
                Email
              </p>

              <p className="text-sm text-white/75">
                contact@industryx0.pro
              </p>
            </div>
          </div>

          {/* social */}

          <div className="flex items-center gap-3 lg:border-l lg:border-white/10 lg:pl-5">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                Suivez-nous
              </p>

              <div className="flex gap-3">
                <a
                  href="/"
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
                  <Facebook size={18} />
                </a>

                <a
                  href="/"
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
          <p className="text-xs text-white/40">
            © 2026 Industry X.0 — Tous droits réservés
          </p>

          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>Startup Act 🇹🇳</span>

            <div className="h-1 w-1 rounded-full bg-white/20" />

            <span>Designed in Tunis</span>
          </div>
        </div>
      </div>
    </footer>
  )
}