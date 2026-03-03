"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

export function ContactCTA() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-primary/15 bg-primary/[0.03] p-10 lg:p-16 overflow-hidden text-center"
        >
          {/* Subtle glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-primary/[0.08] blur-[120px]" aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">{"Let's Connect"}</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {"Interested in working together?"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed text-pretty">
              {"I'm currently open to new opportunities in Agentic AI, GenAI Architecture, and LLM Systems Engineering. Let's build something impactful."}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:hello@viveksingh.tech"
                className="group flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_40px_hsl(200_95%_50%/0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="h-4 w-4" />
                Say Hello
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/vivek-singh-633886137"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-white/[0.08] hover:border-white/20"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/viveksinghfx/Project"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-white/[0.08] hover:border-white/20"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              {"hello@viveksingh.tech"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
