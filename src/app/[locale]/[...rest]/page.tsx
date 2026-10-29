import { notFound } from 'next/navigation'

/**
 * Toute adresse inconnue sous une langue (/page-inconnue, /en/missing…) :
 * la page 404 du site (../not-found.tsx), dans la langue demandée. Sans
 * cette route, Next servait sa page 404 par défaut, hors du layout.
 */
export default function UnknownPage() {
  notFound()
}
