"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment, Html } from "@react-three/drei"
import type * as THREE from "three"

// Character model from Supabase public URL
const CHARACTER_MODEL_URL =
  "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models/character.glb"

// Animation states
type AnimationState = "idle" | "walk" | "run" | "jump" | "climb" | "death" | "somersault"

// Roofus character component
function RoofusModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.5,
  animation = "idle",
  onClick,
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animation?: AnimationState
  onClick?: () => void
}) {
  const group = useRef<THREE.Group>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelError, setModelError] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState<string>(animation)

  // Load the model with error handling
  const { scene, animations } = useGLTF(
    CHARACTER_MODEL_URL,
    undefined,
    () => {
      console.log("Model loaded successfully")
      setModelLoaded(true)
    },
    (error) => {
      console.error("Error loading Roofus model:", error)
      setModelError(true)
    },
  ) as any

  // Set up animations
  const { actions, names } = useAnimations(animations, group)

  // Handle animation changes
  useEffect(() => {
    if (!modelLoaded || modelError || !actions || !names || names.length === 0) return

    console.log("Available animations:", names)

    // Stop all animations
    Object.values(actions).forEach((action: any) => action?.stop())

    // Map animation state to animation name in the model
    const animationMap: Record<AnimationState, string[]> = {
      idle: ["idle", "Idle", "IDLE"],
      walk: ["walk", "Walk", "WALK"],
      run: ["run", "Run", "RUN"],
      jump: ["jump", "Jump", "JUMP"],
      climb: ["climb", "Climb", "CLIMB"],
      death: ["death", "Death", "DEATH"],
      somersault: ["somersault", "Somersault", "SOMERSAULT"],
    }

    // Get possible animation names
    const possibleNames = animationMap[animation] || ["idle", "Idle", "IDLE"]

    // Find the closest matching animation in the model
    let animationName = names[0] // Default to first animation
    for (const name of possibleNames) {
      const match = names.find((n) => n.toLowerCase().includes(name.toLowerCase()))
      if (match) {
        animationName = match
        break
      }
    }

    // Play the animation
    if (actions[animationName]) {
      console.log(`Playing animation: ${animationName}`)
      actions[animationName].reset().fadeIn(0.5).play()
      setCurrentAnimation(animationName)
    } else {
      console.warn(`Animation ${animationName} not found in model`)
    }
  }, [animation, actions, names, modelLoaded, modelError])

  // Simple animation for fallback cube
  useFrame(({ clock }) => {
    if (modelError && group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.3
    }
  })

  // Render fallback if model fails to load
  if (modelError) {
    return (
      <group ref={group} position={position} rotation={rotation as any} onClick={onClick}>
        <mesh>
          <boxGeometry args={[1, 2, 1]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
      </group>
    )
  }

  return (
    <group ref={group} position={position} rotation={rotation as any} onClick={onClick}>
      {modelLoaded && <primitive object={scene.clone()} scale={[scale, scale, scale]} />}
    </group>
  )
}

// Loading component
function LoadingFallback() {
  return (
    <Html center>
      <div className="bg-black/50 backdrop-blur-sm p-3 rounded-lg text-white text-sm">Loading Roofus...</div>
    </Html>
  )
}

// Main component
export function Roofus3DSupabase({
  position = [0, -1, 0],
  rotation = [0, 0, 0],
  scale = 0.5,
  animation = "idle",
  showEnvironment = true,
  className = "",
  onClick,
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animation?: AnimationState
  showEnvironment?: boolean
  className?: string
  onClick?: () => void
}) {
  const [mounted, setMounted] = useState(false)
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [speechText, setSpeechText] = useState("Hi, I'm Roofus! Need help with your roof?")

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true)
    return () => {
      // Clean up any resources
    }
  }, [])

  // Handle click on Roofus
  const handleClick = () => {
    setShowSpeechBubble(!showSpeechBubble)
    onClick?.()
  }

  if (!mounted) return null

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={<LoadingFallback />}>
            <RoofusModel
              position={position}
              rotation={rotation}
              scale={scale}
              animation={animation}
              onClick={handleClick}
            />

            {showEnvironment && (
              <>
                <Environment preset="sunset" />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
              </>
            )}
          </Suspense>
        </Canvas>
      </div>

      {showSpeechBubble && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-white p-3 rounded-lg shadow-lg text-black text-sm w-48 z-10">
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
          <p className="font-medium">{speechText}</p>
        </div>
      )}
    </div>
  )
}

// Preload the model
useGLTF.preload(CHARACTER_MODEL_URL)
