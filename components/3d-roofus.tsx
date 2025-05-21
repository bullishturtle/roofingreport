"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment, Html } from "@react-three/drei"
import { Physics, useSphere, usePlane } from "@react-three/cannon"
import type * as THREE from "three"
import { create } from "zustand"

// Animation states
type AnimationState = "idle" | "walk" | "run" | "jump" | "wave"

// Store for Roofus state
interface RoofusState {
  animationState: AnimationState
  showChatBubble: boolean
  hasLanded: boolean
  setAnimationState: (state: AnimationState) => void
  toggleChatBubble: () => void
  setHasLanded: (landed: boolean) => void
}

const useRoofusStore = create<RoofusState>((set) => ({
  animationState: "idle",
  showChatBubble: false,
  hasLanded: false,
  setAnimationState: (state) => set({ animationState: state }),
  toggleChatBubble: () => set((state) => ({ showChatBubble: !state.showChatBubble })),
  setHasLanded: (landed) => set({ hasLanded: landed }),
}))

// Floor component for physics
function Floor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
    type: "Static",
  }))

  return (
    <mesh ref={ref} receiveShadow visible={false}>
      <planeGeometry args={[100, 100]} />
      <shadowMaterial transparent opacity={0.2} />
    </mesh>
  )
}

// Roofus character component
function RoofusCharacter() {
  const { animationState, showChatBubble, hasLanded, setAnimationState, toggleChatBubble, setHasLanded } =
    useRoofusStore()
  const group = useRef<THREE.Group>(null)
  const { camera, viewport } = useThree()
  const [modelLoaded, setModelLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Define the model path explicitly
  const MODEL_PATH = "/models/roofus-character.glb"
  console.log("Loading Roofus model from:", MODEL_PATH)

  // Load model with error handling
  const { scene, animations } = useGLTF(MODEL_PATH, true, undefined, (e) => {
    console.error("Error loading model:", e)
    setError("Failed to load character model")
  }) as any

  // Set up physics for falling
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [viewport.width / 4, viewport.height, 0],
    args: [0.5],
    onCollide: () => {
      if (!hasLanded) {
        setHasLanded(true)
        // Move to bottom right corner after landing
        setTimeout(() => {
          api.position.set(viewport.width / 2 - 1, -viewport.height / 2 + 2, 0)
        }, 1000)
      }
    },
  }))

  // Check if model is loaded
  useEffect(() => {
    if (scene) {
      console.log("3D Model loaded successfully:", scene)
      setModelLoaded(true)
    }
  }, [scene])

  // Set up animations
  const { actions, names } = useAnimations(animations, group)

  // Log available animations
  useEffect(() => {
    if (names.length > 0) {
      console.log("Available animations:", names)
    }
  }, [names])

  // Handle animation changes
  useEffect(() => {
    if (!modelLoaded || !actions || names.length === 0) return

    // Stop all animations
    Object.values(actions).forEach((action) => action?.stop())

    // Find the best matching animation
    let actionToPlay = actions["idle"] || actions["Idle"] || actions[names[0]]

    // Try to find a matching animation based on the current state
    for (const name of names) {
      const lowerName = name.toLowerCase()
      if (lowerName.includes(animationState.toLowerCase())) {
        actionToPlay = actions[name]
        break
      }
    }

    if (actionToPlay) {
      actionToPlay.reset().fadeIn(0.5).play()
    } else {
      console.warn(`No suitable animation found for ${animationState}. Available animations:`, names)
      // Play the first available animation as fallback
      if (names.length > 0 && actions[names[0]]) {
        actions[names[0]].reset().fadeIn(0.5).play()
      }
    }
  }, [actions, animationState, modelLoaded, names])

  // Update position from physics
  useFrame(() => {
    if (ref.current && group.current) {
      const position = ref.current.position.clone()
      group.current.position.copy(position)

      // Make Roofus face the camera
      group.current.lookAt(camera.position)
    }
  })

  // Handle click on Roofus
  const handleClick = () => {
    if (hasLanded) {
      toggleChatBubble()
      setAnimationState(animationState === "idle" ? "walk" : "idle")
    }
  }

  // If there's an error, show a simple placeholder
  if (error) {
    console.error("Error in RoofusCharacter:", error)
    return (
      <mesh position={[viewport.width / 2 - 1, -viewport.height / 2 + 2, 0]} onClick={handleClick}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#FFD700" />
        {showChatBubble && (
          <Html position={[0, 1, 0]} center>
            <div className="bg-white p-3 rounded-lg shadow-lg text-black text-sm w-48 border-2 border-neon-gold/30">
              <p className="font-medium">Hi, I'm Roofus. Need help with your roof?</p>
            </div>
          </Html>
        )}
      </mesh>
    )
  }

  // If model is not loaded yet, show nothing
  if (!modelLoaded) {
    return null
  }

  return (
    <>
      <group ref={group} onClick={handleClick} scale={[0.5, 0.5, 0.5]}>
        <primitive object={scene.clone()} />

        {/* Chat bubble */}
        {showChatBubble && hasLanded && (
          <Html position={[0, 2, 0]} center>
            <div className="bg-white p-3 rounded-lg shadow-lg text-black text-sm w-48 relative border-2 border-neon-gold/30">
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
              <p className="font-medium">Hi, I'm Roofus. Need help with your roof?</p>
            </div>
          </Html>
        )}
      </group>

      {/* Invisible physics object */}
      <mesh ref={ref} visible={false}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="red" wireframe />
      </mesh>
    </>
  )
}

// Loading fallback
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-neon-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white">Loading Roofus...</p>
      </div>
    </Html>
  )
}

// Main component
export function ThreeDRoofus() {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    // Preload the model
    useGLTF.preload("/models/roofus-character.glb")

    return () => {
      // Clean up resources
      useGLTF.clear()
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-0 right-0 w-64 h-64 z-50 pointer-events-none">
      <div className="w-full h-full pointer-events-auto">
        {error ? (
          <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/50">
            <p className="text-white text-sm">{error}</p>
          </div>
        ) : (
          <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 50 }}
            onError={(e) => {
              console.error("Canvas error:", e)
              setError("Failed to render 3D content")
            }}
          >
            <Suspense fallback={<Loader />}>
              <Physics gravity={[0, -9.8, 0]}>
                <RoofusCharacter />
                <Floor />
              </Physics>
              <Environment preset="city" />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
            </Suspense>
          </Canvas>
        )}
      </div>
    </div>
  )
}
