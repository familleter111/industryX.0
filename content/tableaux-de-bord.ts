/**
 * Tableaux de bord — /plateforme/tableaux-de-bord.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  CLAIMS PRODUIT A FAIRE VALIDER AVANT MISE EN LIGNE
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - la frequence reelle de mise a jour des indicateurs (FAQ 2) ;
 *   - l'etendue de la personnalisation des indicateurs, et ou passe la
 *     frontiere avec un developpement (FAQ 1) ;
 *   - les connecteurs de BI reellement disponibles, famille par famille. La
 *     page ne nomme aucun editeur — meme regle que /plateforme/integrations —,
 *     mais annoncer une famille reste une promesse verifiable en
 *     demonstration (bloc integrations et FAQ 3).
 *
 * Les chiffres de la maquette de tableau de bord sont inventes et signales
 * comme tels a l'ecran — voir `components/ui/DashboardScreen.tsx`.
 */

import {
  BarChart3,
  BellRing,
  FileDown,
  Gauge,
  Layers,
} from 'lucide-react'

import type {
  MarketingPageContent,
  RelatedContent,
} from './types'

const related: RelatedContent = {
  eyebrow: 'Par métier',
  title: 'Ce que les indicateurs',
  accent: 'pilotent.',
  subtitle:
    'Un tableau de bord se lit pour décider. Voici deux décisions qu’il sert directement.',
  hrefs: [
    '/solutions/amelioration-continue',
    '/solutions/audits-inspections',
  ],
}

/** La page ajoute son bloc de maillage interne a la structure commune. */
type TableauxContent = MarketingPageContent & {
  related: RelatedContent
}

export const tableauxDeBord: TableauxContent = {
  seo: {
    // 46 caracteres.
    title: 'CIPA — Tableaux de bord qualité et performance',
    // 141 caracteres.
    description:
      'Taux de conformité, non-conformités ouvertes et actions en retard, par site ou par ligne. Rapports automatisés, alertes sur seuils, export BI.',
    path: '/plateforme/tableaux-de-bord',
  },

  hero: {
    eyebrow: 'Tableaux de bord',
    title: 'Suivez vos indicateurs qualité et performance en',
    accent: 'temps réel',
    description:
      'Le lundi matin, l’état du site est déjà à jour : taux de conformité, écarts ouverts, actions en retard. Personne n’a passé le week-end à consolider un tableur.',
    proofs: [
      'Indicateurs calculés sans consolidation manuelle',
      'Vue par site, ligne, atelier, équipe ou produit',
      'Alerte dès qu’un seuil est dépassé',
    ],
  },

  problem: {
    title: 'Le reporting arrive toujours',
    accent: 'trop tard.',
    items: [
      {
        title: 'Le mensuel se construit à la main',
        body: 'Trois jours par mois à extraire, recoller et mettre en forme. Le tableau est juste le jour où il est terminé, et périmé la semaine suivante.',
      },
      {
        title: 'Les chiffres se contestent en réunion',
        body: 'Deux services arrivent avec deux totaux. La demi-heure qui suit passe à comparer des méthodes de calcul, au lieu de décider quoi faire.',
      },
      {
        title: 'Aucune vue consolidée entre les lignes et les sites',
        body: 'Chaque ligne tient son suivi, chaque site le sien. Comparer deux ateliers demande de retraiter deux fichiers qui ne comptent pas la même chose.',
      },
    ],
  },

  solution: {
    title: 'Ce que vous voyez, et à quelle',
    accent: 'maille.',
    subtitle:
      'Les indicateurs sont calculés sur les relevés eux-mêmes. Aucun n’est ressaisi, et chacun s’ouvre jusqu’aux constats qui le composent.',
    items: [
      {
        icon: BarChart3,
        title: 'Qualité, conformité, actions, délais',
        body: 'Taux de conformité, non-conformités ouvertes, avancement des plans d’action et délais de traitement, sur la même base et sur la même période.',
        points: [
          'Calculés depuis les relevés, jamais ressaisis',
          'Une seule définition par indicateur, posée au cadrage',
          'Chaque chiffre s’ouvre jusqu’au relevé qui le compose',
        ],
      },
      {
        icon: Layers,
        title: 'Par site, ligne, atelier, équipe ou produit',
        body: 'Le même indicateur se lit à l’échelle du groupe ou d’un poste. Les filtres se combinent sans jamais changer la définition de ce qui est mesuré.',
        points: [
          'Site, ligne, atelier, équipe, produit, période',
          'Deux périmètres comparés côte à côte',
          'Périmètre visible limité aux droits de qui consulte',
        ],
      },
      {
        icon: Gauge,
        title: 'Conformité, écarts ouverts, retards',
        body: 'Les trois chiffres que regarde une direction d’usine, au même endroit : ce qui est conforme, ce qui ne l’est pas, et ce qui aurait dû être traité.',
        points: [
          'Non-conformités ouvertes réparties par criticité',
          'Actions en retard avec leur détenteur et leur ancienneté',
          'Évolution sur la période, pas seulement l’instantané',
        ],
      },
      {
        icon: FileDown,
        title: 'Rapports automatisés et exports',
        body: 'Le dossier de comité se génère à date fixe, dans le format attendu. Les exports alimentent vos propres outils quand vous préférez y rester.',
        points: [
          'Génération programmée avant chaque revue de direction',
          'Export tableur, ou connexion depuis vos outils de BI',
          'Mêmes définitions et même périmètre que l’écran',
        ],
      },
      {
        icon: BellRing,
        title: 'Alertes sur seuils dépassés',
        body: 'Un indicateur qui franchit son seuil notifie sans attendre la revue mensuelle. C’est ce qui distingue un tableau de bord d’un rapport.',
        points: [
          'Seuils définis par indicateur et par périmètre',
          'Destinataires déterminés par le rôle, pas par une liste de noms',
          'Alerte rattachée aux relevés qui l’ont déclenchée',
        ],
      },
    ],
  },

  shot: {
    caption:
      'Le tableau de bord opérationnel : taux de conformité et sa tendance sur six mois, non-conformités ouvertes réparties par criticité, actions en retard. Les chiffres affichés sont un exemple et ne proviennent d’aucun client.',
  },

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    items: [
      {
        value: 'Continu',
        label: 'Mise à jour des indicateurs',
        detail: 'Chaque relevé validé met le tableau de bord à jour.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        value: '1',
        label: 'Définition par indicateur, pour tous les services',
        detail: 'Il n’y a plus deux totaux à réconcilier en réunion.',
        source: 'Propriété du modèle de données',
      },
      {
        // TODO valider — chiffre non source. Affiche comme objectif de
        // deploiement tant qu'aucune mesure client ne l'etaye.
        value: '-3 j',
        label: 'Temps de préparation d’une revue mensuelle',
        detail: 'Entre la consolidation manuelle et le rapport généré.',
      },
    ],
  },

  proof: {
    kind: 'integrations',
    title: 'Vos indicateurs, dans vos',
    accent: 'outils.',
    subtitle:
      'CIPA calcule et affiche ; rien n’oblige vos équipes à venir les lire ici. Ce qui compte est que le chiffre reste le même des deux côtés.',
    items: [
      // Familles d'outils, aucun nom d'editeur : meme regle que sur
      // /plateforme/integrations. Un nom propre sur une page produit se lit
      // comme un connecteur livre, et c'est la premiere chose qu'une DSI ira
      // verifier en demonstration.
      // TODO produit — confirmer, famille par famille, ce qui est livre.
      { name: 'Outils de BI', category: 'Connexion au jeu de données' },
      { name: 'Entrepôt de données', category: 'Jeu de données publié' },
      { name: 'Tableur, CSV', category: 'Export à la demande ou programmé' },
      { name: 'ERP', category: 'Référentiels produits et ordres' },
      { name: 'MES', category: 'Événements de production' },
      { name: 'Messagerie d’entreprise', category: 'Alertes et rapports programmés' },
    ],
    note: 'Les connecteurs disponibles et le mode d’échange — API, jeu de données publié ou export programmé — sont arrêtés pendant le cadrage.',
  },

  faq: {
    title: 'Ce que les directions d’usine nous',
    accent: 'demandent.',
    items: [
      {
        // TODO produit — etendue de la personnalisation a confirmer, et ou
        // passe exactement la frontiere avec un developpement.
        question: 'Peut-on définir nos propres indicateurs ?',
        answer:
          'Oui, et c’est même le point de départ : nous partons de ceux que vous suivez déjà plutôt que d’imposer un jeu standard. Le périmètre, la maille, la formule et le seuil d’alerte de chaque indicateur se posent pendant le cadrage. Un calcul métier vraiment particulier peut demander un paramétrage technique de notre côté ; nous le disons à ce moment-là, pas après.',
      },
      {
        // TODO produit — frequence reelle de mise a jour a confirmer.
        question: 'À quelle fréquence les tableaux de bord se mettent-ils à jour ?',
        answer:
          'En continu : un relevé validé sur le terrain alimente les indicateurs sans attendre une consolidation nocturne. C’est la différence de fond avec un reporting mensuel — vous ne regardez pas l’état du site le mois dernier, vous regardez celui de ce matin.',
      },
      {
        // TODO produit — connecteurs BI reellement disponibles a confirmer.
        question: 'Peut-on exploiter les indicateurs dans nos propres outils ?',
        answer:
          'Oui. Vos outils de BI se connectent au jeu de données CIPA, ce qui évite d’en recopier une version qui finira par diverger. Les exports tableur restent disponibles pour les usages ponctuels. Dans les deux cas, les définitions restent celles de la plateforme : un taux de conformité lu dans votre outil est le même que celui de l’écran CIPA.',
      },
      {
        question: 'Qui voit quoi ? Un chef d’atelier accède-t-il aux chiffres du site ?',
        answer:
          'Les droits se donnent par rôle et par périmètre, comme pour les workflows. Un chef d’atelier voit son atelier, un responsable de site l’ensemble de ses lignes, une direction industrielle plusieurs sites. Un indicateur hors périmètre n’est pas affiché en grisé : il n’apparaît pas. Ce sont les mêmes règles que celles qui gouvernent les circuits d’escalade, définies une seule fois.',
      },
    ],
  },

  related,
}
