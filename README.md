# Industry X.0 — Website Next.js

Site vitrine d'Industry X.0 construit avec Next.js 14, Tailwind CSS et Framer Motion.

## Stack

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS v3
- **Animations** : Framer Motion v11
- **Icons** : Lucide React
- **Fonts** : Syne (display) + Outfit (body) via next/font/google
- **Language** : TypeScript

## Démarrage

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
npm start
```

Le site sera disponible sur [http://localhost:3000](http://localhost:3000)

## Qualité

```bash
npm run lint        # ESLint (next/core-web-vitals)
npm run typecheck   # TypeScript, sans émettre
npm test            # Vitest : téléphone, limiteur, route /api/contact, sitemap / SEO
npm run test:watch  # Vitest en continu
```

Les trois tournent en CI (`.github/workflows/ci.yml`) sur chaque pull request
et chaque push hors de `main`, suivis de `npm run build`.

`rollup` est un alias de `@rollup/wasm-node` (voir package.json) : la version
native est bloquée par le contrôle d'applications de Windows, la version
WebAssembly tourne partout.

## Analytics (PostHog) et campagnes

Sans `NEXT_PUBLIC_POSTHOG_KEY`, rien n'est chargé : pas de mesure, pas de bandeau. Pour
l'activer :

1. Créer un projet **PostHog EU Cloud** (et un second pour la preview et le dev).
2. Mettre la clé `phc_…` dans `.env.local` (voir `.env.example`) et dans une
   **variable GitHub Actions** `NEXT_PUBLIC_POSTHOG_KEY`. La valeur est figée au build,
   la déclarer dans Azure ne suffit pas (voir `deploy.yml`).

Fonctionnement (`src/lib/analytics/`, `src/components/analytics/`) :

- **Taxonomie** : `events.ts` est la seule liste d'événements autorisée. `track()` est
  typé dessus, donc un nom ou une propriété faux ne compile pas.
- **CTA** : aucun lien n'est instrumenté à la main. Un écouteur unique suit tout lien
  vers `/contact`, ainsi que tout élément `data-cta="<id>"`. La zone vient de
  `data-cta-location` (`hero`, `cta_band`…), sinon `footer` / `navbar` / `page`.
  Pour un lien vers Enti Win, poser `data-cta="entiwin_<zone>"` : le clic envoie
  `entiwin_clicked`, et le lien emporte les UTM et l'identifiant PostHog (`ix0_id`).
- **Consentement** (`ConsentBanner`) : avant réponse, PostHog tourne en mémoire, sans
  cookie. « Accepter » passe en cookie et active les replays (champs masqués).
  « Refuser » coupe tout. Le lien « Gérer les cookies » du pied de page rouvre le bandeau.
- **Proxy** : les appels passent par `/ingest` sur notre domaine (rewrites de
  `next.config.mjs`), sinon les bloqueurs de publicité les coupent.
- **Attribution** : UTM et `ref` sont captés à l'arrivée, puis joints aux demandes de
  démo et aux inscriptions (colonnes `utm_*`, `ref`, `Première visite`, `ID PostHog` du
  fichier Excel).

| Événement | Quand |
|---|---|
| `$pageview` | chaque page, avec `locale` |
| `cta_clicked` | clic sur un CTA (`cta_id`, `location`, `destination`) |
| `demo_form_started` / `_submitted` / `_failed` | formulaire /contact |
| `newsletter_subscribed` | inscription aux guides |
| `chat_opened`, `chat_message_sent` | assistant (jamais le texte) |
| `guide_viewed` | page guide |
| `language_switched`, `entiwin_clicked` | sélecteur de langue, liens Enti Win |

## SEO

- `src/app/sitemap.ts` et `src/app/robots.ts` servent `/sitemap.xml` et `/robots.txt`.
- La liste des pages vit dans `src/lib/site.ts` (`publicPaths`) : une page ajoutée
  doit y être déclarée, sinon le test `tests/site.test.ts` échoue.
- L'adresse publique vient de `NEXT_PUBLIC_SITE_URL` (défaut : https://www.industryx0.pro).
- `/about` redirige vers `/entreprise` (next.config.mjs).

## Structure

```
├── public/                     # Assets statiques (images, logos, drapeaux…)
├── src/
│   ├── app/                    # App Router : pages, layouts, routes API
│   │   ├── icon.png, apple-icon.png
│   │   ├── [locale]/           # Langue (fr par défaut, en sous /en)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx        # Accueil
│   │   │   ├── (marketing)/    # Route group (n'apparaît pas dans l'URL)
│   │   │   │   ├── contact/  customers/  entreprise/
│   │   │   │   └── faq/  partners/  privacy/
│   │   │   ├── industries/     # Pages sectorielles + [slug]
│   │   │   ├── plateforme/[slug]/
│   │   │   └── resources/      # Bibliothèque de guides + [slug]
│   │   ├── sitemap.ts, robots.ts  # SEO (liste des pages : lib/site.ts)
│   │   └── api/
│   │       ├── contact/route.ts
│   │       └── subscribe/route.ts
│   ├── components/             # Composants réutilisables
│   │   ├── ui/                 # Briques d'interface (Section, Reveal, PhoneField…)
│   │   ├── analytics/          # AnalyticsProvider, ConsentBanner, TrackOnMount
│   │   ├── layout/             # Navbar, Footer, ChatWidget, WelcomeIntro
│   │   └── sections/           # Sections de pages (Hero, CTASection…)
│   ├── features/               # Composants métier
│   │   ├── industries/         # IndustryPage, SmartCarousel, visuels
│   │   ├── platform/           # Pages plateforme
│   │   └── resources/          # Guides, inscription
│   ├── lib/                    # Utilitaires et configuration
│   │   ├── data/               # Contenus (fr + overlays en)
│   │   ├── analytics/          # PostHog, taxonomie, consentement, UTM
│   │   ├── server/             # Helpers des routes API (messages, rateLimit)
│   │   ├── tokens.ts  motion.ts  i18n.ts  phone.ts  orbit-geometry.ts
│   ├── hooks/                  # useMotion
│   ├── services/               # leads.ts : journal Excel des demandes
│   ├── i18n/                   # Configuration next-intl (routing, request, navigation)
│   ├── types/                  # Déclarations TypeScript
│   ├── styles/                 # globals.css
│   └── middleware.ts           # Redirection de langue
├── scripts/                    # check-hex, check-i18n, gen-countries
├── tests/                      # Tests Vitest (npm test)
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json               # Alias @/* → src/*
```

## Couleurs Brand

| Variable | Valeur | Usage |
|----------|--------|-------|
| `gold` | `#DAA250` | Couleur primaire, CTA, accents |
| `dark` | `#0C0D12` | Fond sombre, texte principal |
| `cream` | `#F4F3EE` | Fond clair |
| `metric-green` | `#22C55E` | Métriques positives |

## Personnalisation

- Modifier les textes dans chaque composant, en français et en anglais (voir « Traductions »)
- Les couleurs sont centralisées dans `tailwind.config.ts`
- Les animations Framer Motion sont dans chaque composant
- Ajouter vos vraies images/logos dans `/public`

## Traductions (FR / EN)

Le site existe en français et en anglais, avec `next-intl` pour le routage :

- le français garde les adresses historiques (`/`, `/plateforme/terrain`…),
  l'anglais vit sous `/en/...` (`src/i18n/routing.ts`, `src/middleware.ts`) ;
- le sélecteur de la barre de navigation change de langue sans quitter la
  page (ancre comprise) et mémorise le choix dans le cookie `NEXT_LOCALE` ;
- chaque page déclare ses deux versions aux moteurs de recherche (`hreflang`,
  via `pageMetadata` dans `src/lib/i18n.ts`).

Les textes restent à côté du balisage, dans les deux langues :

| Où est le texte | Comment il est traduit |
|---|---|
| Dans un composant | objet `COPY = { fr: {...}, en: {...} }` lu par `useCopy(COPY)` |
| Dans une donnée (`src/lib/data/*.ts`) | version anglaise posée sur la française par `overlay()` : seuls les textes sont recopiés, pas les icônes ni les chiffres (`platform.ts`, `features.ts`, `guides.en.ts`, `industries/automotive.en.ts`…) |
| Pages sectorielles `src/app/[locale]/industries/*` | libellés communs dans `src/lib/data/industries/chrome.ts`, textes propres à la page dans une table `EN` indexée par le français et lue par `useTr` |
| Erreurs des formulaires | `src/lib/server/messages.ts` : le formulaire envoie sa langue, l'API répond dans cette langue |

Pour modifier un texte, changer **les deux** versions. Pour vérifier qu'aucun
texte français ne reste sur les pages anglaises (site lancé) :

```bash
npm run check:i18n                               # contre http://localhost:3000
BASE_URL=http://localhost:3456 npm run check:i18n
```

Restent en français : les textes incrustés dans certaines images
(`about*.png`, `jo*.png`, `sol*.png`, `indus2050.png`, pastilles ODD de
`public/ODD`) — leur `alt` est traduit, l'image elle-même attend une version
anglaise des fichiers.

## Formulaire de contact → Excel

Chaque demande envoyée depuis `/contact` (« Planifier une démonstration »)
devient une ligne de **`data/contacts.xlsx`**, feuille `Demandes` : date et
heure, prénom, nom, email, téléphone au format international, pays, société,
industrie, message, consentement, page d'origine. Le fichier est créé au
premier envoi ; il suffit de l'ouvrir dans Excel pour voir les demandes.

- Route : `src/app/api/contact/route.ts` — revalide tout, refuse les robots (champ
  piège) et limite à 5 envois par IP par quart d'heure.
- Écriture : `src/services/leads.ts` — écritures sérialisées et atomiques.
- Emplacement : `CONTACT_XLSX_PATH` dans `.env` pour écrire ailleurs
  (`D:/partage/demandes.xlsx`, un dossier réseau monté…).
- Si le classeur est ouvert dans Excel au moment d'un envoi, Windows le
  verrouille : la demande part alors dans `data/contacts-secours.csv` plutôt
  que d'être perdue. Recopier ces lignes dans le classeur, puis supprimer le
  CSV.
- `data/` est exclu de git : ces fichiers contiennent des données
  personnelles.

> Hébergement : cela suppose un serveur avec disque persistant (VPS, Docker
> avec volume, `next start`). Sur Vercel ou Netlify, le disque est en lecture
> seule — il faut alors viser un stockage externe (base, Google Sheets, S3).

### Champ téléphone

`src/components/ui/PhoneField.tsx` : sélecteur de pays (drapeau + indicatif) qui
impose la forme du numéro du pays choisi — `+216 20 123 456`,
`+33 6 12 34 56 78`. Tunisie, France, Espagne, Italie et Allemagne ouvrent la
liste, suivies de l'Afrique, l'Europe, le Moyen-Orient, les Amériques, l'Asie
et l'Océanie.

```bash
npm run gen:countries   # régénère src/lib/data/phoneCountries.ts + public/flags
npm test                # vérifie notamment la mise en forme des numéros (tests/phone.test.ts)
```

## Notes

- Toutes les images de clients/logos sont des placeholders à remplacer
- Les témoignages sont fictifs — remplacer par de vrais témoignages
