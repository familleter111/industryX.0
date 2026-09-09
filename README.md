# Industry X.0 — Website Next.js

Site vitrine d'Industry X.0 construit avec Next.js 14, Tailwind CSS et Framer Motion.

## Stack

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS v3
- **Animations** : Framer Motion v11
- **Icons** : Lucide React
- **Fonts** : Syne (display) + Outfit (body) via next/font/google
- **Language** : TypeScript

## Démarrage

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
npm start
```

Le site sera disponible sur [http://localhost:3000](http://localhost:3000)

## Structure

```
├── app/
│   ├── globals.css         # Styles globaux, variables CSS, keyframes
│   ├── layout.tsx          # Layout racine avec fonts et metadata
│   └── page.tsx            # Page principale
├── components/
│   ├── Navbar.tsx          # Navigation sticky avec blur, mobile menu
│   ├── Hero.tsx            # Hero avec métriques animées et mesh background
│   ├── CipaSection.tsx     # Section produit CIPA avec dashboard
│   ├── FeaturesGrid.tsx    # Grille 6 fonctionnalités avec hover effects
│   ├── HowItWorks.tsx      # 3 étapes sur fond sombre
│   ├── IndustriesSection.tsx  # Accordion industries + ROI card
│   ├── TestimonialsSection.tsx # 3 témoignages clients
│   ├── IntegrationsSection.tsx # Marquee intégrations
│   ├── CTASection.tsx      # Section CTA fond or
│   └── Footer.tsx          # Footer complet
├── tailwind.config.ts      # Config Tailwind avec couleurs brand
├── next.config.mjs
└── tsconfig.json
```

## Couleurs Brand

| Variable | Valeur | Usage |
|----------|--------|-------|
| `gold` | `#DAA250` | Couleur primaire, CTA, accents |
| `dark` | `#0C0D12` | Fond sombre, texte principal |
| `cream` | `#F4F3EE` | Fond clair |
| `metric-green` | `#22C55E` | Métriques positives |

## Personnalisation

- Modifier les textes directement dans chaque composant
- Les couleurs sont centralisées dans `tailwind.config.ts`
- Les animations Framer Motion sont dans chaque composant
- Ajouter vos vraies images/logos dans `/public`

## Formulaire de contact → Excel

Chaque demande envoyée depuis `/contact` (« Planifier une démonstration »)
devient une ligne de **`data/contacts.xlsx`**, feuille `Demandes` : date et
heure, prénom, nom, email, téléphone au format international, pays, société,
industrie, message, consentement, page d'origine. Le fichier est créé au
premier envoi ; il suffit de l'ouvrir dans Excel pour voir les demandes.

- Route : `app/api/contact/route.ts` — revalide tout, refuse les robots (champ
  piège) et limite à 5 envois par IP par quart d'heure.
- Écriture : `lib/server/leads.ts` — écritures sérialisées et atomiques.
- Emplacement : `CONTACT_XLSX_PATH` dans `.env` pour écrire ailleurs
  (`D:/partage/demandes.xlsx`, un dossier réseau monté…).
- Si le classeur est ouvert dans Excel au moment d'un envoi, Windows le
  verrouille : la demande part alors dans `data/contacts-secours.csv` plutôt
  que d'être perdue. Recopier ces lignes dans le classeur, puis supprimer le
  CSV.
- `data/` est exclu de git : ces fichiers contiennent des données
  personnelles.

> Hébergement : cela suppose un serveur avec disque persistant (VPS, Docker
> avec volume, `next start`). Sur Vercel ou Netlify, le disque est en lecture
> seule — il faut alors viser un stockage externe (base, Google Sheets, S3).

### Champ téléphone

`components/ui/PhoneField.tsx` : sélecteur de pays (drapeau + indicatif) qui
impose la forme du numéro du pays choisi — `+216 20 123 456`,
`+33 6 12 34 56 78`. Tunisie, France, Espagne, Italie et Allemagne ouvrent la
liste, suivies de l'Afrique, l'Europe, le Moyen-Orient, les Amériques, l'Asie
et l'Océanie.

```bash
npm run gen:countries   # régénère lib/data/phoneCountries.ts + public/flags
npm run test:phone      # vérifie la mise en forme des numéros
```

## Notes

- Toutes les images de clients/logos sont des placeholders à remplacer
- Les témoignages sont fictifs — remplacer par de vrais témoignages
