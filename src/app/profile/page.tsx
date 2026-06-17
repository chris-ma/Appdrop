'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Trophy, Zap, MessageSquare, ChevronUp } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { getProjectsByCreator, getBackedProjects, getRecentActivity } from '@/lib/api'
import { mockUser } from '@/lib/mock-data'
import { formatCurrency, timeAgo } from '@/lib/utils'
import type { Project } from '@/lib/types'
import ProjectCard from '@/components/project/ProjectCard'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL

const tabs = ['MY IDEAS', 'BACKED', 'ACTIVITY']

type ActivityItem = { type: 'vote' | 'comment'; ideaId: string; content: string; createdAt: string }

export default function ProfilePage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [activeTab, setActiveTab] = useState(0)
  const [myDrops, setMyDrops] = useState<Project[]>([])
  const [backedDrops, setBackedDrops] = useState<Project[]>([])
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  const displayUser = USE_MOCK ? mockUser : profile

  useEffect(() => {
    if (loading) return
    if (!USE_MOCK && !user) {
      router.push('/')
      return
    }

    const uid = user?.id
    Promise.all([
      uid ? getProjectsByCreator(uid) : Promise.resolve(USE_MOCK ? mockUser && [] : []),
      uid ? getBackedProjects(uid) : Promise.resolve([]),
      uid ? getRecentActivity(uid) : Promise.resolve([]),
    ]).then(([drops, backed, acts]) => {
      setMyDrops(USE_MOCK ? (drops.length ? drops : []) : drops)
      setBackedDrops(backed)
      setActivity(acts as ActivityItem[])
      setDataLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user])

  // Fallback for mock mode
  useEffect(() => {
    if (USE_MOCK) {
      import('@/lib/mock-data').then(({ mockProjects }) => {
        setMyDrops(mockProjects.slice(0, 3))
        setBackedDrops(mockProjects.slice(3, 6))
        setDataLoading(false)
      })
    }
  }, [])

  if (loading || (!displayUser && !USE_MOCK)) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-fog font-inter text-sm animate-pulse">Loading...</div>
      </div>
    )
  }

  const user2 = displayUser ?? mockUser

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Banner */}
      <div
        className="relative overflow-hidden border-b border-white/5"
        style={{ background: '#111111' }}
      >
        <div className="absolute top-0 left-0 w-48 h-px" style={{ background: 'linear-gradient(90deg, #BF5AF2, transparent)' }} />
        <div className="absolute top-0 left-0 w-px h-48" style={{ background: 'linear-gradient(180deg, #BF5AF2, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-48 h-px" style={{ background: 'linear-gradient(270deg, #00D4FF, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-px h-48" style={{ background: 'linear-gradient(0deg, #00D4FF, transparent)' }} />

        <div
          className="absolute -right-20 top-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(191,90,242,0.1), transparent)', filter: 'blur(60px)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div
              className="w-20 h-20 rounded flex items-center justify-center font-heading text-4xl flex-shrink-0"
              style={{
                background: `${user2.avatarColor}10`,
                border: `1px solid ${user2.avatarColor}30`,
                color: user2.avatarColor,
              }}
            >
              {user2.initials}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-heading text-5xl text-white uppercase leading-none">
                  {user2.name}
                </h1>
                <span
                  className="text-[9px] font-inter font-medium uppercase tracking-[0.2em] px-2 py-1 rounded"
                  style={{ background: 'rgba(191,90,242,0.1)', color: '#BF5AF2', border: '1px solid rgba(191,90,242,0.25)' }}
                >
                  MEMBER
                </span>
              </div>
              <p className="text-fog text-sm font-inter">
                @{user2.username} · Joined {timeAgo(user2.joinedAt)}
              </p>
            </div>

            <div
              className="flex items-center gap-3 rounded px-4 py-3"
              style={{ background: 'rgba(0,212,255,0.09)', border: '1px solid rgba(0,212,255,0.15)' }}
            >
              <Zap size={18} style={{ color: '#00D4FF' }} />
              <div>
                <p className="font-heading text-3xl text-white leading-none">
                  {user2.stats.reputation.toLocaleString()}
                </p>
                <p className="text-[9px] font-inter tracking-[0.2em] uppercase text-fog mt-0.5">
                  REPUTATION
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {[
            { label: 'IDEAS SUBMITTED', value: user2.stats.totalSubmitted },
            { label: 'PROJECTS BACKED', value: user2.stats.totalBacked },
            { label: 'TOTAL VOTES CAST', value: user2.stats.totalVotes.toLocaleString() },
            { label: 'TOTAL FUNDED', value: formatCurrency(user2.stats.totalFunded) },
            { label: 'REPUTATION PTS', value: user2.stats.reputation.toLocaleString() },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 text-center rounded-lg border border-white/10"
              style={{ background: '#181818' }}
            >
              <p className="font-heading text-3xl text-white leading-none mb-1">{stat.value}</p>
              <p className="text-[9px] font-inter tracking-[0.2em] uppercase text-fog">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <Trophy size={14} style={{ color: '#00D4FF' }} />
            <span className="text-[10px] font-inter tracking-[0.25em] uppercase text-fog">BADGES & ACHIEVEMENTS</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {user2.badges.map((badge, i) => {
              const colorMap: Record<string, { bg: string; border: string; text: string }> = {
                purple: { bg: 'rgba(191,90,242,0.12)', border: 'rgba(191,90,242,0.2)', text: '#BF5AF2' },
                cyan: { bg: 'rgba(0,212,255,0.12)', border: 'rgba(0,212,255,0.2)', text: '#00D4FF' },
                pink: { bg: 'rgba(255,45,130,0.08)', border: 'rgba(255,45,130,0.2)', text: '#FF2D82' },
                orange: { bg: 'rgba(255,149,0,0.08)', border: 'rgba(255,149,0,0.2)', text: '#FF9500' },
              }
              const c = colorMap[badge.color] ?? colorMap.cyan
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  title={badge.description}
                  className={`rounded-lg p-4 text-center border transition-all duration-300 ${badge.earned ? 'cursor-pointer hover:-translate-y-1' : 'opacity-25'}`}
                  style={{ background: c.bg, borderColor: c.border }}
                >
                  <div className="text-2xl mb-2">{badge.emoji}</div>
                  <p
                    className="font-inter font-medium text-[10px] uppercase tracking-wide leading-tight"
                    style={{ color: badge.earned ? c.text : 'rgba(255,255,255,0.3)' }}
                  >
                    {badge.name}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="chrome-line mb-8" />

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-white/5 pb-4">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className="font-heading text-[16px] uppercase px-5 py-2 rounded transition-all cursor-pointer"
              style={
                activeTab === i
                  ? { background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.25)' }
                  : { color: 'rgba(255,255,255,0.3)', border: '1px solid transparent' }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {dataLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-lg animate-pulse" style={{ background: '#181818' }} />
            ))}
          </div>
        ) : activeTab === 2 ? (
          activity.length === 0 ? (
            <div className="text-center py-12 text-fog font-inter text-sm">
              No activity yet. Validate ideas or leave comments to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {activity.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-white/8"
                  style={{ background: '#181818' }}
                >
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={
                      item.type === 'vote'
                        ? { background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }
                        : { background: 'rgba(191,90,242,0.1)', border: '1px solid rgba(191,90,242,0.2)' }
                    }
                  >
                    {item.type === 'vote'
                      ? <ChevronUp size={13} style={{ color: '#00D4FF' }} />
                      : <MessageSquare size={11} style={{ color: '#BF5AF2' }} />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-ash text-sm font-inter">{item.content}</p>
                    <p className="text-fog text-[11px] font-inter mt-0.5">{timeAgo(item.createdAt)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(activeTab === 0 ? myDrops : backedDrops).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
            {(activeTab === 0 ? myDrops : backedDrops).length === 0 && (
              <div className="col-span-3 text-center py-12 text-fog font-inter text-sm">
                {activeTab === 0 ? 'No ideas submitted yet.' : 'No projects backed yet.'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
