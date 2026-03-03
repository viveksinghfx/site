'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Database, Zap, Shield, GitBranch, ExternalLink, ChevronLeft } from 'lucide-react'
import type { Project } from '@/lib/projects'

const iconMap: { [key: string]: React.ReactNode } = {
  Parser: <Code2 className="h-5 w-5" />,
  Extractor: <Database className="h-5 w-5" />,
  Engine: <Zap className="h-5 w-5" />,
  Store: <Database className="h-5 w-5" />,
  Retriever: <Code2 className="h-5 w-5" />,
  Processor: <Code2 className="h-5 w-5" />,
  Ingestion: <Zap className="h-5 w-5" />,
  Server: <Shield className="h-5 w-5" />,
  Dashboard: <Code2 className="h-5 w-5" />,
  Visualization: <Zap className="h-5 w-5" />,
  default: <Code2 className="h-5 w-5" />,
}

const getIcon = (name: string) => {
  const keyword = name.split(' ')[0]
  return iconMap[keyword] || iconMap.default
}

export function ProjectPageClient({ project }: { project: Project }) {
  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          Case Study
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-8 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {tag}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.highlights.map((highlight) => (
            <div key={highlight} className="p-4 rounded-lg border border-white/10 bg-white/5">
              <p className="text-sm text-muted-foreground">{highlight}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Problem, Solution, Impact */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="w-1 h-6 bg-red-500 rounded-full" />
            Problem
          </h2>
          <p className="text-muted-foreground leading-relaxed">{project.problem.description}</p>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full" />
            Solution
          </h2>
          <p className="text-muted-foreground leading-relaxed">{project.solution.description}</p>
        </motion.div>

        {/* Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full" />
            Impact
          </h2>
          <div className="space-y-2">
            {project.impact.metrics.map((metric) => (
              <div key={metric.label} className="text-sm">
                <p className="font-semibold text-primary">{metric.value}</p>
                <p className="text-muted-foreground text-xs">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6">Architecture</h2>
        <p className="text-muted-foreground mb-8">{project.architecture.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.architecture.components.map((comp) => (
            <div key={comp.name} className="p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
              <div className="flex items-start gap-3">
                {getIcon(comp.name)}
                <div>
                  <h3 className="font-semibold text-foreground">{comp.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{comp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Workflow */}
      {project.workflow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">{project.workflow.title}</h2>
          <div className="space-y-4">
            {project.workflow.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-sm font-semibold text-primary">
                    {i + 1}
                  </div>
                  {i < project.workflow.steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-primary/20 my-2" />
                  )}
                </div>
                <div className="pt-1.5 pb-4">
                  <h3 className="font-semibold text-foreground">{step.step}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Code Snippets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-foreground mb-8">Implementation</h2>
        <div className="space-y-6">
          {project.codeSnippets.map((snippet) => (
            <div key={snippet.title} className="rounded-lg overflow-hidden border border-white/10">
              <div className="bg-white/[0.02] px-4 py-3 border-b border-white/10">
                <h3 className="font-semibold text-foreground text-sm">{snippet.title}</h3>
              </div>
              <pre className="p-4 overflow-x-auto bg-black/20">
                <code className="text-sm text-muted-foreground font-mono">{snippet.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-foreground mb-8">Engineering Challenges</h2>
        <div className="space-y-4">
          {project.challenges.map((item, i) => (
            <details key={i} className="group cursor-pointer rounded-lg border border-white/10 p-4 hover:border-white/20 transition-colors">
              <summary className="flex items-center justify-between font-semibold text-foreground">
                {item.challenge}
                <ArrowRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{item.solution}</p>
            </details>
          ))}
        </div>
      </motion.div>

      {/* CTA Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="py-8 border-t border-white/10 flex flex-col sm:flex-row gap-4"
      >
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-foreground hover:bg-white/[0.05] transition-colors"
        >
          <GitBranch className="h-4 w-4" />
          View on GitHub
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        )}
      </motion.div>
    </div>
  )
}
