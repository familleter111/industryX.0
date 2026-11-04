'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Deux réglages de rendu, sans rien afficher (règles dans globals.css).
 *
 * 1. Garde des ancres. Les sections en rendu différé (`cv-auto`) occupent
 *    une hauteur estimée tant qu'elles sont loin de l'écran. Un défilement
 *    doux vers une ancre (`/#faq`) calcule sa destination au départ : les
 *    sections traversées prenant leur vraie hauteur pendant la course, il
 *    s'arrêterait à côté. Dès qu'une ancre est visée (adresse qui en
 *    contient une, clic sur un lien `#…`, changement de hash), la classe
 *    `cv-off` rend tout avant que le navigateur ne défile.
 *
 * 2. Animations en pause hors de l'écran. Les boucles CSS (défilement des
 *    logos, orbite, halos, minuteries des carrousels) continuent sinon de
 *    tourner dans les sections invisibles. Chaque section reçoit
 *    `data-offscreen` quand elle sort de la fenêtre (à 200 px près), ce qui
 *    met ses animations en pause ; elles reprennent où elles en étaient.
 */
export default function RenderGuards() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const renderAll = () => root.classList.add('cv-off')
    if (window.location.hash) renderAll()

    // Phase de capture : la classe est posée avant que Next ou le
    // navigateur ne traitent le clic, donc avant le défilement.
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (target instanceof Element && target.closest('a[href*="#"]')) renderAll()
    }
    document.addEventListener('click', onClick, true)
    window.addEventListener('hashchange', renderAll)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('hashchange', renderAll)
    }
  }, [])

  // Relancé à chaque page : les sections changent avec la navigation.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute('data-offscreen', !entry.isIntersecting)
        }
      },
      { rootMargin: '200px 0px' },
    )
    document.querySelectorAll('main section, footer').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
