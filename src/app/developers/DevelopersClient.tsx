'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import type { Developer } from '@/lib/types'
import DeveloperCard from '@/components/developer/DeveloperCard'

interface Props {
  initialDevelopers: Developer[]
}

export default function DevelopersClient({ initialDevelopers }: Props) {
  const allSkills = useMemo(
    () => Array.from(new Set(initialDevelopers.flatMap((d) => d.skills))).sort(),
    [initialDevelopers]
  )

  const [search, setSearch] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [availableOnly, setAvailableOnly] = useState(false)

  const filtered = useMemo(() => {
    return initialDevelopers.filter((dev) => {
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
  }, [search, selectedSkill, availableOnly, initialDevelopers])

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-px bg-neon" />
            <span className="text-[10px] font-inter tracking-[0.25em] text-neon uppercase">
              VERIFIED BUILDERS
            </span>
          </div>
          <h1 className="font-heading text-6xl md:text-7xl text-white uppercase leading-none mb-2">
            FIND YOUR <span className="text-neon">BUILDER</span>
          </h1>
          <p className="text-fog text-sm font-inter">
            {filtered.length} developer{filtered.length !== 1 ? 's' : ''} available
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-fog" />
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm text-white placeholder-fog outline-none font-inter transition-all duration-200 rounded-lg border border-white/12 focus:border-neon/40"
              style={{ background: '#181818' }}
            />
          </div>

          <button
            onClick={() => setAvailableOnly((v) => !v)}
            className="flex-shrink-0 font-heading text-[14px] uppercase px-5 py-3 rounded-lg transition-all duration-200 cursor-pointer"
            style={
              availableOnly
                ? { background: 'rgba(0,255,136,0.1)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.3)' }
                : { background: '#181818', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            {availableOnly ? '✓ AVAILABLE ONLY' : 'AVAILABLE ONLY'}
          </button>
        </div>

        {/* Skill filter chips */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setSelectedSkill(null)}
            className="flex-shrink-0 text-[10px] font-inter font-medium uppercase tracking-[0.2em] px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
            style={
              !selectedSkill
                ? { background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }
                : { color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            ALL SKILLS
          </button>
          {allSkills.slice(0, 10).map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
              className="flex-shrink-0 text-[10px] font-inter font-medium px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
              style={
                selectedSkill === skill
                  ? { background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.3)' }
                  : { color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((dev, i) => (
            <DeveloperCard key={dev.id} developer={dev} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-fog font-inter">
            No builders found. Try a different search or filter.
          </div>
        )}
      </div>
    </div>
  )
}
