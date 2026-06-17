'use client'
import { useMemo, useCallback, Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { SORT_TABS, CATEGORIES, CATEGORY_CONFIG, STATUS_CONFIG } from '@/lib/constants'
import type { Category, SortTab, Project, ProjectStatus } from '@/lib/types'
import ProjectCard from '@/components/project/ProjectCard'
import { fundingPercent } from '@/lib/utils'

const STATUSES: ProjectStatus[] = ['VOTING', 'FUNDING', 'IN_DEV', 'BETA', 'LIVE']

interface Props {
  initialProjects: Project[]
}

function MarketplaceInner({ initialProjects }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeSort = (searchParams.get('sort') as SortTab) ?? 'TRENDING'
  const activeCategory = searchParams.get('category') as Category | null
  const activeStatus = searchParams.get('status') as ProjectStatus | null
  const urlSearch = searchParams.get('q') ?? ''

  // Local state for search input so typing feels instant
  const [searchInput, setSearchInput] = useState(urlSearch)
  useEffect(() => { setSearchInput(urlSearch) }, [urlSearch])

  const update = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(key, value)
      else params.delete(key)
      const qs = params.toString()
      router.replace(`/marketplace${qs ? `?${qs}` : ''}`, { scroll: false })
    },
    [searchParams, router]
  )

  // Debounce search → URL sync
  useEffect(() => {
    const t = setTimeout(() => update('q', searchInput || null), 300)
    return () => clearTimeout(t)
  }, [searchInput]) // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    let results = [...initialProjects]

    if (activeCategory) results = results.filter((p) => p.category === activeCategory)
    if (activeStatus) results = results.filter((p) => p.status === activeStatus)

    if (searchInput.trim()) {
      const q = searchInput.toLowerCase()
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
      case 'MOST VALIDATED':
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
  }, [searchInput, activeSort, activeCategory, activeStatus, initialProjects])

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-px bg-electric" />
            <span className="text-[10px] font-inter tracking-[0.25em] text-electric uppercase">THE MARKETPLACE</span>
          </div>
          <h1 className="font-heading text-6xl md:text-7xl text-white uppercase leading-none mb-2">
            ALL THE <span className="electric-text">IDEAS</span>
          </h1>
          <p className="text-fog text-sm font-inter">
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
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-fog" />
          <input
            type="text"
            placeholder="Search ideas, tags..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 text-sm text-white placeholder-fog outline-none font-inter transition-all duration-200 rounded-lg border border-white/12 focus:border-electric/40"
            style={{ background: '#181818' }}
          />
        </motion.div>

        {/* Sort tabs */}
        <div className="flex items-center gap-1 mb-4 overflow-x-auto scrollbar-none pb-1">
          {SORT_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => update('sort', tab === 'TRENDING' ? null : tab)}
              className="flex-shrink-0 font-heading text-[14px] uppercase tracking-wide px-4 py-2 rounded transition-all duration-200 cursor-pointer"
              style={
                activeSort === tab
                  ? { background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.3)' }
                  : { color: 'rgba(255,255,255,0.35)', border: '1px solid transparent' }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => update('status', null)}
            className="flex-shrink-0 text-[10px] font-inter font-medium uppercase tracking-[0.2em] px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
            style={
              !activeStatus
                ? { background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }
                : { color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            ALL STATUS
          </button>
          {STATUSES.map((status) => {
            const cfg = STATUS_CONFIG[status]
            const isActive = activeStatus === status
            return (
              <button
                key={status}
                onClick={() => update('status', isActive ? null : status)}
                className="flex-shrink-0 text-[10px] font-inter font-medium uppercase tracking-[0.2em] px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
                style={
                  isActive
                    ? { background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}` }
                    : { color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {cfg.label}
              </button>
            )
          })}
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => update('category', null)}
            className="flex-shrink-0 text-[10px] font-inter font-medium uppercase tracking-[0.2em] px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
            style={
              !activeCategory
                ? { background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }
                : { color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            ALL
          </button>
          {CATEGORIES.map((cat) => {
            const config = CATEGORY_CONFIG[cat]
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => update('category', isActive ? null : cat)}
                className="flex-shrink-0 text-[10px] font-inter font-medium uppercase tracking-[0.2em] px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
                style={
                  isActive
                    ? { background: `${config.accent}15`, color: config.color, border: `1px solid ${config.color}40` }
                    : { color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {config.label}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-fog font-inter">
            No ideas found. Try a different search or filter.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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

export default function MarketplaceClient({ initialProjects }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-20" />}>
      <MarketplaceInner initialProjects={initialProjects} />
    </Suspense>
  )
}
