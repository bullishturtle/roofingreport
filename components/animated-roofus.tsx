"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment, useTexture, Html } from "@react-three/drei"
import { Physics, useSphere, usePlane } from "@react-three/cannon"
import type * as THREE from "three"
import { create } from "zustand"

// Animation URLs
const ANIMATIONS = {
  IDLE: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/idle.glb",
  WALK: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/walk.glb",
  RUN: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/run.glb",
  JUMP: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/jump.glb",
  CLIMB: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/climb.glb",
  DEATH: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/death.glb",
  SOMERSAULT: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/soumersault.glb",
}

// Texture URLs
const TEXTURES = {
  BASE_COLOR: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/Image_0.jpg",
  NORMAL_MAP: "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/Image_2.jpg",
}

// HDR environment URL
const HDR_URL = "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/sign/roofus-models/color_121212.hdr"

// Animation states
type AnimationState = "idle" | "walk" | "run" | "jump" | "climb" | "death" | "somersault"

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

  // Load animations
  const { nodes, animations: idleAnimations } = useGLTF(ANIMATIONS.IDLE) as any
  const { animations: walkAnimations } = useGLTF(ANIMATIONS.WALK) as any
  const { animations: runAnimations } = useGLTF(ANIMATIONS.RUN) as any
  const { animations: jumpAnimations } = useGLTF(ANIMATIONS.JUMP) as any

  // Load textures
  const [baseColorMap, normalMap] = useTexture([TEXTURES.BASE_COLOR, TEXTURES.NORMAL_MAP])

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

  // Combine animations
  const allAnimations = [...idleAnimations, ...walkAnimations, ...runAnimations, ...jumpAnimations]

  // Set up animations
  const { actions, names } = useAnimations(allAnimations, group)

  // Handle animation changes
  useEffect(() => {
    // Stop all animations
    Object.values(actions).forEach((action) => action?.stop())

    // Map animation state to animation name
    const animationMap: Record<AnimationState, string> = {
      idle: "Idle",
      walk: "Walk",
      run: "Run",
      jump: "Jump",
      climb: "Climb",
      death: "Death",
      somersault: "Somersault",
    }

    // Play the current animation
    const animationName = animationMap[animationState]
    const action = actions[animationName]

    if (action) {
      action.reset().fadeIn(0.5).play()
    }
  }, [actions, animationState])

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

  return (
    <>
      <group ref={group} onClick={handleClick} scale={[0.5, 0.5, 0.5]}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={(nodes.Wolf3D_Body as THREE.SkinnedMesh).geometry}
          skeleton={(nodes.Wolf3D_Body as THREE.SkinnedMesh).skeleton}
          castShadow
        >
          <meshStandardMaterial map={baseColorMap} normalMap={normalMap} roughness={0.4} metalness={0.2} />
        </skinnedMesh>

        {/* Chat bubble */}
        {showChatBubble && hasLanded && (
          <Html position={[0, 2, 0]} center>
            <div className="bg-white p-3 rounded-lg shadow-lg text-black text-sm w-48 relative">
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
export function AnimatedRoofus() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-0 right-0 w-64 h-64 z-50 pointer-events-none">
      <div className="w-full h-full pointer-events-auto">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={<Loader />}>
            <Physics gravity={[0, -9.8, 0]}>
              <RoofusCharacter />
              <Floor />
            </Physics>
            <Environment files={HDR_URL} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
