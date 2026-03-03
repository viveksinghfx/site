"use client"

import { motion } from "framer-motion"
import { Brain, Cloud, Code2, Database, Layers, Workflow, Boxes } from "lucide-react"

const skillGroups = [
  {
    icon: Brain,
    title: "Agentic AI / LLMs",
    description: "Production reasoning systems",
    skills: ["LangGraph", "LangChain", "RAG Pipelines", "Prompt Engineering", "Multi-Agent Orchestration", "AWS Bedrock"],
    highlight: false,
  },
  {
    icon: Workflow,
    title: "Pipeline Engineering",
    description: "Where it all started — 3+ yrs production",
    skills: ["Houdini / VEX", "Procedural Systems", "Python Automation", "DAG Workflows", "Asset Pipelines", "Unreal Blueprints"],
    highlight: true,
  },
  {
    icon: Code2,
    title: "Languages",
    description: "Writing clean, efficient code",
    skills: ["Python", "TypeScript", "VEX", "SQL", "Bash"],
    highlight: false,
  },
  {
    icon: Cloud,
    title: "Cloud & Infra",
    description: "Deploying at scale with reliability",
    skills: ["AWS Lambda", "ECS Fargate", "SageMaker", "Docker / K8s", "Terraform"],
    highlight: false,
  },
  {
    icon: Database,
    title: "Data & Storage",
    description: "Managing data pipelines and persistence",
    skills: ["Pinecone", "DynamoDB", "S3", "Redis / ElastiCache", "PostgreSQL"],
    highlight: false,
  },
  {
    icon: Boxes,
    title: "Realtime & 3D",
    description: "Performance-constrained systems",
    skills: ["Unreal Engine 5", "Houdini", "FastAPI", "WebSockets", "Recharts"],
    highlight: false,
  },
]

export function SkillsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }} className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Expertise</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Technical Stack
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
            Full-stack AI engineering built on a foundation of production pipeline and procedural systems work.
            The orange category is where most AI engineers have zero depth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: gi * 0.08 }}
              whileHover={{ y: -3 }}
              className={`group relative rounded-xl border p-6 transition-all overflow-hidden ${
                group.highlight
                  ? "border-orange-500/20 bg-orange-500/[0.03] hover:border-orange-500/30 hover:bg-orange-500/[0.05]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
              }`}>
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500 ${
                group.highlight ? "via-orange-500/0 group-hover:via-orange-500/40" : "via-primary/0 group-hover:via-primary/30"
              }`} />

              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  group.highlight ? "bg-orange-500/10 text-orange-400" : "bg-primary/10 text-primary"
                }`}>
                  <group.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-semibold text-foreground">{group.title}</h3>
                    {group.highlight && (
                      <span className="rounded-sm border border-orange-500/20 bg-orange-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-400">
                        Rare
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{group.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span key={skill}
                    className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                      group.highlight
                        ? "border-orange-500/[0.08] bg-orange-500/[0.04] text-muted-foreground hover:text-orange-300 hover:border-orange-500/20"
                        : "border-white/[0.06] bg-white/[0.03] text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-primary/[0.04]"
                    }`}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
