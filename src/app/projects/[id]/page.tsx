import { notFound } from 'next/navigation'
import { mockProjects } from '@/lib/mock-data'
import ProjectDetailClient from './ProjectDetailClient'

export function generateStaticParams() {
  return mockProjects.map((p) => ({ id: p.id }))
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = mockProjects.find((p) => p.id === id)
  if (!project) notFound()

  return <ProjectDetailClient project={project} />
}
