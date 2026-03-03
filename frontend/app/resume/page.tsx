"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Download, Award } from "lucide-react"
import { PortfolioShell } from "@/components/portfolio-shell"

/* ──────────────────── Data ──────────────────── */

const experience = [
  {
    role: "Technical FX Artist | Python Scripting",
    company: "Harikatha Studio",
    period: "November 2023 - January 2026",
    bullets: [
      "Specialized in Python-driven workflow automation and procedural system development for FX production",
      "Designed Python-based automation tools to streamline FX production pipelines and asset management",
      "Integrated procedural systems into Unreal Engine using Blueprint workflows and Houdini VEX",
      "Improved production efficiency by reducing manual setup time through scripting and tool development",
    ],
  },
  {
    role: "FX Artist",
    company: "Technicolor Animation Productions",
    period: "July 2023 - June 2024",
    bullets: [
      "Worked on visual effects and animation production",
      "Contributed to animation and FX pipeline development",
    ],
  },
]

const education = [
  {
    degree: "Master of Computer Applications",
    school: "Maharaja Agrasen Himalayan Garhwal University",
    period: "September 2021 - September 2023",
  },
  {
    degree: "Bachelor of Computer Applications",
    school: "Maharaja Agrasen Himalayan Garhwal University",
    period: "September 2018 - September 2021",
  },
  {
    degree: "Diploma - Animation, Interactive Technology, Video Graphics and Special Effects",
    school: "MAAC",
    period: "September 2019 - August 2022",
  },
]

const skillCategories = [
  {
    label: "Core Skills",
    skills: ["Cloud Computing", "Data Structures", "Database Management System (DBMS)", "Generative AI & ML", "LLMs", "Agentic Systems", "Deep Learning"],
  },
  {
    label: "Languages & Frameworks",
    skills: ["Python", "PostgreSQL", "APIs", "Houdini", "VEX", "Unreal Engine", "Blueprint"],
  },
  {
    label: "Domains",
    skills: ["Cloud & MLOps", "FX & Animation", "Procedural Systems", "Workflow Automation"],
  },
]

const certifications = [
  "Python Data Associate Certificate - DataCamp",
  "AI Engineer for Developers Associate Certificate - DataCamp",
]

/* ──────────────────── Timeline Item ──────────────────── */

function TimelineItem({
  role,
  company,
  period,
  bullets,
  index,
}: {
  role: string
  company: string
  period: string
  bullets: string[]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08]">
          <Briefcase className="h-4 w-4 text-primary" />
        </div>
        <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent" />
      </div>
      <div className="pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-base font-semibold text-foreground">{role}</h3>
          <span className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-xs text-muted-foreground">
            {period}
          </span>
        </div>
        <p className="mt-1 text-sm text-primary/70">{company}</p>
        <ul className="mt-3 space-y-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
              <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/40" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/* ──────────────────── Page ──────────────────── */

function DownloadPDFButton() {
  const handleDownloadPDF = () => {
    const resumeContent = `
VIVEK SINGH
ace.vivek2@gmail.com | LinkedIn: vivek-singh-633886137

PROFESSIONAL SUMMARY
Technical FX Artist and Generative AI Engineer with expertise in Python-driven workflow automation, procedural system development, and advanced animation production pipelines. Proven track record of streamlining FX production through custom tool development and system integration.

EXPERIENCE

Technical FX Artist | Python Scripting
Harikatha Studio | November 2023 - January 2026
• Specialized in Python-driven workflow automation and procedural system development for FX production
• Designed Python-based automation tools to streamline FX production pipelines and asset management
• Integrated procedural systems into Unreal Engine using Blueprint workflows and Houdini VEX
• Improved production efficiency by reducing manual setup time through scripting and tool development

FX Artist
Technicolor Animation Productions | July 2023 - June 2024
• Worked on visual effects and animation production
• Contributed to animation and FX pipeline development

EDUCATION

Master of Computer Applications
Maharaja Agrasen Himalayan Garhwal University | September 2021 - September 2023

Bachelor of Computer Applications
Maharaja Agrasen Himalayan Garhwal University | September 2018 - September 2021

Diploma - Animation, Interactive Technology, Video Graphics and Special Effects
MAAC | September 2019 - August 2022

CORE SKILLS
Cloud Computing, Data Structures, Database Management System (DBMS), Generative AI & ML, LLMs, Agentic Systems, Deep Learning

LANGUAGES & FRAMEWORKS
Python, PostgreSQL, APIs, Houdini, VEX, Unreal Engine, Blueprint

DOMAINS
Cloud & MLOps, FX & Animation, Procedural Systems, Workflow Automation

CERTIFICATIONS
• Python Data Associate Certificate - DataCamp
• AI Engineer for Developers Associate Certificate - DataCamp
    `.trim()

    const element = document.createElement("a")
    const file = new Blob([resumeContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "Vivek-Singh-Resume.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <motion.button
      onClick={handleDownloadPDF}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="group inline-flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/20 hover:scale-[1.02] active:scale-[0.98]"
    >
      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
      Download Resume
    </motion.button>
  )
}

export default function ResumePage() {
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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Background</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Resume
            </h1>
            <p className="mt-3 text-muted-foreground">
              Experience, education, and technical skills
            </p>
          </motion.div>

          {/* Links section */}
          <div className="mb-12 flex flex-wrap gap-4">
            <motion.a
              href="https://www.linkedin.com/in/vivek-singh-633886137"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(200_95%_50%/0.25)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
              LinkedIn Profile
            </motion.a>
            <motion.a
              href="mailto:ace.vivek2@gmail.com"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email
            </motion.a>
            <DownloadPDFButton />
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <h3 className="mb-8 font-display text-xl font-bold text-foreground flex items-center gap-2.5">
                <Briefcase className="h-5 w-5 text-primary" />
                Experience
              </h3>
              <div className="flex flex-col">
                {experience.map((exp, i) => (
                  <TimelineItem key={exp.role} {...exp} index={i} />
                ))}
              </div>

              <h3 className="mb-6 mt-4 font-display text-xl font-bold text-foreground flex items-center gap-2.5">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h3>
              <div className="flex flex-col gap-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08]">
                        <GraduationCap className="h-4 w-4 text-primary" />
                      </div>
                      {i < education.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent" />
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-display text-base font-semibold text-foreground">{edu.degree}</h4>
                        <span className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-xs text-muted-foreground">
                          {edu.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-primary/70">{edu.school}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills sidebar */}
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2.5">
                <Award className="h-5 w-5 text-primary" />
                Skills
              </h3>

              {skillCategories.map((cat, ci) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: ci * 0.08 }}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    {cat.label}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-primary/20 hover:bg-primary/[0.04]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
              >
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                  Certifications
                </h4>
                <ul className="space-y-2.5">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Award className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PortfolioShell>
  )
}
