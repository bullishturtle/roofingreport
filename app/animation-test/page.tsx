"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

// Fix URL formatting function
const fixUrl = (url: string) => {
  // Ensure protocol has double slashes
  let fixedUrl = url.replace("https:/", "https://")
  // Fix double slashes in the path (but not in the protocol)
  fixedUrl = fixedUrl.replace("//roofus-models//", "/roofus-models/")
  return fixedUrl
}

// Animation states and URLs
type AnimationState = "idle" | "walk" | "run" | "jump" | "climb"

const ANIMATIONS = {
  idle: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//idle.glb"),
  walk: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//walk.glb"),
  run: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//run.glb"),
  jump: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//jump.glb"),
  climb: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//climb.glb"),
}

// Dynamically import the 3D Roofus component with no SSR
const Roofus3DSupabase = dynamic(() => import("@/components/roofus-3d-supabase").then((mod) => mod.Roofus3DSupabase), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 w-full">
      <div className="w-12 h-12 border-4 border-t-neon-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
    </div>
  ),
})

export default function AnimationTestPage() {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationState>("idle")
  const [loadedAnimations, setLoadedAnimations] = useState<string[]>(["idle"])
  const [failedAnimations, setFailedAnimations] = useState<string[]>([])
  const [loadingAnimation, setLoadingAnimation] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  // Handle animation load success
  const handleAnimationLoad = (animation: string) => {
    console.log(`Animation loaded successfully: ${animation}`)
    setLoadedAnimations((prev) => (prev.includes(animation) ? prev : [...prev, animation]))
    setLoadingAnimation(null)

    // Update progress
    const totalAnimations = Object.keys(ANIMATIONS).length
    const loadedCount = loadedAnimations.length + 1 // +1 for the one that just loaded
    setProgress(Math.round((loadedCount / totalAnimations) * 100))
  }

  // Handle animation load error
  const handleAnimationError = (animation: string, error: any) => {
    console.error(`Error loading animation: ${animation}`, error)
    setFailedAnimations((prev) => (prev.includes(animation) ? prev : [...prev, animation]))
    setLoadingAnimation(null)

    // Update progress
    const totalAnimations = Object.keys(ANIMATIONS).length
    const processedCount = loadedAnimations.length + failedAnimations.length + 1 // +1 for the one that just failed
    setProgress(Math.round((processedCount / totalAnimations) * 100))
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Progressive Animation Loading</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Animation Preview</CardTitle>
            <CardDescription>Currently playing: {currentAnimation}</CardDescription>
          </CardHeader>
          <CardContent className="h-96 relative">
            <Roofus3DSupabase
              animation={currentAnimation}
              position={[0, -1, 0]}
              scale={0.7}
              showEnvironment={true}
              className="w-full h-full"
              onAnimationLoad={handleAnimationLoad}
              onAnimationError={handleAnimationError}
            />
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <span>Loading Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Available Animations</CardTitle>
            <CardDescription>Click an animation to preview it</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(Object.keys(ANIMATIONS) as AnimationState[]).map((animation) => (
                <Button
                  key={animation}
                  variant={currentAnimation === animation ? "default" : "outline"}
                  className="w-full justify-between"
                  onClick={() => {
                    if (loadedAnimations.includes(animation)) {
                      setCurrentAnimation(animation)
                    }
                  }}
                  disabled={!loadedAnimations.includes(animation)}
                >
                  <span className="capitalize">{animation}</span>
                  {loadingAnimation === animation && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loadedAnimations.includes(animation) && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {failedAnimations.includes(animation) && <XCircle className="h-4 w-4 text-red-500" />}
                  {!loadedAnimations.includes(animation) &&
                    !failedAnimations.includes(animation) &&
                    loadingAnimation !== animation && (
                      <Badge variant="outline" className="ml-2">
                        Pending
                      </Badge>
                    )}
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="text-sm text-gray-500">
              Animations are loaded progressively after the idle animation is confirmed to work.
            </div>
            <Button variant="outline" onClick={() => window.history.back()} className="mt-4">
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
