# Recette du formulaire de contact (L1-09)

**Pour :** l'équipe qui valide la préproduction, puis la version publique.
**Préparé le :** 28/10/2026, branche `lot-1-fiabilite`.

L'envoi réel d'une demande de test est fait par l'équipe : le code ne peut pas prouver qu'une demande arrive chez le bon destinataire.

## 1. Ce que le code garantit (vérifié, tests automatisés)

| Exigence | Comment | Preuve |
|---|---|---|
| Champs obligatoires contrôlés côté navigateur **et** serveur | Règles partagées `lib/leads/rules.ts` ; serveur : Zod (`lib/leads/schema.ts`) | `tests/contact.test.ts` : 422 + erreurs par champ, dans la langue de la page |
| Erreur visible en cas d'échec serveur ou réseau | Message `role="alert"` sous le bouton ; erreurs de champ du serveur réaffichées sous chaque champ | Lecture du code : `contact/page.tsx`, `onSubmit` (branches `!response.ok` et `catch`) |
| Succès affiché **après** confirmation du serveur | L'écran de remerciement n'apparaît qu'après `response.ok && data.ok` | Lecture du code : `setStatus('sent')` après le contrôle |
| Pas de double envoi | Navigateur : bouton désactivé et envoi ignoré pendant `sending`. Serveur : même demande (IP, e-mail, message) livrée une seule fois en 10 min (`lib/server/dedupe.ts`) ; un échec n'empêche pas de renvoyer | `tests/contact.test.ts`, bloc « double envoi » : renvoi, envois simultanés, renvoi après échec |
| Pot de miel invisible | Champ `website` hors écran, conteneur `aria-hidden`, `tabIndex=-1`, `autoComplete=off` ; rempli → réponse « ok » sans traitement | `tests/contact.test.ts` : « pot de miel » |
| Consentement obligatoire | Case requise côté navigateur ; serveur : `consent: z.literal(true)` ; heure du consentement fixée par le serveur | `tests/contact.test.ts` : consentement absent → 422 |
| Limite d'envois | 5 envois par IP et par quart d'heure → 429 | `lib/server/rateLimit.ts` |

**Limite connue :** les comportements côté navigateur (succès, erreur, bouton désactivé) sont vérifiés à la lecture du code, pas par un test de composant. Le formulaire est défini dans la page `/contact` (1 500 lignes) ; l'en extraire pour le tester relève du lot 2 (L2-14, refonte du formulaire).

## 2. Envoi d'une demande de test en préproduction

**Prérequis :** variables de livraison renseignées sur l'environnement de préproduction (voir `docs/leads-integration.md`) : `CRM_PROVIDER` et ses clés, et/ou `LEAD_WEBHOOK_URL` + `LEAD_WEBHOOK_SECRET`, et `LEAD_FALLBACK_EMAIL` + `RESEND_API_KEY` pour le secours. Contrôle rapide : `npm run leads:check`.

| # | Action | Résultat attendu |
|---|---|---|
| 1 | Ouvrir `/contact` sur la préproduction | Formulaire affiché, lien « politique de confidentialité » vers `/privacy` |
| 2 | Cliquer « Demander une démo » sans rien remplir | Erreurs sous chaque champ obligatoire, focus sur le premier ; rien n'est envoyé |
| 3 | Remplir avec un e-mail invalide (`test@`) | Erreur sur l'e-mail seulement |
| 4 | Remplir correctement, **sans** cocher le consentement | Erreur « Merci d'accepter le traitement de vos données » |
| 5 | Remplir correctement. Prénom `Recette`, nom `L1-09 <date>`, e-mail d'équipe, société `Industry X.0 — TEST`, message `Demande de test L1-09, à ignorer`. Cocher, envoyer | Bouton « Envoi… » désactivé, puis écran de remerciement |
| 6 | Double-cliquer très vite sur l'envoi d'une demande identique | Un seul lead reçu |
| 7 | Couper le réseau (outils du navigateur : « Offline »), envoyer | Message d'erreur visible ; le formulaire reste rempli |
| 8 | Version anglaise : `/en/contact`, refaire l'étape 2 | Messages d'erreur en anglais |

## 3. Preuve attendue

Pour l'étape 5, à joindre dans « Preuve / lien de recette » (`suivi.csv`, ligne L1-09) :

- capture de l'écran de remerciement, avec la date ;
- capture de la demande reçue **chez le bon destinataire** : fiche CRM (contact + affaire à l'étape Qualification), exécution du webhook, ou e-mail de secours. Ces éléments doivent montrer le nom `Recette L1-09 <date>` ;
- nom de la personne qui a vérifié la réception.

Ensuite, supprimer la demande de test du CRM ou du tableau.

`TODO(À CONFIRMER : destinataire attendu des demandes — CRM retenu, adresse de secours ; voir L2-15 / L4-08)`
