# Préversion (environnement de preview)

Une préversion met une branche en ligne, à une autre adresse que la production, pour la vérifier avant de la fusionner dans `main` : relecture par l'équipe, test sur téléphone, partage d'un lien à l'entreprise.

Workflow : [`.github/workflows/preview.yml`](../.github/workflows/preview.yml). Tant que l'environnement n'est pas configuré (voir « Mise en route »), il s'arrête avec un message et ne déploie rien.

## Fonctionnement

1. Une pull request vers `main` est ouverte ou mise à jour (ou le workflow est lancé à la main : Actions > Preview > Run workflow, sur n'importe quelle branche).
2. Le site est construit comme en production, avec ces différences :
   - `NEXT_PUBLIC_SITE_ENV=preview` : **jamais indexé** (robots.txt `Disallow: /`, en-tête `X-Robots-Tag: noindex, nofollow` sur toutes les réponses) ;
   - un **badge** en bas à gauche : « Préversion · branche · commit » ;
   - `NEXT_PUBLIC_SITE_URL` = l'adresse de la préversion : canonical, liens de partage et sitemap pointent vers elle, pas vers la production ;
   - mesure : la clé PostHog de préversion (`NEXT_PUBLIC_POSTHOG_KEY_PREVIEW`, facultative), pas de GA4 ;
   - contenus : le même projet Sanity, documents publiés (docs/cms.md).
3. Le paquet est déployé sur l'emplacement **staging** de l'App Service `industryx0`. La pull request affiche un lien « View deployment ».

Une seule préversion à la fois : la dernière branche déployée remplace la précédente.

Les réglages serveur (CRM, webhook, IA, e-mail de secours) ne viennent pas de GitHub mais des **paramètres de l'emplacement** dans Azure : voir l'étape 1.

## Mise en route (une fois)

### 1. Azure : l'emplacement « staging »

Les emplacements de déploiement demandent un plan App Service **Standard (S1) ou plus**.

1. App Service `industryx0` > Emplacements de déploiement > Ajouter un emplacement : nom `staging`, sans cloner les paramètres de la production.
2. Dans l'emplacement `staging` > Variables d'environnement, déclarer au minimum :

   | Variable | Valeur | Pourquoi |
   |---|---|---|
   | `CRM_PROVIDER` | `none` | les demandes de test n'entrent pas dans le CRM |
   | `LEAD_WEBHOOK_URL` | *(vide)* | pas d'automatisation déclenchée |
   | `LEAD_FALLBACK_EMAIL` | *(vide, ou une adresse de test)* | pas d'e-mail à l'équipe commerciale |
   | `CHAT_PROVIDER` | *(vide, ou `azure` / `anthropic` pour tester l'IA)* | chaque question IA a un coût |

   Cocher « Paramètre d'emplacement de déploiement » pour chacune : elles restent sur `staging` même en cas d'échange d'emplacements.
3. Configuration > Paramètres généraux : activer les informations d'identification de publication de base (SCM), comme pour la production.
4. Télécharger le **profil de publication de l'emplacement `staging`** (pas celui de la production).

Plan Gratuit ou Basic (sans emplacements) : créer à la place une seconde App Service, par exemple `industryx0-preview`, et renseigner les variables `PREVIEW_APP_NAME=industryx0-preview` et `PREVIEW_SLOT=production` (étape 2). Les mêmes paramètres serveur s'y déclarent.

### 2. GitHub : secret et variables

Settings > Secrets and variables > Actions :

| Type | Nom | Valeur |
|---|---|---|
| Secret | `AZURE_PREVIEW_PUBLISH_PROFILE` | contenu du profil de publication de l'étape 1.4 |
| Variable | `PREVIEW_URL` | `https://industryx0-staging.azurewebsites.net` (l'adresse de l'emplacement) |
| Variable *(facultative)* | `NEXT_PUBLIC_POSTHOG_KEY_PREVIEW` | clé d'un projet PostHog de test |
| Variable *(facultative)* | `PREVIEW_APP_NAME`, `PREVIEW_SLOT` | seulement pour une App Service séparée (défauts : `industryx0`, `staging`) |

Garde-fou : si le secret contient le profil de la **production**, le workflow s'arrête en erreur au lieu de déployer.

Facultatif : Settings > Environments > `preview` > Required reviewers, pour qu'un déploiement de préversion attende une validation.

## Vérifier une préversion

- Le badge « Préversion » est visible en bas à gauche.
- `<adresse>/robots.txt` répond `Disallow: /`.
- Une demande de démo envoyée depuis la préversion n'arrive pas dans le CRM (`CRM_PROVIDER=none`).
