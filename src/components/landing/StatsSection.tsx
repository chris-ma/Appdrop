'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { PLATFORM_STATS } from '@/lib/constants'

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 border-y border-white/5">
      {/* Horizontal scan line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-electric/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5">
          {PLATFORM_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="px-8 py-6 text-center first:pl-0 last:pr-0"
            >
              <div className="font-heading text-5xl md:text-6xl text-white mb-2 leading-none">
                <AnimatedNumber value={stat.value} formatter={stat.format} duration={2} />
              </div>
              <p className="text-[10px] font-inter tracking-[0.22em] text-fog uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
