# Backlog

Ce qui reste à faire, par priorité, au 3 novembre 2026. Chaque ligne renvoie à l'endroit du code ou du document qui la porte. Les questions à faire trancher par l'entreprise sont détaillées dans [docs/upgrade/a-confirmer.md](upgrade/a-confirmer.md) (identifiants U, I, D, C, P).

## P0 — avant la mise en ligne

| Tâche | Qui | Où |
|---|---|---|
| Fusionner `hamza-src` dans `main` et déployer (la production tourne sur une version antérieure) | équipe | docs/reprise.md, § 4 |
| Déployer le Studio Sanity, créer le webhook de publication, déclarer `SANITY_REVALIDATE_SECRET` dans Azure | technique | docs/cms.md, étapes 5 et 6 |
| Faire valider les 7 témoignages « à valider », ou n'afficher que les 2 validés (retirer `includeDrafts: true`) | direction commerciale | U1 ; `src/app/[locale]/page.tsx`, `customers/page.tsx` |
| Trancher les chiffres contradictoires (« 21 clients » / « 15+ », « 30 ans ») | direction | U2, U3 |
| Identité légale, puis publier les mentions légales (retirer le noindex, ajouter au footer et à `publicPaths`) | direction, comptabilité | I1–I4 ; `mentions-legales/page.tsx` |
| Relire la politique de confidentialité (loi applicable, durées, hébergement, Azure OpenAI) | référent données | D1–D6 ; `privacy/page.tsx` |

## P1 — fin du périmètre du brief

| Tâche | Où |
|---|---|
| Chatbot : recherche documentaire, étape 1 faite (mots-clés, `CHAT_RETRIEVAL=keyword`, à activer en production après recette) ; étape 2 : embeddings (Azure OpenAI), même variable, même route | docs/chatbot.md, « Activer la recherche » ; `src/lib/chat/retrieve.ts` |
| PostHog : entonnoirs et tableaux de bord (visite → démo, visite → Enti Win, par canal et par page d'atterrissage) ; vérifier la clé de production dans GitHub | README, « Analytics » |
| Activer la préversion : emplacement `staging`, secret et variables GitHub | docs/preview.md |
| Délai de réponse commercial à annoncer, puis le rétablir (contact, chat) | C2, L2-15 ; `contact/page.tsx` |
| Relire et valider les 4 guides (auteur, dates, contenu) | `src/lib/data/guides.ts` (en-tête) |

## P2 — améliorations prévues

| Tâche | Où |
|---|---|
| Page produit CIPA dédiée, puis y faire pointer les « Découvrir CIPA » | L2-05 ; `src/lib/routes.ts` |
| Formulaire pré-rempli par offre et par page (`?offre=…&source=…`) | L2-14 ; `src/lib/routes.ts` |
| Chiffres du site avec statut (seuls les faits validés s'affichent) | L3-01 ; `src/content/site-facts.ts` |
| Slugs anglais (`/en/platform/…`) avec redirections | `src/i18n/routing.ts` (TODO seo) ; SEO-REPORT.md |
| Content-Security-Policy (scripts Next, GA4, PostHog à autoriser et tester) | `next.config.mjs` ; SEO-REPORT.md |
| Aperçu des brouillons du CMS sur le site (mode « draft ») | docs/cms.md, « Limites » |
| Logos clients dans le Studio (champ image) | docs/cms.md, « Limites » |
| Pages Solution dans le CMS (sur le modèle des secteurs : textes au CMS, structure dans le code) | `src/lib/data/platform.ts` |
| Réponses de prospection du chatbot dans le CMS | `src/lib/data/chatbotBase.ts` |
| Dates du sitemap pour les contenus modifiés dans le Studio (aujourd'hui : dernier commit) | `src/lib/seo/lastModified.ts` |

## Vérifications ponctuelles (marqueurs dans le code)

| Point | Où |
|---|---|
| Sources des chiffres de l'accueil (« retours d'expérience ») | `src/components/sections/HowItWorks.tsx` (TODO seo, TODO sources) |
| Liste des secteurs du bloc CIPA, différente des pages sectorielles | `src/components/sections/CipaSection.tsx` (TODO seo) |
| « Web, iOS, Android » des données structurées, à confirmer | `src/lib/seo/schema.ts` (TODO seo) |
| Page Facebook encore active ? | `src/lib/data/socials.ts` (TODO seo) |
| Licence des pictogrammes ODD | `src/components/sections/SdgContribution.tsx` (TODO licence) |
| Stack et points de conformité de la section Architecture | `src/lib/data/architecture.ts` (TODO stack, TODO conformite) |
| Adresse `contact@industryx0.com` : supprimer ou rediriger ? | C1 ; `src/content/site-facts.ts` |
| Commune d'un logo client | `src/lib/data/clientLogos.ts` (TODO) |

## Dette technique

| Sujet | Détail |
|---|---|
| Couleurs en dur | `npm run check:hex` liste les valeurs hexadécimales hors jetons (page contact surtout) : les remplacer par les jetons de `src/lib/tokens.ts` |
| Montée de version Next.js / React | Next 15–16 et React 19 permettraient `next-sanity` et un Studio intégré au site ; à faire avec une recette complète |
| Titre de l'accueil à 66 caractères | imposé par le brief SEO, au-dessus de la cible de 60 (`src/lib/seo/pages.ts`) |
