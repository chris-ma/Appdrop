'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, RefreshCw, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { getAllIdeasAdmin, updateIdeaStatus } from '@/lib/api'
import type { Project, ProjectStatus } from '@/lib/types'
import StatusPill from '@/components/project/StatusPill'
import CategoryBadge from '@/components/project/CategoryBadge'
import { useToast } from '@/components/ui/Toast'

const STATUSES: ProjectStatus[] = ['VOTING', 'FUNDING', 'IN_DEV', 'BETA', 'LIVE']
const ADMIN_EMAIL = 'crispy-studios@hotmail.com'

export default function AdminPage() {
  const { user, loading } = useAuth()
  const toast = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [fetching, setFetching] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [filter, setFilter] = useState<ProjectStatus | 'ALL'>('ALL')

  const isAdmin = user?.email === ADMIN_EMAIL

  useEffect(() => {
    if (loading) return
    if (!isAdmin) { setFetching(false); return }
    load()
  }, [loading, isAdmin])

  async function load() {
    setFetching(true)
    const data = await getAllIdeasAdmin()
    setProjects(data)
    setFetching(false)
  }

  async function changeStatus(id: string, status: ProjectStatus) {
    setUpdating(id)
    const ok = await updateIdeaStatus(id, status)
    if (ok) {
      setProjects((prev) => prev.map((p) => p.id === id ? { ...p, status } : p))
      toast.success('Status updated')
    } else {
      toast.error('Failed to update status')
    }
    setUpdating(null)
  }

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-electric/30 border-t-electric rounded-full animate-spin" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <ShieldAlert size={40} className="text-fog mx-auto mb-4" />
          <h2 className="font-heading text-4xl text-white mb-2">ACCESS DENIED</h2>
          <p className="text-fog font-inter text-sm mb-6">This page is restricted to administrators.</p>
          <Link href="/" className="text-electric font-inter text-sm hover:text-white transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  const visible = filter === 'ALL' ? projects : projects.filter((p) => p.status === filter)

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-inter font-medium uppercase tracking-[0.2em] text-electric mb-1">Admin Panel</p>
              <h1 className="font-heading text-5xl text-white">MANAGE IDEAS</h1>
              <p className="text-fog font-inter text-sm mt-1">{projects.length} total ideas</p>
            </div>
            <button
              onClick={load}
              className="flex items-center gap-2 text-fog hover:text-white transition-colors text-sm font-inter cursor-pointer"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['ALL', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-3 py-1.5 rounded text-[11px] font-inter font-medium border transition-all cursor-pointer"
              style={
                filter === s
                  ? { background: 'rgba(0,212,255,0.15)', borderColor: '#00D4FF', color: '#00D4FF' }
                  : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }
              }
            >
              {s} {s !== 'ALL' && <span className="opacity-60">({projects.filter((p) => p.status === s).length})</span>}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-xl border border-white/10 overflow-hidden" style={{ background: '#111' }}>
          <div
            className="grid text-[10px] font-inter font-medium uppercase tracking-[0.15em] text-fog px-5 py-3 border-b border-white/10"
            style={{ gridTemplateColumns: '1fr 120px 120px 100px 140px' }}
          >
            <span>IDEA</span>
            <span>CATEGORY</span>
            <span>VOTES</span>
            <span>FUNDING</span>
            <span>STATUS</span>
          </div>

          {visible.length === 0 && (
            <div className="py-12 text-center text-fog font-inter text-sm">No ideas in this status</div>
          )}

          {visible.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="grid items-center px-5 py-4 border-b border-white/6 hover:bg-white/3 transition-colors"
              style={{ gridTemplateColumns: '1fr 120px 120px 100px 140px' }}
            >
              {/* Title */}
              <div>
                <Link
                  href={`/projects/${project.id}`}
                  className="font-heading text-white text-xl hover:text-electric transition-colors"
                >
                  {project.title}
                </Link>
                <p className="text-fog text-[11px] font-inter mt-0.5 line-clamp-1">{project.tagline}</p>
              </div>

              {/* Category */}
              <div>
                <CategoryBadge category={project.category} size="sm" />
              </div>

              {/* Votes */}
              <div className="font-inter text-sm">
                <span className="text-white">{project.upvotes}</span>
                <span className="text-fog"> / </span>
                <span className="text-fog">{project.downvotes}</span>
              </div>

              {/* Funding */}
              <div className="font-inter text-sm text-fog">
                ${(project.fundingCurrent / 1000).toFixed(0)}K
                <span className="text-fog/40"> / ${(project.fundingGoal / 1000).toFixed(0)}K</span>
              </div>

              {/* Status selector */}
              <div className="relative">
                <div className="relative inline-flex items-center gap-1.5">
                  <StatusPill status={project.status} />
                  <div className="relative">
                    <select
                      value={project.status}
                      onChange={(e) => changeStatus(project.id, e.target.value as ProjectStatus)}
                      disabled={updating === project.id}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown
                      size={12}
                      className={`text-fog transition-opacity ${updating === project.id ? 'animate-spin opacity-40' : 'opacity-60 hover:opacity-100'}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
