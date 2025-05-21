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

// Character model and animations from Supabase public URLs
const MODELS = {
  CHARACTER: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//character.glb"),
  IDLE: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//idle.glb"),
  WALK: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//walk.glb"),
  RUN: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//run.glb"),
  JUMP: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//jump.glb"),
  CLIMB: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//climb.glb"),
  DEATH: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//death.glb"),
  SOMERSAULT: fixUrl(
    "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//soumersault.glb",
  ),
}

// Animation states
type AnimationState = "idle" | "walk" | "run" | "jump" | "climb" | "death" | "somersault"

// Track which animations have failed to load
const failedAnimations = new Set<AnimationState>()

// Map animation states to URLs with fallback
const getAnimationUrl = (animation: AnimationState): string => {
  // If this animation has failed before, use idle as fallback
  if (failedAnimations.has(animation)) {
    console.log(`Using fallback for failed animation: ${animation}`)
    return MODELS.IDLE
  }

  switch (animation) {
    case "idle":
      return MODELS.IDLE
    case "walk":
      return MODELS.WALK
    case "run":
      return MODELS.RUN
    case "jump":
      return MODELS.JUMP
    case "climb":
      return MODELS.CLIMB
    case "death":
      return MODELS.DEATH
    case "somersault":
      return MODELS.SOMERSAULT
    default:
      return MODELS.IDLE
  }
}

// Simple animation component that doesn't rely on GLB files
function FallbackAnimation({
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
  const meshRef = useRef<THREE.Mesh>(null)

  // Simple animation based on the requested type
  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const t = clock.getElapsedTime()

    switch (animation) {
      case "idle":
        meshRef.current.position.y = Math.sin(t * 2) * 0.05
        break
      case "walk":
        meshRef.current.rotation.y = Math.sin(t * 2) * 0.2
        break
      case "run":
        meshRef.current.rotation.y = Math.sin(t * 4) * 0.3
        break
      case "jump":
        meshRef.current.position.y = Math.abs(Math.sin(t * 2)) * 0.2
        break
      case "climb":
        meshRef.current.position.y = ((t % 2) / 2) * 0.3
        break
      case "death":
        meshRef.current.rotation.z = Math.min(Math.PI / 2, t % 3)
        break
      case "somersault":
        meshRef.current.rotation.x = t * 2
        break
    }
  })

  return (
    <group position={position} rotation={rotation as any} onClick={onClick}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1 * scale, 2 * scale, 0.5 * scale]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  )
}

// Roofus character component with separate animation files
function RoofusModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.5,
  animation = "idle",
  onClick,
  onAnimationLoad,
  onAnimationError,
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animation?: AnimationState
  onClick?: () => void
  onAnimationLoad?: (animation: AnimationState) => void
  onAnimationError?: (animation: AnimationState, error: any) => void
}) {
  const group = useRef<THREE.Group>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelError, setModelError] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState<string>(animation)
  const [useFallback, setUseFallback] = useState(false)

  // Get the animation URL
  const animationUrl = getAnimationUrl(animation)

  // State to hold the model data, initialized to null
  const [modelData, setModelData] = useState<{ scene: THREE.Group | null; animations: THREE.AnimationClip[] }>({
    scene: null,
    animations: [],
  })

  // useGLTF hook can only be called at the top level
  const gltf = useGLTF(animationUrl)

  useEffect(() => {
    let isMounted = true // Add a flag to prevent setting state after unmount

    const loadModel = async () => {
      try {
        if (isMounted) {
          setModelData({ scene: gltf.scene, animations: gltf.animations })
          setModelLoaded(true)
          onAnimationLoad?.(animation)
        }
      } catch (error: any) {
        console.error(`Exception loading animation: ${animation}`, error)
        if (isMounted) {
          setModelError(true)
          failedAnimations.add(animation)
          onAnimationError?.(animation, error)
          setUseFallback(true)
        }
      }
    }

    if (!gltf) {
      setModelError(true)
      failedAnimations.add(animation)
      onAnimationError?.(animation, new Error("useGLTF failed to load model"))
      setUseFallback(true)
    } else {
      loadModel()
    }

    return () => {
      isMounted = false // Set the flag to false when the component unmounts
    }
  }, [animation, gltf, onAnimationLoad, onAnimationError])

  const { scene, animations } = modelData

  // Set up animations
  const { actions, names } = useAnimations(animations, group)

  // Handle animation changes
  useEffect(() => {
    if (!modelLoaded || modelError || !actions || !names || names.length === 0) return

    console.log(`Available animations for ${animation}:`, names)

    // Play the first animation
    const animationName = names[0]
    if (actions[animationName]) {
      console.log(`Playing animation: ${animationName}`)
      actions[animationName].reset().fadeIn(0.5).play()
      setCurrentAnimation(animationName)
    } else {
      console.warn(`Animation ${animationName} not found in model`)
    }
  }, [animation, actions, names, modelLoaded, modelError])

  // If we're using the fallback, render the simple animation
  if (useFallback) {
    return (
      <FallbackAnimation
        position={position}
        rotation={rotation}
        scale={scale}
        animation={animation}
        onClick={onClick}
      />
    )
  }

  // Render fallback if model fails to load
  if (modelError) {
    return (
      <FallbackAnimation
        position={position}
        rotation={rotation}
        scale={scale}
        animation={animation}
        onClick={onClick}
      />
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
  rotation = [0, 0, 0],
  scale = 0.5,
  animation = "idle",
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
  onAnimationLoad?: (animation: AnimationState) => void
  onAnimationError?: (animation: AnimationState, error: any) => void
}) {
  const [mounted, setMounted] = useState(false)
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [speechText, setSpeechText] = useState("Hi, I'm Roofus! Need help with your roof?")
  const [hasError, setHasError] = useState(false)

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true)

    // Global error handler
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("roofus") || event.message.includes("animation") || event.message.includes("GLB")) {
        console.error("Global error in Roofus3DSupabase:", event.error)
        setHasError(true)
      }
    }

    window.addEventListener("error", handleError)
    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  // Handle click on Roofus
  const handleClick = () => {
    setShowSpeechBubble(!showSpeechBubble)
    onClick?.()
  }

  // Handle animation errors
  const handleAnimationError = (anim: AnimationState, error: any) => {
    console.error(`Animation error in Roofus3DSupabase: ${anim}`, error)
    onAnimationError?.(anim, error)
  }

  if (!mounted) return null

  // If there's a global error, render a simple fallback
  if (hasError) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-black/50 backdrop-blur-sm p-3 rounded-lg text-white text-sm">
            Unable to load 3D model. Please try again later.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <RoofusModel
                position={position}
                rotation={rotation}
                scale={scale}
                animation={animation}
                onClick={handleClick}
                onAnimationLoad={onAnimationLoad}
                onAnimationError={handleAnimationError}
              />

              {showEnvironment && (
                <>
                  <Environment preset="sunset" />
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
                </>
              )}
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

// Preload only the idle animation which is most reliable
try {
  useGLTF.preload(MODELS.IDLE)
} catch (error) {
  console.error("Error preloading idle model:", error)
}
