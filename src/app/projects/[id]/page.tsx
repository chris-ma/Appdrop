import { notFound } from 'next/navigation'
import { getProjectById, getProjects } from '@/lib/api'
import ProjectDetailClient from './ProjectDetailClient'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ id: p.id }))
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) notFound()

  return <ProjectDetailClient project={project} />
}
