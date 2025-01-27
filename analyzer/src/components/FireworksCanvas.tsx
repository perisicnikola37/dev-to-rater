import React, { useEffect, useRef, useState } from 'react'

const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [active, setActive] = useState(true)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canv = canvasRef.current
    if (!canv) return

    const ctx = canv.getContext('2d')
    if (!ctx) return

    // Initialize canvas size
    let maxx = window.innerWidth
    let maxy = window.innerHeight
    canv.width = maxx
    canv.height = maxy

    // Handle window resizing
    const handleResize = () => {
      maxx = window.innerWidth
      maxy = window.innerHeight
      canv.width = maxx
      canv.height = maxy
    }

    window.addEventListener('resize', handleResize)

    // Utility functions for randomness
    const rand = (min: number, max: number) => Math.random() * (max - min) + min
    const randInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min) + min)
    const randColor = () => `hsl(${randInt(0, 360)}, 100%, 50%)`

    // Particle class representing individual explosion particles
    class Particle {
      x: number
      y: number
      color: string
      speed: number
      direction: number
      vx: number
      vy: number
      gravity: number
      friction: number
      alpha: number
      decay: number
      size: number

      constructor(
        x: number,
        y: number,
        color: string,
        speed: number,
        direction: number,
        gravity: number,
        friction: number,
        size: number,
      ) {
        this.x = x
        this.y = y
        this.color = color
        this.speed = speed
        this.direction = direction
        this.vx = Math.cos(direction) * speed
        this.vy = Math.sin(direction) * speed
        this.gravity = gravity
        this.friction = friction
        this.alpha = 1
        this.decay = rand(0.005, 0.02) // Randomized decay for smoother fading
        this.size = size
      }

      // Update particle properties
      update() {
        this.vx *= this.friction
        this.vy *= this.friction
        this.vy += this.gravity
        this.x += this.vx
        this.y += this.vy
        this.alpha -= this.decay
      }

      // Draw the particle on the canvas
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
      }

      // Check if the particle is still visible
      isAlive() {
        return this.alpha > 0
      }
    }

    // Firework class representing ascending fireworks
    class Firework {
      x: number
      y: number
      targetY: number
      color: string
      speed: number
      size: number
      angle: number
      vx: number
      vy: number
      trail: { x: number; y: number }[]
      trailLength: number
      exploded: boolean

      constructor(
        x: number,
        y: number,
        targetY: number,
        color: string,
        speed: number,
        size: number,
      ) {
        this.x = x
        this.y = y
        this.targetY = targetY
        this.color = color
        this.speed = speed
        this.size = size
        this.angle = -Math.PI / 2 + rand(-0.3, 0.3) // Increased variation in ascent angle
        this.vx = Math.cos(this.angle) * this.speed
        this.vy = Math.sin(this.angle) * this.speed
        this.trail = []
        this.trailLength = randInt(10, 25) // Increased trail length for smoother ascent
        this.exploded = false
      }

      // Update firework position
      update() {
        this.trail.push({ x: this.x, y: this.y })
        if (this.trail.length > this.trailLength) {
          this.trail.shift()
        }

        this.x += this.vx
        this.y += this.vy

        // Apply gravity (slightly slowing ascent)
        this.vy += 0.02

        // Check if the firework has reached its target height or its vertical speed has reduced
        if (this.vy >= 0 || this.y <= this.targetY) {
          this.explode()
          return false // Firework has exploded
        }
        return true // Firework is still ascending
      }

      // Create explosion particles
      explode() {
        const numParticles = randInt(50, 150) // Increased range for more variability
        for (let i = 0; i < numParticles; i++) {
          const angle = rand(0, Math.PI * 2)
          const speed = rand(2, 7) // Wider speed range for dynamic splatter
          const particleSize = rand(1, 5) // Wider size range for varied splatter
          explosions.push(
            new Particle(
              this.x,
              this.y,
              this.color,
              speed,
              angle,
              0.05, // gravity
              0.98, // friction
              particleSize,
            ),
          )
        }
      }

      // Draw the firework trail
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.beginPath()
        if (this.trail.length > 1) {
          ctx.moveTo(this.trail[0].x, this.trail[0].y)
          for (const point of this.trail) {
            ctx.lineTo(point.x, point.y)
          }
        } else {
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(this.x, this.y)
        }
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.size
        ctx.lineCap = 'round'
        ctx.stroke()
        ctx.restore()
      }
    }

    const fireworks: Firework[] = [] // Active fireworks
    const explosions: Particle[] = [] // Active explosion particles

    // Launch a new firework at random intervals
    const launchFirework = () => {
      const x = rand(maxx * 0.1, maxx * 0.9) // Vary horizontal launch position
      const y = maxy // Start from the bottom of the screen
      const targetY = rand(maxy * 0.1, maxy * 0.4) // Vary target height
      const color = randColor() // Vibrant random colors
      const speed = rand(10, 18) // Vary ascent speeds
      const size = rand(2, 5) // Vary firework sizes
      fireworks.push(new Firework(x, y, targetY, color, speed, size))

      // Schedule next firework launch
      const timeout = rand(300, 800) // milliseconds
      setTimeout(launchFirework, timeout)
    }

    // Start the first firework launch
    if (active) {
      launchFirework()
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, maxx, maxy)

      // Update and draw fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i]
        if (!firework.update()) {
          fireworks.splice(i, 1) // Remove exploded firework
        } else {
          firework.draw(ctx)
        }
      }

      // Update and draw explosion particles
      for (let i = explosions.length - 1; i >= 0; i--) {
        const particle = explosions[i]
        particle.update()
        if (particle.isAlive()) {
          particle.draw(ctx)
        } else {
          explosions.splice(i, 1) // Remove faded particle
        }
      }

      // If active is true, continue animation
      if (active) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animate()

    // Stop fireworks after 3.5 seconds
    setTimeout(() => {
      setActive(false)
      // Cancel the animation loop
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }, 3500)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        zIndex: '-10',
      }}
    />
  )
}

export default FireworksCanvas
