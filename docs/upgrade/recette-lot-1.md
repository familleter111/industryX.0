# Recette du lot 1 — Fiabilité des parcours (L1-14)

**Pour :** l'équipe qui valide le lot, en préproduction puis sur la version publique.
**Branche :** `lot-1-fiabilite`. **Point de restauration :** tag `pre-lot-1`.

## 1. Contrôles automatiques (faits le 28/10/2026, build de production local)

| Contrôle | Commande | Résultat |
|---|---|---|
| Build | `npm run build` | OK, 63 pages générées |
| Lint | `npm run lint` | 0 avertissement |
| Types | `npm run typecheck` | OK |
| Tests | `npm test` | 14 fichiers, 269 tests OK |
| Liens | `npm run check:links -- http://localhost:3124` | 55 pages, 1 497 liens internes, **0 cassé, 0 ancre absente, 0 lien vers « / » hors logo et menu « Accueil »** |
| Langue EN | `BASE_URL=http://localhost:3124 npm run check:i18n` | 0 texte français sur les pages `/en` |
| Recherches | `grep -r` dans `src/` | 0 `contact@industryx0.com`, 0 `Bilal`, 0 `Structurerla` / `Orchestrerles` / `Piloterla`, 0 « Planifier une démo », 0 « sous 24 h » ; les 12 liens `#core-ops` ont leur cible |

À refaire en préproduction : `npm run check:links -- https://<preprod>` et `BASE_URL=https://<preprod> npm run check:i18n`.

## 2. Parcours à rejouer

Chaque parcours est à rejouer **en préproduction, puis sur la version publique**, sur ordinateur (1440 px) et sur téléphone (390 px). Colonne « Résultat » à remplir par l'équipe (OK / KO + capture).

| # | Parcours | Étapes | Résultat attendu | Préprod | Public |
|---|---|---|---|---|---|
| P1 | Découverte de CIPA | Accueil → « Voir la plateforme » | Défilement vers la section CIPA (`#solutions`) | | |
| P2 | Onglets des usages | Accueil, section « Tout ce qu'il faut… » : cliquer 1 → 4 → 2 → 6 → 1 ; au clavier, Tab jusqu'aux onglets puis flèches | Titre, puces et capture de l'onglet choisi ; légende « Illustration — valeurs d'exemple » ; « Contrôles production » montre l'écran de contrôles | | |
| P3 | Lien d'un usage | Onglet « Audits internes » → « Découvrir la fonctionnalité » | `/plateforme/remontee-terrain`, carte Audits affichée | | |
| P4 | Ancienne URL | Ouvrir `/solutions/audits` | Redirection permanente vers `/plateforme/remontee-terrain#audits` | | |
| P5 | Menu au clavier | Tab jusqu'à « Plateforme », Entrée, Tab, flèches, Échap ; idem Industries, Ressources, Société | Sous-menu ouvert, focus sur le 1er lien, parcours des liens, Échap referme et rend le focus | | |
| P6 | Menu mobile | 390 px : ouvrir le menu, déplier chaque rubrique, suivre un lien | Liens réels, menu refermé à l'arrivée | | |
| P7 | Footer | Depuis l'accueil, `/plateforme/gestion-ecarts`, `/industries/food`, `/entreprise`, `/contact` : cliquer chaque lien du footer | Chaque lien ouvre une vraie page (aucun retour à l'accueil) ; « Conçu à Tunis », « Labellisée Startup Act (Tunisie) » | | |
| P8 | Fiche Industrie | `/industries/pharma` → « Découvrir les solutions » ; « Demander une démo » ; « Contacter un conseiller » | Défilement vers la section `#core-ops` ; les deux CTA mènent à `/contact` | | |
| P9 | Formulaire de contact | Voir `recette-formulaire.md` | Demande reçue chez le bon destinataire | | |
| P10 | Chat | Ouvrir la bulle au clavier (Entrée), poser une question, Échap | Focus dans le champ, réponse, fermeture, focus rendu à la bulle ; lien « Confidentialité » → `/privacy` | | |
| P11 | Langue | `/industries/packaging` → sélecteur → English | `/en/industries/packaging`, contenu en anglais ; retour en Français | | |
| P12 | FAQ | `/faq` : ouvrir chaque question | 5 réponses non vides | | |
| P13 | Pages légales | `/privacy`, `/conditions-utilisation`, `/mentions-legales` | Date de mise à jour 28/10/2026 ; mentions légales non indexées (`noindex`) | | |
| P14 | Bandeau cookies | Préproduction avec mesure d'audience active, à 360 px : première visite | Le bandeau couvre le bas de l'écran jusqu'à la réponse, puis disparaît ; le formulaire et les CTA redeviennent accessibles | | |

## 3. Retour arrière

Si un défaut bloquant apparaît après la mise en ligne :

1. Revenir au code d'avant le lot : `git checkout pre-lot-1` (ou redéployer le commit `a6faaeb`, que le tag désigne).
2. Reconstruire (`npm run build`) et redéployer selon la procédure habituelle (Dockerfile du dépôt).
3. Vérifier : `npm run check:links -- https://<site>` sur la version restaurée.
4. Ouvrir une anomalie avec le parcours en cause (P1–P14), la capture et l'URL.

Le lot 1 ne modifie ni la base de données ni le format des demandes envoyées au CRM et au webhook : le retour arrière ne demande aucune migration.
