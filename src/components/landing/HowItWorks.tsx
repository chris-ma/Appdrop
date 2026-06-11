'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Lightbulb, Vote, DollarSign, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'SUBMIT YOUR DROP',
    description: 'Got an app idea? Write it up. Describe the problem, the solution, the features you want. Takes 5 minutes.',
    color: '#A78BFA',
    bg: 'rgba(124,58,237,0.12)',
    border: 'rgba(124,58,237,0.25)',
  },
  {
    number: '02',
    icon: Vote,
    title: 'COMMUNITY VOTES',
    description: 'The crowd decides what matters. Upvote the ideas you want built. Top ideas rise, weak ideas fall.',
    color: '#67E8F9',
    bg: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.25)',
  },
  {
    number: '03',
    icon: DollarSign,
    title: 'FUND THE BUILD',
    description: 'Hot ideas open a funding round. Back the projects you believe in. Funds held in escrow until milestones hit.',
    color: '#6EE7B7',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'DEV SHIPS IT',
    description: 'Verified developers claim the project. Build to spec. Hit milestones. Get paid. Launch to your waiting fanbase.',
    color: '#F9A8D4',
    bg: 'rgba(236,72,153,0.12)',
    border: 'rgba(236,72,153,0.25)',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-grotesk font-bold uppercase tracking-widest text-brand-purple mb-3">
            THE PROCESS
          </p>
          <h2 className="font-grotesk font-extrabold text-4xl md:text-5xl text-white uppercase tracking-tight">
            HOW THE{' '}
            <span className="gradient-text-static">DROP</span>{' '}
            WORKS
          </h2>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {/* Connecting line (desktop) */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px hidden lg:block"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), rgba(16,185,129,0.3), transparent)' }}
          />

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <motion.div key={step.number} variants={itemVariants}>
                <div
                  className="relative rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    background: step.bg,
                    border: `1px solid ${step.border}`,
                  }}
                >
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${step.color}20`, border: `1px solid ${step.color}30` }}
                    >
                      <Icon size={18} style={{ color: step.color }} />
                    </div>
                    <span
                      className="font-grotesk font-extrabold text-4xl opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className="font-grotesk font-bold text-base uppercase tracking-wide mb-3"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
