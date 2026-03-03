"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code2, Database, Zap, Shield, GitBranch, ExternalLink } from "lucide-react"

interface ProjectDetailProps {
  title: string
  tagline: string
  techStack: string[]
  githubUrl: string
  liveUrl: string
  problem: {
    title: string
    description: string
  }
  solution: {
    title: string
    description: string
  }
  impact: {
    metrics: Array<{ label: string; value: string }>
  }
  architecture: {
    description: string
    components: Array<{
      name: string
      description: string
      icon: React.ReactNode
    }>
  }
  workflow?: {
    title: string
    steps: Array<{
      step: string
      description: string
    }>
  }
  codeSnippets: Array<{
    title: string
    language: string
    code: string
  }>
  challenges: Array<{
    challenge: string
    solution: string
  }>
}

export function ProjectDetail({
  title,
  tagline,
  techStack,
  githubUrl,
  liveUrl,
  problem,
  solution,
  impact,
  architecture,
  workflow,
  codeSnippets,
  challenges,
}: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 h-96 w-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Case Study
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-8">
              {tagline}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-foreground hover:bg-white/[0.08] transition-colors"
              >
                <GitBranch className="h-4 w-4" />
                View Code
              </a>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem → Solution → Impact */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-8"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Problem
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>

            <div className="flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-primary/40 hidden md:block" />
            </div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-8"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Solution
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {solution.description}
              </p>
            </motion.div>

            <div className="flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-primary/40 hidden md:block" />
            </div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl border border-primary/20 bg-primary/5 p-8 md:col-span-1"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Impact
              </h3>
              <div className="space-y-3">
                {impact.metrics.map((metric, i) => (
                  <div key={i} className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              System Architecture
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              {architecture.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {architecture.components.map((comp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-primary/20 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary/20 transition-colors">
                      {comp.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">
                        {comp.name}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {comp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workflow */}
      {workflow && (
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-12">
                {workflow.title}
              </h2>

              <div className="space-y-6">
                {workflow.steps.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/20 text-primary font-semibold">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">
                        {item.step}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Code Snippets */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-12">
              Production Code
            </h2>

            <div className="space-y-8">
              {codeSnippets.map((snippet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">
                      {snippet.title}
                    </h4>
                    <span className="ml-auto text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                      {snippet.language}
                    </span>
                  </div>
                  <div className="rounded-lg bg-black/30 border border-white/10 p-4 overflow-x-auto">
                    <pre className="text-sm text-foreground font-mono leading-relaxed">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engineering Challenges */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-12">
              Engineering Challenges & Decisions
            </h2>

            <div className="space-y-6">
              {challenges.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all"
                >
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-yellow-500/70" />
                    {item.challenge}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.solution}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Want to build something like this?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Reach out to discuss AI systems, production optimization, or technical architecture.
            </p>
            <a
              href="mailto:ace.vivek2@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
