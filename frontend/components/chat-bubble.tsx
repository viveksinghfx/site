"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Sparkles, Mail, Linkedin, Github } from "lucide-react"

/* ──────────────────── Knowledge Base ──────────────────── */

interface KBEntry {
  keywords: string[]
  answer: string
}

const knowledgeBase: KBEntry[] = [
  {
    keywords: ["who", "about", "yourself", "introduce", "vivek", "name"],
    answer:
      "I'm Vivek Singh, an Agentic AI Engineer specializing in building autonomous AI systems using LLMs, RAG pipelines, and multi-agent orchestration on AWS. I'm currently available for new opportunities.",
  },
  {
    keywords: ["project", "built", "portfolio", "work", "what have you"],
    answer:
      "I've built several production AI systems including: a Multi-Agent Research System (50k+ daily queries, 94% accuracy), a RAG-Powered Knowledge Base with hybrid search, a Resume Screening Agent, a Real-Time AI Dashboard, a Conversational AI Platform handling 10k+ concurrent conversations, and an AI Code Review Agent.",
  },
  {
    keywords: ["research", "multi-agent", "langgraph", "agent system"],
    answer:
      "My flagship project is the Multi-Agent Research System - an autonomous research pipeline using LangGraph with specialized agents for query decomposition, web search, and synthesis. It features self-correcting loops, dynamic tool selection, and confidence-based routing, handling 50k+ daily queries with 94% accuracy at under 200ms latency.",
  },
  {
    keywords: ["rag", "retrieval", "knowledge base", "vector", "search"],
    answer:
      "I built a production-grade RAG system with a 6-stage pipeline: Query Rewrite, Hybrid Search (BM25 + dense vector), Cross-encoder Reranking, Context Assembly, and LLM Generation with citations. It uses Pinecone for vector storage and is deployed on AWS ECS with FastAPI.",
  },
  {
    keywords: ["resume", "screening", "reviewer"],
    answer:
      "The Resume Screening Agent is an agentic workflow that parses resumes, extracts structured data using Pydantic, and scores candidates against job descriptions using chain-of-thought reasoning. Built with OpenAI, S3, and DynamoDB.",
  },
  {
    keywords: ["skill", "tech", "stack", "technology", "language", "framework", "tool"],
    answer:
      "My tech stack includes: Core AI (LLM Fine-tuning, Vector Databases, Prompt Engineering, Multi-Agent Orchestration, RAG Pipelines), Frameworks (LangChain/LangGraph, AWS Bedrock, FastAPI, Next.js), Languages (Python, TypeScript, SQL), and Infrastructure (Docker/K8s, Terraform, CI/CD, CloudWatch).",
  },
  {
    keywords: ["experience", "job", "work history", "career", "company"],
    answer:
      "My experience: Senior GenAI Engineer at a Stealth AI Startup (2024-Present) - architecting multi-agent platforms; AI/ML Engineer at AWS Professional Services (2022-2024) - deployed 12+ GenAI solutions for Fortune 500 clients; Software Engineer - AI at Tech Corp (2020-2022) - built NLP pipelines and recommendation engines.",
  },
  {
    keywords: ["education", "degree", "university", "school", "study"],
    answer:
      "I hold an M.S. in Computer Science with AI Specialization from University of Technology (2018-2020) and a B.Tech in Computer Science from National Institute of Technology (2014-2018).",
  },
  {
    keywords: ["certification", "certified", "aws cert"],
    answer:
      "I hold AWS Certified Solutions Architect, AWS Certified Machine Learning, and DeepLearning.AI - LangChain certifications.",
  },
  {
    keywords: ["architecture", "pipeline", "system design", "infrastructure"],
    answer:
      "My systems are built on AWS infrastructure: Compute (Lambda, ECS Fargate, SageMaker), Storage (S3, Pinecone, DynamoDB, ElastiCache), and Orchestration (Step Functions, EventBridge, SQS/SNS, CloudWatch). Every system is designed for observability, graceful degradation, and horizontal scaling.",
  },
  {
    keywords: ["agentic", "loop", "plan act observe"],
    answer:
      "My agentic AI loop follows a 4-step cycle: Plan (decompose tasks into sub-goals), Act (execute tools & API calls), Observe (evaluate outputs and update state), and Correct (self-critique, backtrack if needed, re-plan). This runs continuously until the goal is met.",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "connect", "talk", "message"],
    answer:
      "You can reach me at hello@viveksingh.tech, connect on LinkedIn (linkedin.com/in/vivek-singh-633886137), or check out my work on GitHub (github.com/viveksinghfx/Project). I'm currently available for new opportunities!",
  },
  {
    keywords: ["dashboard", "monitoring", "metrics"],
    answer:
      "I built a Real-Time AI Dashboard for monitoring multi-agent systems with live metrics on token usage, latency, agent decisions, and RAG retrieval quality scores. Built with Next.js, WebSockets, CloudWatch, and Recharts.",
  },
  {
    keywords: ["chatbot", "conversational", "platform", "concurrent"],
    answer:
      "The Conversational AI Platform is an end-to-end chatbot system with intent classification, slot filling, and dynamic context management, handling 10k+ concurrent conversations. Built with Python, Redis, SageMaker, and React.",
  },
  {
    keywords: ["code review", "pr", "security", "vulnerability"],
    answer:
      "The AI Code Review Agent autonomously analyzes PRs for security vulnerabilities, performance issues, and style violations using specialized sub-agents. Built with LangChain, GitHub API, AST parsing, and GPT-4.",
  },
  {
    keywords: ["demo", "try", "interactive", "lab"],
    answer:
      "Check out the AI Demos page on this site! You can interact with simulated versions of my portfolio chatbot, resume reviewer, research agent, and project generator. In production, these are backed by LangChain agents, RAG pipelines, and GPT-4.",
  },
  {
    keywords: ["available", "opportunity", "open to", "looking for", "freelance", "job"],
    answer:
      "Yes, I'm currently available for new opportunities! I'm open to roles in Agentic AI Engineering, GenAI Architecture, and LLM Systems. Feel free to reach out at hello@viveksingh.tech.",
  },
]

const fallbackResponses = [
  "That's interesting! While I may not have a specific answer for that, I'd love to chat more. Feel free to reach out to Vivek at hello@viveksingh.tech.",
  "Great question! I'm most knowledgeable about Vivek's projects, skills, and experience. Try asking about those, or contact him directly at hello@viveksingh.tech.",
  "I don't have details on that, but you can ask me about Vivek's AI projects, tech stack, experience, or how to get in touch!",
]

function findBestAnswer(query: string): string {
  const lower = query.toLowerCase()
  let bestMatch: KBEntry | null = null
  let bestScore = 0

  for (const entry of knowledgeBase) {
    let score = 0
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        score += kw.length
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  if (bestMatch && bestScore >= 3) {
    return bestMatch.answer
  }

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
}

/* ──────────────────── Suggested Questions ──────────────────── */

const suggestions = [
  "What projects have you built?",
  "Tell me about your skills",
  "How can I contact you?",
  "What's your experience?",
]

/* ──────────────────── Typing Indicator ──────────────────── */

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1.5 rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/[0.06] px-3.5 py-2.5">
        <span
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
          style={{ animationDelay: "0ms", animationDuration: "0.6s" }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
          style={{ animationDelay: "150ms", animationDuration: "0.6s" }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
          style={{ animationDelay: "300ms", animationDuration: "0.6s" }}
        />
      </div>
    </div>
  )
}

/* ──────────────────── Chat Bubble ──────────────────── */

interface Message {
  role: "user" | "assistant"
  text: string
}

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hey! I'm Vivek's portfolio assistant. Ask me about his projects, skills, experience, or how to get in touch.",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text || input).trim()
      if (!msg) return

      setMessages((prev) => [...prev, { role: "user", text: msg }])
      setInput("")
      setIsTyping(true)

      const delay = 400 + Math.random() * 600
      setTimeout(() => {
        const answer = findBestAnswer(msg)
        setMessages((prev) => [...prev, { role: "assistant", text: answer }])
        setIsTyping(false)
      }, delay)
    },
    [input]
  )

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed bottom-6 right-6 z-50 flex w-[380px] max-w-[calc(100vw-3rem)] flex-col rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-foreground block leading-tight">
                    Ask Vivek
                  </span>
                  <span className="text-[10px] text-muted-foreground">Portfolio Assistant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex flex-col gap-3 overflow-y-auto p-4"
              style={{ maxHeight: "340px", minHeight: "200px" }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-tl-sm bg-white/[0.06] text-foreground border border-white/[0.06]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && <TypingIndicator />}

              {/* Suggestion chips - show only after the first assistant message */}
              {messages.length === 1 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-1.5 mt-1"
                >
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/[0.06] hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Quick links */}
            <div className="flex items-center justify-center gap-3 border-t border-white/[0.06] px-4 py-2">
              <a
                href="mailto:hello@viveksingh.tech"
                className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                aria-label="Email Vivek"
              >
                <Mail className="h-3 w-3" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/vivek-singh-633886137"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3 w-3" />
                LinkedIn
              </a>
              <a
                href="https://github.com/viveksinghfx/Project"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                aria-label="GitHub"
              >
                <Github className="h-3 w-3" />
                GitHub
              </a>
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.06] p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
