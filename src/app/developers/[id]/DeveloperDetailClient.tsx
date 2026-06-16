'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Briefcase, MessageCircle, ArrowLeft, ExternalLink, Globe, Code2, Link2 } from 'lucide-react'
import type { Developer } from '@/lib/types'
import Button from '@/components/ui/Button'
import BidRequestModal from '@/components/ui/BidRequestModal'

interface Props {
  developer: Developer
}

export default function DeveloperDetailClient({ developer }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      {modalOpen && <BidRequestModal developer={developer} onClose={() => setModalOpen(false)} />}

      <div className="min-h-screen pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link href="/developers" className="flex items-center gap-2 text-fog hover:text-white transition-colors text-sm font-inter">
              <ArrowLeft size={14} />
              All Builders
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left — profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              {/* Header card */}
              <div className="rounded-xl border border-white/10 p-6" style={{ background: '#181818' }}>
                {/* Accent line */}
                <div className="h-px w-full mb-6" style={{ background: `linear-gradient(90deg, ${developer.avatarColor}, transparent)` }} />

                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-16 h-16 rounded flex items-center justify-center font-heading text-2xl flex-shrink-0"
                    style={{ background: `${developer.avatarColor}15`, color: developer.avatarColor, border: `1px solid ${developer.avatarColor}30` }}
                  >
                    {developer.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="font-heading text-4xl text-white leading-none">{developer.name}</h1>
                      <span
                        className="text-[9px] font-inter font-medium uppercase tracking-[0.2em] px-2 py-1 rounded"
                        style={
                          developer.available
                            ? { background: 'rgba(0,255,136,0.12)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.2)' }
                            : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.08)' }
                        }
                      >
                        {developer.available ? 'AVAILABLE' : 'BUSY'}
                      </span>
                    </div>
                    <p className="text-fog text-sm font-inter mt-1">{developer.tagline}</p>
                  </div>
                </div>

                {/* Bio */}
                {developer.bio && developer.bio !== developer.tagline && (
                  <p className="text-fog text-[13px] font-inter leading-relaxed mb-5">{developer.bio}</p>
                )}

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 text-[12px] text-fog font-inter mb-5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={i < Math.floor(developer.rating) ? 'fill-current' : 'opacity-20'}
                          style={{ color: i < Math.floor(developer.rating) ? '#00D4FF' : 'white' }}
                        />
                      ))}
                    </div>
                    <span className="text-white font-medium">{developer.rating}</span>
                    <span>({developer.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={12} />
                    {developer.completedProjects} projects completed
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={12} />
                    {developer.reviewCount} reviews
                  </div>
                  <div className="ml-auto text-white font-medium text-base">
                    ${developer.hourlyRate}<span className="text-fog text-sm">/hr</span>
                  </div>
                </div>

                {/* Social links */}
                {(developer.githubUrl || developer.linkedinUrl || developer.websiteUrl) && (
                  <div className="flex items-center gap-2 mb-5">
                    {developer.githubUrl && (
                      <a
                        href={developer.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 text-fog hover:text-white hover:border-white/20 transition-all text-[11px] font-inter"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      >
                        <Link2 size={12} />
                        GitHub
                      </a>
                    )}
                    {developer.linkedinUrl && (
                      <a
                        href={developer.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 text-fog hover:text-white hover:border-white/20 transition-all text-[11px] font-inter"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      >
                        <Link2 size={12} />
                        LinkedIn
                      </a>
                    )}
                    {developer.websiteUrl && (
                      <a
                        href={developer.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 text-fog hover:text-white hover:border-white/20 transition-all text-[11px] font-inter"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      >
                        <Globe size={12} />
                        Website
                      </a>
                    )}
                  </div>
                )}

                {/* Skills */}
                <div>
                  <p className="text-[10px] font-inter font-medium uppercase tracking-[0.15em] text-fog mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {developer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-inter px-2.5 py-1 rounded border border-white/12"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#ccc' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portfolio */}
              {developer.portfolioItems.length > 0 && (
                <div className="rounded-xl border border-white/10 p-6" style={{ background: '#181818' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-3 h-px" style={{ background: developer.avatarColor }} />
                    <span
                      className="text-[10px] font-inter tracking-[0.25em] uppercase"
                      style={{ color: developer.avatarColor }}
                    >
                      Portfolio
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {developer.portfolioItems.map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="rounded-lg border border-white/8 overflow-hidden hover:border-white/16 transition-colors group"
                        style={{ background: '#111' }}
                      >
                        {/* Image or gradient fallback */}
                        <div className="relative h-36 w-full overflow-hidden">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              unoptimized
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{
                                background: `linear-gradient(135deg, ${developer.avatarColor}15 0%, rgba(0,0,0,0.5) 100%)`,
                              }}
                            >
                              <Code2 size={32} style={{ color: `${developer.avatarColor}40` }} />
                            </div>
                          )}
                          {/* Role badge */}
                          {item.role && (
                            <div className="absolute top-2 left-2">
                              <span
                                className="text-[9px] font-inter font-medium uppercase tracking-[0.15em] px-2 py-0.5 rounded"
                                style={{
                                  background: 'rgba(0,0,0,0.7)',
                                  color: developer.avatarColor,
                                  border: `1px solid ${developer.avatarColor}30`,
                                  backdropFilter: 'blur(4px)',
                                }}
                              >
                                {item.role}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card body */}
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-white font-inter font-medium text-sm">{item.title}</p>
                            {item.url && item.url !== '#' && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-fog hover:text-white transition-colors flex-shrink-0"
                              >
                                <ExternalLink size={13} />
                              </a>
                            )}
                          </div>
                          <p className="text-fog text-[12px] font-inter mb-3 leading-relaxed">{item.description}</p>
                          {item.tech_stack && item.tech_stack.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.tech_stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[9px] font-inter px-1.5 py-0.5 rounded border border-white/8"
                                  style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)' }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right — sticky CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="rounded-xl border border-white/10 p-6" style={{ background: '#181818' }}>
                <div className="h-px w-full mb-5" style={{ background: `linear-gradient(90deg, ${developer.avatarColor}60, transparent)` }} />

                <p className="font-heading text-2xl text-white mb-1">REQUEST A BID</p>
                <p className="text-fog text-[12px] font-inter mb-5">
                  Send {developer.name.split(' ')[0]} details about your project and they&apos;ll get back to you.
                </p>

                <div className="flex flex-col gap-3 mb-5 text-[12px] font-inter">
                  <div className="flex justify-between">
                    <span className="text-fog">Rate</span>
                    <span className="text-white font-medium">${developer.hourlyRate}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-fog">Projects done</span>
                    <span className="text-white font-medium">{developer.completedProjects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-fog">Rating</span>
                    <span className="text-white font-medium">{developer.rating} / 5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-fog">Status</span>
                    <span style={{ color: developer.available ? '#00FF88' : 'rgba(255,255,255,0.3)' }} className="font-medium">
                      {developer.available ? 'Available now' : 'Currently busy'}
                    </span>
                  </div>
                </div>

                <div className="chrome-line mb-5" />

                <Button
                  variant={developer.available ? 'primary' : 'electric'}
                  className="w-full font-heading text-[14px]"
                  disabled={!developer.available}
                  onClick={developer.available ? () => setModalOpen(true) : undefined}
                >
                  {developer.available ? 'REQUEST BID' : 'CURRENTLY UNAVAILABLE'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
