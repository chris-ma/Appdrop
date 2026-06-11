'use client'
import { motion } from 'framer-motion'
import { fundingPercent, formatCurrency } from '@/lib/utils'

interface FundingBarProps {
  current: number
  goal: number
  backerCount: number
  showAmounts?: boolean
  className?: string
}

export default function FundingBar({
  current,
  goal,
  backerCount,
  showAmounts = true,
  className,
}: FundingBarProps) {
  const pct = fundingPercent(current, goal)
  const isFull = pct >= 100

  return (
    <div className={className}>
      {showAmounts && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-grotesk font-bold text-sm">
              {formatCurrency(current)}
            </span>
            {isFull && (
              <span className="text-[10px] font-grotesk font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 border border-brand-green/30 px-2 py-0.5 rounded-full">
                FULLY FUNDED
              </span>
            )}
          </div>
          <span className="text-white/40 text-xs">
            {isFull ? '100%' : `${pct}% of ${formatCurrency(goal)}`}
          </span>
        </div>
      )}

      <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: isFull
              ? 'linear-gradient(90deg, #22C55E, #10B981)'
              : 'linear-gradient(90deg, #7C3AED, #06B6D4)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </div>

      {showAmounts && (
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-white/40 text-xs font-grotesk">
            {backerCount.toLocaleString()} backers
          </span>
        </div>
      )}
    </div>
  )
}
