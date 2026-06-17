'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, DollarSign, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/lib/auth-context'

interface PledgeModalProps {
  projectId: string
  projectTitle: string
  isOpen: boolean
  onClose: () => void
  onSuccess: (amount: number) => void
}

const PRESETS = [25, 50, 100, 250]

export default function PledgeModal({ projectId, projectTitle, isOpen, onClose }: PledgeModalProps) {
  const [selected, setSelected] = useState(50)
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, signIn } = useAuth()
  const toast = useToast()

  const amount = custom ? parseInt(custom, 10) || 0 : selected

  const handleConfirm = async () => {
    if (!user) { await signIn(); return }
    if (amount <= 0) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId: projectId, ideaTitle: projectTitle, amount, userId: user.id }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error('Could not start checkout. Please try again.')
        setLoading(false)
      }
    } catch {
      toast.error('Could not start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4"
          >
            <div
              className="rounded-xl border border-white/12 p-8"
              style={{ background: '#141414', boxShadow: '0 0 60px rgba(0,212,255,0.07)' }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[10px] font-inter tracking-[0.25em] uppercase text-electric mb-1">BACK THIS IDEA</p>
                  <h3 className="font-heading text-3xl text-white uppercase leading-none">{projectTitle}</h3>
                </div>
                <button onClick={onClose} className="text-fog hover:text-white transition-colors cursor-pointer p-1 mt-1">
                  <X size={18} />
                </button>
              </div>

              <p className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-3">SELECT AMOUNT</p>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => { setSelected(p); setCustom('') }}
                    className="py-2.5 rounded-lg font-heading text-xl transition-all duration-200 cursor-pointer border"
                    style={
                      selected === p && !custom
                        ? { background: 'rgba(0,212,255,0.12)', color: '#00D4FF', borderColor: 'rgba(0,212,255,0.4)' }
                        : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.08)' }
                    }
                  >
                    ${p}
                  </button>
                ))}
              </div>

              <div className="relative mb-6">
                <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fog pointer-events-none" />
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(0) }}
                  min={1}
                  className="w-full pl-8 pr-4 py-2.5 text-sm text-white placeholder-fog/40 outline-none rounded-lg border border-white/10 focus:border-electric/30 transition-all font-inter"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full font-heading text-[15px]"
                onClick={handleConfirm}
                disabled={loading || amount <= 0}
              >
                {loading ? 'REDIRECTING...' : !user ? 'SIGN IN TO BACK' : (
                  <><Zap size={15} />PAY ${amount || '—'} WITH STRIPE</>
                )}
              </Button>

              <p className="text-fog text-[11px] font-inter text-center mt-3">
                Secure payment via Stripe · No hidden fees
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
