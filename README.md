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

## Notes

- Toutes les images de clients/logos sont des placeholders à remplacer
- Les témoignages sont fictifs — remplacer par de vrais témoignages
- Le formulaire de contact est à connecter à votre backend
