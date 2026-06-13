'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Plus, X, Rocket } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CATEGORIES, CATEGORY_CONFIG } from '@/lib/constants'
import type { Category } from '@/lib/types'
import { submitProject } from '@/lib/api'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'
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

const inputClass = 'w-full px-4 py-3 text-white placeholder-fog outline-none text-sm font-inter transition-all duration-200 rounded-lg border border-white/12 focus:border-electric/40'
const inputStyle = { background: 'rgba(255,255,255,0.05)' }

export default function SubmitPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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
          {/* Corner accents */}
          <div className="relative inline-block mb-8">
            <div
              className="w-24 h-24 rounded flex items-center justify-center mx-auto"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
            >
              <Rocket size={36} style={{ color: '#00D4FF' }} />
            </div>
          </div>
          <h2 className="font-heading text-6xl uppercase text-white mb-3">
            DROP SUBMITTED!
          </h2>
          <p className="text-fog font-inter mb-8">
            Your idea is now live on AppDrop. The community will start voting shortly.
          </p>
          <div className="flex gap-3 justify-center">
            <MagneticButton>
              <Link href="/marketplace">
                <Button variant="primary" className="font-heading text-[15px]">VIEW MARKETPLACE</Button>
              </Link>
            </MagneticButton>
            <Button
              variant="electric"
              className="font-heading text-[15px]"
              onClick={() => {
                setSubmitted(false)
                setStep(0)
                setForm({ title: '', category: '', problem: '', audience: '', features: [], monetization: '', tags: '' })
              }}
            >
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
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-px bg-cyber" />
            <span className="text-[10px] font-inter tracking-[0.25em] text-cyber uppercase">CREATE A DROP</span>
            <div className="w-6 h-px bg-cyber" />
          </div>
          <h1 className="font-heading text-6xl md:text-7xl uppercase text-white leading-none">
            SUBMIT YOUR <span className="text-cyber">IDEA</span>
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-3 left-0 right-0 h-px bg-white/6" />
          {STEPS.map((label, i) => (
            <div key={label} className="relative flex flex-col items-center gap-2 z-10">
              <div
                className="w-6 h-6 rounded flex items-center justify-center font-inter text-xs transition-all duration-300"
                style={
                  i < step
                    ? { background: 'rgba(191,90,242,0.2)', border: '1px solid rgba(191,90,242,0.5)', color: '#BF5AF2' }
                    : i === step
                    ? { background: 'rgba(191,90,242,0.15)', border: '2px solid #BF5AF2', color: '#BF5AF2' }
                    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
                }
              >
                {i < step ? <Check size={11} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className="text-[9px] font-inter uppercase tracking-[0.2em] hidden sm:block"
                style={{ color: i === step ? '#BF5AF2' : 'rgba(255,255,255,0.2)' }}
              >
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
              <div
                className="rounded-lg border border-white/10 p-6 mb-6"
                style={{ background: '#181818' }}
              >
                {/* Step 0: Basics */}
                {step === 0 && (
                  <div className="space-y-5">
                    <div className="mb-5">
                      <h2 className="font-heading text-3xl text-white uppercase mb-1">Basic Info</h2>
                      <p className="text-fog text-sm font-inter">What's your app idea?</p>
                    </div>

                    <div>
                      <label className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-2 block">APP NAME *</label>
                      <input
                        value={form.title}
                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                        placeholder="e.g. SprintFlow, NeuralNote..."
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-3 block">CATEGORY *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CATEGORIES.map((cat) => {
                          const config = CATEGORY_CONFIG[cat]
                          return (
                            <button
                              key={cat}
                              onClick={() => setForm((f) => ({ ...f, category: cat }))}
                              className="rounded p-2.5 text-left transition-all duration-200 cursor-pointer"
                              style={
                                form.category === cat
                                  ? { background: `${config.color}10`, border: `1px solid ${config.color}40`, color: config.color }
                                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }
                              }
                            >
                              <p className="text-[11px] font-inter font-medium">{config.label}</p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-2 block">PROBLEM STATEMENT *</label>
                      <textarea
                        value={form.problem}
                        onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))}
                        placeholder="What problem does this solve? Be specific..."
                        rows={4}
                        className={`${inputClass} resize-none`}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                )}

                {/* Step 1: Features */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div className="mb-5">
                      <h2 className="font-heading text-3xl text-white uppercase mb-1">Features & Audience</h2>
                      <p className="text-fog text-sm font-inter">What will it do and who is it for?</p>
                    </div>

                    <div>
                      <label className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-2 block">TARGET AUDIENCE</label>
                      <input
                        value={form.audience}
                        onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))}
                        placeholder="e.g. Solo developers, healthcare workers..."
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-2 block">
                        KEY FEATURES ({form.features.length})
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                          placeholder="Add a feature and press Enter..."
                          className={inputClass}
                          style={inputStyle}
                        />
                        <Button variant="primary" size="sm" onClick={addFeature} className="flex-shrink-0 font-heading">
                          <Plus size={16} />
                        </Button>
                      </div>
                      {form.features.length > 0 && (
                        <ul className="space-y-2">
                          {form.features.map((feat, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-3 px-3 py-2 rounded border border-white/10"
                              style={{ background: 'rgba(255,255,255,0.05)' }}
                            >
                              <Check size={12} style={{ color: '#00D4FF' }} className="flex-shrink-0" />
                              <span className="text-white text-sm font-inter flex-1">{feat}</span>
                              <button onClick={() => removeFeature(i)} className="text-fog hover:text-white cursor-pointer">
                                <X size={13} />
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
                    <div className="mb-5">
                      <h2 className="font-heading text-3xl text-white uppercase mb-1">Details</h2>
                      <p className="text-fog text-sm font-inter">Help the community understand your vision.</p>
                    </div>

                    <div>
                      <label className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-3 block">MONETIZATION MODEL</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Subscription', 'One-time purchase', 'Freemium', 'Open source'].map((option) => (
                          <button
                            key={option}
                            onClick={() => setForm((f) => ({ ...f, monetization: option }))}
                            className="rounded px-4 py-3 text-sm font-inter text-left transition-all cursor-pointer"
                            style={
                              form.monetization === option
                                ? { background: 'rgba(0,212,255,0.12)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.3)' }
                                : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.06)' }
                            }
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-2 block">TAGS (comma separated)</label>
                      <input
                        value={form.tags}
                        onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                        placeholder="ai, productivity, mobile..."
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Preview */}
                {step === 3 && (
                  <div>
                    <div className="mb-5">
                      <h2 className="font-heading text-3xl text-white uppercase mb-1">Preview Your Drop</h2>
                      <p className="text-fog text-sm font-inter">This is how your idea will appear in the marketplace.</p>
                    </div>

                    {/* Preview card */}
                    <div
                      className="rounded-lg border border-white/10 p-5 mb-5"
                      style={{ background: '#111111' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        {form.category ? <CategoryBadge category={form.category as Category} /> : <span className="text-fog text-[11px] font-inter">No category</span>}
                        <StatusPill status="VOTING" />
                      </div>
                      <h3 className="font-heading text-3xl text-white uppercase mb-1">
                        {form.title || 'YOUR APP NAME'}
                      </h3>
                      <p className="text-fog text-sm font-inter mb-4 line-clamp-2">
                        {form.problem || 'Your problem statement will appear here...'}
                      </p>
                      {form.features.length > 0 && (
                        <ul className="space-y-1.5 mb-4">
                          {form.features.slice(0, 3).map((feat, i) => (
                            <li key={i} className="flex items-center gap-2 text-[11px] text-fog font-inter">
                              <Check size={10} style={{ color: '#00D4FF' }} />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div
                          className="flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] text-fog font-inter"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          ▲ 0
                        </div>
                        <span className="text-electric text-[11px] font-inter tracking-wider">VIEW →</span>
                      </div>
                    </div>

                    {/* Checklist */}
                    <div
                      className="rounded-lg border border-white/10 p-4"
                      style={{ background: 'rgba(255,255,255,0.01)' }}
                    >
                      <ul className="space-y-2">
                        {[
                          { check: !!form.title, label: 'App name provided' },
                          { check: !!form.category, label: 'Category selected' },
                          { check: !!form.problem, label: 'Problem statement written' },
                          { check: form.features.length >= 1, label: `At least 1 feature added (${form.features.length})` },
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm font-inter">
                            <div
                              className="w-4 h-4 rounded flex items-center justify-center"
                              style={
                                item.check
                                  ? { background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }
                                  : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }
                              }
                            >
                              <Check size={9} strokeWidth={3} style={{ color: item.check ? '#00FF88' : 'rgba(255,255,255,0.2)' }} />
                            </div>
                            <span style={{ color: item.check ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}>{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {step > 0 ? (
            <Button variant="electric" onClick={() => go(step - 1)} className="font-heading text-[14px]">
              <ArrowLeft size={16} />
              BACK
            </Button>
          ) : (
            <Link href="/marketplace">
              <Button variant="electric" className="font-heading text-[14px]">CANCEL</Button>
            </Link>
          )}

          {step < 3 ? (
            <MagneticButton>
              <Button variant="primary" onClick={() => go(step + 1)} className="font-heading text-[14px]">
                NEXT
                <ArrowRight size={16} />
              </Button>
            </MagneticButton>
          ) : (
            <MagneticButton>
              <Button
                variant="primary"
                size="lg"
                onClick={async () => {
                  setSubmitting(true)
                  const result = await submitProject({
                    title: form.title,
                    category: form.category,
                    problem: form.problem,
                    audience: form.audience,
                    features: form.features,
                    monetization: form.monetization,
                    tags: form.tags,
                  })
                  setSubmitting(false)
                  if (result) {
                    setSubmitted(true)
                    router.refresh()
                  }
                }}
                disabled={!form.title || !form.category || !form.problem || submitting}
                className="font-heading text-[16px]"
              >
                <Rocket size={18} />
                {submitting ? 'LAUNCHING...' : 'LAUNCH DROP'}
              </Button>
            </MagneticButton>
          )}
        </div>
      </div>
    </div>
  )
}
