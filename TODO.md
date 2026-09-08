# À valider avant mise en ligne

<!-- Fichier généré par `node scripts/collect-todos.mjs`. -->
<!-- Ne pas éditer à la main : pour retirer une entrée, retirez le TODO du code. -->

Les douze pages CIPA décrivent des comportements produit, des engagements contractuels et des chiffres. Tout ce qui n’a pas pu être vérifié au moment de l’écriture porte un commentaire `TODO` à l’endroit exact où il est affirmé. Ce document les rassemble, page par page.

**81 points ouverts.**

| Catégorie | Points | Qui tranche |
|---|---:|---|
| Juridique | 8 | Direction juridique |
| Produit | 49 | Équipe produit |
| Qualité | 1 | Équipe qualité |
| Société | 2 | Direction |
| Chiffre à valider | 10 | Équipe produit + direction |
| Navigation | 3 | Équipe web |
| Autre | 8 | — |

> Une page dont il reste un `TODO juridique`, `TODO produit` ou `TODO qualite` non tranché ne doit pas être publiée. Les chiffres marqués « à valider » s’affichent en ligne comme des objectifs de déploiement, jamais comme des résultats constatés.

---

## Vue d’ensemble CIPA

`content/plateforme.ts` — /plateforme · 1 point

**Chiffre à valider**

- [ ] `L309` — chiffre non source. Tant qu'aucune mesure client ne l'etaye, il s'affiche comme objectif de deploiement et ne doit pas etre repris comme un resultat constate.

---

## Capture terrain

`content/capture-terrain.ts` — /plateforme/capture-terrain · 8 points

**Produit**

- [ ] `L11` — qu'etre vrais. Chacun porte un `TODO produit` a l'endroit ou il est ecrit. Les points a trancher :
- [ ] `L169` — champs conditionnels : comportement a confirmer.
- [ ] `L181` — annotation sur l'image : a confirmer.
- [ ] `L192` — accuse de prise en charge et relance : a confirmer.
- [ ] `L276` — conservation de la valeur precedente : a confirmer.
- [ ] `L293` — comportement hors connexion a confirmer avant mise en ligne. C'est la premiere question que pose un directeur d'usine, et une reponse fausse se retourne des la premiere demonstration.
- [ ] `L306` — liste des appareils supportes a confirmer, en particulier l'absence d'iOS et la version Android minimale.

**Chiffre à valider**

- [ ] `L242` — chiffre non source. Il s'affiche comme objectif de deploiement tant qu'aucune mesure client ne l'etaye, et ne doit pas etre repris comme un resultat constate.

---

## Orchestration des processus

`content/orchestration.ts` — /plateforme/orchestration · 8 points

**Produit**

- [ ] `L10` — etayes par une source interne. Chacun porte un `TODO produit`. A trancher :
- [ ] `L169` — reprise des dossiers en cours a confirmer.
- [ ] `L190` — transfert en cas d'absence : a confirmer.
- [ ] `L201` — immuabilite d'une etape validee : a confirmer.
- [ ] `L278` — cette note depend de la nature exacte de la signature electronique implementee. Ne pas la publier avant confirmation.
- [ ] `L288` — etendue reelle du parametrage sans code a confirmer, et surtout ou passe la frontiere avec une intervention technique.
- [ ] `L295` — modele de roles, perimetres et delegation a confirmer avant mise en ligne.

**Chiffre à valider**

- [ ] `L240` — chiffre non source. Affiche comme objectif de deploiement tant qu'aucune mesure client ne l'etaye ; ne pas le reprendre comme un resultat constate.

---

## Intelligence opérationnelle

`content/intelligence-operationnelle.ts` — /plateforme/intelligence-operationnelle · 8 points

**Produit**

- [ ] `L167` — ponderation ajustable des criteres : a confirmer.
- [ ] `L188` — comportement quand la donnee manque : a confirmer.
- [ ] `L286` — volume d'historique necessaire a confirmer.

**Chiffre à valider**

- [ ] `L223` — chiffre non source. Affiche comme objectif de deploiement tant qu'aucune mesure client ne l'etaye.

**Juridique**

- [ ] `L240` — region d'hebergement, duree de conservation et sous-traitants a confirmer avant mise en ligne.
- [ ] `L246` — engagement de non-reutilisation. Point le plus sensible de la page : ne rien publier ici sans validation ecrite.
- [ ] `L272` — nature du modele employe. Si un fournisseur tiers intervient, cette reponse doit le dire : elle conditionne la credibilite de tout le bloc gouvernance.
- [ ] `L280` — a aligner mot pour mot sur le contrat de service.

---

## Tableaux de bord

`content/tableaux-de-bord.ts` — /plateforme/tableaux-de-bord · 5 points

**Chiffre à valider**

- [ ] `L185` — chiffre non source. Affiche comme objectif de deploiement tant qu'aucune mesure client ne l'etaye.

**Produit**

- [ ] `L205` — confirmer, famille par famille, ce qui est livre.
- [ ] `L221` — etendue de la personnalisation a confirmer, et ou passe exactement la frontiere avec un developpement.
- [ ] `L228` — frequence reelle de mise a jour a confirmer.
- [ ] `L234` — connecteurs BI reellement disponibles a confirmer.

---

## Intégrations industrielles

`content/integrations.ts` — /plateforme/integrations · 7 points

**Produit**

- [ ] `L92` — confirmer que les ecrans montres sur 01 correspondent bien
- [ ] `L336` — existence et modalites d'un environnement de test.
- [ ] `L369` — existence d'un environnement de test a confirmer.

**Chiffre à valider**

- [ ] `L300` — chiffre non source. Affiche comme objectif de deploiement tant qu'aucun projet mesure ne l'etaye.

**Juridique**

- [ ] `L318` — protocoles d'authentification supportes.
- [ ] `L327` — options et region d'hebergement.
- [ ] `L341` — engagement de reversibilite et format d'export.

---

## Qualité & conformité

`content/qualite-conformite.ts` — /solutions/qualite-conformite · 5 points

**Produit**

- [ ] `L177` — blocage d'une version perimee : a confirmer.
- [ ] `L183` — le brief disait « infalsifiables ». Voir l'en-tete de fichier : ce titre et ces points decrivent le mecanisme constatable, a durcir seulement si l'implementation porte un vrai scellement.
- [ ] `L200` — rattachement d'une reclamation aux lots : a confirmer.

**Chiffre à valider**

- [ ] `L241` — chiffre non source, et identique a celui de content/plateforme.ts. Une seule validation pour les deux pages.

**Qualité**

- [ ] `L283` — voir l'en-tete de fichier. Ne nommer aucune norme avant que la liste exacte des referentiels couverts soit etablie.

---

## Production & dossier de lot

`content/production-dossier-de-lot.ts` — /solutions/production-dossier-de-lot · 6 points

**Juridique**

- [ ] `L28` — (FAQ 4) — a croiser avec le TODO juridique de la page Intelligence operationnelle sur la conservation des donnees ; - la valeur reglementaire du dossier de lot electronique, qui conditionne ce que la FAQ 1 peut affirmer au secteur pharmaceutique. /

**Produit**

- [ ] `L228` — controle de completude : promesse centrale de la page, a confirmer avant publication.
- [ ] `L342` — valeur reglementaire du dossier electronique. Cette reponse est lue en premier par le secteur pharmaceutique.
- [ ] `L354` — blocage de la liberation sur ecart ouvert.
- [ ] `L360` — duree de conservation et relecture d'un lot ancien.

**Chiffre à valider**

- [ ] `L290` — chiffre non source. Affiche comme objectif de deploiement tant qu'aucune mesure client ne l'etaye.

---

## Maintenance & sécurité

`content/maintenance-securite.ts` — /solutions/maintenance-securite · 4 points

**Produit**

- [ ] `L212` — permis de travail : formulaire dedie ou formulaire generique avec circuit de validation ? Voir la FAQ 2.
- [ ] `L242` — rattachement au referentiel equipements et profondeur d'historique consultable.
- [ ] `L336` — permis de travail : formulaire dedie ou generique ? Cette reponse doit etre exacte avant publication.
- [ ] `L343` — relance automatique et niveau de remontee.

---

## Non-conformités & CAPA

`content/non-conformites-capa.ts` — /solutions/non-conformites-capa · 6 points

**Produit**

- [ ] `L88` — accuse de reception date et calcul du delai.
- [ ] `L109` — rapprochement automatique avec les ecarts internes.
- [ ] `L210` — cadre d'analyse propose : cinq pourquoi, arbre des causes, Ishikawa, ou champ structure ? Voir la FAQ 2.
- [ ] `L222` — correctif et preventif : deux objets ou un champ ?
- [ ] `L335` — cadre d'analyse reellement propose. Cette reponse engage la credibilite de la capacite « analyse de cause outillee ».

**Chiffre à valider**

- [ ] `L277` — chiffre non source, et identique a celui de content/orchestration.ts. Une seule validation pour les deux pages.

---

## Audits & inspections

`content/audits-inspections.ts` — /solutions/audits-inspections · 4 points

**Produit**

- [ ] `L193` — recurrence, rappels et suivi de l'ecart prevu/realise.
- [ ] `L204` — bareme, ponderation, calcul du score global.
- [ ] `L292` — reprise des grilles existantes.
- [ ] `L308` — comparaison entre perimetres differents.

---

## Amélioration continue

`content/amelioration-continue.ts` — /solutions/amelioration-continue · 7 points

**Produit**

- [ ] `L113` — pourcentage d'avancement : saisi ou deduit ?
- [ ] `L124` — maille du Pareto : trois niveaux hierarchiques ?
- [ ] `L142` — circuit d'approbation : qui valide, selon quelle criticite ? Non decrit ici faute d'element valide.
- [ ] `L270` — fichier source en 245 px de large, affiche autour de 460 px : l'image est agrandie et se voit legerement floue sur un ecran dense. Remplacer par une version plus grande si elle existe ; seuls `width` et `height` changent ici.
- [ ] `L360` — maille du Pareto, voir l'en-tete de fichier.

**Société**

- [ ] `L230` — voir l'en-tete : « l'Ariana » contredit l'adresse du pied de page et la page /about, qui disent Tunis. Et l'accompagnement annonce comme venant avec l'outil est un engagement commercial a confirmer.
- [ ] `L371` — perimetre exact de l'accompagnement.

---

## Navigation et pied de page

`content/shared.ts` — commun à toutes les pages · 4 points

**Autre**

- [ ] `L372` — `'/'` tant que la page n'existe pas. Ces entrees portent un TODO : un lien de pied de page qui renvoie sur l'accueil est un lien mort deguise. /

**Navigation**

- [ ] `L391` — a creer — renvoient sur l'accueil en attendant.
- [ ] `L401` — a creer — renvoie sur l'accueil en attendant.
- [ ] `L409` — a creer — renvoient sur l'accueil en attendant.

---

## app/contact/page.tsx

`app/contact/page.tsx` · 1 point

**Autre**

- [ ] `L260` — brancher ici l’endpoint réel (route API /api/contact ou CRM).

---

## components/layout/Footer.tsx

`components/layout/Footer.tsx` · 1 point

**Autre**

- [ ] `L250` — {/* TODO — remplacer par l'URL reelle de la page Facebook.

---

## components/sections/HowItWorks.tsx

`components/sections/HowItWorks.tsx` · 1 point

**Autre**

- [ ] `L306` — (sources) — remplacer par les references reelles avant la

---

## components/sections/SdgContribution.tsx

`components/sections/SdgContribution.tsx` · 1 point

**Autre**

- [ ] `L31` — (licence) — verifier avant la soutenance les conditions d'utilisation des logos ODD de l'ONU. Les Guidelines on the Use of the SDG Logo and the 17 SDG Icons distinguent l'usage informatif de l'usage commercial : le second exige une autorisation ecrite, et interdit de laisser entendre que l'ONU soutient le produit. Un site vitrine d'editeur logiciel releve du second cas. Reference : un.org/sustainabledevelopment/news/communications-material/ /

---

## content/types.ts

`content/types.ts` · 1 point

**Chiffre à valider**

- [ ] `L180` — est vide, la valeur porte un `// TODO valider` a l'endroit ou elle est ecrite, et reste formulee comme un objectif, jamais comme un constat. /

---

## lib/data/architecture.ts

`lib/data/architecture.ts` · 2 points

**Autre**

- [ ] `L61` — (stack) — compléter avec les technologies réellement employées par CIPA avant la soutenance.
- [ ] `L104` — (conformite) — faire relire ces trois points par le responsable technique avant la soutenance. Ils sont formulés comme des propriétés de conception, ce qui est défendable ; les transformer en engagements (certification obtenue, chiffrement de tel type) demanderait des preuves. /

---

## lib/data/clientLogos.ts

`lib/data/clientLogos.ts` · 1 point

**Autre**

- [ ] `L58` — identifier la commune exacte (texte en arabe sur le blason). Seul logo plus étroit que les autres : 68 % de largeur.
