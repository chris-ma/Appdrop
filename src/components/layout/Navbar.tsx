'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'MARKETPLACE', href: '/marketplace' },
  { label: 'BUILDERS', href: '/developers' },
  { label: 'HOW IT WORKS', href: '/#how-it-works' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-dark border-b border-white/8'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-grotesk font-extrabold text-xl tracking-tight">
              <span className="text-white">APP</span>
              <span className="text-brand-cyan">▼</span>
              <span className="text-white">DROP</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-grotesk font-semibold text-white/50 hover:text-white uppercase tracking-widest transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/profile">
              <Button variant="ghost" size="sm">PROFILE</Button>
            </Link>
            <Link href="/submit">
              <Button variant="primary" size="sm">SUBMIT DROP</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/60 hover:text-white p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-dark border-b border-white/8 px-6 py-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-grotesk font-semibold text-white/70 hover:text-white uppercase tracking-widest transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <Link href="/profile" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">PROFILE</Button>
              </Link>
              <Link href="/submit" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="md" className="w-full">SUBMIT DROP</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
