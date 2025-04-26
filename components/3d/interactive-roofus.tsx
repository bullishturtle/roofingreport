"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

function RoofusModel({ position = [0, 0, 0], scale = 1, onInteract, ...props }) {
  const group = useRef()
  const { scene, animations } = useGLTF("/models/Canine_Appraiser_here_0426083524_texture.glb")
  const { actions, names } = useAnimations(animations, group)
  const [currentAnimation, setCurrentAnimation] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [bubbleText, setBubbleText] = useState("Hey there! I'm Roofus, your roofing expert!")

  // Initialize animations
  useEffect(() => {
    if (names.length > 0) {
      // Default idle animation
      const defaultAnim = names.find((name) => name.toLowerCase().includes("idle")) || names[0]
      setCurrentAnimation(defaultAnim)
      actions[defaultAnim]?.reset().fadeIn(0.5).play()
    }

    return () => {
      if (currentAnimation) {
        actions[currentAnimation]?.fadeOut(0.5)
      }
    }
  }, [actions, names])

  // Handle animation changes
  useEffect(() => {
    if (!currentAnimation) return

    Object.values(actions).forEach((action) => {
      if (action) action.fadeOut(0.5)
    })

    if (actions[currentAnimation]) {
      actions[currentAnimation].reset().fadeIn(0.5).play()
    }
  }, [currentAnimation, actions])

  // Handle interaction
  const handleClick = () => {
    // Play a talking or greeting animation if available
    const talkAnim = names.find((name) => name.toLowerCase().includes("talk") || name.toLowerCase().includes("greet"))

    if (talkAnim) {
      setCurrentAnimation(talkAnim)

      // Reset to idle after animation completes
      const animDuration = actions[talkAnim]?.getClip().duration || 2
      setTimeout(() => {
        const idleAnim = names.find((name) => name.toLowerCase().includes("idle")) || names[0]
        setCurrentAnimation(idleAnim)
      }, animDuration * 1000)
    }

    // Show speech bubble
    setShowBubble(true)
    setTimeout(() => setShowBubble(false), 5000)

    // Call parent callback
    if (onInteract) onInteract()
  }

  // Random idle animations
  useEffect(() => {
    const idleAnimations = names.filter((name) => name.toLowerCase().includes("idle"))
    if (idleAnimations.length <= 1) return

    const interval = setInterval(() => {
      if (!showBubble) {
        const randomIdle = idleAnimations[Math.floor(Math.random() * idleAnimations.length)]
        setCurrentAnimation(randomIdle)
      }
    }, 10000) // Change idle animation every 10 seconds

    return () => clearInterval(interval)
  }, [names, showBubble])

  // Random speech bubbles
  useEffect(() => {
    const speeches = [
      "Need help with your roof? I'm your expert!",
      "I can analyze any roof in seconds!",
      "Want to know about storm damage? Just ask!",
      "I know all about Florida building codes!",
      "Click on me to learn more about RoofFax!",
    ]

    const interval = setInterval(() => {
      if (Math.random() > 0.7 && !showBubble) {
        const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)]
        setBubbleText(randomSpeech)
        setShowBubble(true)
        setTimeout(() => setShowBubble(false), 5000)
      }
    }, 15000) // Random speech every ~15 seconds

    return () => clearInterval(interval)
  }, [showBubble])

  return (
    <group
      ref={group}
      {...props}
      position={position}
      scale={[scale, scale, scale]}
      onClick={handleClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <primitive object={scene} />

      {/* Speech bubble */}
      {showBubble && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-white px-4 py-2 rounded-lg border-2 border-neon-gold shadow-neon-glow text-black text-sm w-48 relative">
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
            {bubbleText}
          </div>
        </Html>
      )}

      {/* Interaction hint */}
      {isHovered && !showBubble && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-black/80 px-2 py-1 rounded-full border border-neon-gold/50 text-neon-gold text-xs">
            Click to interact
          </div>
        </Html>
      )}
    </group>
  )
}

// Floating animation for the model
function FloatingAnimation({ children }) {
  const group = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    group.current.position.y = Math.sin(t * 0.5) * 0.1
    group.current.rotation.y = Math.sin(t * 0.2) * 0.1
  })

  return <group ref={group}>{children}</group>
}

export function InteractiveRoofus({ onInteract }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="w-full h-[400px]">
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Environment preset="city" />

        <FloatingAnimation>
          <RoofusModel position={[0, -0.5, 0]} scale={1} onInteract={onInteract} />
        </FloatingAnimation>

        {/* Ground with shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
      </Canvas>

      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Button
          size="sm"
          variant="outline"
          className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10 gap-2"
          onClick={onInteract}
        >
          <MessageSquare className="h-4 w-4" />
          Chat with Roofus
        </Button>
      </div>
    </div>
  )
}
