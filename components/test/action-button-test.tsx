"use client"

import { useState } from "react"
import { ActionButton } from "@/components/ui/action-button"
import { Button } from "@/components/ui/action-button" // Testing the re-exported Button
import { useToast } from "@/components/ui/use-toast"

export function ActionButtonTest() {
  const { toast } = useToast()
  const [count, setCount] = useState(0)

  // Successful action
  const handleSuccessAction = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setCount((prev) => prev + 1)
    toast({
      title: "Action successful",
      description: `Counter incremented to ${count + 1}`,
    })
  }

  // Failed action
  const handleFailedAction = async () => {
    // Simulate API call that fails
    await new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("This action failed intentionally for testing")), 1500),
    )
  }

  // Immediate action (non-async)
  const handleImmediateAction = () => {
    setCount((prev) => prev - 1)
    toast({
      title: "Immediate action",
      description: `Counter decremented to ${count - 1}`,
    })
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Action Button Test</h2>

      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">{count}</span>
      </div>

      <div className="space-y-4">
        <ActionButton onAction={handleSuccessAction} loadingText="Processing..." className="w-full">
          Successful Action
        </ActionButton>

        <ActionButton onAction={handleFailedAction} loadingText="Failing..." variant="destructive" className="w-full">
          Failed Action
        </ActionButton>

        <ActionButton onAction={handleImmediateAction} className="w-full" variant="outline">
          Immediate Action
        </ActionButton>

        {/* Test the re-exported Button */}
        <Button onClick={() => toast({ title: "Regular Button Clicked" })} className="w-full" variant="secondary">
          Regular Button (Re-exported)
        </Button>
      </div>
    </div>
  )
}
