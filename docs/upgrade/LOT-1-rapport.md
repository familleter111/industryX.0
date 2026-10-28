# Lot 1 — Fiabilité des parcours : rapport

**Pour :** l'équipe Industry X.0 qui valide le lot et renseigne le plan `Industry_X0_Plan_Upgrades_4_Lots.xlsx`.
**Date :** 28/10/2026. **Branche :** `lot-1-fiabilite` (14 commits). **Point de restauration :** tag `pre-lot-1` (= `a6faaeb`). Rien n'est poussé ni déployé.

## Synthèse

- **Point de départ :** une partie du lot avait déjà été faite le 20/10 (commit `909d8df`) : redirections `/solutions/*`, « Voir la plateforme », coordonnées uniques, Bilel, statut du chat. Le constat détaillé, défaut par défaut, est dans `inventaire-urls.md` § 7.
- **Routes réelles :** le prompt cite `/plateforme/terrain|qualite|pilotage`. Ces URL redirigent aujourd'hui vers **7 pages Solution** (`/plateforme/remontee-terrain`…). Footer et menu pointent vers ces pages réelles, sans redirection intermédiaire.
- **Résultat technique :**
  - build OK ;
  - lint 0 avertissement ;
  - 269 tests OK ;
  - 55 pages et 1 497 liens internes, **0 lien cassé, 0 ancre absente** ;
  - 0 texte français sur les pages EN.
- **Toutes les tâches sont proposées « En revue »** : aucune n'est bloquée. Les validations attendues de l'équipe sont listées dans `a-confirmer.md`.
- **Hors périmètre, mais urgent (règles 1 et 2) :** voir l'alerte en fin de rapport (témoignages non validés affichés).

## Détail par tâche

### L1-01 [CODE] Préparation — En revue
- **Fait :**
  - tag `pre-lot-1` ;
  - vérificateur de liens `npm run check:links` (crawl du HTML rendu : statut, ancres, `mailto:`/`tel:`, liens vers « / ») ;
  - inventaire `inventaire-urls.md` : routes, redirections, 55 pages, liens par cible, CTA, `mailto:`/`tel:`, liens externes, constat des 17 défauts de l'audit.
- **Fichiers :** `scripts/check-links.mjs`, `package.json`, `docs/upgrade/inventaire-urls.md`.
- **Vérifier :** `npm run dev`, puis `npm run check:links -- http://localhost:3000`.
- **Note :** pas de `linkinator` (dépendance réseau) ; le script maison couvre le même besoin, plus les ancres et la règle « pas de lien vers / ».

### L1-02 [CODE] Lien de découverte des audits — En revue
- **Fait :** vérification seulement, déjà en place.
  - « Découvrir la fonctionnalité » (onglet Audits) → `/plateforme/remontee-terrain#audits`, ancre présente.
  - `/solutions/audits` → redirection permanente (308, l'équivalent Next du 301) vers la même cible ; les 5 autres anciennes URL d'onglets ont leur cible.
  - Commentaire « provisoire jusqu'à L2-06 » ajouté.
- **Fichiers :** `next.config.mjs`.
- **Vérifier :** `curl -I http://localhost:3000/solutions/audits`.

### L1-03 [CODE + VALIDATION] Confidentialité et mentions légales — En revue (relecture du référent données)
- **Fait :**
  - **Politique** confrontée au code :
    - stockage navigateur ajouté (conversation du chat, taille de la fenêtre, source de la visite en cours, PostHog) ;
    - en-tête technique à jour (chat IA via Azure) ;
    - adresse via la source unique ;
    - date au 28/10/2026.
  - **Loi applicable** (2004-63 / INPDP + RGPD), durées, réclamations et délai de réponse sont **déjà affichés** : marqués `TODO(À CONFIRMER)` en commentaire, à valider.
  - **Correctif de fond :** la garde anti-répétition du chat gardait 2 minutes en mémoire le texte de la dernière question, en contradiction avec « conversations non conservées ». Elle ne garde plus qu'une empreinte SHA-256.
  - **`/mentions-legales` créée :**
    - éditeur et coordonnées seulement ;
    - raison sociale, forme juridique, RNE / matricule fiscal, directeur de publication et hébergeur en `TODO` non affichés ;
    - `noindex`, hors sitemap (`NOINDEX_PATHS`), non liée dans le footer.
  - **Liens vers `/privacy`** vérifiés : formulaire, newsletter, chat, bandeau cookies, CGU.
- **Fichiers :** `privacy/page.tsx`, `mentions-legales/page.tsx`, `conditions-utilisation/page.tsx`, `lib/chat/server.ts`, `lib/site.ts`, `tests/site.test.ts`.
- **TODO :** voir `a-confirmer.md` § Données personnelles et § Identité légale.

### L1-04 [CODE] Footer réel sur toutes les pages — En revue
- **Fait :**
  - L'ancien gabarit n'existe plus : toutes les pages partagent le même Navbar et le même Footer.
  - La variante `compact` des 6 fiches Industries (sans aucun lien) est **supprimée**.
  - **Colonnes** (adaptées aux routes réelles) :
    - Plateforme : 7 pages Solution, Sécurité, Enti Win ;
    - Entreprise : À propos, Partenaires, **Cas clients**, Guides & analyses, Contact ;
    - Ressources & légal : Confidentialité, Conditions d'utilisation, FAQ.
  - « Gérer les cookies » reste dans la barre du bas.
  - « Conçu à Tunis », « Labellisée Startup Act (Tunisie) ».
  - Adresse « Cité Les Pins, 1053 Tunis ».
  - LinkedIn en icône avec `aria-label`.
  - `<nav aria-label="Plan du site">`.
- **Écart avec le prompt :** « Mentions légales » n'est pas listée, car la page n'est pas publiée. Elle sera ajoutée quand ses TODO seront levés.
- **Fichiers :** `components/layout/Footer.tsx`, 5 pages `industries/*/page.tsx`, `features/industries/IndustryPage.tsx`, `scripts/check-i18n.mjs`.
- **Vérifier :** footer complet sur `/`, `/plateforme/gestion-ecarts`, `/industries/food`, `/industries/automotive`, `/entreprise`, `/contact` (vérifié en HTML) ; `check:links` : 0 lien vers « / ».

### L1-05 [CODE] Bouton de découverte de CIPA — En revue
- **Fait :**
  - « Voir la plateforme » mène au bloc CIPA de l'accueil (`/#solutions`, ancre existante). Elle n'a pas été renommée `#cipa`, pour ne pas casser les liens existants.
  - Destinations centralisées dans **`src/lib/routes.ts`** (`ROUTES.demo`, `contact`, `cipa`, `customers`, `partners`), avec les commentaires L2-05 et L2-14 ; 19 composants passent par `ROUTES`. Le chemin est `lib/` plutôt que `config/`, comme les autres sources uniques du dépôt.
  - **Règle 7 :** 5 variantes (« Planifier une démo », « … de CIPA », « Demander / Planifier une démonstration ») → **« Demander une démo »** ; EN « Book a demo ».
- **Fichiers :** `lib/routes.ts` et 19 composants et pages.

### L1-06 [CODE] Onglets fonctionnalités de l'accueil — En revue
- **Fait :**
  - Le décalage de l'audit n'existe plus : correspondance onglet → image vérifiée à l'œil sur les fichiers.
  - Composant réécrit :
    - un objet `FeatureTab` par onglet ;
    - état réduit à l'index actif ;
    - motif ARIA `tablist` / `tab` / `tabpanel` ;
    - flèches, Début et Fin, focus itinérant ;
    - **6 panneaux rendus côté serveur** (inactifs en `hidden`) ;
    - légende « Illustration — valeurs d'exemple » (règle 3).
- **Test :** `tests/cases-tabs.test.tsx` (sans nouvelle dépendance) :
  - 6 onglets et panneaux reliés ;
  - séquence 1 → 4 → 2 → 6 → 1, avec contrôle du titre et de l'image ;
  - clavier ;
  - rendu serveur.
- **Fichiers :** `components/sections/CasesSection.tsx`, `tests/cases-tabs.test.tsx`, `vitest.config.mts` (`*.test.tsx`, JSX automatique).

### L1-07 [CODE] Visuels produit de l'accueil — En revue
- **Fait :**
  - Les 288 images des 8 pages principales sont vérifiées : HTTP 200, chemins et casse corrects, toutes avec un `alt`.
  - Image du 1er onglet en `priority` ; dimensions réservées par le cadre 4:3.
  - Rendu contrôlé à 1440 et 390 px, onglet « Déviations & NC » compris (le visuel signalé par l'audit) : image affichée, aucun `alt` à la place.
  - Hero déjà en `priority`.
- **Commit :** les modifications sont dans `973fd59` (L1-06, même composant).

### L1-08 [CODE] Sélecteur FR / EN — En revue
- **Fait :**
  - Le défaut de l'audit est corrigé depuis : les pages `/en` sont traduites (`check:i18n` : 0 texte français, `lang="en"`).
  - Le sélecteur mène à la page équivalente (même chemin).
  - Aucune désactivation n'est donc nécessaire.
  - Drapeau du bouton : `alt` « Français » / « English ».
  - Les drapeaux ne se chargent plus en 3 840 px (`sizes`).
- **Activation définitive** (`hreflang` réciproques, sitemap multilingue) : L4-06.
- **Fichiers :** `components/layout/Navbar.tsx`.

### L1-09 [CODE + VALIDATION] Recette du formulaire — En revue (envoi réel par l'équipe)
- **Déjà en place :**
  - validation côté navigateur et côté serveur (Zod) ;
  - erreurs `role="alert"` ;
  - succès seulement après la confirmation du serveur ;
  - bouton désactivé pendant l'envoi ;
  - pot de miel `aria-hidden`, `tabIndex=-1`, hors écran ;
  - consentement obligatoire ;
  - 5 envois par IP et par quart d'heure.
- **Ajouté :** anti-doublon **côté serveur** (`lib/server/dedupe.ts`).
  - Une même demande n'est livrée qu'une fois en 10 min.
  - Les envois simultanés sont regroupés.
  - Après un échec, le visiteur peut renvoyer sa demande.
- **Tests :** 4 nouveaux tests dans `tests/contact.test.ts`.
- **Procédure :** `recette-formulaire.md`.
- **Limite :** les comportements côté navigateur sont vérifiés à la lecture du code, pas par un test de composant. Le formulaire est défini dans la page `/contact` (1 500 lignes) ; l'extraire relève de L2-14.

### L1-10 [CODE + VALIDATION] Chat — En revue
- **Fait :**
  - Le focus revient à l'élément qui a ouvert le chat (Échap, croix ou bulle). Vérifié dans Chrome : Entrée sur la bulle → champ de saisie, Échap → bulle.
  - Lien `/privacy`, Échap et `aria-label` des boutons déjà présents.
  - Textes de disponibilité confrontés au code : « Assistant automatique » et mentions de transmission et de non-conservation exacts.
  - **Promesse « réponse sous 24 h (ouvrées) » retirée** (règle 1, délai non confirmé) du chat et de `/contact` (avantages, engagement, confirmation, description de la page).
- **Fichiers :** `ChatWidget.tsx`, `lib/chat/knowledge.ts`, `lib/chat/local.ts`, `contact/page.tsx`, `contact/layout.tsx`.

### L1-11 [CODE + VALIDATION] Coordonnées — En revue
- **Fait :**
  - **`src/content/site-facts.ts`** : identité (2019), fondateurs, e-mail `hello@industryx0.pro`, `tel:+21651006104`, adresse. `lib/data/contact.ts` le réexporte.
  - 0 occurrence de `contact@industryx0.com`.
  - **« Contacter un conseiller »** (6 fiches) : `mailto:` → `/contact`.
- **TODO :** l'ancienne adresse en .com doit-elle exister ou rediriger ?

### L1-12 [CODE] Identité — En revue (vérification des identités par l'équipe)
- **Fait :** 0 « Bilal » ; « Bilel Labidi » partout. Pas de JSON-LD de personne sur le site.
- **Identités présentes, à vérifier :**

| Personne / entité | Où | Rôle affiché |
|---|---|---|
| Bilel Labidi | `/entreprise` (carte et photo `bilel.png`), `site-facts.ts` | CEO & cofondateur |
| Aziz Battikh | `/entreprise` (carte et photo `aziz.png`), `site-facts.ts` | CTO & cofondateur |
| Témoignages (sans nom de personne) | accueil, `/customers` (`lib/data/testimonials.ts`) | Warda Company (Quality Manager), Polyroto Group (General Manager), Médis (Responsable Assurance Qualité), Saiph (Directrice Qualité), Rose Blanche Group (Responsable Production), Opella (Directeur des Opérations), Neapolis Pharma (Responsable Amélioration Continue), Medpack (Responsable Maintenance), TCH Industries (Directeur Industriel) |

### L1-13 [CODE] Menu et CTA — En revue
- **Fait :**
  - Sous-menus en vrais liens `<a href>` : Plateforme 9, Industries 6, Ressources 3 (Cas clients, Guides & analyses, FAQ), Société 3 (Entreprise, Partenaires, Contact).
  - **Correctif :** quand un sous-menu est ouvert, Tab sur son bouton n'y entrait pas, car le panneau est monté ailleurs dans le DOM. Désormais, Tab entre dans le panneau, et Tab depuis le dernier lien rejoint le bouton suivant.
  - Échap referme et rend le focus (vérifié dans Chrome sur les 4 menus).
  - « Solution » → « Plateforme » ; titre vedette en français ; « Guides & insights » → « Guides & analyses » partout.
  - **360 et 390 px :** header et bulle de chat ne masquent ni le CTA du hero, ni les champs, ni la case de consentement, ni le bouton d'envoi (test `elementFromPoint`).
- **À tester en préproduction :** le bandeau cookies, inactif en local (P14 de la recette).

### Corrections rapides — En revue (rattachées au lot 1)

| Point | Constat | Action |
|---|---|---|
| 3 H1 collés | Déjà corrigés | — |
| « Vus à la semaine » | Absent | — |
| Espaces doubles | Aucune dans les textes du code (le HTML regroupe les espaces consécutifs) | — |
| « 1. ### 1. » (Enti Win) | Absent | — |
| Numéros collés (« 01Combien ») | FAQ | Numéro `aria-hidden` et séparé de la question |
| `id="core-ops"` | Présent sur les 5 fiches dédiées ; Automobile utilise `#usages` | — |
| « Enti Win » | Écrit de façon identique dans tous les textes | — |
| FAQ : réponses absentes du HTML | 1 réponse sur 5 rendue | Les 5 rendues côté serveur (règle 5) |
| Carrousels Industries / Plateforme | Seule la diapositive active dans le HTML | Texte de toutes les diapositives présent (`hidden`) ; pas de défilement automatique sous `prefers-reduced-motion` |
| « Données live » | Fiches Industries | « Données en temps réel » |

### L1-14 [CODE + VALIDATION] Recette du lot 1 — En revue
- **Contrôles automatiques au vert :** voir `recette-lot-1.md` § 1.
- **14 parcours à rejouer** en préproduction puis sur la version publique, et procédure de retour arrière : `recette-lot-1.md`.

## Alerte hors périmètre (règles 1 et 2) — à trancher par l'équipe

1. **Témoignages non validés affichés.** Sur 9 témoignages, **7 sont au statut `draft`** : ce sont des propositions de rédaction attribuées à Médis, Saiph, Rose Blanche Group, Opella, Neapolis Pharma, Medpack et TCH Industries, non validées par ces clients. Ils sont pourtant affichés sur l'accueil et sur `/customers` (`getTestimonials(true)`). Il suffit de passer à `getTestimonials(false)` pour n'afficher que les 2 publiés. Changement visible : décision à prendre avant toute mise en ligne (L3-10).
2. **Chiffres et allégations non justifiés** encore en ligne :
   - « 21 clients » (accueil) contre « 15+ » (contact) ;
   - « plus de 30 ans de confiance » (`/entreprise`) ;
   - pourcentages des fiches Industries ;
   - « conformité garantie » (Automobile), « 21 CFR Part 11 ».

   Ils relèvent de L3-01, L3-03, L3-04 et L2-16.
3. **Fonctions des témoignages en anglais** dans la version FR (« Quality Manager », « General Manager ») : L3-10.

## Ce qui n'a pas été fait

- **Aucun push ni déploiement.**
- **Statut « Terminé » :** aucune tâche n'y est passée (règle 9).
- **Pas de test de composant du formulaire de contact :** voir L1-09.
- **Linkinator non utilisé :** remplacé par `scripts/check-links.mjs`.
