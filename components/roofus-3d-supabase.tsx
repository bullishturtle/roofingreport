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

// Animation URLs
const ANIMATION_URLS = {
  idle: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//idle.glb"),
  walk: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//walk.glb"),
  run: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//run.glb"),
  jump: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//jump.glb"),
  climb: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//climb.glb"),
}

// Animation states
type AnimationState = "idle" | "walk" | "run" | "jump" | "climb" | "death" | "somersault"

// Global state to track which animations have been successfully loaded
const loadedAnimations = new Set<string>(["idle"]) // Start with idle as the default
const failedAnimations = new Set<string>()
let isLoadingAnimation = false

// Simplified Roofus model component with progressive animation loading
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
  onAnimationLoad?: (animation: string) => void
  onAnimationError?: (animation: string, error: any) => void
}) {
  const group = useRef<THREE.Group>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelError, setModelError] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState<string>("idle")
  const [animationData, setAnimationData] = useState<Record<string, { scene: THREE.Group; animations: any[] }>>({})

  // Use the requested animation if it's loaded, otherwise fall back to idle
  const animationToUse = loadedAnimations.has(animation) ? animation : "idle"

  // Load the idle animation first
  const { scene: idleScene, animations: idleAnimations } = useGLTF(
    ANIMATION_URLS.idle,
    undefined,
    () => {
      console.log("Idle animation loaded successfully")
      loadedAnimations.add("idle")
      setModelLoaded(true)
      onAnimationLoad?.("idle")

      // After idle loads successfully, try to load other animations
      if (!isLoadingAnimation) {
        loadNextAnimation()
      }
    },
    (error) => {
      console.error("Error loading idle animation:", error)
      setModelError(true)
      failedAnimations.add("idle")
      onAnimationError?.("idle", error)
    },
  ) as any

  // Function to load the next animation in sequence
  const loadNextAnimation = async () => {
    if (isLoadingAnimation) return

    const animationsToLoad = ["walk", "run", "jump", "climb"]
    const nextAnimation = animationsToLoad.find((anim) => !loadedAnimations.has(anim) && !failedAnimations.has(anim))

    if (!nextAnimation) {
      console.log("All animations have been processed")
      return
    }

    isLoadingAnimation = true
    console.log(`Loading next animation: ${nextAnimation}`)

    try {
      // Use a dynamic import to load the animation
      const gltf = await new Promise<any>((resolve, reject) => {
        useGLTF.load(ANIMATION_URLS[nextAnimation as keyof typeof ANIMATION_URLS], resolve, undefined, reject)
      })

      console.log(`Animation ${nextAnimation} loaded successfully`)
      loadedAnimations.add(nextAnimation)
      setAnimationData((prev) => ({
        ...prev,
        [nextAnimation]: { scene: gltf.scene, animations: gltf.animations },
      }))
      onAnimationLoad?.(nextAnimation)
    } catch (error) {
      console.error(`Error loading animation ${nextAnimation}:`, error)
      failedAnimations.add(nextAnimation)
      onAnimationError?.(nextAnimation, error)
    } finally {
      isLoadingAnimation = false
      // Continue loading the next animation
      setTimeout(loadNextAnimation, 1000)
    }
  }

  // Initialize with the idle animation
  useEffect(() => {
    if (idleScene && idleAnimations) {
      setAnimationData({
        idle: { scene: idleScene, animations: idleAnimations },
      })
    }
  }, [idleScene, idleAnimations])

  // Set up animations
  const { actions, names } = useAnimations(animationData[animationToUse]?.animations || idleAnimations, group)

  // Handle animation changes
  useEffect(() => {
    if (!modelLoaded || modelError || !actions || !names || names.length === 0) return

    // Stop all current animations
    Object.values(actions).forEach((action: any) => action?.stop())

    console.log(`Available animations for ${animationToUse}:`, names)

    // Play the first animation
    const animationName = names[0]
    if (actions[animationName]) {
      console.log(`Playing animation: ${animationName}`)
      actions[animationName].reset().fadeIn(0.5).play()
      setCurrentAnimation(animationName)
    }
  }, [animationToUse, modelLoaded, modelError, actions, names])

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

  // Get the scene to use based on the current animation
  const sceneToUse = animationData[animationToUse]?.scene || idleScene

  return (
    <group ref={group} position={position} rotation={rotation as any} onClick={onClick}>
      {sceneToUse && <primitive object={sceneToUse.clone()} scale={[scale, scale, scale]} />}
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
  onAnimationLoad?: (animation: string) => void
  onAnimationError?: (animation: string, error: any) => void
}) {
  const [mounted, setMounted] = useState(false)
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [speechText, setSpeechText] = useState("Hi, I'm Roofus! Need help with your roof?")
  const [availableAnimations, setAvailableAnimations] = useState<string[]>(["idle"])

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true)

    // Update available animations when they're loaded
    const updateAvailableAnimations = () => {
      setAvailableAnimations(Array.from(loadedAnimations))
    }

    // Check for new animations every second
    const interval = setInterval(updateAvailableAnimations, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  // Handle click on Roofus
  const handleClick = () => {
    setShowSpeechBubble(!showSpeechBubble)
    onClick?.()
  }

  // Handle animation load success
  const handleAnimationLoad = (anim: string) => {
    console.log(`Animation loaded in main component: ${anim}`)
    onAnimationLoad?.(anim)
  }

  // Handle animation load error
  const handleAnimationError = (anim: string, error: any) => {
    console.error(`Animation error in main component: ${anim}`, error)
    onAnimationError?.(anim, error)
  }

  if (!mounted) return null

  // Use the requested animation if it's available, otherwise fall back to idle
  const animationToUse = loadedAnimations.has(animation as string) ? animation : "idle"

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
                animation={animationToUse}
                onClick={handleClick}
                onAnimationLoad={handleAnimationLoad}
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

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs p-1 rounded">
          Available: {availableAnimations.join(", ")}
          <br />
          Current: {animationToUse}
        </div>
      )}
    </div>
  )
}

// Preload the idle animation
try {
  useGLTF.preload(ANIMATION_URLS.idle)
} catch (error) {
  console.error("Error preloading idle animation:", error)
}
