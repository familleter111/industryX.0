'use client'

/**
 * Taille du panneau de chat : trois tailles standard, au choix du visiteur
 * (boutons de l'en-tête du widget). Le choix est gardé dans le navigateur.
 *
 * Chaque taille est bornée par la fenêtre : jamais plus large qu'elle (marge
 * de 24 px à gauche), jamais sous la barre de navigation fixe en haut. Sur
 * un téléphone (moins de 640 px de large), pas de choix : le panneau garde
 * sa taille CSS, déjà calée sur l'écran.
 */

import { useCallback, useEffect, useState } from 'react'

export type PanelSize = { width: number; height: number }
export type PanelPreset = 'small' | 'medium' | 'large'

export const PRESETS: Record<PanelPreset, PanelSize> = {
  small: { width: 340, height: 460 },
  medium: { width: 420, height: 600 },
  large: { width: 600, height: 780 },
}
export const PRESET_ORDER: PanelPreset[] = ['small', 'medium', 'large']
const DEFAULT_PRESET: PanelPreset = 'medium'

const STORAGE_KEY = 'ix0-chat-size'
/** Largeur d'écran à partir de laquelle le panneau se règle (`sm` de Tailwind). */
const RESIZABLE_FROM = 640
/** Espace réservé autour du panneau : `right-6` + marge gauche ; `bottom-24` + barre de navigation. */
const MARGIN_X = 48
const MARGIN_Y = 96 + 100
/** Plancher, pour une fenêtre très basse ou très étroite. */
const MIN: PanelSize = { width: 320, height: 380 }

export function clampSize(size: PanelSize, viewport: { width: number; height: number }): PanelSize {
  return {
    width: Math.min(size.width, Math.max(MIN.width, viewport.width - MARGIN_X)),
    height: Math.min(size.height, Math.max(MIN.height, viewport.height - MARGIN_Y)),
  }
}

function loadPreset(): PanelPreset {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && saved in PRESETS) return saved as PanelPreset
  } catch {
    // Stockage bloqué : taille par défaut.
  }
  return DEFAULT_PRESET
}

export function usePanelSize() {
  const [preset, setPresetState] = useState<PanelPreset>(DEFAULT_PRESET)
  // `null` : pas de réglage (téléphone, ou avant le premier rendu client).
  const [viewport, setViewport] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    setPresetState(loadPreset())
    const fit = () => setViewport({ width: window.innerWidth, height: window.innerHeight })
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const setPreset = useCallback((next: PanelPreset) => {
    setPresetState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Choix gardé le temps de la page seulement.
    }
  }, [])

  const resizable = viewport !== null && viewport.width >= RESIZABLE_FROM
  const size = resizable ? clampSize(PRESETS[preset], viewport) : null

  return { preset, setPreset, size }
}
