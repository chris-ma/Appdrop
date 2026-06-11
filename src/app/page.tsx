import HeroSection from '@/components/landing/HeroSection'
import StatsSection from '@/components/landing/StatsSection'
import FeaturedDrops from '@/components/landing/FeaturedDrops'
import HowItWorks from '@/components/landing/HowItWorks'
import CategoriesGrid from '@/components/landing/CategoriesGrid'
import CtaBanner from '@/components/landing/CtaBanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedDrops />
      <HowItWorks />
      <CategoriesGrid />
      <CtaBanner />
    </>
  )
}
