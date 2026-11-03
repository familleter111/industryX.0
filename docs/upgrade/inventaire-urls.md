# Inventaire des URL, liens, CTA et coordonnées (L1-01)

Généré le 28/10/2026 par `npm run check:links` (scripts/check-links.mjs) sur http://localhost:3123, branche `lot-1-fiabilite` au tag `pre-lot-1`. Le crawl part de `/` et `/en` et suit tous les liens internes du HTML rendu côté serveur.

**Résultat :** 55 pages, 1223 liens internes, 130 liens mailto:/tel:, 4 liens externes. **0 lien interne cassé, 0 ancre introuvable.**

## 1. Routes du dépôt

| Fichier | Route(s) |
|---|---|
| `app/[locale]/page.tsx` | `/` · `/en` |
| `app/[locale]/plateforme/[slug]/page.tsx` | `/plateforme/{remontee-terrain, planification-maintenance, gestion-ecarts, conformite-tracabilite, pilotage-performance, intelligence-operationnelle, integrations}` (lib/data/platform.ts) |
| `app/[locale]/plateforme/entiwin/page.tsx` | `/plateforme/entiwin` |
| `app/[locale]/industries/{pharma,food,cosmetics,electronics,packaging}/page.tsx` | `/industries/<secteur>` (pages dédiées) |
| `app/[locale]/industries/[slug]/page.tsx` | `/industries/automotive` (lib/data/industries) |
| `app/[locale]/resources/page.tsx · [slug]` | `/resources` · `/resources/<guide>` (4 guides, lib/data/guides.ts) |
| `app/[locale]/(marketing)/*` | `/contact` · `/customers` · `/entreprise` · `/faq` · `/partners` · `/privacy` · `/conditions-utilisation` |
| `app/api/*` | `POST /api/contact` · `POST /api/subscribe` · `POST /api/chat` |

Toutes les pages existent en français (sans préfixe) et en anglais (`/en/...`), voir `src/i18n/routing.ts`.

### Redirections permanentes (next.config.mjs)

```
/about  →  /entreprise
/en/about  →  /en/entreprise
/plateforme/terrain  →  /plateforme/remontee-terrain
/en/plateforme/terrain  →  /en/plateforme/remontee-terrain
/plateforme/qualite  →  /plateforme/gestion-ecarts
/en/plateforme/qualite  →  /en/plateforme/gestion-ecarts
/plateforme/pilotage  →  /plateforme/pilotage-performance
/en/plateforme/pilotage  →  /en/plateforme/pilotage-performance
/solutions/audits  →  /plateforme/remontee-terrain#audits
/en/solutions/audits  →  /en/plateforme/remontee-terrain#audits
/solutions/quality  →  /plateforme/remontee-terrain#inspections
/en/solutions/quality  →  /en/plateforme/remontee-terrain#inspections
/solutions/deviations  →  /plateforme/gestion-ecarts#deviations
/en/solutions/deviations  →  /en/plateforme/gestion-ecarts#deviations
/solutions/production  →  /plateforme/remontee-terrain#production
/en/solutions/production  →  /en/plateforme/remontee-terrain#production
/solutions/rounds  →  /plateforme/planification-maintenance#tournees
/en/solutions/rounds  →  /en/plateforme/planification-maintenance#tournees
/solutions/improvement  →  /plateforme/pilotage-performance#amelioration
/en/solutions/improvement  →  /en/plateforme/pilotage-performance#amelioration
```

## 2. Pages visitées et statut HTTP

| Page | Statut | Liens sortants |
|---|---|---|
| `/` | 200 | 32 |
| `/en` | 200 | 32 |
| `/contact` | 200 | 27 |
| `/plateforme/remontee-terrain` | 200 | 36 |
| `/partners` | 200 | 25 |
| `/plateforme/planification-maintenance` | 200 | 35 |
| `/plateforme/gestion-ecarts` | 200 | 35 |
| `/plateforme/conformite-tracabilite` | 200 | 35 |
| `/plateforme/pilotage-performance` | 200 | 35 |
| `/plateforme/intelligence-operationnelle` | 200 | 35 |
| `/plateforme/integrations` | 200 | 35 |
| `/plateforme/entiwin` | 200 | 28 |
| `/entreprise` | 200 | 26 |
| `/resources` | 200 | 37 |
| `/privacy` | 200 | 29 |
| `/conditions-utilisation` | 200 | 43 |
| `/faq` | 200 | 24 |
| `/en/contact` | 200 | 27 |
| `/en/` | 200 | 32 |
| `/en/plateforme/remontee-terrain` | 200 | 36 |
| `/en/partners` | 200 | 25 |
| `/en/plateforme/planification-maintenance` | 200 | 35 |
| `/en/plateforme/gestion-ecarts` | 200 | 35 |
| `/en/plateforme/conformite-tracabilite` | 200 | 35 |
| `/en/plateforme/pilotage-performance` | 200 | 35 |
| `/en/plateforme/intelligence-operationnelle` | 200 | 35 |
| `/en/plateforme/integrations` | 200 | 35 |
| `/en/plateforme/entiwin` | 200 | 28 |
| `/en/entreprise` | 200 | 26 |
| `/en/resources` | 200 | 37 |
| `/en/privacy` | 200 | 29 |
| `/en/conditions-utilisation` | 200 | 43 |
| `/en/faq` | 200 | 24 |
| `/customers` | 200 | 33 |
| `/resources/digitaliser-audits-terrain` | 200 | 31 |
| `/resources/non-conformites-capa` | 200 | 31 |
| `/resources/indicateurs-qualite-temps-reel` | 200 | 31 |
| `/resources/reussir-pilote-digitalisation` | 200 | 30 |
| `/industries/pharma` | 200 | 12 |
| `/industries/food` | 200 | 12 |
| `/industries/cosmetics` | 200 | 12 |
| `/industries/automotive` | 200 | 12 |
| `/industries/electronics` | 200 | 12 |
| `/industries/packaging` | 200 | 12 |
| `/en/customers` | 200 | 33 |
| `/en/resources/digitaliser-audits-terrain` | 200 | 31 |
| `/en/resources/non-conformites-capa` | 200 | 31 |
| `/en/resources/indicateurs-qualite-temps-reel` | 200 | 31 |
| `/en/resources/reussir-pilote-digitalisation` | 200 | 30 |
| `/en/industries/pharma` | 200 | 12 |
| `/en/industries/food` | 200 | 12 |
| `/en/industries/cosmetics` | 200 | 12 |
| `/en/industries/automotive` | 200 | 12 |
| `/en/industries/electronics` | 200 | 12 |
| `/en/industries/packaging` | 200 | 12 |

## 3. Liens internes (cible → statut, nombre de pages sources)

Une ligne par cible distincte. Le détail source par source est dans le rapport JSON (`npm run check:links -- <url> --report liens.json`).

| Cible | Statut | Ancre | Pages sources | Libellés |
|---|---|---|---|---|
| `/` | 200 | — | 27 | Accueil |
| `/#solutions` | 200 | ok | 2 | Voir la plateforme · Découvrir CIPA |
| `/conditions-utilisation` | 200 | — | 21 | Conditions d’utilisation · conditions générales d’utilisation |
| `/contact` | 200 | — | 27 | Demander une démo · Planifier une démo · Nous rejoindre |
| `/customers` | 200 | — | 7 | Voir les cas clients |
| `/en` | 200 | — | 28 | Home |
| `/en/#solutions` | 200 | ok | 3 | See the platform · Discover CIPA |
| `/en/conditions-utilisation` | 200 | — | 22 | Terms of use · terms of use |
| `/en/contact` | 200 | — | 28 | Book a demo · Join us · Book a demo Guided demo with our experts |
| `/en/customers` | 200 | — | 7 | See customer stories |
| `/en/entreprise` | 200 | — | 22 | About us |
| `/en/faq` | 200 | — | 22 | FAQ |
| `/en/industries/automotive` | 200 | — | 2 | Automotive & components Process control, shop-floor audits and structured action · Automotive & components Plant performance, process control, shop-floor audits an |
| `/en/industries/cosmetics` | 200 | — | 2 | Cosmetics & medical devices Compliance, inspections and operational document con · Cosmetics & medical devices Quality standardization, compliance and document con |
| `/en/industries/electronics` | 200 | — | 2 | Electronics & wiring Shop-floor standards, process checks and fewer deviations.  · Electronics & wiring Process checks, shop-floor standards and fewer deviations.  |
| `/en/industries/food` | 200 | — | 2 | Food & beverage Food safety, quality checks and shop-floor traceability. Read th · Food & beverage Quality checks, food safety, inspections and shop-floor traceabi |
| `/en/industries/packaging` | 200 | — | 2 | Packaging & plastics Production tracking, quality incidents and continuous impro · Packaging & plastics Shop-floor quality, production tracking, incidents and cont |
| `/en/industries/pharma` | 200 | — | 2 | Pharmaceuticals GMP, 21 CFR Part 11, deviations, CAPA and electronic batch recor · Pharmaceuticals GMP, traceability, deviations, CAPA and electronic batch records |
| `/en/partners` | 200 | — | 22 | Meet our partners · Partners |
| `/en/plateforme/conformite-tracabilite` | 200 | — | 22 | Compliance · 04 · Compliance Prove Workflows, change control & audit trail Explore · 04 · Compliance Prove Workflows, change control & audit trail You are here |
| `/en/plateforme/entiwin` | 200 | — | 22 | Enti Win |
| `/en/plateforme/gestion-ecarts` | 200 | — | 22 | Deviation management · 03 · Deviation management Control Deviations, CAPA & complaints Explore · 03 · Deviation management Control Deviations, CAPA & complaints You are here |
| `/en/plateforme/integrations` | 200 | — | 22 | Integrations · 07 · Integrations Connect ERP, MES, BI, organization & security Explore · 07 · Integrations Connect ERP, MES, BI, organization & security You are here |
| `/en/plateforme/integrations#securite` | 200 | ok | 22 | Security |
| `/en/plateforme/intelligence-operationnelle` | 200 | — | 22 | Operational intelligence · 06 · Operational intelligence Anticipate Weak signals, consistency & generated c |
| `/en/plateforme/pilotage-performance` | 200 | — | 22 | Performance · 05 · Performance Drive Dashboards, reports & continuous improvement Explore · 05 · Performance Drive Dashboards, reports & continuous improvement You are here |
| `/en/plateforme/planification-maintenance` | 200 | — | 22 | Planning · 02 · Planning Plan Audit programme, maintenance & equipment Explore · 02 · Planning Plan Audit programme, maintenance & equipment You are here |
| `/en/plateforme/remontee-terrain` | 200 | — | 22 | Shop-floor capture · 01 · Shop-floor capture Capture Audits, inspections & production checks You are  · 01 · Shop-floor capture Capture Audits, inspections & production checks Explore |
| `/en/plateforme/remontee-terrain#audits` | 200 | ok | 2 | Explore the feature |
| `/en/privacy` | 200 | — | 22 | Privacy policy · privacy policy |
| `/en/resources` | 200 | — | 22 | Guides & insights |
| `/en/resources/digitaliser-audits-terrain` | 200 | — | 4 | Featured Shop floor 15 September 2026 7 min read Digitizing shop-floor audits: a · Shop floor Digitizing shop-floor audits: a guide to moving from paper to mobile  |
| `/en/resources/indicateurs-qualite-temps-reel` | 200 | — | 4 | Performance Managing quality in real time: which indicators, and how to make the |
| `/en/resources/non-conformites-capa` | 200 | — | 4 | Quality Non-conformities and CAPA: structuring deviation handling through to clo |
| `/en/resources/reussir-pilote-digitalisation` | 200 | — | 4 | Method Running a successful industrial digitization pilot in a few weeks Start s |
| `/entreprise` | 200 | — | 21 | À propos |
| `/faq` | 200 | — | 21 | FAQ · Questions fréquentes |
| `/industries/automotive` | 200 | — | 2 | Automobile & composants Maîtrise process, audits terrain et plans d’action struc · Automobile & composants Performance usine, maîtrise process, audits terrain et p |
| `/industries/cosmetics` | 200 | — | 2 | Cosmétique & dispositifs médicaux Conformité, inspections et maîtrise documentai · Cosmétique & dispositifs médicaux Standardisation qualité, conformité et maîtris |
| `/industries/electronics` | 200 | — | 2 | Électronique & câblage Standards terrain, contrôles process et réduction des éca · Électronique & câblage Contrôles process, standards terrain et réduction des éca |
| `/industries/food` | 200 | — | 2 | Agroalimentaire & boissons Sécurité alimentaire, contrôles qualité et traçabilit · Agroalimentaire & boissons Contrôles qualité, sécurité alimentaire, inspections  |
| `/industries/packaging` | 200 | — | 2 | Packaging & plasturgie Suivi production, incidents qualité et amélioration conti · Packaging & plasturgie Qualité terrain, suivi production, incidents et améliorat |
| `/industries/pharma` | 200 | — | 2 | Pharmaceutique GMP, 21 CFR Part 11, déviations, CAPA et dossier de lot électroni · Pharmaceutique GMP, traçabilité, déviations, CAPA et dossier de lot électronique |
| `/partners` | 200 | — | 21 | Découvrir nos partenaires · Partenaires |
| `/plateforme/conformite-tracabilite` | 200 | — | 21 | Conformité · 04 · Conformité Prouver Workflows, change control & audit trail Découvrir · 04 · Conformité Prouver Workflows, change control & audit trail Vous êtes ici |
| `/plateforme/entiwin` | 200 | — | 21 | Enti Win |
| `/plateforme/gestion-ecarts` | 200 | — | 21 | Gestion des écarts · 03 · Gestion des écarts Maîtriser Déviations, CAPA & réclamations Découvrir · 03 · Gestion des écarts Maîtriser Déviations, CAPA & réclamations Vous êtes ici |
| `/plateforme/integrations` | 200 | — | 21 | Intégrations · 07 · Intégrations Connecter ERP, MES, BI, organisation & sécurité Découvrir · 07 · Intégrations Connecter ERP, MES, BI, organisation & sécurité Vous êtes ici |
| `/plateforme/integrations#securite` | 200 | ok | 21 | Sécurité |
| `/plateforme/intelligence-operationnelle` | 200 | — | 21 | Intelligence opérationnelle · 06 · Intelligence opérationnelle Anticiper Signaux faibles, cohérence & checklis |
| `/plateforme/pilotage-performance` | 200 | — | 21 | Pilotage · 05 · Pilotage Piloter Tableaux de bord, rapports & amélioration continue Découvr · 05 · Pilotage Piloter Tableaux de bord, rapports & amélioration continue Vous êt |
| `/plateforme/planification-maintenance` | 200 | — | 21 | Planification · 02 · Planification Planifier Programme d’audit, maintenance & équipements Découv · 02 · Planification Planifier Programme d’audit, maintenance & équipements Vous ê |
| `/plateforme/remontee-terrain` | 200 | — | 21 | Remontée terrain · 01 · Remontée terrain Capter Audits, inspections & contrôles de production Vous  · 01 · Remontée terrain Capter Audits, inspections & contrôles de production Décou |
| `/plateforme/remontee-terrain#audits` | 200 | ok | 1 | Découvrir la fonctionnalité |
| `/privacy` | 200 | — | 21 | Politique de confidentialité · politique de confidentialité |
| `/resources` | 200 | — | 21 | Guides & insights |
| `/resources/digitaliser-audits-terrain` | 200 | — | 4 | À la une Terrain 15 septembre 2026 7 min de lecture Digitaliser ses audits terra · Terrain Digitaliser ses audits terrain : le guide pour passer du papier au mobil |
| `/resources/indicateurs-qualite-temps-reel` | 200 | — | 4 | Pilotage Piloter la qualité en temps réel : quels indicateurs, et comment les fi |
| `/resources/non-conformites-capa` | 200 | — | 4 | Qualité Non-conformités et CAPA : structurer le traitement des écarts jusqu’à la |
| `/resources/reussir-pilote-digitalisation` | 200 | — | 4 | Méthode Réussir un pilote de digitalisation industrielle en quelques semaines Dé |
| `#acces` | 200 | ok | 2 | 3 . Accès au site · 3 . Access to the website |
| `#chat` | 200 | ok | 2 | 9 . Assistant de chat · 9 . Chat assistant |
| `#contact` | 200 | ok | 2 | 15 . Nous contacter · 15 . Contact us |
| `#contact-form` | 200 | ok | 2 | Décrire mon projet · Aller au formulaire de contact · Describe my project |
| `#contenus` | 200 | ok | 2 | 8 . Guides et contenus éditoriaux · 8 . Guides and editorial content |
| `#cookies` | 200 | ok | 2 | Cookies et mesure d’audience · Cookies and audience measurement |
| `#core-ops` | 200 | ok | 12 | Voir les cas d’usage · Découvrir les solutions · See the use cases |
| `#donnees` | 200 | ok | 2 | 12 . Données personnelles et cookies · 12 . Personal data and cookies |
| `#droit` | 200 | ok | 2 | 14 . Droit applicable et litiges · 14 . Governing law and disputes |
| `#editeur` | 200 | ok | 2 | 2 . Éditeur du site · 2 . Website publisher |
| `#fonctionnement` | 200 | ok | 2 | Voir comment ça marche · See how it works |
| `#formulaires` | 200 | ok | 2 | 5 . Formulaires et demandes · 5 . Forms and requests |
| `#guides` | 200 | ok | 2 | Parcourir les guides · Browse the guides |
| `#interdictions` | 200 | ok | 2 | 6 . Utilisations interdites · 6 . Prohibited uses |
| `#liens` | 200 | ok | 2 | 10 . Liens externes · 10 . External links |
| `#modifications` | 200 | ok | 2 | 13 . Modification des conditions · 13 . Changes to these terms |
| `#objet` | 200 | ok | 2 | 1 . Objet · 1 . Purpose |
| `#propriete` | 200 | ok | 2 | 7 . Propriété intellectuelle · 7 . Intellectual property |
| `#responsabilite` | 200 | ok | 2 | 11 . Responsabilité · 11 . Liability |
| `#services` | 200 | ok | 2 | 4 . Solutions présentées · 4 . Solutions presented |
| `#usages` | 200 | ok | 14 | Voir les usages · See the use cases |

## 4. CTA (appels à l’action)

Liens dont le libellé est une invitation (démo, contact, découvrir, voir, télécharger…), avec leur destination.

| Libellé | Destination | Pages |
|---|---|---|
| 01 · Shop-floor capture Capture Audits, inspections & production checks Explore | `/en/plateforme/remontee-terrain` | 6 |
| 02 · Planification Planifier Programme d’audit, maintenance & équipements Découv | `/plateforme/planification-maintenance` | 6 |
| 02 · Planification Planifier Programme d’audit, maintenance & équipements Vous ê | `/plateforme/planification-maintenance` | 1 |
| 02 · Planning Plan Audit programme, maintenance & equipment Explore | `/en/plateforme/planification-maintenance` | 6 |
| 03 · Deviation management Control Deviations, CAPA & complaints Explore | `/en/plateforme/gestion-ecarts` | 6 |
| 03 · Gestion des écarts Maîtriser Déviations, CAPA & réclamations Découvrir | `/plateforme/gestion-ecarts` | 6 |
| 04 · Compliance Prove Workflows, change control & audit trail Explore | `/en/plateforme/conformite-tracabilite` | 6 |
| 04 · Conformité Prouver Workflows, change control & audit trail Découvrir | `/plateforme/conformite-tracabilite` | 6 |
| 05 · Performance Drive Dashboards, reports & continuous improvement Explore | `/en/plateforme/pilotage-performance` | 6 |
| 05 · Pilotage Piloter Tableaux de bord, rapports & amélioration continue Découvr | `/plateforme/pilotage-performance` | 6 |
| 07 · Integrations Connect ERP, MES, BI, organization & security Explore | `/en/plateforme/integrations` | 6 |
| 07 · Intégrations Connecter ERP, MES, BI, organisation & sécurité Découvrir | `/plateforme/integrations` | 6 |
| 15 . Contact us | `#contact` | 1 |
| 15 . Nous contacter | `#contact` | 1 |
| Aller au formulaire de contact | `#contact-form` | 1 |
| Book a CIPA demo | `/en/contact` | 6 |
| Book a demo | `/en/contact` | 28 |
| Book a demo Guided demo with our experts | `/en/contact` | 2 |
| Contact | `/contact` | 21 |
| Contact | `/en/contact` | 22 |
| contact form | `/en/contact` | 2 |
| Découvrir CIPA | `/#solutions` | 1 |
| Découvrir la fonctionnalité | `/plateforme/remontee-terrain#audits` | 1 |
| Découvrir la gestion des écarts | `/plateforme/gestion-ecarts` | 1 |
| Découvrir la remontée terrain | `/plateforme/remontee-terrain` | 1 |
| Découvrir le pilotage de la performance | `/plateforme/pilotage-performance` | 1 |
| Découvrir les solutions | `#core-ops` | 5 |
| Découvrir nos partenaires | `/partners` | 1 |
| Demander une démo | `/contact` | 27 |
| Demander une démo Démo guidée avec nos experts | `/contact` | 1 |
| Demander une démonstration | `/contact` | 1 |
| Discover CIPA | `/en/#solutions` | 1 |
| Discover CIPA Performance | `/en/plateforme/pilotage-performance` | 1 |
| Discover CIPA Quality | `/en/plateforme/gestion-ecarts` | 1 |
| Discover CIPA Shop floor | `/en/plateforme/remontee-terrain` | 1 |
| Échanger avec notre équipe | `/contact` | 1 |
| Explore the feature | `/en/plateforme/remontee-terrain#audits` | 2 |
| Explore the solutions | `#core-ops` | 5 |
| Featured Shop floor 15 September 2026 7 min read Digitizing shop-floor audits: a | `/en/resources/digitaliser-audits-terrain` | 1 |
| Food & beverage Food safety, quality checks and shop-floor traceability. Read th | `/en/industries/food` | 1 |
| formulaire de contact | `/contact` | 2 |
| Go to the contact form | `#contact-form` | 1 |
| Method Running a successful industrial digitization pilot in a few weeks Start s | `/en/resources/reussir-pilote-digitalisation` | 4 |
| Parler à notre équipe | `/contact` | 1 |
| Parler à un expert Échange rapide sur vos besoins | `/contact` | 1 |
| Planifier une démo | `/contact` | 12 |
| Planifier une démo de CIPA | `/contact` | 6 |
| Planifier une démonstration | `/contact` | 1 |
| See CIPA on your own checklists | `/en/contact` | 1 |
| See customer stories | `/en/customers` | 7 |
| See how it works | `#fonctionnement` | 1 |
| See the platform | `/en/#solutions` | 2 |
| See the use cases | `#usages` | 7 |
| See the use cases | `#core-ops` | 1 |
| Talk to an expert A quick conversation about your needs | `/en/contact` | 2 |
| Talk to our team | `/en/contact` | 2 |
| Voir CIPA sur vos propres checklists | `/contact` | 1 |
| Voir comment ça marche | `#fonctionnement` | 1 |
| Voir la plateforme | `/#solutions` | 1 |
| Voir les cas clients | `/customers` | 7 |
| Voir les cas d’usage | `#core-ops` | 1 |
| Voir les usages | `#usages` | 7 |

## 5. mailto: et tel:

| Lien | Pages |
|---|---|
| `tel:+21651006104` | 55 pages |
| `mailto:hello@industryx0.pro` | 55 pages |

## 6. Liens externes

| URL | Pages |
|---|---|
| https://www.linkedin.com/company/industryx0/posts/?feedView=all | 55 |
| https://www.google.com/maps/search/?api=1&query=Cit%C3%A9+les+pins+Tunis+1053+Tunisie | 55 |
| https://entiwin.cipa-web.com/?utm_source=industryx0&utm_medium=website&utm_campaign=entiwin_launch&utm_content=hero | 2 |
| https://entiwin.cipa-web.com/?utm_source=industryx0&utm_medium=website&utm_campaign=entiwin_launch&utm_content=footer | 2 |
## 7. Constat des défauts de l'audit (revérifiés le 28/10/2026)

Reproduction : `npm run dev`, puis ouvrir la page indiquée ; « HTML » = vérifié dans le HTML servi (`curl`), « code » = recherche dans `src/`.

| # | Défaut (audit 14/10 / revue 28/10) | Page | Constat au tag `pre-lot-1` | Tâche |
|---|---|---|---|---|
| 1 | `/privacy` incomplète (loi, durées, date) | `/privacy` | Page complète (842 lignes) depuis 909d8df ; loi applicable, durées et date à relire | L1-03 |
| 2 | Deux gabarits, footer de l'ancien pointant vers `/` | toutes | **Corrigé** : un seul Navbar (layout) et un seul `Footer` ; 0 lien vers `/` hors logo et menu « Accueil ». **Reste** : variante `compact` sans colonnes de liens sur les 5 fiches Industries | L1-04 |
| 3 | `contact@industryx0.com` sur les pages Industries | `/industries/*` | **Corrigé** : seule mention restante dans un commentaire de `lib/data/contact.ts` ; 130 liens mailto:/tel: tous vers `hello@industryx0.pro` / `+21651006104` | L1-11 |
| 4 | `#core-ops` sans cible | `/industries/*` | **Corrigé** : `id="core-ops"` présent sur les 5 pages dédiées ; `/industries/automotive` utilise `#usages` (présente) | — |
| 5 | « Voir la plateforme » → `/contact` | `/` | **Corrigé** : → `/#solutions` (section CIPA, ancre présente) | L1-05 |
| 6 | H1 collés (« Structurerla »…) | `/plateforme/*` | **Corrigé** : H1 rendus « Capter la donnée terrain », « Maîtriser chaque écart », « Piloter la performance » | — |
| 7 | FAQ : 4 réponses vides sur 5 | `/faq` | **Encore présent** : les 5 réponses existent (`lib/data/faq.ts`) mais seule la réponse ouverte est rendue dans le HTML ; numéros collés au texte (« 01Combien ») ; pas de JSON-LD | Corrections rapides (L2-17 pour le contenu) |
| 8 | Onglets Industries / Plateforme : seul le 1er dans le HTML | `/industries/*`, `/plateforme/*` | À traiter avec la règle 5 (rendu serveur) ; voir rapport | Corrections rapides / L1-06 |
| 9 | « Bilal Labidi » | `/entreprise` | **Corrigé** : « Bilel » partout, 0 occurrence de « Bilal » | L1-12 |
| 10 | « Plus de 30 ans de confiance » | `/entreprise` | **Encore présent** (`teamLead`) | L2-16 (identité) — signalé |
| 11 | Chiffres clients 21 vs 15+ | `/`, `/contact` | **Encore présent** (« 21 clients » accueil, « 15+ » contact) | L3-01 |
| 12 | Libellés anglais (« Designed in Tunis », « Guides & insights », « Données live ») | footer, menu, Industries | **Encore présent** | L1-04, corrections rapides |
| 13 | Pourcentages sans source, « conformité garantie », « conformité stricte 21 CFR Part 11 » | `/industries/*` | **Encore présent** | L3-03 / L3-04 (hors lot 1) |
| 14 | Sélecteur FR/EN qui ne change pas le contenu | `/industries/packaging` | **Corrigé** : `/en/industries/packaging` est traduite (H1 « How CIPA is transforming the packaging & plastics industry », `lang="en"`) | L1-08 |
| 15 | `/solutions/audits` en 404 | — | **Corrigé** : redirection permanente (308) → `/plateforme/remontee-terrain#audits`, ancre présente | L1-02 |
| 16 | Libellé du CTA démo variable | toutes | **Encore présent** : « Demander une démo », « Planifier une démo », « Planifier une démo de CIPA », « Demander une démonstration », « Planifier une démonstration » | L1-05 (règle 7) |
| 17 | Mentions légales absentes | — | **Encore présent** (CGU présentes : `/conditions-utilisation`) | L1-03 |
