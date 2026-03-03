"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const connections = [
  {
    fx:      { label: "Houdini SOP Network",      sub: "Node-based DAG for geometry processing" },
    ai:      { label: "LangGraph StateGraph",      sub: "Node-based DAG for agent orchestration" },
    insight: "Both are directed graphs of composable, stateless processing nodes — same data structure, different domain.",
  },
  {
    fx:      { label: "VEX Kernels",               sub: "Data-parallel compute over point clouds" },
    ai:      { label: "LLM Tool Functions",         sub: "Discrete compute units called by agents" },
    insight: "Atomic, typed, side-effect-free functions. Write once, reuse anywhere in the graph.",
  },
  {
    fx:      { label: "Procedural Simulation",     sub: "Parameterized, reproducible, non-destructive" },
    ai:      { label: "RAG Pipeline",               sub: "Parameterized, reproducible, modular retrieval" },
    insight: "Change one upstream parameter — everything downstream updates deterministically.",
  },
  {
    fx:      { label: "Unreal Blueprints",         sub: "Visual state machine for runtime logic" },
    ai:      { label: "Agent Conditional Edges",   sub: "Routing logic between graph nodes" },
    insight: "Event-driven state transitions: if condition X, go to node Y. Identical pattern.",
  },
  {
    fx:      { label: "Realtime VFX (<16ms)",      sub: "Hard latency budget per frame" },
    ai:      { label: "Production LLM API (<500ms)", sub: "Hard latency SLAs for UX" },
    insight: "Both demand performance-first thinking: cache aggressively, batch, optimize hot paths.",
  },
  {
    fx:      { label: "Asset Pipeline Automation", sub: "Python ingesting raw assets → rendered outputs" },
    ai:      { label: "ML Data Pipeline",           sub: "Python ingesting raw docs → vector embeddings" },
    insight: "ETL with domain-specific transforms. Same architecture, different data types.",
  },
]

export function ProceduralToAgentic() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }} className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">The Through Line</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            From Procedural to Agentic
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Every concept from 3 years of FX pipeline engineering maps directly to modern AI systems.
            The vocabulary changed. The thinking did not.
          </p>
        </motion.div>

        <motion.blockquote initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14 mt-8 border-l-2 border-primary/40 pl-6 italic text-muted-foreground max-w-2xl">
          "A Houdini network and a LangGraph are the same data structure — a directed graph of composable nodes.
          I switched from simulating fire to orchestrating reasoning."
        </motion.blockquote>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {connections.map((conn, i) => (
            <motion.div key={conn.fx.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.04] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/25 transition-all duration-500" />

              <div className="flex items-start gap-3">
                {/* FX side */}
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center rounded-md border border-orange-500/20 bg-orange-500/[0.06] px-2 py-0.5 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">FX</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{conn.fx.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{conn.fx.sub}</p>
                </div>

                <ArrowRight className="h-4 w-4 text-primary/40 shrink-0 mt-5" />

                {/* AI side */}
                <div className="flex-1 min-w-0 text-right">
                  <div className="inline-flex items-center rounded-md border border-primary/20 bg-primary/[0.06] px-2 py-0.5 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">AI</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{conn.ai.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{conn.ai.sub}</p>
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-white/[0.02] border border-white/[0.04] px-3 py-2">
                <p className="text-xs text-muted-foreground/80 leading-relaxed">
                  <span className="text-primary/70 font-medium">Insight: </span>{conn.insight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-xl border border-primary/15 bg-primary/[0.04] p-6 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This is not a career pivot. It is a domain transfer with a 3-year head start on the
            systems thinking most AI engineers spend years developing.
            <span className="block mt-2 text-foreground font-medium">
              Production mindset. Graph-based thinking. Python-first. Already proven under pressure.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
