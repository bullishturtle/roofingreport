"use client"

import type React from "react"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment, Html, useTexture } from "@react-three/drei"
import type * as THREE from "three"

// Fix double slashes in URLs
const fixUrl = (url: string) => url.replace("//", "/")

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

// Texture URLs from Supabase
const TEXTURES = {
  BASE_COLOR: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//Image_0.jpg"),
  ROUGHNESS: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//Image_1.jpg"),
  NORMAL_MAP: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//Image_2.jpg"),
}

// HDR environment URL from Supabase
const HDR_URL = fixUrl(
  "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//color_121212.hdr",
)

// Animation states
type AnimationState = "idle" | "walk" | "run" | "jump" | "climb" | "death" | "somersault"

// Map animation states to URLs
const getAnimationUrl = (animation: AnimationState): string => {
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

// Roofus character component with separate animation files
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

  // Get the animation URL
  const animationUrl = getAnimationUrl(animation)

  // Load the model and animation
  const { scene, animations } = useGLTF(animationUrl) as any

  // Set up animations
  const { actions, names } = useAnimations(animations, group)

  // Load textures
  const textures = useTexture({
    map: TEXTURES.BASE_COLOR,
    normalMap: TEXTURES.NORMAL_MAP,
    roughnessMap: TEXTURES.ROUGHNESS,
  })

  // Apply textures to the model
  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          // Apply textures to the material
          child.material.map = textures.map
          child.material.normalMap = textures.normalMap
          child.material.roughnessMap = textures.roughnessMap
          child.material.needsUpdate = true
        }
      })
      setModelLoaded(true)
    }
  }, [scene, textures])

  // Handle animation changes
  useEffect(() => {
    if (!modelLoaded || !actions || !names || names.length === 0) return

    console.log(`Animation loaded: ${animation}, Available animations:`, names)

    // Play the first animation
    const animationName = names[0]
    if (actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play()
      setCurrentAnimation(animationName)
    }
  }, [animation, actions, names, modelLoaded])

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
          <ErrorBoundary>
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
                  <Environment files={HDR_URL} />
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

// Preload the models
Object.values(MODELS).forEach((url) => {
  try {
    useGLTF.preload(url)
  } catch (error) {
    console.error(`Error preloading model (${url}):`, error)
  }
})
