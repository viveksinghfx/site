"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { useState } from "react"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

type Status = "idle" | "loading" | "success" | "error"

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) return
    setStatus("loading")
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1"}/contact/`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }
      )
      if (!res.ok) throw new Error()
      setStatus("success")
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  const input = "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors"

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8 text-center">
        <CheckCircle className="h-9 w-9 text-emerald-400" />
        <p className="font-semibold text-foreground">Message sent!</p>
        <p className="text-sm text-muted-foreground">{"I'll get back to you shortly."}</p>
        <button onClick={() => setStatus("idle")} className="text-xs text-primary hover:underline mt-1">Send another</button>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={input} />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={input} />
      </div>
      <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject (optional)" className={input} />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about the opportunity..." rows={4} className={`${input} resize-none`} />
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.04] px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" /> Something went wrong — email me at hello@viveksingh.tech
        </div>
      )}
      <button onClick={handleSubmit} disabled={status === "loading" || !form.name || !form.email || !form.message}
        className="flex items-center justify-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_40px_hsl(200_95%_50%/0.25)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
        {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Message</>}
      </button>
    </div>
  )
}

export function ContactCTA() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-primary/15 bg-primary/[0.03] overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-primary/[0.08] blur-[120px]" aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col justify-center p-10 lg:p-16 lg:border-r lg:border-white/[0.04]">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">{"Let's Connect"}</p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Interested in working together?
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {"Open to Agentic AI, GenAI Architecture, and LLM Systems Engineering roles. Let's build something impactful."}
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  { icon: Mail,     label: "hello@viveksingh.tech",                       href: "mailto:hello@viveksingh.tech" },
                  { icon: Linkedin, label: "linkedin.com/in/vivek-singh-633886137",        href: "https://www.linkedin.com/in/vivek-singh-633886137" },
                  { icon: Github,   label: "github.com/viveksinghfx",                     href: "https://github.com/viveksinghfx/Project" },
                ].map((link) => (
                  <a key={link.label} href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <link.icon className="h-4 w-4 shrink-0" />{link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — live contact form */}
            <div className="p-10 lg:p-16">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">Send a message</h3>
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
