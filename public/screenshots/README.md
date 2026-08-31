# Captures d'écran du mockup téléphone

Ces six fichiers alimentent le mockup iPhone de la section « Tout ce qu'il faut
pour gérer vos opérations industrielles » sur la page d'accueil
(`components/sections/CasesSection.tsx`).

Tant qu'un fichier est absent, la page affiche un écran schématique
(`components/ui/AppScreenPlaceholder.tsx`) — jamais une image cassée. Rien
d'autre n'est à modifier : déposer le fichier au bon nom suffit.

## Fichiers attendus

| Fichier | Onglet | Ce que l'écran doit montrer |
|---|---|---|
| `audits.webp` | Audits internes | Exécution d'un audit : checklist en cours, éléments cochés, progression |
| `quality.webp` | Inspections qualité | Saisie d'une inspection terrain, avec photo annotée |
| `deviations.webp` | Déviations & NC | Fiche de non-conformité et son workflow de traitement |
| `production.webp` | Contrôles production | Contrôle sur ligne : valeurs relevées, seuils, alerte |
| `rounds.webp` | Tournées terrain | Tournée en cours : étapes, points visités, position |
| `improvement.webp` | Amélioration continue | Tableau de bord : indicateurs et suivi des plans d'action |

## Dimensions

L'écran du mockup mesure **144 × 306 px** dans la page (ratio 2.125,
arrondi 27,2 px appliqué par le composant — l'image n'a pas besoin d'être
arrondie).

Exporter en **3×** pour rester net sur écran haute densité :

    432 × 918 px

Le 2× (288 × 612) reste acceptable si la source ne permet pas mieux. Ne pas
descendre en dessous : l'image est affichée en `object-cover` et toute
différence de ratio est rognée au centre.

## Format

**WebP**, qualité 80 à 85. Viser moins de 60 Ko par fichier.

Depuis un PNG :

    cwebp -q 82 -resize 432 918 source.png -o audits.webp

Éviter le PNG : les captures d'interface plein écran y pèsent facilement dix
fois plus. À titre de comparaison, `public/audit.png`, l'ancien visuel de cette
section, fait 1,6 Mo.

## Points d'attention

- **Aucune donnée client réelle.** Noms d'entreprise, numéros de lot,
  identifiants et photos doivent être fictifs ou anonymisés.
- **Cadrage** : capturer l'écran seul, sans châssis de téléphone ni barre de
  navigateur — le mockup fournit déjà le cadre, l'encoche et les boutons.
- **Barre de statut** : la laisser visible, elle rend la capture crédible.
- Le texte alternatif de chaque image est défini dans `lib/data/features.ts`,
  pas ici.
