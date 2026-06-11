'use client'
import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'neon' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 font-grotesk font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-brand-purple hover:bg-purple-500 text-white rounded-lg active:scale-95 shadow-glow-purple hover:shadow-[0_0_40px_rgba(124,58,237,0.7)]':
              variant === 'primary',
            'border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10 rounded-lg active:scale-95 shadow-[0_0_0_rgba(6,182,212,0)] hover:shadow-glow-cyan':
              variant === 'neon',
            'text-white/60 hover:text-white hover:bg-white/5 rounded-lg active:scale-95':
              variant === 'ghost',
            'bg-red-600/80 hover:bg-red-500 text-white rounded-lg active:scale-95':
              variant === 'danger',
          },
          {
            'text-xs px-3 py-1.5': size === 'sm',
            'text-sm px-5 py-2.5': size === 'md',
            'text-base px-7 py-3.5': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
