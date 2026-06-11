'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Sparkles, Zap, Heart, Gamepad2, Users, TrendingUp, BookOpen, Code2,
} from 'lucide-react'
import { CATEGORY_CONFIG } from '@/lib/constants'
import type { Category } from '@/lib/types'

const categoryIcons: Record<Category, React.ElementType> = {
  AI: Sparkles,
  PRODUCTIVITY: Zap,
  HEALTH: Heart,
  GAMING: Gamepad2,
  SOCIAL: Users,
  FINTECH: TrendingUp,
  EDUCATION: BookOpen,
  DEVELOPER_TOOLS: Code2,
}

const categoryCounts: Record<Category, number> = {
  AI: 312,
  PRODUCTIVITY: 487,
  HEALTH: 198,
  GAMING: 256,
  SOCIAL: 341,
  FINTECH: 175,
  EDUCATION: 219,
  DEVELOPER_TOOLS: 403,
}

const categories = Object.keys(CATEGORY_CONFIG) as Category[]

export default function CategoriesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-brand-pink mb-3">
            EXPLORE BY CATEGORY
          </p>
          <h2 className="font-grotesk font-extrabold text-4xl md:text-5xl uppercase text-white tracking-tight">
            FIND YOUR{' '}
            <span className="gradient-text-static">NICHE</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const config = CATEGORY_CONFIG[cat]
            const Icon = categoryIcons[cat]

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/marketplace?category=${cat}`} className="block group">
                  <div
                    className="relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover cursor-pointer overflow-hidden"
                    style={{
                      background: `${config.bg}`,
                      border: `1px solid ${config.color}20`,
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${config.glow} 0%, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: `${config.color}15`, border: `1px solid ${config.color}30` }}
                      >
                        <Icon size={20} style={{ color: config.color }} />
                      </div>
                      <h3
                        className="font-grotesk font-bold text-sm uppercase tracking-wide mb-1"
                        style={{ color: config.color }}
                      >
                        {config.label}
                      </h3>
                      <p className="text-white/30 text-xs font-grotesk">
                        {categoryCounts[cat].toLocaleString()} ideas
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
