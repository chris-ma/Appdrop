'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Zap } from 'lucide-react'
import { mockUser, mockProjects } from '@/lib/mock-data'
import { formatCurrency, timeAgo } from '@/lib/utils'
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
        className="relative overflow-hidden border-b border-white/5"
        style={{ background: '#070707' }}
      >
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-48 h-px" style={{ background: 'linear-gradient(90deg, #BF5AF2, transparent)' }} />
        <div className="absolute top-0 left-0 w-px h-48" style={{ background: 'linear-gradient(180deg, #BF5AF2, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-48 h-px" style={{ background: 'linear-gradient(270deg, #00D4FF, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-px h-48" style={{ background: 'linear-gradient(0deg, #00D4FF, transparent)' }} />

        {/* Glow */}
        <div
          className="absolute -right-20 top-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(191,90,242,0.06), transparent)', filter: 'blur(60px)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded flex items-center justify-center font-heading text-4xl flex-shrink-0"
              style={{
                background: `${user.avatarColor}10`,
                border: `1px solid ${user.avatarColor}30`,
                color: user.avatarColor,
              }}
            >
              {user.initials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-heading text-5xl text-white uppercase leading-none">
                  {user.name}
                </h1>
                <span
                  className="text-[9px] font-inter font-medium uppercase tracking-[0.2em] px-2 py-1 rounded"
                  style={{ background: 'rgba(191,90,242,0.1)', color: '#BF5AF2', border: '1px solid rgba(191,90,242,0.25)' }}
                >
                  MEMBER
                </span>
              </div>
              <p className="text-fog text-sm font-inter">
                @{user.username} · Joined {timeAgo(user.joinedAt)}
              </p>
            </div>

            {/* Reputation */}
            <div
              className="flex items-center gap-3 rounded px-4 py-3"
              style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}
            >
              <Zap size={18} style={{ color: '#00D4FF' }} />
              <div>
                <p className="font-heading text-3xl text-white leading-none">
                  {user.stats.reputation.toLocaleString()}
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
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {[
            { label: 'IDEAS SUBMITTED', value: user.stats.totalSubmitted },
            { label: 'PROJECTS BACKED', value: user.stats.totalBacked },
            { label: 'TOTAL VOTES CAST', value: user.stats.totalVotes.toLocaleString() },
            { label: 'TOTAL FUNDED', value: formatCurrency(user.stats.totalFunded) },
            { label: 'REPUTATION PTS', value: user.stats.reputation.toLocaleString() },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 text-center rounded-lg border border-white/6"
              style={{ background: '#0D0D0D' }}
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
            {user.badges.map((badge, i) => {
              const colorMap: Record<string, { bg: string; border: string; text: string }> = {
                purple: { bg: 'rgba(191,90,242,0.08)', border: 'rgba(191,90,242,0.2)', text: '#BF5AF2' },
                cyan: { bg: 'rgba(0,212,255,0.08)', border: 'rgba(0,212,255,0.2)', text: '#00D4FF' },
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

        {/* Chrome divider */}
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
        {activeTab === 2 ? (
          <div className="text-center py-12 text-fog font-inter text-sm">
            Activity feed coming soon.
          </div>
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
          </div>
        )}
      </div>
    </div>
  )
}
