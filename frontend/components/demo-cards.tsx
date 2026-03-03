"use client"

import { useRef, type MouseEvent as ReactMouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Bot, FileSearch, Search, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"

const demos = [
  {
    title: "Chat with My Portfolio",
    description: "Ask questions about my projects",
    icon: Bot,
    accent: "rgba(14, 165, 233, 0.06)",
  },
  {
    title: "Resume Reviewer Agent",
    description: "Get feedback on your resume",
    icon: FileSearch,
    accent: "rgba(52, 211, 153, 0.06)",
  },
  {
    title: "Research AI Agent",
    description: "AI-powered web researcher",
    icon: Search,
    accent: "rgba(251, 191, 36, 0.06)",
  },
  {
    title: "AI Project Generator",
    description: "Generate ideas for AI apps",
    icon: Lightbulb,
    accent: "rgba(129, 140, 248, 0.06)",
  },
]

function SpotlightCard({
  demo,
  index,
}: {
  demo: (typeof demos)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 })

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 h-full overflow-hidden transition-all hover:border-white/15 hover:bg-white/[0.04]"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(250px circle at ${springX}px ${springY}px, ${demo.accent}, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent group-hover:via-white/15 transition-all duration-500" aria-hidden="true" />

      <div className="relative">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <demo.icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-base font-semibold text-foreground">{demo.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{demo.description}</p>
        <div className="mt-auto pt-5">
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3"
          >
            Launch Demo
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function DemoCards() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Interactive</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            AI Demos
          </h2>
          <p className="mt-3 text-muted-foreground">
            {"GenAI apps \u00B7 Multi-Agent Workflows \u00B7 Production Deployments"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {demos.map((demo, i) => (
            <SpotlightCard key={demo.title} demo={demo} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
