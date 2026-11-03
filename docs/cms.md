# CMS headless (Sanity)

Les contenus éditoriaux passent progressivement du code à **Sanity**, le CMS headless recommandé par le brief. L'équipe les modifie dans le **Studio** (une interface web), sans développeur ni redéploiement.

Sans configuration, rien ne change : le site garde ses contenus locaux (`src/lib/data/`) et n'appelle jamais Sanity.

## Ce qui est dans le CMS

| Contenu | Type Sanity | Lu par | Affiché sur | Fichier local (repli) |
|---|---|---|---|---|
| Témoignages clients | `testimonial` | `src/lib/cms/testimonials.ts` | accueil, `/customers` | `src/lib/data/testimonials.ts` |

Prochains candidats, dans l'ordre : FAQ, guides, pages secteurs (voir « Ajouter un contenu »).

## Architecture

```
studio/                       Sanity Studio : projet séparé (React 19), déployé chez Sanity
  sanity.config.ts            projet, dataset, outils (structure, console GROQ)
  schemaTypes/                types de contenu : locale.ts (textes FR / EN), testimonial.ts
src/lib/cms/
  client.ts                   configuration, requête GROQ par fetch, textes bilingues
  testimonials.ts             requête, conversion vers le type du site, repli
src/app/api/revalidate/route.ts   webhook de publication : rafraîchit les pages
scripts/cms-seed.mjs          import initial des contenus locaux (npm run cms:seed)
```

**Pourquoi un Studio séparé.** Les paquets Sanity actuels (`sanity` 6, `next-sanity` 13) exigent React 19 et Next 16 ; le site est en Next 14 et React 18. Le Studio vit donc dans `studio/`, avec ses propres dépendances, et se déploie chez Sanity (`https://<nom>.sanity.studio`). Le site, lui, n'ajoute aucune dépendance : il lit l'API HTTP de Sanity avec `fetch`.

**Lecture.** `cmsQuery` interroge le CDN de Sanity (`<projet>.apicdn.sanity.io`), uniquement les documents **publiés** : un brouillon en cours dans le Studio n'apparaît jamais sur le site. La requête passe par le cache de Next (`revalidate` d'une heure, étiquettes `cms` et `cms:<type>`). Les pages restent statiques et se régénèrent en arrière-plan (ISR).

**Bilingue.** Chaque texte est un objet `{ fr, en }` (types `localeString` et `localeText`). Le français est obligatoire. Sans anglais, la version anglaise du site affiche le français, et le Studio prévient l'éditeur.

**Repli.** Si Sanity ne répond pas (panne, délai de 5 s, réponse inattendue), la page s'affiche quand même avec le fichier local, **réduit aux verbatims validés** : une panne ne doit pas faire réapparaître une proposition de rédaction retirée dans le CMS. Un avertissement `[cms]` est écrit dans les logs.

**Témoignages.** La case « Verbatim validé par le client » remplace `status` : non cochée, le texte est une proposition de rédaction (`draft`). L'accueil et `/customers` affichent aujourd'hui les deux, comme avant la migration ; pour ne garder que les verbatims validés, retirer `includeDrafts: true` dans `src/app/[locale]/page.tsx` et `src/app/[locale]/(marketing)/customers/page.tsx`. Les couleurs des cartes tournent automatiquement (or, vert, bleu). Le logo reste celui de la bibliothèque du site (`clientLogos.ts`), désigné par son nom.

## Mise en route

### 1. Créer le projet Sanity

Sur [sanity.io/manage](https://www.sanity.io/manage) : créer un projet (offre gratuite), garder le dataset `production` en **public** (lecture sans jeton des documents publiés). Noter le **Project ID**.

### 2. Lancer le Studio

```bash
cd studio
cp .env.example .env          # puis renseigner SANITY_STUDIO_PROJECT_ID
npm install
npm run dev                   # http://localhost:3333
```

Au premier lancement, le Studio demande de se connecter et propose d'autoriser `http://localhost:3333` (CORS) : accepter.

> Sur ce poste, le contrôle d'applications Windows bloque déjà le binaire natif de rollup (voir README). Si `npm run dev` échoue pour la même raison sur l'outil de build du Studio, lancer le Studio depuis un autre poste, ou directement sa version déployée (étape 5).

### 3. Brancher le site

Dans `.env.local` (dev) et dans Azure App Service (prod) :

```
SANITY_PROJECT_ID=<project id>
SANITY_DATASET=production
```

**Aussi en variable GitHub Actions** (Settings > Secrets and variables > Actions > Variables) : les pages sont construites au build, et sans projet à ce moment-là elles restent figées sur les contenus locaux. `deploy.yml` les transmet déjà au build.

### 4. Importer les contenus existants

```bash
npm run cms:seed               # liste ce qui serait envoyé, sans rien écrire
npm run cms:seed -- --write    # crée les documents dans Sanity
```

Il faut un jeton **Editor** dans `.env.local` : `SANITY_WRITE_TOKEN` (sanity.io/manage > API > Tokens). Le script n'écrase jamais un document existant : on peut le relancer sans perdre les modifications faites dans le Studio. Supprimer le jeton une fois l'import fait ; il ne sert jamais en production.

### 5. Déployer le Studio

```bash
cd studio
npm run deploy                 # choisir un nom : https://<nom>.sanity.studio
```

Puis inviter l'équipe (sanity.io/manage > Members), avec le rôle **Editor**.

### 6. Publication immédiate (webhook)

Sans webhook, une modification publiée apparaît sur le site en une heure au plus. Pour qu'elle apparaisse en quelques secondes : sanity.io/manage > API > Webhooks > Create webhook :

| Champ | Valeur |
|---|---|
| URL | `https://www.industryx0.pro/api/revalidate` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | *(vide)* |
| Projection | `{_type}` |
| HTTP method | POST |
| HTTP headers | `Authorization` : `Bearer <SANITY_REVALIDATE_SECRET>` |

Et `SANITY_REVALIDATE_SECRET` (même valeur) dans Azure. Sans secret configuré, la route répond 404 ; un mauvais secret reçoit 401.

## Ajouter un contenu

1. **Schéma** : un fichier dans `studio/schemaTypes/`, ajouté à `index.ts`. Textes visibles : `localeString` ou `localeText`.
2. **Lecteur** : un fichier dans `src/lib/cms/` sur le modèle de `testimonials.ts` : requête GROQ, conversion vers le type que les composants utilisent déjà, repli sur le fichier local.
3. **Page** : le composant serveur appelle le lecteur et passe le résultat en props aux composants client.
4. **Import** : une fonction de plus dans `scripts/cms-seed.mjs`.
5. **Tests** : sur le modèle de `tests/cms.test.ts` (conversion, repli, aucun appel sans configuration).

Garder la forme des données du site (le type `Testimonial`, par exemple) : les composants n'ont pas à savoir d'où vient le contenu.

## Limites actuelles

- Les logos clients restent dans le code : un nouveau client sans logo dans `clientLogos.ts` s'affiche avec ses initiales. Étape suivante possible : un champ image dans le Studio.
- Pas encore d'aperçu des brouillons sur le site (mode « draft ») : on voit le résultat après publication.

## Tests

`npm test` couvre (`tests/cms.test.ts`) : la configuration, le choix de langue, la conversion des documents, le repli en cas de panne, l'absence d'appel sans configuration, et la route `/api/revalidate` (secret, type de document).
