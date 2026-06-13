import { getProjects } from '@/lib/api'
import MarketplaceClient from './MarketplaceClient'

export const revalidate = 60

export default async function MarketplacePage() {
  const projects = await getProjects()
  return <MarketplaceClient initialProjects={projects} />
}
