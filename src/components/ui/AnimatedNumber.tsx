'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  formatter?: (n: number) => string
  className?: string
}

export default function AnimatedNumber({
  value,
  duration = 2,
  formatter = (n) => String(Math.round(n)),
  className,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const startTime = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isInView) return
    startTime.current = null

    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * value)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {formatter(display)}
    </span>
  )
}
