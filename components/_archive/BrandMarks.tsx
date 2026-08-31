import clsx from 'clsx'
import { Cog } from 'lucide-react'

type MarkSize = 'sm' | 'md' | 'lg'

const industrySizes = {
  sm: {
    wrap: 'gap-2',
    icon: 'h-8 w-8',
    cog: 20,
    text: 'text-base',
    ix: 'text-[10px]',
  },
  md: {
    wrap: 'gap-2.5',
    icon: 'h-9 w-9',
    cog: 23,
    text: 'text-lg',
    ix: 'text-[11px]',
  },
  lg: {
    wrap: 'gap-3',
    icon: 'h-11 w-11',
    cog: 28,
    text: 'text-2xl',
    ix: 'text-xs',
  },
}

const cipaSizes = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
}

export function IndustryMark({
  size = 'md',
  tone = 'dark',
  compact = false,
}: {
  size?: MarkSize
  tone?: 'dark' | 'light'
  compact?: boolean
}) {
  const sizes = industrySizes[size]
  const textColor = tone === 'light' ? 'text-white' : 'text-dark'

  return (
    <span className={clsx('flex min-w-0 items-center', sizes.wrap)}>
      <span
        className={clsx(
          'relative flex shrink-0 items-center justify-center rounded-lg border',
          sizes.icon,
          tone === 'light'
            ? 'border-white/15 bg-white/8 text-gold'
            : 'border-dark/10 bg-white text-gold shadow-sm'
        )}
      >
        <Cog size={sizes.cog} strokeWidth={2.4} aria-hidden="true" />
        
      </span>
      {!compact && (
        <span className={clsx('min-w-0 truncate font-display font-bold leading-none', sizes.text, textColor)}>
          Industry <span className="text-gold">X.0</span>
        </span>
      )}
    </span>
  )
}

export function CipaMark({
  size = 'md',
  compact = false,
}: {
  size?: MarkSize
  compact?: boolean
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 align-middle">
  <span
    className={clsx(
      'font-display font-extrabold leading-none tracking-normal text-[#56D987]',
      cipaSizes[size]
    )}
  >
    C<span className="text-[#E19640]">I</span>PA
  </span>
</span>
      )}
    
