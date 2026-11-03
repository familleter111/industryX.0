# Guide de reprise

Pour la personne qui reprend le site : installer, modifier, vérifier, mettre en ligne. L'organisation du code est dans [architecture.md](architecture.md), ce qui reste à faire dans [backlog.md](backlog.md).

## 1. Installer et lancer

Prérequis : Node.js 22.18 ou plus (24 conseillé), npm.

```bash
npm install
cp .env.example .env.local     # puis renseigner ce dont on a besoin (tout est facultatif en local)
npm run dev                    # http://localhost:3000 (FR) et /en
```

Sans aucune variable, le site tourne entièrement en local : contenus du code, chat sans IA, demandes de démo dans `data/contacts.xlsx`, aucune mesure.

Studio Sanity (édition des contenus), dans un second terminal :

```bash
cd studio && cp .env.example .env && npm install && npm run dev   # http://localhost:3333
```

Sous Windows, si le contrôle d'applications bloque des binaires natifs : `rollup` est déjà remplacé par sa version WebAssembly (site et Studio, voir `package.json`).

## 2. Tâches courantes

| Je veux… | Où | Guide |
|---|---|---|
| Corriger un témoignage, une question de FAQ, un guide, le texte d'une page secteur | Studio Sanity, puis Publier | docs/cms.md |
| Publier un nouveau guide ou une page de campagne | Studio : nouveau document « Guide » ou « Page d'atterrissage » | docs/cms.md |
| Diffuser une campagne (LinkedIn, salon, radio) | Studio : page d'atterrissage ; copier le lien UTM de son aperçu | docs/cms.md |
| Modifier une page Solution | `src/lib/data/platform.ts` (+ calque anglais dans le même fichier) | README, « Traductions » |
| Ajouter une diapositive ou une étape à une page secteur | `src/lib/data/industries/<secteur>.ts` et `.en.ts`, puis le texte dans le Studio | docs/cms.md, « Pages secteurs » |
| Changer une adresse, un téléphone, un e-mail | `src/content/site-facts.ts` | — |
| Changer la destination d'un bouton « Demander une démo » | `src/lib/routes.ts` | — |
| Changer de CRM | variable `CRM_PROVIDER` (+ ses clés) dans Azure | docs/leads-integration.md |
| Activer l'IA du chatbot | `NEXT_PUBLIC_CHAT_AI=on` (build), `CHAT_PROVIDER` et sa clé (Azure) | docs/chatbot.md |
| Suivre un nouvel événement | `src/lib/analytics/events.ts` (typé), ou `data-cta` sur l'élément | README, « Analytics » |
| Ajouter un type de contenu au CMS | schéma Studio + lecteur `src/lib/cms/` + import + tests | docs/cms.md, « Ajouter un contenu » |
| Modifier un titre ou une description Google | `src/lib/seo/pages.ts`, ou le champ SEO du contenu dans le Studio | SEO-REPORT.md |

Règles de rédaction qui ont servi partout : pas de chiffre sans source (marqueurs `TODO(seo)` / `TODO(sources)`), pas de délai ni d'engagement non confirmé, une information non validée ne s'affiche pas (`docs/upgrade/a-confirmer.md`).

## 3. Vérifier avant de mettre en ligne

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

La CI rejoue ces quatre commandes sur chaque branche. Pour une modification visible, en plus, sur la version construite (`npm start`, dans un autre terminal) :

```bash
BASE_URL=http://localhost:3000 npm run check:i18n    # pas de français sur les pages anglaises
npm run check:links -- http://localhost:3000         # aucun lien interne cassé, aucune ancre manquante
BASE_URL=http://localhost:3000 npm run audit:seo     # titres, descriptions, hreflang, sitemap, images
```

Puis la préversion : ouvrir une pull request vers `main`, attendre le lien « View deployment », relire en ligne (docs/preview.md).

## 4. Mettre en ligne

1. Pull request vers `main`, CI au vert, préversion relue.
2. Fusion : `deploy.yml` construit et publie sur Azure (App Service `industryx0`), en quelques minutes.
3. Contrôle : la page modifiée, `robots.txt`, une demande de démo de test.

Un contenu du CMS ne demande aucune mise en ligne : il est publié depuis le Studio (webhook, ou une heure au plus).

## 5. Comptes et accès à transmettre

Aucun secret n'est dans le dépôt : `.env.local` et les variables Azure / GitHub les portent. À la reprise, faire transmettre (ou recréer) les accès, puis renouveler les clés :

| Service | Accès | Utilisé pour |
|---|---|---|
| GitHub (`familleter111/industryX.0`) | dépôt, Secrets and variables | code, CI, déploiements |
| Azure | App Service `industryx0` (+ emplacement `staging`), ressource Azure OpenAI | hébergement, variables serveur, IA |
| Sanity | organisation `opAnMgqO5`, projet `tudyxwtm` | contenus, Studio (`industryx0.sanity.studio`, une fois déployé) |
| PostHog, Google Analytics | projets de mesure (production, préversion) | audience, entonnoirs |
| CRM (HubSpot, Brevo ou Pipedrive), Resend | compte et clés API | leads, e-mail de secours |
| Anthropic (si `CHAT_PROVIDER=anthropic`) | clé API | IA du chatbot |

Jetons à durée limitée : le jeton Sanity « Editor » de l'import (`SANITY_WRITE_TOKEN`) ne sert qu'en local ; le supprimer dans Sanity une fois les imports finis.

## 6. Pièges connus

- **Composant serveur `async`** : pas de hook (`useCopy`, `useCurrentLocale`) dedans ; prendre la langue dans `params` (`COPY[locale]`). Les composants enfants peuvent en utiliser.
- **Liens vers une ancre de l'accueil** (`/#faq`, `/#solutions`) : passer par `homeAnchorHref()` (`src/i18n/navigation.ts`) ; une chaîne brute donne `/en/#…` sur la version anglaise.
- **Calques anglais par position** (`overlay`) : un élément ajouté à une liste française doit l'être au même rang dans la version anglaise (et dans le CMS pour les secteurs).
- **Variables `NEXT_PUBLIC_*`** et projet Sanity : figés au build ; les changer demande une nouvelle build (dans GitHub ou `deploy.yml`, pas seulement dans Azure).
- **Studio** : projet séparé, React 19 ; ne pas importer `sanity` dans le site (React 18).
- **Témoignages** : l'accueil et `/customers` affichent encore les propositions non validées (`includeDrafts: true`) ; à retirer dès que l'entreprise a tranché (backlog, P0).
