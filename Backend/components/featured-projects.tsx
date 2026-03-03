"use client"

import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Github, Star } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    slug: "finance-ai-agent",
    title: "Finance AI Agent",
    description: "Multi-tool LangGraph ReAct agent for real-time stock analysis, portfolio risk scoring, and financial education covering US and Indian markets (NVDA, TCS, RELIANCE, BTC and more).",
    tags: ["LangGraph", "FastAPI", "OpenAI", "Next.js"],
    metrics: ["5 specialist tools", "US + India + Crypto", "<3s response"],
    github: "https://github.com/viveksinghfx/finance-ai-agent",
    demo: "/demos",
    featured: true,
  },
  {
    slug: "rag-knowledge-base",
    title: "RAG-Powered Knowledge Base",
    description: "Production RAG system with hybrid search (BM25 + vector), query rewriting, and cross-encoder reranking deployed on AWS ECS.",
    tags: ["LangChain", "Pinecone", "AWS ECS", "FastAPI"],
    metrics: ["10M+ docs", "99.2% accuracy", "<500ms latency"],
    github: "https://github.com/viveksinghfx/rag-knowledge-base",
    demo: "/projects/rag-knowledge-base",
    featured: false,
  },
  {
    slug: "resume-screening-agent",
    title: "Resume Screening Agent",
    description: "Agentic LangGraph pipeline that parses resumes, runs ATS keyword analysis, and scores candidates using chain-of-thought reasoning.",
    tags: ["LangGraph", "OpenAI", "S3", "DynamoDB"],
    metrics: ["95% accuracy", "5-10s per resume", "1000+ daily"],
    github: "https://github.com/viveksinghfx/resume-screening",
    demo: "/demos",
    featured: false,
  },
]

export function FeaturedProjects() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Selected Work</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Featured Projects
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
              Production AI systems built for scale, reliability, and real-world impact.
            </p>
          </div>
          <Link href="/projects" className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className={`group relative rounded-xl border p-6 lg:p-8 transition-all overflow-hidden ${
                project.featured
                  ? "border-primary/20 bg-primary/[0.03] hover:border-primary/30"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
              }`}>
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                project.featured ? "via-primary/30" : "via-white/10"
              }`} />

              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    {project.featured && (
                      <span className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.08] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        <Star className="h-3 w-3" /> Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                        project.featured
                          ? "border-primary/15 bg-primary/[0.05] text-primary/80"
                          : "border-white/[0.06] bg-white/[0.03] text-muted-foreground"
                      }`}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-4">
                  <div className="flex flex-col gap-2">
                    {project.metrics.map((m) => (
                      <div key={m} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />{m}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-foreground hover:bg-white/[0.07] transition-colors">
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                    <Link href={project.demo}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-foreground hover:bg-white/[0.07] transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" /> Demo
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/projects" className="flex items-center gap-2 text-sm font-medium text-primary">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
