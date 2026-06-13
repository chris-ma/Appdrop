import { getFeaturedProjects } from '@/lib/api'
import HeroSection from '@/components/landing/HeroSection'
import StatsSection from '@/components/landing/StatsSection'
import FeaturedDrops from '@/components/landing/FeaturedDrops'
import HowItWorks from '@/components/landing/HowItWorks'
import CategoriesGrid from '@/components/landing/CategoriesGrid'
import CtaBanner from '@/components/landing/CtaBanner'

export const revalidate = 60

export default async function HomePage() {
  const featured = await getFeaturedProjects()

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedDrops projects={featured} />
      <HowItWorks />
      <CategoriesGrid />
      <CtaBanner />
    </>
  )
}
