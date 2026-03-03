"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

const links = [
  { href: "/", label: "Home" },
  { href: "/demos", label: "AI Demos" },
  { href: "/projects", label: "Projects" },
  { href: "/architecture", label: "Architecture" },
  { href: "/resume", label: "Resume" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "flex items-center justify-between rounded-2xl border px-5 py-2.5 transition-all duration-500",
            scrolled
              ? "border-white/10 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/20"
              : "border-white/[0.04] bg-white/[0.02] backdrop-blur-md"
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          <Link href="/" className="flex items-center gap-2 text-foreground group">
            <div className="relative flex h-7 w-7 items-center justify-center">
              <div className="absolute inset-0 rounded-md bg-primary/15 blur-sm group-hover:bg-primary/25 transition-colors" />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="relative">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="hsl(200 95% 50%)" />
                <path d="M2 17l10 5 10-5" stroke="hsl(200 95% 50%)" strokeWidth="2" fill="none" />
                <path d="M2 12l10 5 10-5" stroke="hsl(200 95% 50%)" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="font-[family-name:var(--font-roster)] text-sm font-bold tracking-widest uppercase">VIVEKSINGH.TECH</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="hidden md:block">
            <a
              href="https://github.com/viveksinghfx/Project"
              target="_blank"
              rel="noopener noreferrer"
              className="group/gh flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-1.5 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/[0.04]"
            >
              <Github className="h-4 w-4 transition-transform group-hover/gh:rotate-[360deg] duration-500" />
              GitHub
            </a>
          </div>

          <button
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl p-3"
            >
              <div className="flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-foreground bg-white/[0.08]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://github.com/viveksinghfx/Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-1 px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-white/5 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
