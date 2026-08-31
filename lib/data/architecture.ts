import {
  Cpu,
  Database,
  LayoutDashboard,
  Radio,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Contenu de la section « Architecture & sécurité ».
 *
 * Ton factuel : cette section s'adresse à un jury, pas à un prospect. Pas de
 * superlatif, pas de promesse, pas d'accent coloré. Chaque affirmation doit
 * pouvoir être défendue à l'oral.
 */

export type ArchitectureNode = {
  id: string
  label: string
  detail: string
  icon: LucideIcon
}

/** Les cinq étages du flux, de la donnée brute à sa restitution. */
export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'sources',
    label: 'Sources terrain',
    detail: 'Saisies opérateur, relevés, photos, équipements de ligne.',
    icon: Radio,
  },
  {
    id: 'ingestion',
    label: 'Ingestion',
    detail: 'Normalisation, horodatage, rattachement au lot et au poste.',
    icon: Database,
  },
  {
    id: 'traitement',
    label: 'Traitement & IA',
    detail: 'Contrôles de cohérence, détection de dérive, calcul des indicateurs.',
    icon: Cpu,
  },
  {
    id: 'applicatif',
    label: 'Couche applicative',
    detail: 'Workflows qualité, actions correctives, validations et signatures.',
    icon: Workflow,
  },
  {
    id: 'restitution',
    label: 'Restitution',
    detail: 'Tableaux de bord, rapports d’audit, exports réglementaires.',
    icon: LayoutDashboard,
  },
]

/**
 * TODO(stack) — compléter avec les technologies réellement employées par
 * CIPA avant la soutenance.
 *
 * Les couches ci-dessous décrivent des responsabilités, pas des outils :
 * elles sont vérifiables telles quelles. Un jury demandera en revanche les
 * technologies concrètes (langage, base de données, file de messages,
 * hébergement, modèle d'IA). Elles ne sont pas renseignées ici parce qu'il
 * vaut mieux une section incomplète qu'une réponse inventée qui s'effondre à
 * la première question.
 */
export type StackLayer = {
  layer: string
  role: string
  /** Technologies concrètes. Laisser vide tant qu'elles ne sont pas confirmées. */
  tech?: string
}

export const STACK: StackLayer[] = [
  {
    layer: 'Clients',
    role: 'Application mobile, tablette et poste fixe, utilisables en atelier.',
  },
  {
    layer: 'Services',
    role: 'API applicative, moteur de workflows, gestion des droits par rôle.',
  },
  {
    layer: 'Données',
    role: 'Référentiel unique horodaté, historique complet et non modifiable.',
  },
  {
    layer: 'Traitement',
    role: 'Analyses et détection de dérive exécutées sur les données de production.',
  },
]

export type SecurityPoint = {
  title: string
  detail: string
  icon: LucideIcon
}

/**
 * TODO(conformite) — faire relire ces trois points par le responsable
 * technique avant la soutenance. Ils sont formulés comme des propriétés de
 * conception, ce qui est défendable ; les transformer en engagements
 * (certification obtenue, chiffrement de tel type) demanderait des preuves.
 */
export const SECURITY_POINTS: SecurityPoint[] = [
  {
    title: 'Traçabilité non répudiable',
    detail:
      'Chaque saisie porte son auteur, sa date et son contexte de production. Les enregistrements sont ajoutés, jamais remplacés : l’historique d’un lot reste reconstituable après coup.',
    icon: ShieldCheck,
  },
  {
    title: 'Cloisonnement par rôle',
    detail:
      'Les droits suivent la fonction — opérateur, qualité, maintenance, direction. Une validation ne peut être produite par un compte qui n’en a pas la responsabilité.',
    icon: Workflow,
  },
  {
    title: 'Données hébergées et exportables',
    detail:
      'Les données restent celles du client, exportables dans un format ouvert. Ce point conditionne la réversibilité, que les audits réglementaires vérifient.',
    icon: Database,
  },
]
