'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Plus, X, Rocket } from 'lucide-react'
import Link from 'next/link'
import { CATEGORIES, CATEGORY_CONFIG } from '@/lib/constants'
import type { Category } from '@/lib/types'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import CategoryBadge from '@/components/project/CategoryBadge'
import StatusPill from '@/components/project/StatusPill'

interface FormData {
  title: string
  category: Category | ''
  problem: string
  audience: string
  features: string[]
  monetization: string
  tags: string
}

const STEPS = ['BASICS', 'FEATURES', 'DETAILS', 'PREVIEW']

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export default function SubmitPage() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const [form, setForm] = useState<FormData>({
    title: '',
    category: '',
    problem: '',
    audience: '',
    features: [],
    monetization: '',
    tags: '',
  })

  const go = (next: number) => {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setForm((f) => ({ ...f, features: [...f.features, newFeature.trim()] }))
      setNewFeature('')
    }
  }

  const removeFeature = (i: number) => {
    setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <Rocket size={36} className="text-brand-purple" />
          </div>
          <h2 className="font-grotesk font-extrabold text-4xl uppercase text-white mb-3">
            DROP SUBMITTED!
          </h2>
          <p className="text-white/50 mb-8">
            Your idea is now live on AppDrop. The community will start voting shortly.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/marketplace">
              <Button variant="primary">VIEW MARKETPLACE</Button>
            </Link>
            <Button variant="ghost" onClick={() => { setSubmitted(false); setStep(0); setForm({ title: '', category: '', problem: '', audience: '', features: [], monetization: '', tags: '' }) }}>
              SUBMIT ANOTHER
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-brand-purple mb-2">
            CREATE A DROP
          </p>
          <h1 className="font-grotesk font-extrabold text-4xl uppercase text-white tracking-tight">
            SUBMIT YOUR{' '}
            <span className="gradient-text-static">IDEA</span>
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-3.5 left-0 right-0 h-px bg-white/10" />
          {STEPS.map((label, i) => (
            <div key={label} className="relative flex flex-col items-center gap-2 z-10">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-grotesk font-bold text-xs transition-all duration-300 ${
                  i < step ? 'bg-brand-purple text-white' :
                  i === step ? 'bg-brand-purple/20 border-2 border-brand-purple text-brand-purple' :
                  'bg-white/5 border border-white/15 text-white/30'
                }`}
              >
                {i < step ? <Check size={12} strokeWidth={3} /> : i + 1}
              </div>
              <span className={`text-[10px] font-grotesk font-bold uppercase tracking-wider hidden sm:block ${i === step ? 'text-brand-purple' : 'text-white/25'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <GlassCard className="mb-6">
                {/* Step 0: Basics */}
                {step === 0 && (
                  <div className="space-y-5">
                    <h2 className="font-grotesk font-bold text-white text-lg uppercase mb-1">Basic Info</h2>
                    <p className="text-white/40 text-sm mb-5">What's your app idea?</p>

                    <div>
                      <label className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-white/40 mb-2 block">APP NAME *</label>
                      <input
                        value={form.title}
                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                        placeholder="e.g. SprintFlow, NeuralNote..."
                        className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none focus:border-brand-purple/50 text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-white/40 mb-2 block">CATEGORY *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CATEGORIES.map((cat) => {
                          const config = CATEGORY_CONFIG[cat]
                          return (
                            <button
                              key={cat}
                              onClick={() => setForm((f) => ({ ...f, category: cat }))}
                              className="rounded-xl p-2.5 text-left transition-all duration-200 cursor-pointer"
                              style={
                                form.category === cat
                                  ? { background: config.bg, border: `1px solid ${config.color}50`, color: config.color }
                                  : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }
                              }
                            >
                              <p className="text-xs font-grotesk font-semibold">{config.label}</p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-white/40 mb-2 block">PROBLEM STATEMENT *</label>
                      <textarea
                        value={form.problem}
                        onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))}
                        placeholder="What problem does this solve? Be specific..."
                        rows={4}
                        className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none resize-none text-sm transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Step 1: Features */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="font-grotesk font-bold text-white text-lg uppercase mb-1">Features & Audience</h2>
                    <p className="text-white/40 text-sm mb-5">What will it do and who is it for?</p>

                    <div>
                      <label className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-white/40 mb-2 block">TARGET AUDIENCE</label>
                      <input
                        value={form.audience}
                        onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))}
                        placeholder="e.g. Solo developers, healthcare workers..."
                        className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-white/40 mb-2 block">KEY FEATURES ({form.features.length})</label>
                      <div className="flex gap-2 mb-3">
                        <input
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                          placeholder="Add a feature and press Enter..."
                          className="flex-1 glass rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none text-sm"
                        />
                        <Button variant="primary" size="sm" onClick={addFeature} className="flex-shrink-0">
                          <Plus size={16} />
                        </Button>
                      </div>
                      {form.features.length > 0 && (
                        <ul className="space-y-2">
                          {form.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-3 glass rounded-lg px-3 py-2">
                              <Check size={14} className="text-brand-cyan flex-shrink-0" />
                              <span className="text-white/80 text-sm flex-1">{feat}</span>
                              <button onClick={() => removeFeature(i)} className="text-white/30 hover:text-white/60 cursor-pointer">
                                <X size={14} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Details */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="font-grotesk font-bold text-white text-lg uppercase mb-1">Details</h2>
                    <p className="text-white/40 text-sm mb-5">Help the community understand your vision.</p>

                    <div>
                      <label className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-white/40 mb-2 block">MONETIZATION MODEL</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Subscription', 'One-time purchase', 'Freemium', 'Open source'].map((option) => (
                          <button
                            key={option}
                            onClick={() => setForm((f) => ({ ...f, monetization: option }))}
                            className={`rounded-xl px-4 py-3 text-sm font-grotesk text-left transition-all cursor-pointer ${
                              form.monetization === option
                                ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30'
                                : 'glass text-white/40 hover:text-white/60'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-white/40 mb-2 block">TAGS (comma separated)</label>
                      <input
                        value={form.tags}
                        onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                        placeholder="ai, productivity, mobile..."
                        className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/25 outline-none text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Preview */}
                {step === 3 && (
                  <div>
                    <h2 className="font-grotesk font-bold text-white text-lg uppercase mb-1">Preview Your Drop</h2>
                    <p className="text-white/40 text-sm mb-6">This is how your idea will appear in the marketplace.</p>

                    <div className="glass rounded-xl p-5 mb-6">
                      <div className="flex items-center justify-between mb-3">
                        {form.category ? <CategoryBadge category={form.category as Category} /> : <span className="text-white/20 text-xs">No category</span>}
                        <StatusPill status="VOTING" />
                      </div>
                      <h3 className="font-grotesk font-bold text-white text-xl mb-1">
                        {form.title || 'Your App Name'}
                      </h3>
                      <p className="text-white/50 text-sm mb-4 line-clamp-2">
                        {form.problem || 'Your problem statement will appear here...'}
                      </p>
                      {form.features.length > 0 && (
                        <ul className="space-y-1.5 mb-4">
                          {form.features.slice(0, 3).map((feat, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-white/60">
                              <Check size={11} className="text-brand-cyan" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-white/8">
                        <div className="flex items-center gap-1.5 glass rounded-lg px-2.5 py-1 text-xs text-white/40">
                          ▲ 0
                        </div>
                        <span className="text-brand-cyan text-xs font-grotesk font-semibold">VIEW DROP →</span>
                      </div>
                    </div>

                    <div className="glass rounded-xl p-4 border border-brand-green/20">
                      <ul className="space-y-2">
                        {[
                          { check: !!form.title, label: 'App name provided' },
                          { check: !!form.category, label: 'Category selected' },
                          { check: !!form.problem, label: 'Problem statement written' },
                          { check: form.features.length >= 1, label: `At least 1 feature added (${form.features.length})` },
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.check ? 'bg-brand-green/20 text-brand-green' : 'bg-white/5 text-white/20'}`}>
                              <Check size={10} strokeWidth={3} />
                            </div>
                            <span className={item.check ? 'text-white/70' : 'text-white/25'}>{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => go(step - 1)}>
              <ArrowLeft size={16} />
              BACK
            </Button>
          ) : (
            <Link href="/marketplace">
              <Button variant="ghost">CANCEL</Button>
            </Link>
          )}

          {step < 3 ? (
            <Button variant="primary" onClick={() => go(step + 1)}>
              NEXT
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setSubmitted(true)}
              disabled={!form.title || !form.category || !form.problem}
            >
              <Rocket size={18} />
              LAUNCH DROP
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
