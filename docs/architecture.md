# Architecture

Site marketing d'Industry X.0 (produit CIPA, outil Enti Win) : un site Next.js bilingue, hébergé sur Azure, qui s'appuie sur des services externes pour les contenus, les leads, l'assistant de chat et la mesure. Ce document décrit comment les pièces s'assemblent ; le détail de chaque brique est dans son propre guide (tableau en fin de page).

## Vue d'ensemble

```
 Visiteurs (LinkedIn, salons / QR, Google…)  ── UTM, ref ──┐
                                                           ▼
 ┌──────────────── Azure App Service : site Next.js 14 ────────────────┐
 │ Pages FR / EN, statiques, régénérées en arrière-plan (ISR)           │
 │ Routes API : /api/contact (leads)   /api/chat (assistant IA)        │
 │              /api/chat/faq/<lang>   /api/subscribe (guides)         │
 │              /api/revalidate (webhook CMS)                           │
 │ /ingest : relais PostHog sur notre domaine   /og : images de partage │
 └──────┬──────────────┬─────────────────┬────────────────┬────────────┘
        │              │                 │                │
   Sanity (CMS)   Azure OpenAI       Excel + CRM       PostHog · GA4
   lecture API    ou Claude          (HubSpot, Brevo,  (après
   + Studio       (chatbot)          Pipedrive)        consentement)
                                     + webhook n8n
                                     + e-mail Resend
                                                        Enti Win
                                                        (app séparée,
                                                        liens tracés)

 GitHub ── ci.yml (lint, types, tests, build) sur chaque branche
        ── preview.yml : pull request → emplacement Azure « staging »
        ── deploy.yml  : main → production Azure
```

## Stack

| Couche | Technologies | Choix |
|---|---|---|
| Framework | Next.js 14 (App Router), React 18, TypeScript strict | rendu serveur, pages statiques, routes API dans le même projet |
| Interface | Tailwind CSS (jetons dans `src/lib/tokens.ts`), Framer Motion, lucide-react | composants réutilisables, animations sobres |
| Langues | next-intl : français à la racine, anglais sous `/en` | hreflang, sitemap bilingue |
| Contenus | Sanity (CMS headless), lu par `fetch` (GROQ) ; Studio séparé (`studio/`) | pas de SDK : les SDK Sanity exigent React 19 |
| IA | Azure OpenAI ou Anthropic Claude (`CHAT_PROVIDER`) | réponses en flux, cache de prompt, plafond quotidien |
| Leads | exceljs, API HubSpot / Brevo / Pipedrive, webhook HMAC, Resend | aucune perte : destinations en parallèle et secours |
| Mesure | PostHog (UE) relayé par `/ingest`, GA4 | consentement d'abord ; attribution UTM jointe au lead |
| Qualité | Vitest (347 tests), ESLint, `tsc`, scripts `check:*`, `audit:seo` | rejoués en CI |
| Hébergement | Azure App Service, GitHub Actions | `main` → production, pull request → préversion |

## Arborescence

```
src/
  app/[locale]/        pages (FR / EN) : accueil, (marketing)/…, plateforme/[slug], industries/[slug],
                       resources/[slug], lp/[slug] (atterrissage), mentions-legales…
  app/api/             contact, chat (+ chat/faq/[locale]), subscribe, revalidate
  app/og/[image]       images de partage (runtime edge)
  app/sitemap.ts, robots.ts, manifest.ts
  components/          layout (Navbar, Footer, ChatWidget, PreviewBadge), sections de l'accueil, seo, ui, analytics
  features/            blocs propres à un type de page : industries (gabarit des 6 secteurs), platform, resources,
                       landing, legal, chat
  lib/
    data/              contenus écrits dans le code (repli du CMS, ou seule source : pages Solution…)
    cms/               lecteurs Sanity : testimonials, faq, guides, industries, landings, seo
    chat/              assistant : réponses locales, base de connaissances, consignes, route, garde-fous
    leads/, crm/       demande de démo : validation, destinations, CRM
    analytics/         PostHog, GA4, attribution, suivi des CTA
    seo/               métadonnées, table des titres, données structurées, dates du sitemap
    server/            limiteur, anti-doublon
    i18n.ts, routes.ts, site.ts, tokens.ts
  content/site-facts.ts  faits affichés (identité, coordonnées) : source unique
  i18n/                routage next-intl, navigation (Link, homeAnchorHref)
studio/                Sanity Studio (projet séparé, React 19)
scripts/               contrôles (check-*), audit SEO, import CMS, génération de données
tests/                 Vitest
docs/                  guides (voir la fin de ce document)
```

## Rendu et cache

- **Pages statiques** générées au build, en français et en anglais. Celles qui lisent le CMS deviennent **ISR** : le fetch Sanity est mis en cache une heure, avec les étiquettes `cms` et `cms:<type>`.
- **Publication** : un document publié dans le Studio déclenche le webhook `/api/revalidate` (secret `SANITY_REVALIDATE_SECRET`), qui invalide `cms:<type>` : seules les pages concernées se régénèrent.
- **Contenus nouveaux** : un guide ou une page d'atterrissage créé dans le Studio est rendu à sa première visite (`dynamicParams`), sans build.
- **Routes dynamiques** : `/api/contact`, `/api/chat` (aucun cache). `/api/chat/faq/<langue>` est statique et suit le cache du CMS.
- **Images de partage** : `/og/<langue>__<chemin>.png`, rendues à la demande en runtime edge (la version Node de next/og échoue sous Windows).
- **Variables figées au build** : toutes les `NEXT_PUBLIC_*`, et `SANITY_PROJECT_ID` / `SANITY_DATASET` (écrites dans le code par `next.config.mjs`). Les secrets restent des variables serveur (Azure).

## Langues

- `fr` par défaut, à la racine ; `en` sous `/en`. Les chemins restent en français (`/en/plateforme/...`, voir le TODO de `src/i18n/routing.ts`).
- Textes d'interface : objets `{ fr, en }` dans chaque composant (`useCopy`). Données structurées : un fichier français et un calque anglais posé par `overlay` (`lib/i18n.ts`), position par position.
- Contenus du CMS : champs `{ fr, en }` ; sans anglais, le français s'affiche (sauf les secteurs : le texte du code).
- `npm run check:i18n` signale le français resté sur les pages anglaises.

## Contenus : où est la source

| Contenu | Source | Repli |
|---|---|---|
| Témoignages, FAQ, guides, pages d'atterrissage | Sanity | `src/lib/data/*.ts` |
| Textes des 6 pages secteurs | Sanity (textes) + code (structure, icônes, visuels) | `src/lib/data/industries/` |
| Pages Solution, accueil, entreprise, clients, partenaires | code (`src/lib/data/platform.ts`, composants) | — |
| Identité, coordonnées | `src/content/site-facts.ts` | — |
| Base de l'assistant | FAQ du CMS + `src/lib/chat/knowledge.ts` + `src/lib/data/chatbotBase.ts` | fichiers locaux |

Sans `SANITY_PROJECT_ID`, le site n'appelle jamais Sanity et affiche les fichiers locaux. Si Sanity ne répond pas, chaque lecteur se replie sur le fichier local (les témoignages : verbatims validés seulement).

## Flux principaux

**Demande de démo** (`/contact` → `POST /api/contact`, docs/leads-integration.md) : validation serveur, antispam (champ piège, limiteur par IP, anti-doublon), puis en parallèle le tableur Excel, le CRM choisi et le webhook signé. Une destination en échec déclenche un e-mail de secours ; la demande n'est jamais perdue (CSV de secours si le tableur est verrouillé). La source de la visite (UTM, `ref`, page d'arrivée, identifiant PostHog) accompagne le lead.

**Assistant de chat** (docs/chatbot.md) : le widget répond d'abord sans IA (FAQ publiée, réponses prêtes, politesse), puis appelle `/api/chat` : même origine, limites par IP, plafond quotidien, réponses signées (HMAC) pour que l'historique renvoyé ne puisse pas être falsifié. En panne ou au plafond : réponse locale qui oriente vers le formulaire.

**Publication d'un contenu** (docs/cms.md) : Studio → Sanity → webhook → `revalidateTag('cms:<type>')` → page régénérée à la visite suivante.

**Mesure** (README, « Analytics ») : rien avant consentement pour GA4 ; PostHog sans cookie avant. Tout clic vers `/contact` ou tout élément `data-cta` est suivi par un seul écouteur (`lib/analytics/cta.ts`). Les liens vers Enti Win emportent la source de la visite.

**Mise en ligne** (docs/preview.md) : branche → pull request → préversion (`staging`, noindex, badge) → fusion dans `main` → production.

## Sécurité

- Clés et jetons uniquement côté serveur (routes API, variables Azure) ; aucune `NEXT_PUBLIC_*` secrète.
- Routes API : contrôle de l'origine, taille du corps, limites par IP, champ piège ; webhooks signés (HMAC SHA-256) ou protégés par un secret comparé en temps constant.
- Aucune donnée personnelle dans les journaux ni dans les événements de mesure (ni e-mail, ni texte saisi).
- En-têtes de sécurité sur toutes les réponses (`next.config.mjs`) ; pas encore de Content-Security-Policy (backlog).

## Guides détaillés

| Sujet | Document |
|---|---|
| Démarrage, scripts, analytics, traductions | [README.md](../README.md) |
| Reprendre le projet, tâches courantes | [docs/reprise.md](reprise.md) |
| Ce qui reste à faire | [docs/backlog.md](backlog.md) |
| CMS Sanity | [docs/cms.md](cms.md) |
| Assistant de chat | [docs/chatbot.md](chatbot.md) |
| Leads, CRM, webhook | [docs/leads-integration.md](leads-integration.md) |
| Préversion | [docs/preview.md](preview.md) |
| SEO : changements et audit | [SEO-REPORT.md](../SEO-REPORT.md) |
| Lot 1 (fiabilité) : rapport, recette, questions ouvertes | [docs/upgrade/](upgrade/) |
