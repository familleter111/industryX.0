# Questions ouvertes (cumul des lots)

Chaque question bloque l'affichage d'une information : tant qu'elle n'a pas de réponse, le site ne montre rien, ou une formulation neutre. Le marqueur `TODO(À CONFIRMER…)` dans le code renvoie ici.

Mis à jour à la fin du lot 1 (28/10/2026).

## Priorité — avant toute mise en ligne

| # | Question | Pourquoi c'est urgent | Responsable probable | Où |
|---|---|---|---|---|
| U1 | Les 7 témoignages au statut `draft` (Médis, Saiph, Rose Blanche, Opella, Neapolis Pharma, Medpack, TCH Industries) ont-ils été validés par les clients ? Sinon : n'afficher que les 2 publiés (`getTestimonials(false)`) ? | Citations attribuées à de vraies sociétés sans leur accord (règles 1 et 2) | Direction commerciale | `lib/data/testimonials.ts`, accueil, `/customers` (L3-10) |
| U2 | « 21 clients » (accueil) ou « 15+ » (contact) : quel chiffre, et au sens de quelle définition ? | Chiffres contradictoires affichés | Direction | L3-01 |
| U3 | « Plus de 30 ans de confiance » (`/entreprise`) : à remplacer par « Depuis 2019 », ou « 30 ans d'expérience industrielle cumulée dans l'équipe fondatrice » ? | Contredit la création en 2019 | Fondateurs | L2-16 |

## Identité légale (mentions légales, L1-03)

| # | Question | Responsable probable |
|---|---|---|
| I1 | Raison sociale exacte et forme juridique (SARL, SA, SUARL…) | Direction / comptabilité |
| I2 | Identifiant unique RNE / matricule fiscal ; capital social à afficher ? | Comptabilité |
| I3 | Directeur de la publication (nom, fonction) | Direction |
| I4 | Hébergeur du site : nom, adresse, téléphone | Responsable technique |

## Données personnelles (politique de confidentialité, L1-03)

| # | Question | Responsable probable |
|---|---|---|
| D1 | Loi applicable : confirmer la formulation (loi organique n° 2004-63 / INPDP ; RGPD pour les personnes dans l'UE) | Référent données / juriste |
| D2 | Durée de conservation des demandes de contact (3 ans proposés et affichés) | Référent données |
| D3 | Lieu d'hébergement du serveur et du tableur des demandes | Responsable technique |
| D4 | Chat IA : région de la ressource Azure OpenAI (`kmii`) et rétention éventuelle par Microsoft (surveillance des abus) | Responsable technique |
| D5 | Délai de réponse aux demandes d'exercice des droits (30 jours affichés) | Référent données |
| D6 | Voies de réclamation : INPDP et autorité du pays dans l'UE (formulation actuelle à valider) | Juriste |

## Coordonnées et contact

| # | Question | Responsable probable | Où |
|---|---|---|---|
| C1 | L'adresse `contact@industryx0.com` doit-elle encore exister, ou rediriger vers `hello@industryx0.pro` ? | Direction | `src/content/site-facts.ts` (L1-11) |
| C2 | Délai de réponse commercial à annoncer (« sous 24 h » retiré du site) | Direction commerciale | `/contact`, chat (L2-15) |
| C3 | Destinataire des demandes : CRM retenu, adresse de secours | Direction commerciale | `recette-formulaire.md` (L2-15, L4-08) |

## Identités à vérifier (L1-12)

| # | Question | Responsable probable |
|---|---|---|
| P1 | Bilel Labidi, CEO & cofondateur ; Aziz Battikh, CTO & cofondateur : orthographe et fonctions exactes | Fondateurs |
| P2 | Fonctions et sociétés des 9 témoignages (liste dans `LOT-1-rapport.md`, L1-12) | Direction commerciale |
