'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import DropCard from '@/components/project/DropCard'
import { mockProjects } from '@/lib/mock-data'

const featured = mockProjects.filter((p) => ['1', '7', '4'].includes(p.id))

export default function FeaturedDrops() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-px bg-electric" />
              <span className="text-[10px] font-inter tracking-[0.25em] text-electric uppercase">
                TRENDING NOW
              </span>
            </div>
            <h2 className="font-heading text-6xl md:text-7xl text-white uppercase leading-none">
              HOT <span className="text-electric">DROPS</span>
            </h2>
          </div>

          <Link
            href="/marketplace"
            className="flex items-center gap-2 text-[11px] font-inter font-medium tracking-[0.2em] uppercase text-fog hover:text-electric transition-colors group"
          >
            VIEW ALL
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((project, i) => (
            <DropCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
