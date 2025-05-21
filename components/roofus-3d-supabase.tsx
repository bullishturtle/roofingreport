"use client"

import type React from "react"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment, Html } from "@react-three/drei"
import type * as THREE from "three"

// Fix URL formatting function
const fixUrl = (url: string) => {
  // Ensure protocol has double slashes
  let fixedUrl = url.replace("https:/", "https://")
  // Fix double slashes in the path (but not in the protocol)
  fixedUrl = fixedUrl.replace("//roofus-models//", "/roofus-models/")
  return fixedUrl
}

// We'll use only the idle animation for now to simplify
const IDLE_URL = fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//idle.glb")

// Animation states
type AnimationState = "idle" | "walk" | "run" | "jump" | "climb" | "death" | "somersault"

// Simplified Roofus model component that only uses the idle animation
function RoofusModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.5,
  onClick,
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  onClick?: () => void
}) {
  const group = useRef<THREE.Group>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelError, setModelError] = useState(false)

  // Load the model with error handling
  const { scene, animations } = useGLTF(
    IDLE_URL,
    undefined,
    () => {
      console.log("Roofus model loaded successfully")
      setModelLoaded(true)
    },
    (error) => {
      console.error("Error loading Roofus model:", error)
      setModelError(true)
    },
  ) as any

  // Set up animations if available
  const { actions, names } = useAnimations(animations, group)

  // Play animation if available
  useEffect(() => {
    if (!modelLoaded || modelError || !actions || !names || names.length === 0) return

    console.log("Available animations:", names)

    // Play the first animation
    const animationName = names[0]
    if (actions[animationName]) {
      console.log(`Playing animation: ${animationName}`)
      actions[animationName].reset().fadeIn(0.5).play()
    }
  }, [modelLoaded, modelError, actions, names])

  // Simple animation for fallback cube
  useFrame(({ clock }) => {
    if (group.current) {
      // Gentle bobbing motion for both the model and fallback
      group.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.05

      // Additional rotation for the fallback cube
      if (modelError) {
        group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3
      }
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
      {scene && <primitive object={scene.clone()} scale={[scale, scale, scale]} />}
    </group>
  )
}

// Error boundary for 3D rendering
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = () => {
      setHasError(true)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (hasError) {
    return (
      <Html center>
        <div className="bg-black/50 backdrop-blur-sm p-3 rounded-lg text-white text-sm">
          3D rendering error. Please try again.
        </div>
      </Html>
    )
  }

  return <>{children}</>
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
  rotation = [0, Math.PI, 0], // Rotate 180 degrees to face forward
  scale = 0.5,
  animation = "idle", // This is ignored for now since we're only using the idle animation
  showEnvironment = true,
  className = "",
  onClick,
  onAnimationLoad,
  onAnimationError,
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animation?: AnimationState
  showEnvironment?: boolean
  className?: string
  onClick?: () => void
  onAnimationLoad?: (animation: string) => void
  onAnimationError?: (animation: string, error: any) => void
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
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <RoofusModel position={position} rotation={rotation} scale={scale} onClick={handleClick} />

              {/* Improved lighting setup */}
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
              <directionalLight position={[-5, 5, -5]} intensity={0.5} />
              <directionalLight position={[0, 5, -10]} intensity={0.7} />

              {showEnvironment && <Environment preset="sunset" />}
            </Suspense>
          </ErrorBoundary>
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

// Preload the idle model
try {
  useGLTF.preload(IDLE_URL)
} catch (error) {
  console.error("Error preloading model:", error)
}
