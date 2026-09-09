'use client'

/**
 * Champ telephone international.
 *
 * Deux commandes dans une seule boite : un selecteur de pays (drapeau +
 * indicatif) et la saisie du numero national. Le pays choisi commande la
 * forme du numero — +216 ## ### ### en Tunisie, +33 # ## ## ## ## en France :
 * le gabarit vient de lib/data/phoneCountries.ts, genere depuis les
 * metadonnees libphonenumber-js, et non d'un placeholder ecrit a la main qui
 * afficherait « +33 6 12 34 56 78 » a un client tunisien.
 *
 * Les drapeaux sont servis depuis /public/flags : aucun appel a un CDN tiers
 * a l'execution. L'emoji drapeau n'etait pas une option — Windows ne dessine
 * pas les indicateurs regionaux et aurait affiche « TN » a la place.
 */

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Check, ChevronDown, Search } from 'lucide-react'

import {
  PHONE_COUNTRY_GROUPS,
  findPhoneCountry,
  type PhoneCountry,
} from '@/lib/data/phoneCountries'
import { deburr, formatNationalPhone } from '@/lib/phone'

/* ============================================================
   DRAPEAU
   ============================================================ */

function Flag({ iso, name }: { iso: string; name: string }) {
  return (
    <span className="relative block h-[14px] w-5 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10">
      <Image
        src={`/flags/${iso.toLowerCase()}.png`}
        alt={name}
        fill
        sizes="20px"
        // 192 vignettes de 1 ko : les passer a l'optimiseur couterait plus
        // que les servir telles quelles.
        unoptimized
        className="object-cover"
      />
    </span>
  )
}

/* ============================================================
   CHAMP
   ============================================================ */

type PhoneFieldProps = {
  /** Id de l'input du numero — celui que vise le <label for>. */
  id: string
  name?: string
  /** ISO du pays selectionne. */
  country: string
  onCountryChange: (iso: string) => void
  /** Numero national, deja mis en forme. */
  value: string
  onValueChange: (value: string) => void
  error?: string
  describedBy?: string
}

export default function PhoneField({
  id,
  name = 'phone',
  country,
  onCountryChange,
  value,
  onValueChange,
  error,
  describedBy,
}: PhoneFieldProps) {
  const selected =
    findPhoneCountry(country) ?? PHONE_COUNTRY_GROUPS[0].countries[0]

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIso, setActiveIso] = useState(selected.iso)

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const listboxId = useId()
  const optionId = (iso: string) => `${listboxId}-${iso}`

  /* --- filtrage : nom, code ISO ou indicatif --- */
  const groups = useMemo(() => {
    const needle = deburr(query)
    if (!needle) return PHONE_COUNTRY_GROUPS

    const digits = needle.replace(/\D/g, '')

    return PHONE_COUNTRY_GROUPS.map((group) => ({
      label: group.label,
      countries: group.countries.filter(
        (item) =>
          deburr(item.name).includes(needle) ||
          item.iso.toLowerCase().startsWith(needle) ||
          (digits.length > 0 && item.dial.startsWith(digits)),
      ),
    })).filter((group) => group.countries.length > 0)
  }, [query])

  const flat = useMemo(() => groups.flatMap((group) => group.countries), [groups])

  /* --- ouverture : on part du pays courant, sinon du premier resultat --- */
  useEffect(() => {
    if (!open) return
    searchRef.current?.focus()
    setActiveIso(selected.iso)
  }, [open, selected.iso])

  // La liste filtree peut ne plus contenir l'element actif.
  useEffect(() => {
    if (!open) return
    if (!flat.some((item) => item.iso === activeIso)) {
      setActiveIso(flat[0]?.iso ?? '')
    }
  }, [open, flat, activeIso])

  // Garde l'option active visible, sans faire defiler la page autour d'elle.
  useEffect(() => {
    if (!open || !activeIso) return
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-iso="${activeIso}"]`,
    )
    node?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIso])

  /* --- fermeture au clic exterieur --- */
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [open])

  const closeAndReturnFocus = () => {
    setOpen(false)
    setQuery('')
    triggerRef.current?.focus()
  }

  const select = (item: PhoneCountry) => {
    onCountryChange(item.iso)
    // Le numero est reformate au gabarit du nouveau pays : les chiffres deja
    // saisis restent, leur decoupage change.
    onValueChange(formatNationalPhone(value, item))
    setOpen(false)
    setQuery('')
    triggerRef.current?.focus()
  }

  const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const index = flat.findIndex((item) => item.iso === activeIso)

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (flat.length === 0) return
      const step = event.key === 'ArrowDown' ? 1 : -1
      const next = (index + step + flat.length) % flat.length
      setActiveIso(flat[next].iso)
      return
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      if (flat.length === 0) return
      setActiveIso(flat[event.key === 'Home' ? 0 : flat.length - 1].iso)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const item = flat[index] ?? flat[0]
      if (item) select(item)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      closeAndReturnFocus()
      return
    }

    if (event.key === 'Tab') closeAndReturnFocus()
  }

  const borderClass = error ? 'border-red-600' : 'border-stone-200'

  return (
    <div ref={rootRef} className="relative">
      <div
        className={`flex h-11 w-full items-center rounded-xl border bg-white transition-all duration-200 focus-within:border-gold-deep focus-within:ring-4 focus-within:ring-gold-deep/15 ${borderClass}`}
      >
        {/* SELECTEUR DE PAYS */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setOpen(true)
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          aria-label={`Indicatif du pays : ${selected.name}, +${selected.dial}. Modifier`}
          className="flex h-full shrink-0 items-center gap-1.5 rounded-l-xl pl-3 pr-2 outline-none transition-colors duration-200 hover:bg-stone-50 focus-visible:bg-stone-50"
        >
          <Flag iso={selected.iso} name={selected.name} />
          <span className="text-[14px] font-medium tabular-nums text-stone-900">
            +{selected.dial}
          </span>
          <ChevronDown
            size={14}
            className={`text-subtle transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        <span aria-hidden="true" className={`h-5 w-px ${error ? 'bg-red-300' : 'bg-stone-200'}`} />

        {/* NUMERO */}
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={selected.example || 'Votre numéro'}
          value={value}
          onChange={(event) =>
            onValueChange(formatNationalPhone(event.target.value, selected))
          }
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="h-full min-w-0 flex-1 rounded-r-xl bg-transparent px-3 text-[14px] text-stone-900 outline-none placeholder:text-placeholder"
        />
      </div>

      {/* LISTE DES PAYS */}
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-[0_20px_50px_rgba(17,24,39,0.16)]">
          <div className="relative border-b border-stone-100">
            <Search
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
            />
            <input
              ref={searchRef}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={activeIso ? optionId(activeIso) : undefined}
              aria-label="Rechercher un pays"
              placeholder="Rechercher un pays ou un indicatif"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onSearchKeyDown}
              className="h-10 w-full bg-transparent pl-9 pr-3 text-[13px] text-stone-900 outline-none placeholder:text-placeholder"
            />
          </div>

          <div
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label="Pays"
            className="max-h-64 overflow-y-auto overscroll-contain py-1"
          >
            {groups.length === 0 && (
              <p className="px-3 py-6 text-center text-[13px] text-subtle">
                Aucun pays ne correspond à « {query} ».
              </p>
            )}

            {groups.map((group) => (
              <div key={group.label} role="group" aria-label={group.label}>
                <div
                  aria-hidden="true"
                  className="sticky top-0 z-10 bg-white/95 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.09em] text-subtle backdrop-blur-sm"
                >
                  {group.label}
                </div>

                {group.countries.map((item) => {
                  const isSelected = item.iso === selected.iso
                  const isActive = item.iso === activeIso
                  return (
                    <div
                      key={item.iso}
                      id={optionId(item.iso)}
                      data-iso={item.iso}
                      role="option"
                      aria-selected={isSelected}
                      // mousedown plutot que le focus : le clic ne doit pas
                      // voler le focus au champ de recherche avant le choix.
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => select(item)}
                      onMouseEnter={() => setActiveIso(item.iso)}
                      className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 text-[13.5px] transition-colors duration-150 ${
                        isActive ? 'bg-stone-100' : 'bg-transparent'
                      }`}
                    >
                      <Flag iso={item.iso} name={item.name} />
                      <span
                        className={`min-w-0 flex-1 truncate ${
                          isSelected
                            ? 'font-semibold text-gray-900'
                            : 'text-stone-700'
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="shrink-0 tabular-nums text-[12.5px] text-subtle">
                        +{item.dial}
                      </span>
                      {isSelected && (
                        <Check size={14} className="shrink-0 text-gold-deep" />
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
