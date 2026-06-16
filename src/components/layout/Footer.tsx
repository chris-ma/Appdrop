import Link from 'next/link'

const links = {
  PLATFORM: [
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Submit an Idea', href: '/submit' },
    { label: 'Find a Builder', href: '/developers' },
    { label: 'How It Works', href: '/#how-it-works' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/12 bg-[#101010] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-16">
          {/* Brand */}
          <div className="shrink-0">
            <div className="font-grotesk font-extrabold text-2xl tracking-tight mb-3">
              <span className="text-white">APP</span>
              <span className="text-electric">▼</span>
              <span className="text-white">DROP</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-[220px]">
              The marketplace where communities decide which apps get built next.
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
          <p className="text-white/20 text-xs font-grotesk">
            Built on Supabase · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
