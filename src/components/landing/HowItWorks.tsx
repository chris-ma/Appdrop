'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Lightbulb, Vote, DollarSign, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'POST',
    sub: 'YOUR IDEA',
    description: 'Describe the problem. Who has it? Why does it matter? Takes 5 minutes and no technical knowledge.',
    accent: '#00D4FF',
  },
  {
    number: '02',
    icon: Vote,
    title: 'COLLECT',
    sub: 'REAL SIGNALS',
    description: 'Your idea collects weighted demand signals — upvotes, comments, and waitlist joins from real potential users. Not vanity metrics.',
    accent: '#FFFFFF',
  },
  {
    number: '03',
    icon: DollarSign,
    title: 'SEE YOUR',
    sub: 'VERDICT',
    description: 'Your Validation Score tells you if the idea has legs. Strong signal = green light. Weak signal = pivot before you\'ve spent a cent.',
    accent: '#00FF88',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'BUILD',
    sub: 'WITH CONVICTION',
    description: 'Validated ideas unlock funding. Backers commit real money. A developer ships it milestone by milestone. You get early access.',
    accent: '#BF5AF2',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="py-28 relative" ref={ref}>
      {/* Background grid */}
      <div className="absolute inset-0 grid-technical opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-px bg-neon" />
            <span className="text-[10px] font-inter tracking-[0.25em] text-neon uppercase">
              THE PROCESS
            </span>
          </div>
          <h2 className="font-heading text-6xl md:text-7xl text-white uppercase leading-none">
            HOW <span className="text-neon">VALIDATION</span> WORKS
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          {/* Connecting line */}
          <div className="absolute hidden md:block top-8 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, #00D4FF20, #FFFFFF15, #00FF8820, #BF5AF220)' }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 border-r border-white/5 last:border-r-0 group"
              >
                {/* Step number */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center border"
                    style={{ borderColor: `${step.accent}30`, background: `${step.accent}08` }}
                  >
                    <Icon size={15} style={{ color: step.accent }} />
                  </div>
                  <span
                    className="font-heading text-5xl leading-none opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ color: step.accent }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3
                  className="font-heading text-3xl leading-none mb-0.5 uppercase"
                  style={{ color: step.accent }}
                >
                  {step.title}
                </h3>
                <h3 className="font-heading text-3xl text-white leading-none uppercase mb-4">
                  {step.sub}
                </h3>
                <p className="text-fog text-sm font-inter leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
