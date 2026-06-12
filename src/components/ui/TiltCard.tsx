'use client'
import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  strength?: number
  glowColor?: string
}

export default function TiltCard({
  children,
  className,
  strength = 12,
  glowColor = 'rgba(0,212,255,0.08)',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let raf = 0
    let inside = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.12)
      currentY = lerp(currentY, targetY, 0.12)

      const gX = ((currentX + 0.5) * 100).toFixed(1)
      const gY = ((currentY + 0.5) * 100).toFixed(1)

      el.style.transform = `perspective(900px) rotateX(${(-currentY * strength).toFixed(2)}deg) rotateY(${(currentX * strength).toFixed(2)}deg) translateZ(8px)`

      const highlight = el.querySelector('.tilt-highlight') as HTMLElement | null
      if (highlight) {
        highlight.style.background = `radial-gradient(circle at ${gX}% ${gY}%, ${glowColor} 0%, transparent 60%)`
        highlight.style.opacity = inside ? '1' : '0'
      }

      if (inside || Math.abs(currentX) > 0.001 || Math.abs(currentY) > 0.001) {
        raf = requestAnimationFrame(animate)
      }
    }

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      targetX = (e.clientX - rect.left) / rect.width - 0.5
      targetY = (e.clientY - rect.top) / rect.height - 0.5
    }

    const handleEnter = () => {
      inside = true
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(animate)
    }

    const handleLeave = () => {
      inside = false
      targetX = 0
      targetY = 0
      raf = requestAnimationFrame(animate)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(raf)
    }
  }, [strength, glowColor])

  return (
    <div
      ref={ref}
      className={cn('relative tilt-card', className)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Dynamic light reflection */}
      <div
        className="tilt-highlight absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-10"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  )
}
