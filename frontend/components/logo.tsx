"use client"

import { motion } from "framer-motion"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  animate?: boolean
}

export function Logo({ size = "sm", animate = true }: LogoProps) {
  const sizeMap = {
    sm: { icon: 28, text: "text-sm", gap: "gap-2.5" },
    md: { icon: 34, text: "text-base", gap: "gap-3" },
    lg: { icon: 42, text: "text-xl", gap: "gap-3.5" },
  }

  const s = sizeMap[size]

  const Wrapper = animate ? motion.div : "div"
  const wrapperProps = animate
    ? { whileHover: { scale: 1.02 }, transition: { type: "spring", stiffness: 400, damping: 25 } }
    : {}

  return (
    <Wrapper
      className={`flex items-center ${s.gap} group select-none`}
      {...wrapperProps}
    >
      {/* Icon mark - abstract neural network / code brackets */}
      <div className="relative" style={{ width: s.icon, height: s.icon }}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-lg bg-[hsl(200_95%_50%/0.12)] blur-md group-hover:bg-[hsl(200_95%_50%/0.22)] transition-all duration-500" />

        {/* Icon container */}
        <div className="relative flex items-center justify-center w-full h-full rounded-lg border border-[hsl(200_95%_50%/0.25)] bg-[hsl(200_95%_50%/0.06)] group-hover:border-[hsl(200_95%_50%/0.4)] transition-all duration-300">
          <svg
            width={s.icon * 0.55}
            height={s.icon * 0.55}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="relative"
          >
            {/* Left bracket */}
            <path
              d="M6 3L2 10L6 17"
              stroke="hsl(200 95% 50%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:drop-shadow-[0_0_4px_hsl(200_95%_50%/0.6)] transition-all"
            />
            {/* Right bracket */}
            <path
              d="M14 3L18 10L14 17"
              stroke="hsl(200 95% 50%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:drop-shadow-[0_0_4px_hsl(200_95%_50%/0.6)] transition-all"
            />
            {/* Center slash */}
            <path
              d="M12 3L8 17"
              stroke="hsl(200 95% 65%)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </svg>
        </div>
      </div>

      {/* Text mark */}
      <div className={`flex items-baseline ${s.text} font-bold tracking-widest`}>
        <span className="font-[family-name:var(--font-roster)] text-foreground uppercase" style={{ letterSpacing: "0.04em" }}>
          VIVEK
        </span>
        <span className="font-[family-name:var(--font-roster)] text-foreground uppercase" style={{ letterSpacing: "0.04em" }}>
          SINGH
        </span>
        <span
          className="font-[family-name:var(--font-roster)] font-semibold text-[hsl(200_95%_50%)] ml-[1px] uppercase"
          style={{ letterSpacing: "0.02em" }}
        >
          .TECH
        </span>
      </div>
    </Wrapper>
  )
}
