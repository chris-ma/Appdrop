import { notFound } from 'next/navigation'
import { getDeveloperById, getDevelopers } from '@/lib/api'
import DeveloperDetailClient from './DeveloperDetailClient'

export const revalidate = 60

export async function generateStaticParams() {
  const devs = await getDevelopers()
  return devs.map((d) => ({ id: d.id }))
}

export default async function DeveloperProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const developer = await getDeveloperById(id)
  if (!developer) notFound()
  return <DeveloperDetailClient developer={developer} />
}
