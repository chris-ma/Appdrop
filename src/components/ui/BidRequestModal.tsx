'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Briefcase } from 'lucide-react'
import type { Developer } from '@/lib/types'
import Button from '@/components/ui/Button'
import { requestBid } from '@/lib/api'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/lib/auth-context'

interface BidRequestModalProps {
  developer: Developer
  onClose: () => void
}

const BUDGET_OPTIONS = ['< $1,000', '$1K – $5K', '$5K – $15K', '$15K – $50K', '$50K+']
const TIMELINE_OPTIONS = ['ASAP (< 2 weeks)', '1 month', '2–3 months', '3–6 months', 'Flexible']

export default function BidRequestModal({ developer, onClose }: BidRequestModalProps) {
  const { user, signIn } = useAuth()
  const toast = useToast()
  const [message, setMessage] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit() {
    if (!user) { signIn(); return }
    if (!message.trim() || !budget || !timeline) return
    setSubmitting(true)
    const ok = await requestBid({ developerId: developer.id, message, budget, timeline })
    setSubmitting(false)
    if (ok) {
      setSent(true)
      toast.success(`Bid request sent to ${developer.name}!`)
    } else {
      toast.error('Failed to send bid request. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 280 }}
          className="w-full max-w-lg rounded-xl border border-white/12 overflow-hidden"
          style={{ background: '#131313' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded flex items-center justify-center font-heading text-lg"
                style={{ background: `${developer.avatarColor}15`, color: developer.avatarColor, border: `1px solid ${developer.avatarColor}30` }}
              >
                {developer.initials}
              </div>
              <div>
                <p className="font-heading text-white text-xl leading-none">{developer.name}</p>
                <p className="text-fog text-[11px] font-inter mt-0.5">${developer.hourlyRate}/hr</p>
              </div>
            </div>
            <button onClick={onClose} className="text-fog hover:text-white transition-colors p-1 cursor-pointer">
              <X size={18} />
            </button>
          </div>

          {sent ? (
            <div className="px-6 py-10 text-center">
              <div
                className="w-16 h-16 rounded flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
              >
                <Send size={28} style={{ color: '#00D4FF' }} />
              </div>
              <h3 className="font-heading text-3xl text-white mb-2">REQUEST SENT!</h3>
              <p className="text-fog font-inter text-sm mb-6">
                {developer.name} will review your request and get back to you soon.
              </p>
              <Button variant="primary" className="font-heading" onClick={onClose}>
                CLOSE
              </Button>
            </div>
          ) : (
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Message */}
              <div>
                <label className="text-[10px] font-inter font-medium uppercase tracking-[0.15em] text-fog mb-2 block">
                  Describe Your Project
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the developer about your idea, requirements, and what you're looking to build..."
                  rows={4}
                  className="w-full rounded border border-white/12 bg-white/5 text-white text-sm font-inter px-3 py-2.5 outline-none focus:border-white/25 resize-none placeholder:text-white/20 transition-colors"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="text-[10px] font-inter font-medium uppercase tracking-[0.15em] text-fog mb-2 block">
                  Budget Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setBudget(opt)}
                      className="px-3 py-1.5 rounded text-[11px] font-inter font-medium border transition-all cursor-pointer"
                      style={
                        budget === opt
                          ? { background: 'rgba(0,212,255,0.15)', borderColor: '#00D4FF', color: '#00D4FF' }
                          : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="text-[10px] font-inter font-medium uppercase tracking-[0.15em] text-fog mb-2 block">
                  Timeline
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIMELINE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setTimeline(opt)}
                      className="px-3 py-1.5 rounded text-[11px] font-inter font-medium border transition-all cursor-pointer"
                      style={
                        timeline === opt
                          ? { background: 'rgba(0,212,255,0.15)', borderColor: '#00D4FF', color: '#00D4FF' }
                          : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3 pt-1">
                <Button
                  variant="primary"
                  className="font-heading text-[14px] flex-1"
                  disabled={!message.trim() || !budget || !timeline || submitting}
                  onClick={handleSubmit}
                >
                  <Briefcase size={15} />
                  {submitting ? 'SENDING...' : !user ? 'SIGN IN TO REQUEST' : 'SEND REQUEST'}
                </Button>
                <Button variant="electric" className="font-heading text-[14px]" onClick={onClose}>
                  CANCEL
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
