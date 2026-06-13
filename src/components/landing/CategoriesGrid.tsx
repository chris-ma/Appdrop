'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Zap, Heart, Gamepad2, Users, TrendingUp, BookOpen, Code2, type LucideIcon } from 'lucide-react'
import { CATEGORY_CONFIG } from '@/lib/constants'
import type { Category } from '@/lib/types'
import TiltCard from '@/components/ui/TiltCard'

const categoryIcons: Record<Category, LucideIcon> = {
  AI: Sparkles,
  PRODUCTIVITY: Zap,
  HEALTH: Heart,
  GAMING: Gamepad2,
  SOCIAL: Users,
  FINTECH: TrendingUp,
  EDUCATION: BookOpen,
  DEVELOPER_TOOLS: Code2,
}

const counts: Record<Category, number> = {
  AI: 312, PRODUCTIVITY: 487, HEALTH: 198, GAMING: 256,
  SOCIAL: 341, FINTECH: 175, EDUCATION: 219, DEVELOPER_TOOLS: 403,
}

const categories = Object.keys(CATEGORY_CONFIG) as Category[]

export default function CategoriesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-px bg-fog" />
            <span className="text-[10px] font-inter tracking-[0.25em] text-fog uppercase">
              BROWSE
            </span>
          </div>
          <h2 className="font-heading text-6xl md:text-7xl text-white uppercase leading-none">
            FIND YOUR <span className="chrome-text">NICHE</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat, i) => {
            const config = CATEGORY_CONFIG[cat]
            const Icon = categoryIcons[cat]

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 }}
              >
                <TiltCard glowColor={`${config.accent}10`} strength={8}>
                  <Link href={`/marketplace?category=${cat}`} className="block group">
                    <div
                      className="relative rounded-lg p-5 border border-white/10 hover:border-white/18 transition-all duration-300 bg-[#181818] overflow-hidden"
                    >
                      {/* Accent glow top */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: `linear-gradient(90deg, transparent, ${config.accent}, transparent)` }}
                      />

                      <Icon size={20} className="mb-4" style={{ color: config.color }} />

                      <h3
                        className="font-heading text-2xl uppercase leading-none mb-1"
                        style={{ color: config.color }}
                      >
                        {config.label}
                      </h3>
                      <p className="text-[11px] font-inter text-mist tracking-wider">
                        {counts[cat].toLocaleString()} IDEAS
                      </p>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
