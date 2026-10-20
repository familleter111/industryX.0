# Leads du formulaire de contact : CRM et webhook

Chaque demande envoyée depuis `/contact` passe par `POST /api/contact`. Une fois validée, elle part vers trois destinations, **en parallèle** :

| Destination | Activée par | Rôle |
|---|---|---|
| Tableur `data/contacts.xlsx` | toujours | Premier enregistrement. Si le fichier est verrouillé, la ligne va dans `contacts-secours.csv` |
| CRM | `CRM_PROVIDER` = `hubspot`, `brevo` ou `pipedrive` | Contact créé ou mis à jour, affaire à l'étape Qualification, note avec le message |
| Webhook | `LEAD_WEBHOOK_URL` | POST JSON signé vers n8n, Make ou Zapier |

Si **une** destination échoue, le lead complet part par email à `LEAD_FALLBACK_EMAIL` (via Resend). Le visiteur voit un succès dès qu'au moins une destination a reçu le lead. Il ne voit une erreur que si rien n'a abouti.

Chaque appel sortant a un délai maximum de 8 s et deux essais (le second après 0,6 s). Les erreurs 5xx, 429 et réseau sont réessayées, pas les 4xx : un jeton invalide ne se corrige pas en réessayant. Les logs masquent l'email (`a***@usine.tn`) et le téléphone (`+216******56`).

Toutes les variables sont listées et commentées dans [`.env.example`](../.env.example). En production, elles se déclarent dans Azure App Service (Configuration > Paramètres d'application), jamais dans le code.

Code : `src/lib/leads/` (validation, livraison, webhook, email de secours) et `src/lib/crm/` (un fichier par CRM).

---

## 1. Choisir le CRM

| | HubSpot | Brevo | Pipedrive |
|---|---|---|---|
| Point fort | CRM complet, gratuit pour démarrer | Emailing et SMS intégrés au CRM | Pipeline commercial simple et visuel |
| Affaires (deals) | Oui | Oui, avec le module Ventes | Oui |
| Note avec le message | Oui | Oui (si pipeline configuré) | Oui |
| Ce qu'il faut créer | Propriété `industrie`, étapes du pipeline | Attributs `INDUSTRIE` et `SOCIETE`, liste, étapes | Champ « Industrie », étapes |

Un seul CRM à la fois. Pour en changer, il suffit de modifier `CRM_PROVIDER` et ses variables, puis de redémarrer l'application.

### Les étapes du pipeline

Elles suivent notre parcours, affiché sur la page contact :

1. **Qualification** : les leads du site arrivent ici
2. **Démonstration**
3. **Cadrage**
4. **Plan d'action**

Les CRM désignent une étape par un **identifiant interne**, pas par son nom. Il faut donc créer les étapes, puis récupérer l'identifiant de « Qualification » (voir chaque CRM ci-dessous).

### Les valeurs d'industrie

Le formulaire affiche des libellés, mais le CRM et le webhook reçoivent une valeur stable (`src/lib/leads/industries.ts`) :

| Libellé | Valeur |
|---|---|
| Pharmaceutique | `pharma` |
| Agroalimentaire & boissons | `agroalimentaire` |
| Cosmétique & dispositifs médicaux | `cosmetique` |
| Automobile & composants | `automobile` |
| Électronique & câblage | `electronique` |
| Packaging & plasturgie | `packaging` |
| Chimie | `chimie` |
| Distribution & logistique | `logistique` |
| Autre secteur | `autre` |

Si vous créez le champ « industrie » comme une liste déroulante dans le CRM, ses **valeurs internes** doivent être exactement celles-ci.

---

## 2. HubSpot

**Jeton.** Paramètres (roue dentée) > Intégrations > **Applications privées** > Créer une application privée. Onglet Portées : `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.objects.deals.read`, `crm.objects.deals.write`. Copier le jeton (`pat-…`) dans `HUBSPOT_ACCESS_TOKEN`.

**Préparation automatique (recommandé).** Ajouter aussi les portées `crm.schemas.contacts.write` et `crm.schemas.deals.write` à l'application privée, mettre le jeton dans `.env.local`, puis :

```bash
npm run leads:check -- setup-hubspot
```

Le script crée la propriété `industrie` (liste déroulante, valeurs stables) et un pipeline « Leads site web » avec les étapes Qualification, Démonstration, Cadrage, Plan d'action, Gagné, Perdu. S'ils existent déjà, il les complète sans rien supprimer. Il affiche ensuite les trois lignes à reporter dans `.env.local` et dans Azure (`CRM_PROVIDER`, `HUBSPOT_PIPELINE_ID`, `HUBSPOT_DEAL_STAGE_ID`). Les portées « schemas » peuvent être retirées après la préparation.

Les sous-sections suivantes décrivent la même préparation faite à la main.

**Propriété `industrie`.** Paramètres > Données > **Propriétés** > Contact > Créer une propriété :
- Libellé : Industrie ; **nom interne : `industrie`** (exactement) ;
- Type : Liste déroulante, une option par ligne du tableau ci-dessus, avec la **valeur interne** = la valeur stable (`pharma`, …).

**Étapes.** Paramètres > Données > Objets > **Transactions** > Pipelines. Dans le pipeline voulu, renommer ou créer les étapes Qualification, Démonstration, Cadrage, Plan d'action.

**Identifiants.**
- Pipeline : `default` pour le pipeline par défaut, sinon son identifiant.
- Étape Qualification : dans l'éditeur de pipeline, l'identifiant interne s'affiche au survol ou dans le menu de l'étape. Sinon :
  ```bash
  curl -H "Authorization: Bearer $HUBSPOT_ACCESS_TOKEN" https://api.hubapi.com/crm/v3/pipelines/deals
  ```
  Dans la réponse : `results[].id` (pipeline) et `results[].stages[].id` (étape).

**Ce que fait le site** :
1. `POST /crm/v3/objects/contacts/batch/upsert` avec `idProperty: email` : crée le contact ou met à jour celui qui a déjà cet email ;
2. `POST /crm/v3/objects/deals` : affaire « Société — Demande de démo CIPA », associée au contact ;
3. `POST /crm/v3/objects/notes` : le message et le contexte (page, campagne, consentement), associés au contact et à l'affaire.

Une nouvelle demande d'un contact existant crée une nouvelle affaire.

---

## 3. Brevo

**Clé API.** Profil > **SMTP & API** > Clés API > Générer une clé. Copier dans `BREVO_API_KEY`.

**Attributs.** Contacts > Paramètres > **Attributs de contact** > Ajouter :
- `INDUSTRIE` : type Texte (ou Catégorie avec les valeurs stables) ;
- `SOCIETE` : type Texte.

Les attributs `FIRSTNAME`, `LASTNAME` et `SMS` existent déjà.

**Liste.** Contacts > Listes > Créer une liste, par exemple « Leads site web ». Son numéro (`#12`) va dans `BREVO_LIST_ID`.

**Étapes (module Ventes / CRM).** CRM > Affaires > paramètres du pipeline : créer Qualification, Démonstration, Cadrage, Plan d'action. Pour les identifiants :
```bash
curl -H "api-key: $BREVO_API_KEY" https://api.brevo.com/v3/crm/pipeline/details/all
```
Mettre l'identifiant du pipeline dans `BREVO_PIPELINE_ID` et celui de l'étape Qualification dans `BREVO_DEAL_STAGE_ID`. Si ces deux variables sont vides, le contact est créé sans affaire ni note.

**Ce que fait le site** :
1. `POST /v3/contacts` avec `updateEnabled: true` : crée ou met à jour le contact, l'ajoute à la liste ;
2. si le pipeline est configuré : retrouve l'identifiant du contact (`GET /v3/contacts/{email}`), puis `POST /v3/crm/deals` et `POST /v3/crm/notes`.

Brevo refuse un numéro SMS déjà porté par un autre contact. Dans ce cas, le contact est enregistré sans téléphone ; le numéro reste visible dans la note et le tableur.

---

## 4. Pipedrive

**Jeton.** Avatar > Préférences personnelles > **API** > copier le jeton personnel dans `PIPEDRIVE_API_TOKEN`. Le sous-domaine (`industryx0` dans `industryx0.pipedrive.com`) va dans `PIPEDRIVE_COMPANY_DOMAIN`.

**Étapes.** Vue Affaires (pipeline) > menu du pipeline > Modifier le pipeline : créer Qualification, Démonstration, Cadrage, Plan d'action, **dans cet ordre**. Pour les identifiants :
```bash
curl -H "x-api-token: $PIPEDRIVE_API_TOKEN" https://industryx0.pipedrive.com/api/v2/pipelines
curl -H "x-api-token: $PIPEDRIVE_API_TOKEN" "https://industryx0.pipedrive.com/api/v2/stages?pipeline_id=1"
```
Mettre l'identifiant du pipeline dans `PIPEDRIVE_PIPELINE_ID` et celui de l'étape Qualification dans `PIPEDRIVE_STAGE_ID`. Si l'étape est vide, l'affaire va dans la première étape du pipeline.

**Champ Industrie.** Paramètres de l'entreprise > **Champs de données** > Affaire > Ajouter un champ « Industrie », de type **Texte**. Le type Texte reçoit directement la valeur stable ; une liste à options exigerait des identifiants d'option. Dans le menu du champ, « Copier la clé API » donne une chaîne de 40 caractères : la mettre dans `PIPEDRIVE_INDUSTRY_FIELD_KEY`.

**Ce que fait le site** :
1. organisation retrouvée par nom exact, sinon créée ;
2. personne retrouvée par email exact, sinon créée et rattachée à l'organisation ;
3. `POST /api/v2/deals` dans le pipeline et l'étape configurés, avec le champ Industrie ;
4. `POST /api/v1/notes` : le message, rattaché à l'affaire et à la personne.

---

## 5. Webhook (n8n, Make, Zapier)

### Ce qui est envoyé

`POST` sur `LEAD_WEBHOOK_URL`, corps JSON :

```json
{
  "event": "lead.created",
  "id": "5f0c7e2a-…",
  "createdAt": "2026-10-19T09:00:00.000Z",
  "lead": {
    "firstName": "Amel",
    "lastName": "Ben Salah",
    "email": "amel@usine.tn",
    "phone": "+21620123456",
    "phoneCountry": "Tunisie",
    "phoneDial": "+216",
    "company": "Usine SA",
    "industry": "Pharmaceutique",
    "industryKey": "pharma",
    "message": "…",
    "consent": true,
    "consentAt": "2026-10-19T09:00:00.000Z",
    "submittedAt": "2026-10-19T09:00:00.000Z",
    "locale": "fr",
    "source": "https://www.industryx0.pro/contact",
    "utmSource": "linkedin", "utmMedium": "social", "utmCampaign": "salon-2026-11",
    "utmTerm": "", "utmContent": "",
    "ref": "", "referrer": "www.linkedin.com",
    "firstTouch": "linkedin / social",
    "posthogId": "…"
  }
}
```

En-têtes :
- `X-Signature: sha256=<hex>` : HMAC SHA-256 du **corps brut**, clé `LEAD_WEBHOOK_SECRET` ;
- `X-Lead-Id` : identique à `id`. Si un nouvel essai arrive alors que le premier envoi a bien été reçu, ignorer le doublon grâce à cet identifiant.

Le webhook doit répondre en moins de 8 s avec un statut 2xx. Le contenu de la réponse est ignoré.

### Vérifier la signature

La signature se calcule sur le corps **tel que reçu, octet pour octet**. Un JSON relu puis réécrit change d'empreinte : il faut donc le corps brut.

```js
// Node.js
const crypto = require('crypto')

function verify(rawBody, header, secret) {
  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')
  const a = Buffer.from(expected)
  const b = Buffer.from(header || '')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}
```

```python
# Python
import hmac, hashlib

def verify(raw_body: bytes, header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, header or "")
```

### n8n

1. Nœud **Webhook** : méthode POST, chemin `leads`. Dans les options, activer **Raw Body**. L'URL de production (`https://…/webhook/leads`) va dans `LEAD_WEBHOOK_URL`.
2. Nœud **Code** (JavaScript) qui vérifie la signature et arrête le flux si elle est fausse :
   ```js
   const crypto = require('crypto')
   const item = $input.first()
   const raw = Buffer.from(item.binary.data.data, 'base64').toString('utf8')
   const header = item.json.headers['x-signature']
   const expected = 'sha256=' + crypto.createHmac('sha256', $env.LEAD_WEBHOOK_SECRET).update(raw).digest('hex')
   if (header !== expected) throw new Error('Signature invalide')
   return [{ json: JSON.parse(raw) }]
   ```
   (Sur n8n auto-hébergé : `NODE_FUNCTION_ALLOW_BUILTIN=crypto`, et le secret dans une variable d'environnement de n8n.)
3. En parallèle derrière ce nœud :
   - **HubSpot / Pipedrive / Brevo** : nœud natif du CRM, « Create or update contact » puis « Create deal » (utile si le CRM direct du site est sur `none`) ;
   - **Google Sheets** : « Append row », une colonne par champ de `lead` ;
   - **Slack** : « Send message » dans `#leads`, par exemple `Nouveau lead : {{$json.lead.company}} ({{$json.lead.industryKey}}) — {{$json.lead.firstName}} {{$json.lead.lastName}}` ;
   - **Email** (Gmail / SMTP) : notification à l'équipe commerciale.

### Make

1. Module **Webhooks > Custom webhook**, puis Add. Dans les options avancées, cocher **JSON pass-through** pour recevoir le corps brut. L'URL va dans `LEAD_WEBHOOK_URL`.
2. Vérification : un **filtre** après le webhook, condition `{{sha256(value; ; LEAD_WEBHOOK_SECRET)}}` égal à l'en-tête `x-signature` sans le préfixe `sha256=`. La fonction `sha256` de Make accepte une clé HMAC en troisième argument. Ensuite, module **JSON > Parse JSON** sur le corps brut.
3. Puis, avec un **Router** : Google Sheets > Add a row, Slack > Create a message, Email > Send an email, et le module du CRM.

### Zapier

1. Déclencheur **Webhooks by Zapier > Catch Raw Hook** : il fournit le corps brut et les en-têtes. L'URL va dans `LEAD_WEBHOOK_URL`.
2. Étape **Code by Zapier (JavaScript)** : `inputData.raw` = corps brut, `inputData.signature` = en-tête, `inputData.secret` = le secret.
   ```js
   const crypto = require('crypto')
   const expected = 'sha256=' + crypto.createHmac('sha256', inputData.secret).update(inputData.raw).digest('hex')
   if (expected !== inputData.signature) throw new Error('Signature invalide')
   return JSON.parse(inputData.raw).lead
   ```
3. Puis : Google Sheets > Create Spreadsheet Row, Slack > Send Channel Message, Email by Zapier, et l'action du CRM.

---

## 6. Email de secours (Resend)

1. Créer un compte sur resend.com, puis **Domains > Add domain** : ajouter les enregistrements DNS (SPF, DKIM) du domaine d'envoi, par exemple `industryx0.pro`, et attendre la vérification.
2. **API Keys > Create**, avec la permission « Sending access », puis la copier dans `RESEND_API_KEY`.
3. `LEAD_FALLBACK_FROM` : une adresse du domaine vérifié (`Leads Industry X.0 <leads@industryx0.pro>`).
4. `LEAD_FALLBACK_EMAIL` : les destinataires, séparés par des virgules.

L'email liste tous les champs du lead et les destinations en échec. Sa réponse (« Répondre ») va directement au prospect.

---

## 7. Vérifier que tout marche

```bash
npm run leads:check            # contrôle les variables, liste pipelines et étapes du CRM
npm run dev                    # dans un autre terminal
npm run leads:check -- test    # envoie un lead de test à travers tout le circuit
```

`leads:check` lit `.env.local` et signale ce qui manque : jeton refusé, portée absente, étape introuvable, secret trop court, email de secours incomplet. Pour tester contre un autre serveur : `BASE_URL=https://… npm run leads:check -- test`. Pensez à supprimer ensuite le contact et l'affaire de test dans le CRM.

Ensuite :

1. Remplir le formulaire en local, avec les variables du CRM ou du webhook dans `.env.local`.
2. Dans les logs serveur : `[leads] a***@… → reçu : tableur, crm:hubspot, webhook`. En cas d'échec, la ligne indique la destination et la cause : statut HTTP (`HTTP 401 https://api.hubapi.com/...`), `délai dépassé` ou code réseau (`ECONNREFUSED`).
3. Contrôler le contact, l'affaire et la note dans le CRM, et l'exécution dans n8n, Make ou Zapier.
4. Pour tester le secours : mettre un faux jeton CRM. Le formulaire affiche quand même un succès, et l'email de secours arrive.

Tests automatiques : `npm test` (validation, données envoyées à chaque CRM, webhook, livraison).
