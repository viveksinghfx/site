import { notFound } from "next/navigation"
import { PortfolioShell } from "@/components/portfolio-shell"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects"
import { ProjectPageClient } from "@/components/project-page-client"

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <PortfolioShell>
      <section className="py-12">
        <ProjectPageClient project={project} />
      </section>
    </PortfolioShell>
  )
}
