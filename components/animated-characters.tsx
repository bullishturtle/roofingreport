"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRoofus } from "@/contexts/roofus-context"

interface AnimatedCharactersProps {
  variant?: "roof" | "portrait" | "clipboard" | "promo"
  size?: "sm" | "md" | "lg"
  animate?: boolean
  onClick?: () => void
}

export function AnimatedCharacters({
  variant = "portrait",
  size = "md",
  animate = true,
  onClick,
}: AnimatedCharactersProps) {
  const [isHovered, setIsHovered] = useState(false)
  const characterRef = useRef<HTMLDivElement>(null)
  const { currentAction, triggerRoofusAction } = useRoofus()

  // Size mapping
  const sizeMap = {
    sm: { width: 100, height: 100 },
    md: { width: 150, height: 150 },
    lg: { width: 250, height: 250 },
  }

  // Get the correct image path based on variant
  const getImagePath = () => {
    return `/images/roofus-${variant}.png`
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Default behavior: trigger a random Roofus action
      const actions = ["excited", "point", "measure", "document", "chat"]
      const randomAction = actions[Math.floor(Math.random() * actions.length)] as any
      triggerRoofusAction(randomAction)
    }
  }

  return (
    <div
      ref={characterRef}
      className={`animated-character ${animate ? "float-animation" : ""} cursor-pointer transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
    >
      <Image
        src={getImagePath() || "/placeholder.svg"}
        alt="Roofus Character"
        width={sizeMap[size].width}
        height={sizeMap[size].height}
        className="object-contain"
        priority
      />
    </div>
  )
}
