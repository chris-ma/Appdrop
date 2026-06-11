'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { mockDevelopers } from '@/lib/mock-data'
import DeveloperCard from '@/components/developer/DeveloperCard'

const allSkills = Array.from(
  new Set(mockDevelopers.flatMap((d) => d.skills))
).sort()

export default function DevelopersPage() {
  const [search, setSearch] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [availableOnly, setAvailableOnly] = useState(false)

  const filtered = useMemo(() => {
    return mockDevelopers.filter((dev) => {
      if (availableOnly && !dev.available) return false
      if (selectedSkill && !dev.skills.includes(selectedSkill)) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        return (
          dev.name.toLowerCase().includes(q) ||
          dev.tagline.toLowerCase().includes(q) ||
          dev.skills.some((s) => s.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [search, selectedSkill, availableOnly])

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
            VERIFIED BUILDERS
          </p>
          <h1 className="font-grotesk font-extrabold text-4xl md:text-6xl uppercase text-white tracking-tight mb-2">
            FIND YOUR{' '}
            <span className="gradient-text-static">BUILDER</span>
          </h1>
          <p className="text-white/40 text-sm font-grotesk">
            {filtered.length} developer{filtered.length !== 1 ? 's' : ''} available
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-brand-cyan/50 transition-colors"
            />
          </div>

          <button
            onClick={() => setAvailableOnly((v) => !v)}
            className={`flex-shrink-0 text-xs font-grotesk font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
              availableOnly
                ? 'bg-brand-green/20 text-brand-green border border-brand-green/30'
                : 'glass text-white/40 hover:text-white'
            }`}
          >
            {availableOnly ? '✓ AVAILABLE ONLY' : 'AVAILABLE ONLY'}
          </button>
        </div>

        {/* Skill filter chips */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setSelectedSkill(null)}
            className={`flex-shrink-0 text-xs font-grotesk font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              !selectedSkill ? 'bg-white/15 text-white border border-white/30' : 'text-white/30 border border-white/10 hover:text-white'
            }`}
          >
            ALL SKILLS
          </button>
          {allSkills.slice(0, 10).map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
              className={`flex-shrink-0 text-xs font-grotesk font-semibold px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                selectedSkill === skill
                  ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30'
                  : 'text-white/30 border border-white/10 hover:text-white/60'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((dev, i) => (
            <DeveloperCard key={dev.id} developer={dev} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
