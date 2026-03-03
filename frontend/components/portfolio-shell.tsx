"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { StarField } from "@/components/star-field"
import { Navigation } from "@/components/navigation"
import { ChatBubble } from "@/components/chat-bubble"
import { Footer } from "@/components/footer"

export function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <>
      <StarField />
      {/* Ambient radial glows */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[hsl(200_95%_40%/0.06)] blur-[150px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[hsl(220_70%_35%/0.04)] blur-[150px]" />
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[hsl(200_80%_45%/0.03)] blur-[120px]"
        />
      </div>
      <Navigation />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative pt-24"
        style={{ zIndex: 1 }}
      >
        {children}
        <Footer />
      </motion.main>
      <ChatBubble />
    </>
  )
}
