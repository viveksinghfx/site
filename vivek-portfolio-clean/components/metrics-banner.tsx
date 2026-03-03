"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const metrics = [
  { value: 10,   suffix: "M+", label: "Documents Indexed",  sublabel: "RAG Knowledge Base" },
  { value: 99.2, suffix: "%",  label: "Retrieval Accuracy", sublabel: "Production avg." },
  { value: 1000, suffix: "+",  label: "Daily AI Screenings",sublabel: "Resume Agent" },
  { value: 3,    suffix: "",   label: "Production Systems", sublabel: "Live & deployed" },
]

function AnimatedNumber({ target, suffix, isFloat }: { target: number; suffix: string; isFloat: boolean }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, target)
      setCount(current)
      if (current >= target) clearInterval(timer)
    }, 1800 / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {isFloat ? count.toFixed(1) : Math.floor(count).toLocaleString()}{suffix}
    </span>
  )
}

export function MetricsBanner() {
  return (
    <section className="py-12 border-y border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative text-center">
              <div className="text-3xl font-bold font-display text-foreground sm:text-4xl tabular-nums">
                <AnimatedNumber target={m.value} suffix={m.suffix} isFloat={!Number.isInteger(m.value)} />
              </div>
              <div className="mt-1 text-sm font-medium text-foreground/80">{m.label}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{m.sublabel}</div>
              {i < metrics.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-white/[0.06]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
