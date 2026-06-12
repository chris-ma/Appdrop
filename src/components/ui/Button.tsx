'use client'
import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'electric' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center gap-2.5 font-heading uppercase tracking-widest cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden group transition-all duration-200 active:scale-95',

          variant === 'primary' && [
            'bg-white text-void',
            'before:absolute before:inset-0 before:bg-electric before:translate-y-full before:transition-transform before:duration-300',
            'hover:before:translate-y-0 hover:text-void',
            'after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:-translate-x-full after:transition-transform after:duration-500 hover:after:translate-x-full',
          ],

          variant === 'electric' && [
            'bg-transparent text-electric border border-electric/40',
            'hover:bg-electric/10 hover:border-electric/80 hover:shadow-electric',
            'hover:text-white',
          ],

          variant === 'outline' && [
            'bg-transparent text-ash border border-white/15',
            'hover:bg-white/5 hover:border-white/30 hover:text-white',
          ],

          variant === 'ghost' && [
            'bg-transparent text-fog hover:text-ash hover:bg-white/5',
          ],

          size === 'sm' && 'text-[11px] px-4 py-2 rounded-sm',
          size === 'md' && 'text-[13px] px-6 py-3 rounded',
          size === 'lg' && 'text-[15px] px-8 py-4 rounded',

          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
