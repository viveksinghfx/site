"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const roles = [
  "Agentic AI Engineer",
  "Pipeline Systems Builder",
  "LangGraph Architect",
  "GenAI Engineer",
]

function useTypewriter(words: string[], speed = 80, deleteSpeed = 40, pause = 2200) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text === "") {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => setText(isDeleting ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1)),
        isDeleting ? deleteSpeed : speed
      )
    }
    return () => clearTimeout(timeout)
  }, [text, wordIndex, isDeleting, words, speed, deleteSpeed, pause])

  return text
}

export function HeroSection() {
  const typedText = useTypewriter(roles)

  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-center">
      {/* Grid texture */}
      <div className="absolute inset-0 -z-10 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[700px] rounded-full bg-primary/[0.06] blur-[140px]" />

      <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
        {/* Available badge */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="mb-8">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-muted-foreground tracking-wide">Available for opportunities</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.1]">
          Vivek Singh
        </motion.h1>

        {/* Typewriter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-4 h-10 sm:h-12">
          <span className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-primary">{typedText}</span>
          <span className="inline-block w-[2px] h-7 sm:h-8 bg-primary ml-0.5 align-middle animate-pulse" />
        </motion.div>

        {/* The real story — dots connected */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          3+ years building{" "}
          <span className="text-foreground font-medium">production Python pipelines and DAG-based procedural systems</span>
          {" "}in Houdini & Unreal — now applying the same graph-based thinking to{" "}
          <span className="text-foreground font-medium">LangGraph agents, RAG pipelines, and AWS-deployed AI systems.</span>
          {" "}The mental model never changed. The domain did.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/projects"
            className="group flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_40px_hsl(200_95%_50%/0.3)] hover:scale-[1.02] active:scale-[0.98]">
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/demos"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-white/[0.08] hover:border-white/20">
            Live AI Demos
            <span className="ml-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">LIVE</span>
          </Link>
          <Link href="/resume"
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-white/[0.08] hover:border-white/20">
            <Download className="h-4 w-4" />
            Resume
          </Link>
        </motion.div>

        {/* Socials */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex items-center gap-3">
          {[
            { icon: Github,   href: "https://github.com/viveksinghfx/Project",            label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/vivek-singh-633886137",  label: "LinkedIn" },
            { icon: Mail,     href: "mailto:hello@viveksingh.tech",                       label: "Email" },
          ].map((s) => (
            <a key={s.label} href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/[0.06] transition-all"
              aria-label={s.label}>
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
