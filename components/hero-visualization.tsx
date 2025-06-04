"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function HeroVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Animation variables
    let animationFrameId: number
    let hue = 20 // Orange-ish starting hue

    // Draw the roof visualization
    const drawRoof = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1

      const gridSize = 30
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw a simple house with roof
      const centerX = canvas.width / 2
      const houseWidth = Math.min(300, canvas.width * 0.8)
      const houseHeight = 120
      const roofHeight = 80

      // House base
      ctx.fillStyle = "rgba(50, 50, 60, 0.8)"
      ctx.fillRect(centerX - houseWidth / 2, canvas.height - houseHeight, houseWidth, houseHeight)

      // Roof
      ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.7)`
      ctx.beginPath()
      ctx.moveTo(centerX - houseWidth / 2, canvas.height - houseHeight)
      ctx.lineTo(centerX, canvas.height - houseHeight - roofHeight)
      ctx.lineTo(centerX + houseWidth / 2, canvas.height - houseHeight)
      ctx.closePath()
      ctx.fill()

      // Scanning effect
      const scanLineY = (Date.now() / 20) % (houseHeight + roofHeight)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX - houseWidth / 2, canvas.height - houseHeight + scanLineY)
      ctx.lineTo(centerX + houseWidth / 2, canvas.height - houseHeight + scanLineY)
      ctx.stroke()

      // Data points
      const dataPoints = 5
      for (let i = 0; i < dataPoints; i++) {
        const x = centerX - houseWidth / 2 + (houseWidth / (dataPoints - 1)) * i
        const y = canvas.height - houseHeight - Math.random() * 20

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()

        // Pulse effect
        const pulseSize = 5 + Math.sin(Date.now() / 500 + i) * 3
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.beginPath()
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Slowly change hue
      hue = (hue + 0.1) % 360

      animationFrameId = requestAnimationFrame(drawRoof)
    }

    drawRoof()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-0 opacity-30"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
