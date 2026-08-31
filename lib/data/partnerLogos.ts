/**
 * Partenaires (dossier /public/logos-partenaires).
 *
 * `contentWidth` / `contentHeight` sont mesurés sur chaque fichier — voir
 * logoSizing.ts pour la règle de dimensionnement optique.
 *
 * Les partenaires sont regroupés en trois branches, ce qui donne sa structure
 * à l'orbite de l'écosystème (components/PartnersOrbit.tsx).
 */

import type { LogoAsset } from '@/lib/data/logoSizing'

export type Partner = LogoAsset & {
  /** Signature courte — affichée dans la légende de la page Partenaires. */
  tagline: string
}

export type PartnerBranch = {
  key: string
  label: string
  desc: string
  partners: Partner[]
}

export const PARTNER_BRANCHES: PartnerBranch[] = [
  {
    key: 'technologie',
    label: 'Technologie',
    desc: 'Le socle cloud de CIPA',
    partners: [
      {
        src: '/logos-partenaires/03_microsoft.png',
        alt: 'Microsoft',
        contentWidth: 0.86,
        contentHeight: 0.21,
        tagline: 'Empowering every organization',
      },
      {
        src: '/logos-partenaires/04_aws.png',
        alt: 'Amazon Web Services',
        contentWidth: 0.71,
        contentHeight: 0.44,
        tagline: 'Build, scale and innovate',
      },
    ],
  },
  {
    key: 'conseil',
    label: 'Conseil & audit',
    desc: 'Transformation et conformité',
    partners: [
      {
        src: '/logos-partenaires/01_ey.png',
        alt: 'EY',
        contentWidth: 0.66,
        contentHeight: 0.62,
        tagline: 'Un monde plus équilibré',
      },
      {
        src: '/logos-partenaires/02_deloitte.png',
        alt: 'Deloitte',
        contentWidth: 0.86,
        contentHeight: 0.17,
        tagline: 'Impact that matters',
      },
    ],
  },
  {
    key: 'ecosysteme',
    label: 'Écosystème & institutions',
    desc: 'Ancrage industriel et innovation',
    partners: [
      {
        src: '/logos-partenaires/05_giz.png',
        alt: 'GIZ',
        contentWidth: 0.5,
        contentHeight: 0.42,
        tagline: 'Un avenir viable et sûr',
      },
      {
        src: '/logos-partenaires/06_dot-tn.png',
        alt: 'THE DOT',
        contentWidth: 0.67,
        contentHeight: 0.66,
        tagline: 'L’innovation en action',
      },
      {
        src: '/logos-partenaires/07_novation-city.png',
        alt: 'Novation City',
        contentWidth: 0.84,
        contentHeight: 0.54,
        tagline: 'Écosystème d’innovation',
      },
    ],
  },
]

export const PARTNERS: Partner[] = PARTNER_BRANCHES.flatMap(
  (branch) => branch.partners
)
