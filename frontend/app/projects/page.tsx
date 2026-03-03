"use client"

import { useRef, type MouseEvent as ReactMouseEvent } from "react"
import { useRouter } from "next/navigation"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ExternalLink, Github, Star } from "lucide-react"
import { PortfolioShell } from "@/components/portfolio-shell"
import { projects } from "@/lib/projects"

const featured = projects[0]

function SpotlightProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 200, damping: 25 })
  const sy = useSpring(my, { stiffness: 200, damping: 25 })

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  function handleCardClick() {
    router.push(`/projects/${project.slug}`)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
      className={`group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/15 hover:bg-white/[0.04] overflow-hidden cursor-pointer ${project.span}`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(250px circle at ${sx}px ${sy}px, hsl(200 95% 50% / 0.04), transparent 60%)`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent group-hover:via-white/15 transition-all duration-500" aria-hidden="true" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {project.title}
          </h3>
          <div className="flex gap-1.5 ml-4">
            <a
              href="https://github.com/viveksinghfx/Project"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
              aria-label={`Open ${project.title} live demo`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  return (
    <PortfolioShell>
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Portfolio</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Projects
            </h1>
            <p className="mt-3 text-muted-foreground">
              AI systems built for production environments
            </p>
          </motion.div>

          {/* Featured project */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative mb-8 rounded-2xl border border-primary/15 bg-primary/[0.03] p-8 overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary/[0.06] blur-[100px] group-hover:bg-primary/[0.1] transition-colors" aria-hidden="true" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" aria-hidden="true" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Featured Project</span>
              </div>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-foreground">{featured.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {featured.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-primary/15 bg-primary/[0.05] px-3 py-1 text-xs font-medium text-primary/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:items-end">
                  {featured.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {h}
                    </div>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-foreground hover:bg-white/[0.08] transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                    <a
                      href={`/projects/${featured.slug}`}
                      className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Case Study
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {projects.slice(1).map((project, i) => (
              <SpotlightProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PortfolioShell>
  )
}
