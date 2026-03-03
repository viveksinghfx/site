"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, FileSearch, Search, Lightbulb, X, Send, ArrowRight, Sparkles } from "lucide-react"
import { PortfolioShell } from "@/components/portfolio-shell"

interface Demo {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  greeting: string
  responses: Record<string, string>
  features: string[]
}

const demos: Demo[] = [
  {
    id: "portfolio-chat",
    title: "Chat with My Portfolio",
    description: "Ask questions about my projects, skills, and experience. Powered by RAG over my portfolio data.",
    icon: Bot,
    greeting: "Hi! I can answer questions about Vivek Singh's projects, skills, and experience. What would you like to know?",
    responses: {
      default: "Great question! Vivek Singh specializes in building agentic AI systems with LLMs, RAG pipelines, and multi-agent orchestration on AWS.",
    },
    features: ["RAG retrieval", "Semantic search", "Context-aware"],
  },
  {
    id: "resume-reviewer",
    title: "Resume Reviewer Agent",
    description: "Upload your resume and get AI-powered feedback on formatting, content, and ATS compatibility.",
    icon: FileSearch,
    greeting: "Welcome! Paste your resume text and I'll provide detailed feedback on structure, impact statements, and ATS optimization.",
    responses: {
      default: "I'd analyze your resume for: action verbs, quantified achievements, ATS keywords, and formatting consistency. Try pasting some resume text!",
    },
    features: ["ATS scoring", "Impact analysis", "Keyword check"],
  },
  {
    id: "research-agent",
    title: "Research AI Agent",
    description: "An autonomous agent that plans, searches, and synthesizes research on any topic using multi-step reasoning.",
    icon: Search,
    greeting: "I'm a research agent that can investigate topics using multi-step reasoning. What would you like me to research?",
    responses: {
      default: "I would: 1) Break down the query, 2) Search multiple sources, 3) Cross-reference findings, 4) Synthesize a comprehensive answer with citations.",
    },
    features: ["Multi-step", "Source synthesis", "Auto-citations"],
  },
  {
    id: "project-generator",
    title: "AI Project Generator",
    description: "Describe your interests and get AI-generated project ideas with architecture diagrams and tech stack recommendations.",
    icon: Lightbulb,
    greeting: "Tell me your interests and skill level, and I'll generate creative AI project ideas with full architecture plans!",
    responses: {
      default: "Based on trending AI patterns, here's an idea: Build a multi-agent code review system using LangGraph with specialized agents for security, performance, and style analysis.",
    },
    features: ["Tech stacks", "Architecture", "Difficulty levels"],
  },
]

function DemoChat({ demo, onClose }: { demo: Demo; onClose: () => void }) {
  const [messages, setMessages] = useState([
    { role: "assistant" as const, text: demo.greeting },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  function handleSend() {
    if (!input.trim()) return
    const userMsg = input
    setMessages((prev) => [...prev, { role: "user" as const, text: userMsg }])
    setInput("")

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, text: demo.responses.default },
      ])
    }, 800)
  }

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 220 }}
      className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-white/[0.06] bg-background/98 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/[0.04] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <demo.icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{demo.title}</h3>
            <p className="text-xs text-muted-foreground">Interactive Demo</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-xl p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          aria-label="Close demo"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-white/[0.04] text-foreground border border-white/[0.06]"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/[0.04] p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function DemosPage() {
  const [activeDemo, setActiveDemo] = useState<Demo | null>(null)

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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Interactive Lab</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              AI Demos
            </h1>
            <p className="mt-3 text-muted-foreground">
              Explore live demos of autonomous AI agents and GenAI applications
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-10 flex items-center gap-3 rounded-xl border border-primary/10 bg-primary/[0.03] p-4"
          >
            <Sparkles className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">
              Each demo features a simulated AI agent. In production, these are backed by LangChain agents, RAG pipelines, and GPT-4.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {demos.map((demo, i) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="group relative flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 h-full overflow-hidden transition-all hover:border-white/15 hover:bg-white/[0.04]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent group-hover:via-white/15 transition-all duration-500" aria-hidden="true" />

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <demo.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">{demo.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{demo.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {demo.features.map((f) => (
                    <span key={f} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <button
                    onClick={() => setActiveDemo(demo)}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/15 group-hover:gap-3"
                  >
                    <Bot className="h-4 w-4" />
                    Launch Demo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeDemo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setActiveDemo(null)}
            />
            <DemoChat demo={activeDemo} onClose={() => setActiveDemo(null)} />
          </>
        )}
      </AnimatePresence>
    </PortfolioShell>
  )
}
