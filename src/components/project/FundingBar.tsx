'use client'
import { motion } from 'framer-motion'
import { fundingPercent, formatCurrency } from '@/lib/utils'

interface FundingBarProps {
  current: number
  goal: number
  backerCount: number
  showAmounts?: boolean
  accentColor?: string
  className?: string
}

export default function FundingBar({
  current,
  goal,
  backerCount,
  showAmounts = true,
  accentColor = '#00D4FF',
  className,
}: FundingBarProps) {
  const pct = fundingPercent(current, goal)
  const isFull = pct >= 100

  return (
    <div className={className}>
      {showAmounts && (
        <div className="flex items-center justify-between mb-2">
          <span className="font-heading text-white text-xl">
            {formatCurrency(current)}
          </span>
          <div className="flex items-center gap-2">
            {isFull && (
              <span className="text-[9px] font-inter font-medium tracking-[0.2em] uppercase text-neon border border-neon/30 bg-neon/6 px-2 py-0.5 rounded-sm">
                FUNDED
              </span>
            )}
            <span className="text-fog text-[11px] font-inter tracking-wider">
              {isFull ? '100%' : `${pct}% of ${formatCurrency(goal)}`}
            </span>
          </div>
        </div>
      )}

      <div className="relative h-px bg-white/8 overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{
            background: isFull ? '#00FF88' : accentColor,
            boxShadow: `0 0 6px ${isFull ? '#00FF88' : accentColor}`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
      </div>

      {showAmounts && (
        <p className="text-mist text-[11px] font-inter mt-2 tracking-wider">
          {backerCount.toLocaleString()} BACKERS
        </p>
      )}
    </div>
  )
}
