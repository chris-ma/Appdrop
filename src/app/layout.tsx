import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Providers from './providers'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SignalSeed — Validate Before You Build',
  description:
    'Post your idea. Collect real demand signals. Know if it\'s worth building before you write a single line of code.',
  openGraph: {
    title: 'SignalSeed',
    description: 'Post your idea. Collect real demand signals. Know if it\'s worth building before you write a single line of code.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-void text-ash antialiased min-h-screen font-inter overflow-x-hidden">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
