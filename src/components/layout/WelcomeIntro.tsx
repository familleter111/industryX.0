import Image from 'next/image'

/**
 * Ecran d'introduction : le logo seul. Le libellé « Bienvenue sur le site »
 * qui le surmontait a été retiré.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POURQUOI CE COMPOSANT N'EST PAS CLIENT
 * ─────────────────────────────────────────────────────────────────────────
 *
 * La version precedente ouvrait sur `useState(true)` et se retirait via un
 * `setTimeout` pose dans un `useEffect`. L'overlay etait donc peint des le
 * HTML serveur, mais sa disparition n'etait armee qu'apres l'hydratation :
 * le budget reel valait « temps d'hydratation + 1800 ms + 500 ms », pas
 * 2,3 s. Sur cette page — trente-cinq composants clients, Framer Motion
 * partout — cela faisait pres de dix secondes de contenu masque, quand le
 * seuil « bon » du LCP est a 2,5 s. Le defaut n'etait pas la duree ecrite
 * dans le code, mais son couplage a la metrique la plus lente de la page :
 * il s'aggravait tout seul a chaque section ajoutee.
 *
 * Une animation CSS, elle, demarre au premier paint. Elle ignore le
 * JavaScript, donc le poids du bundle : les 460 ms ci-dessous sont 460 ms
 * quoi qu'il arrive. Le composant n'a plus d'etat, plus d'effet, plus de
 * `setTimeout` — donc plus de raison d'etre client, et son sous-arbre
 * (le logo, les textes) ne part plus dans le bundle.
 *
 * Le hero est rendu cote serveur dessous, present dans le HTML initial et
 * lisible des la premiere image : l'intro se superpose, elle n'attend pas.
 *
 * Sous `prefers-reduced-motion: reduce`, la regle globale de globals.css
 * ramene toute animation a 0,01 ms. `forwards` conserve l'etat final :
 * l'ecran est retire immediatement, sans transition.
 */

/** Passer a `false` retire l'introduction : le hero s'affiche seul. */
const SHOW_INTRO = true

export default function WelcomeIntro() {
  if (!SHOW_INTRO) return null

  return (
    <div
      aria-hidden
      data-welcome-intro
      className="animate-welcome-out pointer-events-none fixed inset-0 z-intro flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gold-50 via-cream to-gold-100"
    >
      {/* ================= PREMIUM GRADIENT MESH BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Halos en dégradé radial plutôt que disques floutés (`blur-[140px]`) :
            même lueur, mais l'intro couvre tout l'écran au premier affichage,
            et un flou de cette taille retardait ce premier affichage (donc le
            LCP, dont le logo ci-dessous est l'élément) sur mobile. */}
        <div
          className="animate-orb-drift absolute -top-48 -left-48 h-[650px] w-[650px] sm:h-[800px] sm:w-[800px]"
          style={{ animationDuration: '6s', background: 'radial-gradient(closest-side, rgba(218,162,80,0.12), transparent)' }}
        />

        <div
          className="animate-orb-drift absolute -bottom-48 -right-48 h-[650px] w-[650px] sm:h-[800px] sm:w-[800px]"
          style={{ animationDuration: '7s', background: 'radial-gradient(closest-side, rgba(87,83,78,0.10), transparent)' }}
        />

        {/* Elegant grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245,166,35,0.14) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,166,35,0.14) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center font-[family-name:var(--font-inter)]">
        {/* Logo with premium gold glow.
            Pas de `priority` : la Navbar precharge deja ce meme fichier, et
            un second preload sur la meme URL ne ferait que disputer sa bande
            passante a l'image LCP du hero. */}
        {/* Lueur dorée en dégradé derrière le logo, plutôt qu'un
            `drop-shadow` (un filtre recalculé sur l'image). */}
        <div className="relative">
          <span
            aria-hidden
            className="absolute -inset-x-10 -inset-y-12"
            style={{ background: 'radial-gradient(closest-side, rgba(245,166,35,0.18), transparent)' }}
          />
          <Image
            src="/logo.png"
            alt=""
            width={640}
            height={237}
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 280px"
            // Premier élément affiché, souvent le LCP : jamais en différé.
            loading="eager"
            className="relative w-[280px] sm:w-[420px] lg:w-[520px] h-auto"
          />
        </div>

        {/* Decorative thin accent line */}
        <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </div>
  )
}
