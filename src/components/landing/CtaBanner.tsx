'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'

export default function CtaBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-28 px-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto relative rounded-lg overflow-hidden border border-white/12"
        style={{ background: '#181818', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
      >
        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-electric to-transparent" />
        <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-electric to-transparent" />
        <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-neon to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-neon to-transparent" />

        {/* Background grid */}
        <div className="absolute inset-0 grid-technical opacity-30" />

        {/* Glow orbs */}
        <div
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.1), transparent)', filter: 'blur(40px)' }}
        />

        <div className="relative z-10 px-10 py-16 md:py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-electric" />
            <span className="text-[10px] font-inter tracking-[0.3em] text-electric uppercase">
              READY TO DROP?
            </span>
            <div className="w-8 h-px bg-electric" />
          </div>

          <h2 className="font-heading text-6xl md:text-8xl text-white uppercase leading-none mb-4">
            YOUR IDEA
            <br />
            <span className="electric-text">COULD BE</span>
            <br />
            NEXT
          </h2>

          <p className="text-fog text-base font-inter max-w-lg mx-auto mb-10">
            28,000+ community members are waiting to vote on the next big drop.
            It costs nothing but 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Link href="/submit">
                <Button variant="primary" size="lg" className="font-heading text-[16px]">
                  SUBMIT YOUR DROP
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/marketplace">
                <Button variant="electric" size="lg" className="font-heading text-[16px]">
                  BROWSE THE DROPS
                </Button>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
