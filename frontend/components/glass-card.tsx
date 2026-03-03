"use client"

import { useRef, type MouseEvent as ReactMouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const springX = useSpring(glowX, { stiffness: 300, damping: 30 })
  const springY = useSpring(glowY, { stiffness: 300, damping: 30 })

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (!ref.current || !hover) return
    const rect = ref.current.getBoundingClientRect()
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden",
        "transition-all duration-300",
        hover && "hover:border-white/15 hover:bg-white/[0.04]",
        className
      )}
    >
      {hover && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(300px circle at ${springX}px ${springY}px, hsl(200 95% 50% / 0.04), transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
