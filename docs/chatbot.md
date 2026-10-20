# Assistant de chat (chatbot IA)

L'assistant s'ouvre avec la bulle en bas à droite de chaque page, ou avec le bouton « Poser votre question » de la FAQ. Il fonctionne en deux modes :

| Mode | Activation | Qui répond | Données |
|---|---|---|---|
| **Local** (défaut) | rien à configurer | règles par mots-clés dans le navigateur (`src/lib/chat/local.ts`) | rien ne quitte le navigateur |
| **IA** | `NEXT_PUBLIC_CHAT_AI=on`, `CHAT_PROVIDER=anthropic`, `ANTHROPIC_API_KEY` | Claude (Anthropic), via `/api/chat` | messages envoyés au serveur, puis à Anthropic ; non conservés par Industry X.0 |

En mode IA, l'IA n'est appelée qu'en dernier recours, pour garder le coût au plus bas :

1. **Questions de la FAQ** (durée d'une démo, intégrations, accompagnement, secteurs, délai d'un pilote) : reconnues dans le navigateur et répondues avec le texte de la FAQ. Gratuit, aucun appel.
   **Réponses prêtes** (présentation d'Industry X.0, solutions, Enti Win, téléphone, e-mail, adresse, coordonnées, candidatures CV / stage / PFE) : texte fixe, servi sans IA (`infoReply` dans `local.ts`). Les coordonnées viennent de `CONTACT` dans `knowledge.ts`, partagé avec la base du modèle. Un message de plus de 16 mots, ou qui parle du produit (« le numéro de lot dans CIPA »), continue vers l'IA.
   **Conversation courante** (bonjour, comment vas-tu, qui es-tu, que peux-tu faire, merci, au revoir…) : même chose, réponse instantanée sans IA (`smallTalkReply` dans `local.ts`). Un message court qui parle d'affaires (« Bonjour, je voudrais une démo ») n'est pas pris pour une politesse et continue son chemin.
2. **Autres questions** : envoyées à Claude Haiku 5.5, dans la limite de `CHAT_DAILY_LIMIT` questions par jour (50 par défaut).
3. **Plafond atteint, clé absente ou panne** : réponse locale par mots-clés, qui oriente vers le formulaire de contact. Une question n'est jamais laissée sans réponse.

## Architecture

```
src/lib/chat/
  config.ts      interrupteurs (NEXT_PUBLIC_CHAT_AI) et limites partagées
  open.ts        openChat() : ouvre le chat depuis n'importe quel bouton du site
  local.ts       mode local : messages de bienvenue et réponses par mots-clés
  client.ts      appel de /api/chat et lecture de la réponse en flux (navigateur)
  knowledge.ts   base de connaissances, construite depuis les données du site
  prompt.ts      consignes du modèle + base de connaissances
  server.ts      contrôles de la route (activation, historique reçu)
src/app/api/chat/route.ts   route serveur : appel de Claude, réponse en flux texte
src/components/layout/ChatWidget.tsx   le widget
src/lib/data/faq.ts         FAQ partagée par la page /faq et l'assistant
```

**Flux d'une question en mode IA** :

1. Le widget envoie l'historique de la conversation (sans les messages de bienvenue) à `POST /api/chat`.
2. La route vérifie l'activation, la limite de 20 questions par IP sur 10 minutes et le plafond quotidien. Elle borne l'historique aux 10 derniers messages de 1000 caractères au plus.
3. Elle appelle Claude en streaming avec :
   - `claude-haiku-5-5`, le modèle le moins cher (réglable via `CHAT_MODEL`), effort `low` et réponses courtes (2 000 tokens au plus, réflexion comprise) ;
   - les consignes et la base de connaissances en prompt système, mis en cache par l'API ;
   - le repli serveur `fallbacks: "default"` seulement si `CHAT_MODEL` désigne un modèle qui l'accepte (Opus 5.5, Sonnet 5.5…) : Claude Haiku 5.5 ne l'a pas, une question déclinée reçoit alors un message renvoyant vers le formulaire.
4. Le texte revient morceau par morceau et s'écrit dans la bulle. Si le visiteur ferme le chat, la génération s'arrête.

**Ce que le modèle sait** : uniquement `knowledge.ts`, c'est-à-dire les 7 pages Solution, la FAQ, les secteurs, le parcours après contact et les coordonnées. Les consignes (`prompt.ts`) lui interdisent d'inventer des prix ou des fonctionnalités, et lui demandent de renvoyer vers le formulaire de contact quand il ne sait pas. Une page du site corrigée est donc prise en compte sans toucher au prompt.

## Activer l'IA

1. Créer une clé sur console.anthropic.com > API Keys, et **fixer une limite de dépense mensuelle** sur le compte, par exemple 5 $.
2. Dans `.env.local` (dev) ou dans Azure App Service (prod) :
   ```
   NEXT_PUBLIC_CHAT_AI=on
   CHAT_PROVIDER=anthropic
   ANTHROPIC_API_KEY=sk-ant-...
   ```
3. **Reconstruire le site** (`npm run build`) : `NEXT_PUBLIC_CHAT_AI` est lue au build. Elle change aussi le texte du widget, de la politique de confidentialité et des CGU, qui mentionnent alors l'IA et Anthropic.
4. Tester : ouvrir le chat, poser une question sur CIPA, puis une question hors sujet, et vérifier que les réponses s'appuient sur le site.

Pour couper l'IA : vider `NEXT_PUBLIC_CHAT_AI`, puis reconstruire.

## Coût

**Il n'existe pas de quota gratuit permanent sur l'API Claude** : chaque question envoyée à l'IA est facturée. Le dispositif garde la facture très basse et plafonnée.

- **Estimation, non mesurée** : une question à Claude Haiku 5.5 envoie environ 3 500 tokens (consignes, base de connaissances, historique) et en reçoit quelques centaines. Tarif : 0,10 $ par million de tokens en entrée, 0,50 $ en sortie. Cela fait environ 0,06 centime de dollar par question, et moins d'un dollar par mois si le plafond de 50 questions est atteint chaque jour.
- **Les questions de la FAQ ne coûtent rien** : elles ne quittent pas le navigateur.
- **Plafond applicatif** `CHAT_DAILY_LIMIT` : il est compté en mémoire et repart de zéro au redémarrage du serveur. C'est un garde-fou, pas une garantie.
- **La garantie, c'est la limite de dépense** de la console Anthropic (Settings > Limits). Fixez-la à quelques dollars par mois : au-delà, l'API refuse et le chat repasse automatiquement en réponses locales.

Pour des réponses plus fines, et plus chères, il suffit de changer `CHAT_MODEL` : `claude-sonnet-5-5` ou `claude-opus-5-5`.

## Feuille de route

1. **Enrichir la base** : ajouter les guides (`src/lib/data/guides.ts`), les pages secteurs et Enti Win à `knowledge.ts`.
2. **Jeu de questions de référence** : une trentaine de vraies questions de prospects avec la réponse attendue, pour mesurer la qualité avant chaque changement de prompt ou de modèle.
3. **Prise de rendez-vous dans le chat** : un outil (tool use) qui collecte nom, email et société avec consentement, puis passe par la même livraison que le formulaire (`src/lib/leads/deliver.ts` : tableur, CRM, webhook).
4. **Relais humain** : transmettre la conversation à l'équipe (Slack ou email) quand le visiteur le demande.
5. **Base trop grande pour un prompt** : passer à une recherche documentaire, qui ne sélectionne que les passages utiles à chaque question.

## Tests

`npm test` couvre : la validation de l'historique, l'activation, la base de connaissances, les réponses locales et la route, avec un SDK simulé (aucun appel réel ni coût).
