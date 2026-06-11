import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'purple' | 'cyan' | 'pink' | 'orange' | 'none'
  hover?: boolean
  padding?: boolean
}

export default function GlassCard({
  glow = 'none',
  hover = false,
  padding = true,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-xl transition-all duration-300',
        padding && 'p-5',
        hover && 'cursor-pointer',
        hover && glow === 'purple' && 'hover:border-brand-purple/40 hover:shadow-glow-purple hover:-translate-y-1',
        hover && glow === 'cyan' && 'hover:border-brand-cyan/40 hover:shadow-glow-cyan hover:-translate-y-1',
        hover && glow === 'pink' && 'hover:border-brand-pink/40 hover:shadow-glow-pink hover:-translate-y-1',
        hover && glow === 'orange' && 'hover:border-brand-orange/40 hover:shadow-glow-orange hover:-translate-y-1',
        hover && glow === 'none' && 'hover:border-white/20 hover:bg-white/5 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
