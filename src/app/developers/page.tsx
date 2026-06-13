import { getDevelopers } from '@/lib/api'
import DevelopersClient from './DevelopersClient'

export const revalidate = 60

export default async function DevelopersPage() {
  const developers = await getDevelopers()
  return <DevelopersClient initialDevelopers={developers} />
}
