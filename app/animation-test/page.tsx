"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"
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
type AnimationState = "idle" | "walk" | "run" | "jump" | "climb" | "death" | "somersault"

const ANIMATIONS = {
  idle: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//idle.glb"),
  walk: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//walk.glb"),
  run: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//run.glb"),
  jump: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//jump.glb"),
  climb: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//climb.glb"),
  death: fixUrl("https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//death.glb"),
  somersault: fixUrl(
    "https://xpnbjrooptxutbcgufra.supabase.co/storage/v1/object/public/roofus-models//soumersault.glb",
  ),
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
  const [autoTest, setAutoTest] = useState(false)
  const [testResults, setTestResults] = useState<Record<AnimationState, "loading" | "success" | "error" | "pending">>({
    idle: "pending",
    walk: "pending",
    run: "pending",
    jump: "pending",
    climb: "pending",
    death: "pending",
    somersault: "pending",
  })
  const [currentTest, setCurrentTest] = useState<AnimationState | null>(null)
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({})
  const [accessibleUrls, setAccessibleUrls] = useState<Record<string, boolean>>({})

  // Function to test URL accessibility
  const testUrlAccessibility = async (animation: AnimationState) => {
    try {
      const response = await fetch(ANIMATIONS[animation], { method: "HEAD" })
      const isAccessible = response.ok
      setAccessibleUrls((prev) => ({ ...prev, [animation]: isAccessible }))
      return isAccessible
    } catch (error) {
      console.error(`Error checking URL accessibility: ${animation}`, error)
      setAccessibleUrls((prev) => ({ ...prev, [animation]: false }))
      return false
    }
  }

  // Function to test a specific animation
  const testAnimation = async (animation: AnimationState) => {
    setCurrentTest(animation)
    setTestResults((prev) => ({ ...prev, [animation]: "loading" }))

    // First check if the URL is accessible
    const isAccessible = await testUrlAccessibility(animation)
    if (!isAccessible) {
      setTestResults((prev) => ({ ...prev, [animation]: "error" }))
      setErrorMessages((prev) => ({
        ...prev,
        [animation]: `URL not accessible: ${ANIMATIONS[animation]}`,
      }))
      setCurrentTest(null)
      return
    }

    // If URL is accessible, we'll let the component try to load it
    // The result will be reported via the callbacks
    setCurrentAnimation(animation)
  }

  // Auto test all animations
  useEffect(() => {
    if (!autoTest) return

    const animations: AnimationState[] = ["idle", "walk", "run", "jump", "climb", "death", "somersault"]
    let currentIndex = 0

    const testNext = async () => {
      if (currentIndex >= animations.length) {
        setAutoTest(false)
        return
      }

      const animation = animations[currentIndex]
      await testAnimation(animation)
      currentIndex++

      setTimeout(testNext, 3000)
    }

    testNext()

    return () => {
      setAutoTest(false)
    }
  }, [autoTest])

  // Handle animation load success
  const handleAnimationLoad = (animation: AnimationState) => {
    console.log(`Animation loaded successfully: ${animation}`)
    setTestResults((prev) => ({ ...prev, [animation]: "success" }))
    setCurrentTest(null)
  }

  // Handle animation load error
  const handleAnimationError = (animation: AnimationState, error: any) => {
    console.error(`Error loading animation: ${animation}`, error)
    setTestResults((prev) => ({ ...prev, [animation]: "error" }))
    setErrorMessages((prev) => ({
      ...prev,
      [animation]: `Error loading: ${error.message || JSON.stringify(error) || "Unknown error"}`,
    }))
    setCurrentTest(null)
  }

  // Test all URLs on mount
  useEffect(() => {
    const testAllUrls = async () => {
      const animations: AnimationState[] = ["idle", "walk", "run", "jump", "climb", "death", "somersault"]
      for (const animation of animations) {
        await testUrlAccessibility(animation)
      }
    }

    testAllUrls()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Roofus Animation Test</h1>

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
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setAutoTest(!autoTest)
              }}
            >
              {autoTest ? "Stop Auto Test" : "Start Auto Test"}
            </Button>
            <div className="text-sm text-gray-400">Click an animation below to test it</div>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Animation Status</CardTitle>
            <CardDescription>Test results for each animation</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="manual">Manual Test</TabsTrigger>
                <TabsTrigger value="results">Test Results</TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-2">
                {(Object.keys(ANIMATIONS) as AnimationState[]).map((animation) => (
                  <Button
                    key={animation}
                    variant={currentAnimation === animation ? "default" : "outline"}
                    className="w-full justify-between"
                    onClick={() => {
                      testAnimation(animation)
                    }}
                  >
                    <span className="capitalize">{animation}</span>
                    {testResults[animation] === "loading" && <RefreshCw className="h-4 w-4 animate-spin" />}
                    {testResults[animation] === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {testResults[animation] === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                    {testResults[animation] === "pending" && <AlertCircle className="h-4 w-4 text-gray-400" />}
                  </Button>
                ))}
              </TabsContent>

              <TabsContent value="results">
                <div className="space-y-4">
                  {(Object.keys(ANIMATIONS) as AnimationState[]).map((animation) => (
                    <div key={animation}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium capitalize">{animation}</span>
                        <div className="flex items-center gap-2">
                          {accessibleUrls[animation] !== undefined && (
                            <span className={accessibleUrls[animation] ? "text-green-500" : "text-red-500"}>
                              {accessibleUrls[animation] ? "URL OK" : "URL Error"}
                            </span>
                          )}
                          {testResults[animation] === "loading" && <span className="text-yellow-500">Testing...</span>}
                          {testResults[animation] === "success" && <span className="text-green-500">Success</span>}
                          {testResults[animation] === "error" && <span className="text-red-500">Failed</span>}
                          {testResults[animation] === "pending" && <span className="text-gray-400">Not Tested</span>}
                        </div>
                      </div>

                      {testResults[animation] === "error" && errorMessages[animation] && (
                        <Alert variant="destructive" className="mb-2">
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription className="text-xs break-all">{errorMessages[animation]}</AlertDescription>
                        </Alert>
                      )}

                      <div className="text-xs text-gray-400 break-all">{ANIMATIONS[animation]}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}
