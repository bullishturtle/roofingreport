"use client"

import { useEffect, useState } from "react"

export default function AnimatedFox() {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left

  useEffect(() => {
    // This is a placeholder for the animated fox
    // In a real implementation, this would use a sprite sheet or 3D model

    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        // Random movement
        const newX = prev.x + (Math.random() * 5 - 2) * direction

        // Change direction if near edge
        if (newX < 10 || newX > 90) {
          setDirection((d) => -d)
        }

        return {
          x: Math.max(5, Math.min(95, newX)),
          y: Math.max(70, Math.min(90, prev.y + (Math.random() * 2 - 1))),
        }
      })
    }, 100)

    return () => clearInterval(moveInterval)
  }, [direction])

  return (
    <div
      className="absolute pointer-events-none z-10"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translateX(-50%) scaleX(${direction})`,
        transition: "left 0.5s ease-in-out, top 0.5s ease-in-out",
      }}
    >
      {/* This is a placeholder for Rufus the fox */}
      <div className="w-12 h-12 bg-yellow-500 rounded-full relative">
        <div className="absolute top-1 left-2 w-2 h-2 bg-black rounded-full"></div>
        <div className="absolute top-1 right-2 w-2 h-2 bg-black rounded-full"></div>
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black rounded-full"></div>
        <div className="absolute -top-4 left-1 w-3 h-5 bg-yellow-500 rounded-full transform rotate-[-30deg]"></div>
        <div className="absolute -top-4 right-1 w-3 h-5 bg-yellow-500 rounded-full transform rotate-[30deg]"></div>
      </div>
    </div>
  )
}
