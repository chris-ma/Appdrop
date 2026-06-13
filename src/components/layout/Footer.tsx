import Link from 'next/link'

const links = {
  PLATFORM: [
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Submit an Idea', href: '/submit' },
    { label: 'Find a Builder', href: '/developers' },
    { label: 'How It Works', href: '/#how-it-works' },
  ],
  COMMUNITY: [
    { label: 'Leaderboard', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'Twitter / X', href: '#' },
    { label: 'Newsletter', href: '#' },
  ],
  COMPANY: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/12 bg-[#101010] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-grotesk font-extrabold text-2xl tracking-tight mb-3">
              <span className="text-white">APP</span>
              <span className="text-brand-cyan">▼</span>
              <span className="text-white">DROP</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-[180px]">
              Where communities decide which apps get built.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-[10px] font-grotesk font-bold uppercase tracking-widest text-white/30 mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/12 gap-4">
          <p className="text-white/30 text-xs font-grotesk">
            © 2026 AppDrop. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms</Link>
            <Link href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
