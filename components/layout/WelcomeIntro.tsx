import Image from 'next/image'

/**
 * Ecran d'introduction.
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
        {/* Glowing Golden Orb */}
        <div
          className="animate-orb-drift absolute -top-10 -left-10 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-gold/12 blur-[100px] sm:blur-[140px]"
          style={{ animationDuration: '6s' }}
        />

        {/* Glowing Graphite Orb */}
        <div
          className="animate-orb-drift absolute -bottom-10 -right-10 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-stone-600/10 blur-[100px] sm:blur-[140px]"
          style={{ animationDuration: '7s' }}
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
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/70" />
          <p className="font-[family-name:var(--font-inter)] text-[11px] sm:text-sm font-semibold uppercase tracking-[0.4em] bg-gradient-to-r from-stone-600 via-gold to-stone-600 bg-clip-text text-transparent">
            Bienvenue sur le site
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/70" />
        </div>

        {/* Logo with premium gold glow.
            Pas de `priority` : la Navbar precharge deja ce meme fichier, et
            un second preload sur la meme URL ne ferait que disputer sa bande
            passante a l'image LCP du hero. */}
        <div className="drop-shadow-[0_10px_45px_rgba(245,166,35,0.25)]">
          <Image
            src="/logo.png"
            alt=""
            width={640}
            height={237}
            className="w-[280px] sm:w-[420px] lg:w-[520px] h-auto"
          />
        </div>

        {/* Decorative thin accent line */}
        <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </div>
  )
}
