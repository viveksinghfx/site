"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

/* ──────────────────── Typewriter ──────────────────── */

const roles = [
  "Agentic AI Engineer",
  "GenAI Architect",
  "LLM Systems Builder",
  "Multi-Agent Designer",
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
        () => {
          setText(
            isDeleting
              ? current.substring(0, text.length - 1)
              : current.substring(0, text.length + 1)
          )
        },
        isDeleting ? deleteSpeed : speed
      )
    }

    return () => clearTimeout(timeout)
  }, [text, wordIndex, isDeleting, words, speed, deleteSpeed, pause])

  return text
}

/* ──────────────────── Hero Section ──────────────────── */

export function HeroSection() {
  const typedText = useTypewriter(roles)

  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-center">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
        {/* Top: Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-muted-foreground tracking-wide">Available for opportunities</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance leading-[1.1]"
        >
          Vivek Singh
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 h-10 sm:h-12"
        >
          <span className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-primary">
            {typedText}
          </span>
          <span className="inline-block w-[2px] h-7 sm:h-8 bg-primary ml-0.5 align-middle animate-pulse" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty"
        >
          I architect and build autonomous AI systems -- from multi-agent orchestration to
          production-grade RAG pipelines -- powered by LLMs, LangChain, and AWS infrastructure.
          Turning complex AI research into scalable, real-world solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_40px_hsl(200_95%_50%/0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/resume"
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-white/[0.08] hover:border-white/20"
          >
            <Download className="h-4 w-4" />
            Resume
          </Link>
          <a
            href="mailto:hello@viveksingh.tech"
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-white/[0.08] hover:border-white/20"
          >
            <Mail className="h-4 w-4" />
            Contact
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex items-center gap-3"
        >
          {[
            { icon: Github, href: "https://github.com/viveksinghfx/Project", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/vivek-singh-633886137", label: "LinkedIn" },
            { icon: Mail, href: "mailto:hello@viveksingh.tech", label: "Email" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/[0.06] transition-all"
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>


      </div>
    </section>
  )
}
