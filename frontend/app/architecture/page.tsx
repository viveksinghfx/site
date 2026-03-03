"use client"

import { motion } from "framer-motion"
import { PortfolioShell } from "@/components/portfolio-shell"
import { Database, Cloud, Workflow, Cpu, Layers, Brain, Eye, RotateCcw } from "lucide-react"

/* ──────────────────── RAG Pipeline ──────────────────── */

const ragSteps = [
  { label: "User Query", desc: "Natural language input from the user", icon: "Q" },
  { label: "Query Rewrite", desc: "Expand & disambiguate using LLM", icon: "R" },
  { label: "Hybrid Search", desc: "BM25 keyword + dense vector retrieval", icon: "S" },
  { label: "Rerank", desc: "Cross-encoder reranking for precision", icon: "K" },
  { label: "Context Assembly", desc: "Merge top-k chunks with metadata", icon: "C" },
  { label: "LLM Generation", desc: "Generate grounded answer with citations", icon: "G" },
]

function PipelineArrow() {
  return (
    <div className="flex items-center justify-center py-0.5">
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none" aria-hidden="true" className="text-primary/30">
        <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.5s" repeatCount="indefinite" />
        </line>
        <polygon points="5,19 10,27 15,19" fill="currentColor" />
      </svg>
    </div>
  )
}

function RAGPipeline() {
  return (
    <div className="flex flex-col items-center">
      {ragSteps.map((step, i) => (
        <div key={step.label} className="flex flex-col items-center w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className="w-full"
          >
            <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 overflow-hidden transition-colors hover:border-white/15 hover:bg-white/[0.04]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {step.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
          {i < ragSteps.length - 1 && <PipelineArrow />}
        </div>
      ))}
    </div>
  )
}

/* ──────────────────── Agentic Loop ──────────────────── */

const agentSteps = [
  { label: "Plan", desc: "Decompose task into sub-goals with dependency graph", icon: Brain },
  { label: "Act", desc: "Execute tools & API calls based on the current plan", icon: Cpu },
  { label: "Observe", desc: "Evaluate tool outputs and update internal state", icon: Eye },
  { label: "Correct", desc: "Self-critique, backtrack if needed, and re-plan", icon: RotateCcw },
]

function AgenticLoop() {
  return (
    <div className="relative">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="160" fill="none" stroke="hsl(200 95% 50% / 0.06)" strokeWidth="1.5" strokeDasharray="6 6">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="40s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="200" r="130" fill="none" stroke="hsl(200 95% 50% / 0.04)" strokeWidth="1" strokeDasharray="4 8">
          <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="30s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div className="grid grid-cols-2 gap-4 relative">
        {agentSteps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 h-full overflow-hidden transition-all hover:border-white/15 hover:bg-white/[0.04]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" />
              </div>
              <h4 className="font-display text-base font-semibold text-foreground">{step.label}</h4>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <div className="flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" aria-hidden="true">
            <path d="M17 2l4 4-4 4" />
            <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
            <path d="M7 22l-4-4 4-4" />
            <path d="M21 13v1a4 4 0 0 1-4 4H3" />
          </svg>
          <span className="text-xs text-muted-foreground">Continuous loop until goal is met</span>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────── Infrastructure ──────────────────── */

const infraGroups = [
  { label: "Compute", icon: Cpu, items: ["AWS Lambda", "ECS Fargate", "SageMaker Endpoints"] },
  { label: "Storage", icon: Database, items: ["S3 Data Lake", "Pinecone Vector DB", "DynamoDB", "ElastiCache"] },
  { label: "Orchestration", icon: Workflow, items: ["Step Functions", "EventBridge", "SQS / SNS", "CloudWatch"] },
]

/* ──────────────────── Page ──────────────────── */

export default function ArchitecturePage() {
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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Deep Dive</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Architecture
            </h1>
            <p className="mt-3 text-muted-foreground">
              Explore the technical pipelines powering production AI systems
            </p>
          </motion.div>

          {/* Tech philosophy banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-12 flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/[0.03] p-5"
          >
            <Layers className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"Every system is designed for observability, graceful degradation, and horizontal scaling. Pipelines are modular--swap any component without rewriting the orchestration layer."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-bold text-foreground">Advanced RAG Pipeline</h3>
              </div>
              <RAGPipeline />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Cloud className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-bold text-foreground">Agentic Loop</h3>
              </div>
              <AgenticLoop />
            </motion.div>
          </div>

          {/* Infrastructure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-8 text-center">
                Infrastructure Overview
              </h3>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {infraGroups.map((group, gi) => (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <group.icon className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold text-primary">{group.label}</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PortfolioShell>
  )
}
