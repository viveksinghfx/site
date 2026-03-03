"use client"

import { motion } from "framer-motion"
import { Brain, Cloud, Code2, Database, Layers, Workflow } from "lucide-react"

const skillGroups = [
  {
    icon: Brain,
    title: "Core AI / ML",
    description: "Building intelligent systems from the ground up",
    skills: ["LLM Fine-tuning", "Prompt Engineering", "RAG Pipelines", "Vector Databases", "Multi-Agent Orchestration"],
  },
  {
    icon: Workflow,
    title: "Frameworks",
    description: "Production-grade tools and libraries",
    skills: ["LangChain / LangGraph", "AWS Bedrock", "FastAPI", "Next.js", "Hugging Face"],
  },
  {
    icon: Code2,
    title: "Languages",
    description: "Writing clean, efficient code",
    skills: ["Python", "TypeScript", "SQL", "Bash"],
  },
  {
    icon: Cloud,
    title: "Cloud & Infra",
    description: "Deploying at scale with reliability",
    skills: ["AWS Lambda", "ECS Fargate", "SageMaker", "Docker / K8s", "Terraform"],
  },
  {
    icon: Database,
    title: "Data & Storage",
    description: "Managing data pipelines and persistence",
    skills: ["Pinecone", "DynamoDB", "S3", "Redis / ElastiCache", "PostgreSQL"],
  },
  {
    icon: Layers,
    title: "Orchestration",
    description: "Connecting systems together",
    skills: ["Step Functions", "EventBridge", "SQS / SNS", "CloudWatch", "CI/CD"],
  },
]

export function SkillsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Expertise</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Technical Stack
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
            Deep expertise across the full AI stack -- from model training and prompt engineering
            to cloud infrastructure and production deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: gi * 0.08 }}
              whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.15)" }}
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04] overflow-hidden"
            >
              {/* Subtle top-line highlight on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/30 transition-all duration-500" />

              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <group.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">{group.title}</h3>
                  <p className="text-xs text-muted-foreground">{group.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-primary/20 hover:bg-primary/[0.04]"
                  >
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
