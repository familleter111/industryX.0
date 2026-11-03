# CMS headless (Sanity)

Les contenus éditoriaux du site sont dans **Sanity**, le CMS headless recommandé par le brief. L'équipe les modifie dans le **Studio** (une interface web), sans développeur ni redéploiement.

Projet Sanity : `tudyxwtm`, dataset `production` (organisation `opAnMgqO5`). Sans configuration, rien ne change : le site garde ses contenus locaux (`src/lib/data/`) et n'appelle jamais Sanity.

## Ce qui est dans le CMS

| Contenu | Type Sanity | Lu par | Affiché sur | Fichier local (repli et import) |
|---|---|---|---|---|
| Témoignages clients | `testimonial` | `src/lib/cms/testimonials.ts` | accueil, `/customers` | `src/lib/data/testimonials.ts` |
| Questions fréquentes | `faq` | `src/lib/cms/faq.ts` | accueil (section `#faq` et données FAQPage), assistant de chat | `src/lib/data/faq.ts` |
| Guides | `guide` | `src/lib/cms/guides.ts` | `/resources`, `/resources/<slug>`, sitemap, images de partage | `src/lib/data/guides.ts`, `guides.en.ts` |
| Pages d'atterrissage par canal | `landing` | `src/lib/cms/landings.ts` | `/lp/<slug>` (noindex, hors sitemap), image de partage | `src/lib/data/landings.ts` |
| Textes des pages secteurs | `industry` | `src/lib/cms/industries.ts` | `/industries/<slug>` (les 6 secteurs), titre et description Google | `src/lib/data/industries/` |

Restent dans le code : les pages Solution (`platform.ts`), les textes d'interface (boutons, titres de section) et le reste de la base de l'assistant de chat (faits, réponses de prospection validées).

## Architecture

```
studio/                       Sanity Studio : projet séparé (React 19), déployé chez Sanity
  sanity.config.ts            projet, dataset, outils ; secteurs ni créés ni supprimés ici
  sanity.cli.ts               adresse du Studio en ligne (studioHost)
  schemaTypes/                locale.ts (textes FR / EN), testimonial.ts, faq.ts, guide.ts, industry.ts, landing.ts
src/lib/cms/
  client.ts                   configuration, requête GROQ par fetch, textes bilingues
  testimonials.ts, faq.ts     requête, conversion vers le type du site, repli
  guides.ts                   idem, plus Portable Text ⇄ blocs de la page
  industries.ts               textes d'un secteur, posés sur la page du code
  landings.ts                 pages d'atterrissage par canal
  seo.ts                      titres, descriptions et liste des pages, CMS compris
src/app/api/revalidate/route.ts   webhook de publication : rafraîchit les pages
scripts/cms-seed.mjs          import initial des contenus locaux (npm run cms:seed)
scripts/cms-alias.mjs         alias @/ pour les scripts Node qui lisent le code du site
```

**Pourquoi un Studio séparé.** Les paquets Sanity actuels (`sanity` 6, `next-sanity` 13) exigent React 19 et Next 16 ; le site est en Next 14 et React 18. Le Studio vit donc dans `studio/`, avec ses propres dépendances, et se déploie chez Sanity (`https://industryx0.sanity.studio`). Le site, lui, n'ajoute aucune dépendance : il lit l'API HTTP de Sanity avec `fetch`.

**Lecture.** `cmsQuery` interroge le CDN de Sanity (`<projet>.apicdn.sanity.io`), uniquement les documents **publiés** : un brouillon en cours dans le Studio n'apparaît jamais sur le site. La requête passe par le cache de Next (`revalidate` d'une heure, étiquettes `cms` et `cms:<type>`). Les pages restent statiques et se régénèrent en arrière-plan (ISR).

**Configuration figée au build.** `SANITY_PROJECT_ID` et `SANITY_DATASET` sont publics. `deploy.yml` les donne à la build, et `next.config.mjs` (`env`) les écrit dans le code serveur : une page régénérée en production lit le même projet, sans variable à déclarer dans Azure. Seul le secret du webhook se déclare dans Azure.

**Bilingue.** Chaque texte est un objet `{ fr, en }` (types `localeString` et `localeText`). Le français est obligatoire. Sans anglais, la version anglaise affiche le français, et le Studio prévient l'éditeur. Exception, les secteurs : un texte vide laisse celui du code, dans la même langue (voir plus bas).

**Repli.** Si Sanity ne répond pas (panne, délai de 5 s, réponse inattendue), la page s'affiche quand même avec le fichier local, et un avertissement `[cms]` est écrit dans les logs. Pour les témoignages, la liste locale est **réduite aux verbatims validés** : une panne ne doit pas faire réapparaître une proposition de rédaction retirée dans le CMS.

### Témoignages

La case « Verbatim validé par le client » remplace `status` : non cochée, le texte est une proposition de rédaction (`draft`). L'accueil et `/customers` affichent aujourd'hui les deux ; pour ne garder que les verbatims validés, retirer `includeDrafts: true` dans `src/app/[locale]/page.tsx` et `src/app/[locale]/(marketing)/customers/page.tsx`. Les couleurs des cartes tournent automatiquement (or, vert, bleu). Le logo reste celui de la bibliothèque du site (`clientLogos.ts`), désigné par son nom.

### FAQ

Ordre au choix (champ « Ordre d'affichage ») ; la première question s'ouvre par défaut. Les questions affichées sont aussi celles des données structurées FAQPage de l'accueil, et celles de l'assistant de chat :

- **avec l'IA**, la FAQ publiée entre dans la base de connaissances (`/api/chat` la relit au plus toutes les 5 minutes) ;
- **sans IA**, le widget charge la FAQ publiée à son ouverture (`/api/chat/faq/<langue>`, en cache et rafraîchie par le webhook) et reconnaît les questions par mots-clés. Le lien entre une question et ses mots-clés est l'« Identifiant pour l'assistant » (`key`, fixé par l'import, lu par `src/lib/chat/local.ts`) : l'ordre dans le Studio n'y change rien. Une question créée dans le Studio n'en a pas : seule l'IA y répond. Une question supprimée n'a plus de réponse locale.

### Guides

- **Corps** en texte riche, une version par langue (vide en anglais : la page anglaise affiche le français). Styles : paragraphe, intertitre, encadré « idée à retenir », liste à puces, lien vers une page du site (chemin en français, `/plateforme/gestion-ecarts` : le site le traduit). Ni gras ni italique : la page ne les affiche pas.
- **Image** : envoyée dans le Studio (servie par `cdn.sanity.io`, autorisé dans `next.config.mjs`) ou chemin d'un fichier de `public/`.
- **Nouveau guide** : publié dans le Studio, il apparaît dans `/resources`, a sa page (rendue à la première visite), son entrée dans le sitemap et son image de partage, sans redéploiement.
- **Adresse** (`slug`) : à ne plus changer une fois publiée (liens, référencement).
- **Minutes de lecture** : vides, elles sont estimées (200 mots par minute).
- Le Portable Text est converti vers les blocs que la page affiche déjà (`portableTextToBlocks`) ; l'import fait l'inverse (`blocksToPortableText`), et les tests vérifient que l'aller-retour ne perd rien.

### Pages d'atterrissage par canal

Une page par campagne (publication LinkedIn, QR code de salon, spot radio, e-mailing) : `/lp/<adresse>`, avec un message, trois bénéfices, les verbatims **validés** seulement, et un seul bouton (démo, Enti Win ou contact), répété en bas de page. Une page publiée dans le Studio est en ligne sans redéploiement.

- **Lien de campagne** : l'aperçu de la page dans le Studio donne le lien à diffuser, UTM compris (`https://www.industryx0.pro/lp/<adresse>?utm_source=…&utm_medium=…&utm_campaign=…`). Pour un QR code, ce lien ; pour l'anglais, ajouter `/en` avant `/lp`.
- **Mesure** : la source (UTM, `ref`) et la page d'arrivée sont jointes au lead (`lib/analytics/attribution.ts`) ; les clics du bouton sont suivis (`cta_clicked`, identifiant `landing_<adresse>`, zones `landing_hero` et `landing_closing` ; `entiwin_clicked` vers Enti Win, qui reçoit `utm_content=lp_<adresse>`).
- **Référencement** : pages en `noindex` et hors sitemap (elles reprennent des contenus du site), mais avec leur titre, leur description et leur image de partage, que LinkedIn ou un e-mail affichent.
- Deux exemples viennent de l'import : `demo-linkedin` (démo) et `entiwin-salon` (Enti Win). Leurs textes reprennent ce que le site affirme déjà ; à adapter à chaque campagne.

### Pages secteurs

Une page secteur mêle texte et dessin : icônes, nombre de diapositives, visuels animés tracés à la main. Le CMS n'en porte que **le texte** (titres, introduction, points, diapositives, chiffres clés, étapes, appel à l'action, titre et description Google), posé sur la page du code par `overlay`, position par position — le même mécanisme que la traduction anglaise.

- Les listes ont la taille de la page : le Studio n'y permet ni ajout ni suppression. Ajouter une diapositive ou une étape demande un développeur (structure, icône, visuel dans `src/lib/data/industries/<secteur>.ts`, puis le texte dans le Studio).
- Un texte vidé laisse celui du code, dans la même langue : le code a toujours le français et l'anglais, et certains textes anglais sont vides exprès (le « de » du titre).
- Les six documents viennent de l'import ; le Studio ne permet ni d'en créer ni d'en supprimer. Les champs propres à certaines pages (titre « manifeste », fin de titre du second carrousel) sont masqués là où la page ne les a pas.
- Les textes des visuels (maquettes d'écran, courbes) restent dans le code.
- Un chiffre clé publié doit pouvoir être justifié (voir SEO-REPORT.md).

## Mise en route

État au 3 novembre 2026 : étapes 1, 3 et 4 faites ; 2 en local ; 5 et 6 à faire.

### 1. Projet Sanity — fait

Projet `tudyxwtm`, dataset `production` **public** (lecture sans jeton des documents publiés).

### 2. Studio en local

```bash
cd studio
cp .env.example .env          # SANITY_STUDIO_PROJECT_ID=tudyxwtm
npm install
npm run dev                   # http://localhost:3333
```

Au premier lancement, le Studio demande de se connecter et propose d'autoriser `http://localhost:3333` (CORS) : accepter. Sur ce poste, rollup est remplacé par sa version WebAssembly (`overrides` de `studio/package.json`), comme pour le site : le contrôle d'applications Windows bloque le binaire natif.

### 3. Brancher le site — fait

En local, `.env.local` : `SANITY_PROJECT_ID=tudyxwtm`, `SANITY_DATASET=production`. En production, `deploy.yml` les donne à la build (voir « Configuration figée au build ») : rien à déclarer dans GitHub ni dans Azure.

### 4. Importer les contenus existants — fait

```bash
npm run cms:seed               # liste ce qui serait envoyé, sans rien écrire
npm run cms:seed -- --write    # crée dans Sanity les documents absents
```

26 documents : 9 témoignages, 5 questions, 4 guides, 6 secteurs, 2 pages d'atterrissage. Il faut un jeton **Editor** dans `.env.local` (`SANITY_WRITE_TOKEN`, sanity.io/manage > API > Tokens). Le script n'écrase jamais un document existant : on peut le relancer sans perdre les modifications faites dans le Studio. Supprimer le jeton dans Sanity une fois les imports finis ; il ne sert jamais en production.

### 5. Déployer le Studio

Il faut un compte du projet (ou un jeton « Deploy Studio ») : le jeton Editor de l'import n'en a pas le droit.

```bash
cd studio
npx sanity login               # une fois, ouvre le navigateur
npm run deploy                 # https://industryx0.sanity.studio
```

Ou, sans connexion : `SANITY_AUTH_TOKEN=<jeton Deploy Studio> npm run deploy`. Puis inviter l'équipe (sanity.io/manage > Members), avec le rôle **Editor**.

### 6. Publication immédiate (webhook)

Sans webhook, une modification publiée apparaît sur le site en une heure au plus. Pour qu'elle apparaisse en quelques secondes :

1. Dans Azure (App Service `industryx0` > Variables d'environnement) : `SANITY_REVALIDATE_SECRET`, même valeur que dans `.env.local`. Sans secret, la route répond 404 ; un mauvais secret reçoit 401.
2. sanity.io/manage > API > Webhooks > Create webhook :

| Champ | Valeur |
|---|---|
| URL | `https://www.industryx0.pro/api/revalidate` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | *(vide)* |
| Projection | `{_type}` |
| HTTP method | POST |
| HTTP headers | `Authorization` : `Bearer <SANITY_REVALIDATE_SECRET>` |

La route rafraîchit les pages du type publié (`cms:testimonial`, `cms:faq`, `cms:guide`, `cms:industry`, `cms:landing`). Elle n'existe en ligne qu'une fois cette version du site déployée.

## Ajouter un contenu

1. **Schéma** : un fichier dans `studio/schemaTypes/`, ajouté à `index.ts`. Textes visibles : `localeString` ou `localeText`.
2. **Lecteur** : un fichier dans `src/lib/cms/` sur le modèle de `faq.ts` (liste simple) ou de `industries.ts` (textes posés sur une structure du code) : requête GROQ, conversion vers le type que les composants utilisent déjà, repli sur le fichier local.
3. **Page** : le composant serveur appelle le lecteur et passe le résultat en props aux composants client. Un composant serveur `async` n'appelle pas de hook (`useCopy`) : il prend la langue dans `params`.
4. **Import** : une fonction de plus dans `scripts/cms-seed.mjs`, qui réutilise de préférence une fonction de conversion de `src/lib/cms/`.
5. **Tests** : sur le modèle de `tests/cms-content.test.ts` — surtout l'aller-retour : le contenu importé, relu par le site, doit redonner le contenu du code.

Garder la forme des données du site (les types `Testimonial`, `Guide`, `IndustryPageData`) : les composants n'ont pas à savoir d'où vient le contenu.

## Limites actuelles

- **Assistant de chat** : la FAQ vient du CMS ; les faits de base et les 136 réponses de prospection validées restent dans le code (`src/lib/chat/knowledge.ts`, `src/lib/data/chatbotBase.ts`). Les mots-clés d'une nouvelle question pour les réponses sans IA s'ajoutent dans `src/lib/chat/local.ts`.
- **Logos clients** : dans le code ; un nouveau client sans logo dans `clientLogos.ts` s'affiche avec ses initiales.
- **Aperçu des brouillons** : pas encore de mode « draft » sur le site ; on voit le résultat après publication.
- **Dates du sitemap** : les guides sont datés par leur contenu ; les autres pages, par le dernier commit de leurs fichiers, pas par une modification dans le Studio.

## Tests

`npm test` couvre `tests/cms.test.ts` (configuration, choix de langue, témoignages, repli, route `/api/revalidate`) et `tests/cms-content.test.ts` (FAQ, guides, secteurs) :
- aller-retour Portable Text et import → lecture, identiques au code, en français et en anglais ;
- repli en cas de panne, et aucun appel sans configuration ;
- textes modifiés ou vidés d'un secteur, avec icônes et visuels intacts ;
- un guide créé dans le Studio, présent dans les pages publiques avec son titre.
