"use client"

import { useState, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import { useBox } from "@react-three/cannon"
import type * as THREE from "three"

// Animation states
type AnimationState = "idle" | "running" | "jumping" | "pointing" | "waving" | "climbing"

// Character controller for GLB models
export function GLBModelCharacter({
  modelUrl,
  position = [0, 0, 0],
  animation = "idle",
  direction = "right",
  name = "character",
  onInteract,
  onLoadError,
}: {
  modelUrl: string
  position?: [number, number, number]
  animation?: AnimationState
  direction?: "left" | "right"
  name?: string
  onInteract?: () => void
  onLoadError?: (error: Error) => void
}) {
  const group = useRef<THREE.Group>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelError, setModelError] = useState(false)

  // Load the GLB model
  const { scene, animations } = useGLTF(modelUrl, true, undefined, (error) => {
    console.error(`Error loading model ${modelUrl}:`, error)
    setModelError(true)
    if (onLoadError) onLoadError(error)
  })

  // Set up animations
  const { actions, names } = useAnimations(animations, group)

  // Set up physics
  const [physicsRef, physicsApi] = useBox(() => ({
    mass: 1,
    position,
    args: [0.5, 1, 0.5],
    fixedRotation: true,
    onCollide: (e) => {
      if (e.body.name !== name && onInteract) {
        onInteract()
      }
    },
  }))

  // Handle model loading
  useEffect(() => {
    if (scene && !modelError) {
      setModelLoaded(true)
    }
  }, [scene, modelError])

  // Handle animation changes
  useEffect(() => {
    if (!modelLoaded || modelError || !actions) return

    // Reset all animations
    Object.values(actions).forEach((action) => action?.stop())

    // Play the current animation if it exists
    if (actions[animation]) {
      actions[animation]?.reset().play()
    } else if (actions["idle"]) {
      // Fallback to idle if the requested animation doesn't exist
      actions["idle"]?.reset().play()
    }
  }, [animation, modelLoaded, modelError, actions])

  // Handle direction changes
  useEffect(() => {
    if (group.current) {
      group.current.rotation.y = direction === "left" ? Math.PI : 0
    }
  }, [direction])

  // Update physics body position to match animation
  useFrame(() => {
    if (group.current && physicsRef.current) {
      const physicsPosition = physicsRef.current.position
      group.current.position.set(physicsPosition.x, physicsPosition.y - 0.5, physicsPosition.z)
    }
  })

  // If there's an error loading the model, render a simple box as fallback
  if (modelError) {
    return (
      <mesh ref={physicsRef} name={name} position={position}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color={name === "roofus" ? "#FFD700" : "#3B82F6"} opacity={0.5} transparent />
      </mesh>
    )
  }

  return (
    <group ref={group}>
      <mesh ref={physicsRef} name={name} visible={false} />
      {modelLoaded && <primitive object={scene.clone()} scale={[0.5, 0.5, 0.5]} />}
    </group>
  )
}

// Preload models to improve performance
export function preloadGLBModels(urls: string[]) {
  urls.forEach((url) => {
    useGLTF.preload(url)
  })
}
