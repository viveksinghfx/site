"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/demos", label: "AI Demos" },
  { href: "/projects", label: "Projects" },
  { href: "/architecture", label: "Architecture" },
  { href: "/resume", label: "Resume" },
]

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <div className="relative flex h-7 w-7 items-center justify-center">
                <div className="absolute inset-0 rounded-md bg-primary/15 blur-sm" />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="relative">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="hsl(200 95% 50%)" />
                  <path d="M2 17l10 5 10-5" stroke="hsl(200 95% 50%)" strokeWidth="2" fill="none" />
                  <path d="M2 12l10 5 10-5" stroke="hsl(200 95% 50%)" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-roster)] text-sm font-bold tracking-widest text-foreground uppercase">VIVEKSINGH.TECH</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Building autonomous AI systems that solve real-world problems at scale.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-2.5">
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
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-primary/[0.04] transition-all"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/[0.04] pt-6">
          <p className="text-xs text-muted-foreground">
            {"Designed & built by Vivek Singh. Powered by Next.js & Vercel."}
          </p>
        </div>
      </div>
    </footer>
  )
}
