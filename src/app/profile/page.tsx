'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Trophy, Zap } from 'lucide-react'
import { mockUser, mockProjects } from '@/lib/mock-data'
import { formatCurrency, timeAgo } from '@/lib/utils'
import GlassCard from '@/components/ui/GlassCard'
import ProjectCard from '@/components/project/ProjectCard'

const tabs = ['MY DROPS', 'BACKED', 'ACTIVITY']

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0)
  const user = mockUser
  const myDrops = mockProjects.slice(0, 3)
  const backedDrops = mockProjects.slice(3, 6)

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 50%, rgba(236,72,153,0.15) 100%)`,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url('/noise.svg')", opacity: 0.03 }}
        />
        <div
          className="absolute -right-20 top-0 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center font-grotesk font-extrabold text-2xl flex-shrink-0"
              style={{
                background: `${user.avatarColor}20`,
                border: `2px solid ${user.avatarColor}40`,
                color: user.avatarColor,
              }}
            >
              {user.initials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-grotesk font-extrabold text-3xl text-white uppercase">
                  {user.name}
                </h1>
                <span className="text-[10px] font-grotesk font-bold uppercase tracking-wider bg-brand-purple/20 text-brand-purple border border-brand-purple/30 px-2 py-1 rounded-full">
                  MEMBER
                </span>
              </div>
              <p className="text-white/40 text-sm font-grotesk">
                @{user.username} · Joined {timeAgo(user.joinedAt)}
              </p>
            </div>

            {/* Reputation */}
            <div className="flex items-center gap-2 glass border border-brand-yellow/20 rounded-xl px-4 py-3">
              <Zap size={20} className="text-brand-yellow" />
              <div>
                <p className="font-grotesk font-extrabold text-xl text-white">
                  {user.stats.reputation.toLocaleString()}
                </p>
                <p className="text-[10px] font-grotesk font-bold uppercase tracking-widest text-white/30">
                  REPUTATION
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: 'IDEAS SUBMITTED', value: user.stats.totalSubmitted },
            { label: 'PROJECTS BACKED', value: user.stats.totalBacked },
            { label: 'TOTAL VOTES CAST', value: user.stats.totalVotes.toLocaleString() },
            { label: 'TOTAL FUNDED', value: formatCurrency(user.stats.totalFunded) },
            { label: 'REPUTATION PTS', value: user.stats.reputation.toLocaleString() },
          ].map((stat) => (
            <GlassCard key={stat.label} padding={false} className="p-4 text-center">
              <p className="font-grotesk font-extrabold text-2xl text-white mb-1">{stat.value}</p>
              <p className="text-[9px] font-grotesk font-bold uppercase tracking-widest text-white/30">{stat.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* Badges */}
        <div className="mb-10">
          <h2 className="font-grotesk font-bold text-white text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
            <Trophy size={16} className="text-brand-yellow" />
            BADGES & ACHIEVEMENTS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {user.badges.map((badge, i) => {
              const colorMap = {
                purple: { bg: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.3)', text: '#A78BFA' },
                cyan: { bg: 'rgba(6,182,212,0.15)', border: 'rgba(6,182,212,0.3)', text: '#67E8F9' },
                pink: { bg: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.3)', text: '#F9A8D4' },
                orange: { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)', text: '#FED7AA' },
              }
              const c = colorMap[badge.color]

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  title={badge.description}
                  className={`rounded-xl p-4 text-center transition-all duration-200 ${badge.earned ? 'cursor-pointer hover:-translate-y-1' : 'opacity-30'}`}
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                  }}
                >
                  <div className="text-2xl mb-2">{badge.emoji}</div>
                  <p
                    className="font-grotesk font-bold text-[11px] uppercase tracking-wide leading-tight"
                    style={{ color: badge.earned ? c.text : 'rgba(255,255,255,0.3)' }}
                  >
                    {badge.name}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/8 pb-4">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`text-xs font-grotesk font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === i
                  ? 'bg-brand-purple text-white'
                  : 'text-white/30 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

          {activeTab === 2 && (
            <div className="col-span-full text-center py-12 text-white/30 font-grotesk text-sm">
              Activity feed coming soon.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
