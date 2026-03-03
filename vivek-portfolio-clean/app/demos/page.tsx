"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, FileSearch, Search, TrendingUp, X, Send, ArrowRight, Zap } from "lucide-react"
import { PortfolioShell } from "@/components/portfolio-shell"

interface Demo {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  greeting: string
  features: string[]
  placeholder: string
  badge: string
  accent: string
}

const demos: Demo[] = [
  {
    id: "portfolio-chat",
    title: "Chat with My Portfolio",
    description: "LangGraph ReAct agent with a portfolio knowledge base tool. Ask anything about projects, skills, or experience.",
    icon: Bot,
    greeting: "Hi! I'm a LangGraph ReAct agent with Vivek's full portfolio loaded as a knowledge base. Ask me about any project, skill, or his background.",
    features: ["LangGraph ReAct", "Knowledge base tool", "Multi-turn memory"],
    placeholder: "What projects has Vivek built with LangGraph?",
    badge: "ReAct Agent",
    accent: "primary",
  },
  {
    id: "resume-reviewer",
    title: "Resume Reviewer Agent",
    description: "Multi-node LangGraph pipeline: extract → ATS scan → impact analysis → review. Paste your resume text.",
    icon: FileSearch,
    greeting: "I'm a multi-step resume pipeline. Paste your resume text and I'll run an ATS keyword scan, analyze your impact statements, and give you the top 3 specific improvements.",
    features: ["ATS keyword scan", "Impact statement score", "Multi-node pipeline"],
    placeholder: "Paste your resume text here...",
    badge: "Pipeline Agent",
    accent: "violet",
  },
  {
    id: "research-agent",
    title: "Research AI Agent",
    description: "Autonomous LangGraph agent that decomposes your question, searches the web, and synthesizes a structured report.",
    icon: Search,
    greeting: "I'm a research agent with web search tools. Give me any topic and I'll decompose it, search for current info, and synthesize a structured report with key findings.",
    features: ["Web search tools", "Query decomposition", "Auto-synthesis"],
    placeholder: "Research the current state of LangGraph in production...",
    badge: "Autonomous Agent",
    accent: "primary",
  },
  {
    id: "finance-agent",
    title: "Finance AI Agent",
    description: "Real-time stock prices, portfolio risk analysis, market news — US and Indian markets. Multi-tool LangGraph ReAct agent.",
    icon: TrendingUp,
    greeting: "I'm a Finance AI Agent with live market data tools 📈\n\nI can help with:\n• Stock prices — AAPL, NVDA, TCS, INFY, RELIANCE, BTC and more\n• Portfolio analysis — paste holdings like 'TCS:20,INFY:15,AAPL:5'\n• Market news per ticker\n• Concepts — P/E, SIP, NIFTY, CAGR, diversification\n• Comparisons — 'compare TCS vs INFY vs WIPRO'\n\nWhat would you like to know?",
    features: ["US + India + Crypto", "Portfolio risk score", "Multi-tool ReAct"],
    placeholder: "Price of NVDA? Or: compare TCS vs INFY vs WIPRO",
    badge: "Finance Agent",
    accent: "emerald",
  },
]

const thinkingSteps: Record<string, string[]> = {
  "portfolio-chat":  ["🔍 Searching knowledge base...", "🧠 Reasoning..."],
  "resume-reviewer": ["📄 Extracting resume...", "🔍 ATS scan...", "📊 Impact analysis...", "✍️ Writing review..."],
  "research-agent":  ["🧩 Decomposing query...", "🔍 Searching web...", "🔍 Cross-referencing...", "📝 Synthesizing..."],
  "finance-agent":   ["📡 Fetching market data...", "📊 Analysing...", "💡 Generating insights..."],
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1"

interface Message { role: "user" | "assistant"; text: string }

function accentClasses(accent: string) {
  switch (accent) {
    case "violet":  return { badge: "bg-violet-500/10 border-violet-500/20 text-violet-400", icon: "bg-violet-500/10 text-violet-400", dot: "bg-violet-400", label: "text-violet-400" }
    case "emerald": return { badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", icon: "bg-emerald-500/10 text-emerald-400", dot: "bg-emerald-400", label: "text-emerald-400" }
    default:        return { badge: "bg-primary/10 border-primary/20 text-primary", icon: "bg-primary/10 text-primary", dot: "bg-primary", label: "text-primary" }
  }
}

function DemoChat({ demo, onClose }: { demo: Demo; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: demo.greeting }])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingStep, setThinkingStep] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const ac = accentClasses(demo.accent)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isThinking])

  async function handleSend() {
    if (!input.trim() || isThinking) return
    const userMsg = input
    setMessages(prev => [...prev, { role: "user", text: userMsg }])
    setInput("")
    setIsThinking(true)
    const steps = thinkingSteps[demo.id] || ["🤔 Thinking..."]
    for (const step of steps) {
      setThinkingStep(step)
      await new Promise(r => setTimeout(r, 650))
    }
    try {
      const res = await fetch(`${API_BASE}/agents/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent_id: demo.id, message: userMsg, history: messages.map(m => ({ role: m.role, content: m.text })) }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setMessages(prev => [...prev, { role: "assistant", text: data.response }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "⚠️ Backend unreachable. Run: `docker compose up -d` in the backend folder, then try again." }])
    } finally {
      setIsThinking(false)
      setThinkingStep("")
    }
  }

  return (
    <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 220 }}
      className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-white/[0.06] bg-[#060a12]/98 backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.04] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ac.icon}`}>
            <demo.icon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">{demo.title}</h3>
              <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${ac.badge}`}>{demo.badge}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${ac.dot}`} />
                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${ac.dot}`} />
              </span>
              <p className={`text-xs font-medium ${ac.label}`}>LangGraph · Live</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="rounded-xl p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "rounded-tr-sm bg-primary text-primary-foreground"
                  : "rounded-tl-sm bg-white/[0.04] text-foreground border border-white/[0.06]"
              }`}>{msg.text}</div>
            </motion.div>
          ))}
          {isThinking && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex items-center gap-3 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.06] px-4 py-3">
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/60"
                      animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{thinkingStep}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-white/[0.04] p-4">
        <div className="flex items-end gap-3">
          <textarea value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }}}
            placeholder={demo.placeholder} disabled={isThinking} rows={2}
            className="flex-1 resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors disabled:opacity-50" />
          <button onClick={handleSend} disabled={!input.trim() || isThinking}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all">
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1.5 text-[10px] text-muted-foreground/60 text-center">Shift+Enter for newline · Enter to send</p>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Interactive Lab</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">AI Agent Demos</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Four real LangGraph agents — ReAct loops, pipeline graphs, autonomous research, and a Finance agent covering US & Indian markets.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-10 flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4">
            <Zap className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-emerald-400">Powered by real LangGraph agents</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Not simulated. Each demo calls a live FastAPI + LangGraph backend — real tool calls, state machines, multi-step reasoning on every message.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {demos.map((demo, i) => {
              const ac = accentClasses(demo.accent)
              return (
                <motion.div key={demo.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ y: -3 }}
                  className="group relative flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden transition-all hover:border-white/[0.12] hover:bg-white/[0.04]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/20 transition-all duration-500" />
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${ac.icon}`}>
                      <demo.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-lg font-semibold text-foreground">{demo.title}</h3>
                        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${ac.badge}`}>{demo.badge}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{demo.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {demo.features.map(f => (
                      <span key={f} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground">{f}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-5">
                    <button onClick={() => setActiveDemo(demo)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all hover:gap-3 ${ac.badge}`}>
                      <demo.icon className="h-4 w-4" />
                      Launch Agent
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeDemo && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setActiveDemo(null)} />
            <DemoChat demo={activeDemo} onClose={() => setActiveDemo(null)} />
          </>
        )}
      </AnimatePresence>
    </PortfolioShell>
  )
}
