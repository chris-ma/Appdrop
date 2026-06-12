'use client'
import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({ children, className, strength = 0.35 }: MagneticButtonProps) {
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
      currentX = lerp(currentX, targetX, 0.1)
      currentY = lerp(currentY, targetY, 0.1)
      el.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`
      if (inside || Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
        raf = requestAnimationFrame(animate)
      }
    }

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      targetX = (e.clientX - cx) * strength
      targetY = (e.clientY - cy) * strength
    }

    const handleEnter = () => {
      inside = true
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(animate)
      el.addEventListener('mousemove', handleMove)
    }

    const handleLeave = () => {
      inside = false
      targetX = 0
      targetY = 0
      el.removeEventListener('mousemove', handleMove)
      raf = requestAnimationFrame(animate)
    }

    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <div ref={ref} className={cn('inline-block', className)}>
      {children}
    </div>
  )
}
