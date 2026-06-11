'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import DropCard from '@/components/project/DropCard'
import { mockProjects } from '@/lib/mock-data'

const featured = mockProjects.filter((p) => ['1', '7', '3'].includes(p.id))

export default function FeaturedDrops() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 relative" ref={ref}>
      {/* Section bg glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <p className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-brand-cyan mb-2">
              🔥 TRENDING DROPS
            </p>
            <h2 className="font-grotesk font-extrabold text-4xl md:text-5xl uppercase text-white tracking-tight">
              HOT RIGHT{' '}
              <span className="gradient-text-static">NOW</span>
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="flex items-center gap-2 text-brand-cyan text-sm font-grotesk font-semibold uppercase tracking-wider hover:gap-3 transition-all duration-200 group"
          >
            VIEW ALL DROPS
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <DropCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
