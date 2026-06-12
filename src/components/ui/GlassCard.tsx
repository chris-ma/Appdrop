import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'electric' | 'neon'
  hover?: boolean
  padding?: boolean
  corners?: boolean
}

export default function GlassCard({
  variant = 'default',
  hover = false,
  padding = true,
  corners = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative transition-all duration-300',
        variant === 'default' && 'glass rounded-lg',
        variant === 'dark' && 'glass-frosted rounded-lg',
        variant === 'electric' && 'glass rounded-lg border-electric-glow',
        variant === 'neon' && 'glass rounded-lg border-neon-glow',
        padding && 'p-5',
        hover && 'hover:-translate-y-1 hover:shadow-glass cursor-pointer',
        corners && 'corner-accent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
