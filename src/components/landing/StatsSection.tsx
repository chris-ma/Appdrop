'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { formatLargeNumber } from '@/lib/utils'

const stats = [
  { value: 28400, label: 'COMMUNITY MEMBERS', prefix: '', suffix: '+', format: (n: number) => `${Math.round(n / 1000)}K+` },
  { value: 4892, label: 'IDEAS SUBMITTED', prefix: '', suffix: '+', format: (n: number) => `${Math.round(n).toLocaleString()}+` },
  { value: 1200000, label: 'TOTAL FUNDED', prefix: '$', suffix: '', format: (n: number) => `$${(n / 1000000).toFixed(1)}M+` },
  { value: 143, label: 'APPS SHIPPED', prefix: '', suffix: '', format: (n: number) => `${Math.round(n)}` },
]

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-grotesk font-extrabold text-4xl md:text-5xl gradient-text-static mb-2">
                <AnimatedNumber
                  value={stat.value}
                  formatter={stat.format}
                  duration={2}
                />
              </div>
              <p className="text-white/30 text-[11px] font-grotesk font-semibold uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
