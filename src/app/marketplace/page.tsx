'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { mockProjects } from '@/lib/mock-data'
import { SORT_TABS, CATEGORIES, CATEGORY_CONFIG } from '@/lib/constants'
import type { Category, SortTab } from '@/lib/types'
import ProjectCard from '@/components/project/ProjectCard'
import { fundingPercent } from '@/lib/utils'

export default function MarketplacePage() {
  const [search, setSearch] = useState('')
  const [activeSort, setActiveSort] = useState<SortTab>('TRENDING')
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  const filtered = useMemo(() => {
    let results = [...mockProjects]

    if (activeCategory) {
      results = results.filter((p) => p.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      )
    }

    switch (activeSort) {
      case 'TRENDING':
        return results.sort((a, b) => b.upvotes - a.upvotes)
      case 'NEW':
        return results.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      case 'MOST FUNDED':
        return results.sort(
          (a, b) =>
            fundingPercent(b.fundingCurrent, b.fundingGoal) -
            fundingPercent(a.fundingCurrent, a.fundingGoal)
        )
      case 'MOST WANTED':
        return results.sort((a, b) => b.backerCount - a.backerCount)
      default:
        return results
    }
  }, [search, activeSort, activeCategory])

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-brand-cyan mb-2">
            THE MARKETPLACE
          </p>
          <h1 className="font-grotesk font-extrabold text-4xl md:text-6xl uppercase text-white tracking-tight mb-2">
            ALL THE{' '}
            <span className="gradient-text-static">DROPS</span>
          </h1>
          <p className="text-white/40 text-sm font-grotesk">
            {filtered.length} idea{filtered.length !== 1 ? 's' : ''} in the pipeline
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
        >
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Search drops, ideas, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/30 outline-none focus:border-brand-purple/50 font-inter transition-colors"
          />
        </motion.div>

        {/* Sort tabs */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto scrollbar-none pb-1">
          {SORT_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSort(tab)}
              className={`flex-shrink-0 text-xs font-grotesk font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                activeSort === tab
                  ? 'bg-brand-purple text-white'
                  : 'text-white/40 hover:text-white glass'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex-shrink-0 text-xs font-grotesk font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeCategory === null
                ? 'bg-white/15 text-white border border-white/30'
                : 'text-white/30 hover:text-white border border-white/10'
            }`}
          >
            ALL
          </button>
          {CATEGORIES.map((cat) => {
            const config = CATEGORY_CONFIG[cat]
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                className="flex-shrink-0 text-xs font-grotesk font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
                style={
                  isActive
                    ? { background: config.bg, color: config.color, border: `1px solid ${config.color}50` }
                    : { color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.1)' }
                }
              >
                {config.label}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30 font-grotesk">
            No drops found. Try a different search or filter.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
