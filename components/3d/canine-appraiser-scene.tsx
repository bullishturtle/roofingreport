"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, useAnimations, Environment, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Model component that loads and animates the GLB file
function CanineAppraiserModel({ position = [0, 0, 0], scale = 1, onLoad, ...props }) {
  const group = useRef()
  const { scene, animations } = useGLTF("/models/Canine_Appraiser_here_0426083524_texture.glb")
  const { actions, names } = useAnimations(animations, group)
  const [currentAnimation, setCurrentAnimation] = useState(null)

  // Initialize animations when the model loads
  useEffect(() => {
    if (names.length > 0) {
      // Default animation - you can change this to any animation in your model
      const defaultAnim = names[0]
      setCurrentAnimation(defaultAnim)
      actions[defaultAnim]?.reset().fadeIn(0.5).play()
    }

    if (onLoad) onLoad(names)

    return () => {
      // Clean up animations
      if (currentAnimation) {
        actions[currentAnimation]?.fadeOut(0.5)
      }
    }
  }, [actions, names, onLoad])

  // Change animation when currentAnimation changes
  useEffect(() => {
    if (!currentAnimation) return

    // Fade out previous animation and fade in new one
    Object.values(actions).forEach((action) => {
      if (action) action.fadeOut(0.5)
    })

    if (actions[currentAnimation]) {
      actions[currentAnimation].reset().fadeIn(0.5).play()
    }
  }, [currentAnimation, actions])

  return (
    <group ref={group} {...props} position={position} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </group>
  )
}

// Camera controller for smooth movement
function CameraController() {
  const { camera, mouse } = useThree()
  const initialPosition = useRef(new THREE.Vector3(0, 1, 5))

  useFrame(() => {
    // Subtle camera movement based on mouse position
    camera.position.x = initialPosition.current.x + mouse.x * 0.5
    camera.position.y = initialPosition.current.y + mouse.y * 0.2
    camera.lookAt(0, 1, 0)
  })

  return null
}

// Main 3D Scene component
export function CanineAppraiserScene() {
  const [isLoading, setIsLoading] = useState(true)
  const [availableAnimations, setAvailableAnimations] = useState([])
  const [currentAnimation, setCurrentAnimation] = useState(null)
  const [cameraPosition, setCameraPosition] = useState([0, 1, 5])

  const handleModelLoad = (animations) => {
    setAvailableAnimations(animations)
    if (animations.length > 0) {
      setCurrentAnimation(animations[0])
    }
    setIsLoading(false)
  }

  const moveCamera = (position) => {
    setCameraPosition(position)
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border-2 border-neon-gold/30 bg-black/30">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-neon-gold text-lg">Loading 3D Model...</div>
        </div>
      )}

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
        <CameraController />

        {/* Environment and lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Environment preset="city" />

        {/* Ground plane with shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <shadowMaterial opacity={0.4} />
        </mesh>

        {/* The 3D model */}
        <CanineAppraiserModel position={[0, -0.5, 0]} scale={1} onLoad={handleModelLoad} />

        {/* Controls for orbiting the camera */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>

      {/* UI Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2 bg-black/50 backdrop-blur-md p-2 rounded-lg border border-neon-gold/30"
        >
          {availableAnimations.map((anim) => (
            <Button
              key={anim}
              size="sm"
              variant={currentAnimation === anim ? "default" : "outline"}
              className={
                currentAnimation === anim
                  ? "bg-neon-gold text-black"
                  : "border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10"
              }
              onClick={() => setCurrentAnimation(anim)}
            >
              {anim}
            </Button>
          ))}
        </motion.div>
      </div>

      {/* Camera position controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10"
          onClick={() => moveCamera([0, 1, 5])}
        >
          Front View
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10"
          onClick={() => moveCamera([5, 1, 0])}
        >
          Side View
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10"
          onClick={() => moveCamera([0, 3, 3])}
        >
          Top View
        </Button>
      </div>
    </div>
  )
}
