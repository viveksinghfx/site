"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  speed: number
  phase: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  life: number
  maxLife: number
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const stars: Star[] = []
    const shootingStars: ShootingStar[] = []
    let lastShootingStarTime = 0

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createStars() {
      stars.length = 0
      const count = Math.floor((window.innerWidth * window.innerHeight) / 5000)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.5 + 0.2,
          baseOpacity: Math.random() * 0.5 + 0.05,
          speed: Math.random() * 0.4 + 0.1,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    function spawnShootingStar() {
      const side = Math.random()
      let x: number, y: number, angle: number
      if (side < 0.5) {
        x = Math.random() * window.innerWidth
        y = -10
        angle = Math.PI / 4 + Math.random() * 0.4 - 0.2
      } else {
        x = window.innerWidth + 10
        y = Math.random() * window.innerHeight * 0.5
        angle = Math.PI * 0.75 + Math.random() * 0.3 - 0.15
      }
      shootingStars.push({
        x, y,
        length: 60 + Math.random() * 80,
        speed: 8 + Math.random() * 6,
        angle,
        opacity: 1,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      })
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const now = Date.now()
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const star of stars) {
        const twinkle = Math.sin(now * star.speed * 0.002 + star.phase) * 0.25
        const opacity = Math.max(0.02, Math.min(0.8, star.baseOpacity + twinkle))

        const parallaxFactor = star.size * 0.006
        const dx = (mx - canvas.width / 2) * parallaxFactor
        const dy = (my - canvas.height / 2) * parallaxFactor
        const drawX = star.x - dx
        const drawY = star.y - dy

        ctx.beginPath()
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(160, 210, 240, ${opacity})`
        ctx.fill()

        if (star.size > 1.2) {
          ctx.beginPath()
          ctx.arc(drawX, drawY, star.size * 2.5, 0, Math.PI * 2)
          const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, star.size * 2.5)
          grad.addColorStop(0, `rgba(120, 190, 240, ${opacity * 0.12})`)
          grad.addColorStop(1, "rgba(120, 190, 240, 0)")
          ctx.fillStyle = grad
          ctx.fill()
        }
      }

      if (now - lastShootingStarTime > 4000 + Math.random() * 6000) {
        spawnShootingStar()
        lastShootingStarTime = now
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.life++
        s.opacity = Math.max(0, 1 - s.life / s.maxLife)

        if (s.life > s.maxLife) {
          shootingStars.splice(i, 1)
          continue
        }

        const tailX = s.x - Math.cos(s.angle) * s.length
        const tailY = s.y - Math.sin(s.angle) * s.length

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        gradient.addColorStop(0, `rgba(160, 210, 240, 0)`)
        gradient.addColorStop(0.7, `rgba(160, 210, 240, ${s.opacity * 0.25})`)
        gradient.addColorStop(1, `rgba(200, 230, 255, ${s.opacity * 0.7})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * 0.85})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    createStars()
    animate()

    window.addEventListener("resize", () => {
      resize()
      createStars()
    })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
