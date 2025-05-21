"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment, Html } from "@react-three/drei"
import type * as THREE from "three"

// Animation URLs from Supabase
const ANIMATIONS = {
  IDLE: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/idle.glb",
  WALK: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/walk.glb",
  RUN: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/run.glb",
  JUMP: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/jump.glb",
  CLIMB: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/climb.glb",
  DEATH: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/death.glb",
  SOMERSAULT: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/soumersault.glb",
}

// Texture URLs from Supabase
const TEXTURES = {
  BASE_COLOR: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/Image_0.jpg",
  NORMAL_MAP: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/Image_2.jpg",
}

// HDR environment URL from Supabase
const HDR_URL = "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/color_121212.hdr"

// Animation states
type AnimationState = "idle" | "walk" | "run" | "jump" | "climb" | "death" | "somersault"

// Map animation states to URLs
const getAnimationUrl = (animation: AnimationState): string => {
  switch (animation) {
    case "idle":
      return ANIMATIONS.IDLE
    case "walk":
      return ANIMATIONS.WALK
    case "run":
      return ANIMATIONS.RUN
    case "jump":
      return ANIMATIONS.JUMP
    case "climb":
      return ANIMATIONS.CLIMB
    case "death":
      return ANIMATIONS.DEATH
    case "somersault":
      return ANIMATIONS.SOMERSAULT
    default:
      return ANIMATIONS.IDLE
  }
}

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

  // Get the animation URL
  const animationUrl = getAnimationUrl(animation)

  // Load the model with error handling
  const { scene, animations } = useGLTF(
    animationUrl,
    undefined,
    () => setModelLoaded(true),
    (error) => {
      console.error(`Error loading Roofus model (${animation}):`, error)
      setModelError(true)
    },
  ) as any

  // Set up animations
  const { actions, names } = useAnimations(animations, group)

  // Handle animation changes
  useEffect(() => {
    if (!modelLoaded || modelError || !actions || !names.length) return

    // Find the first animation and play it
    const animationName = names[0]
    if (actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play()
    }
  }, [actions, names, modelLoaded, modelError])

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

// Preload the models
Object.values(ANIMATIONS).forEach((url) => {
  try {
    useGLTF.preload(url)
  } catch (error) {
    console.error(`Error preloading model (${url}):`, error)
  }
})
