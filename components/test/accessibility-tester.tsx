"use client"

import { useState } from "react"
import { useAccessibility } from "@/components/ui/accessibility-provider"
import { useKeyboardNavigation, KeyboardShortcutsHelp } from "@/components/ui/keyboard-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function AccessibilityTester() {
  const { announceMessage, reducedMotion, highContrast } = useAccessibility()
  const [focusIndex, setFocusIndex] = useState(0)
  const [announcement, setAnnouncement] = useState("")
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})

  // Define keyboard shortcuts
  const shortcuts = [
    {
      key: "1",
      action: () => handleTabChange("keyboard"),
      description: "Switch to Keyboard Navigation tab",
    },
    {
      key: "2",
      action: () => handleTabChange("screen-reader"),
      description: "Switch to Screen Reader tab",
    },
    {
      key: "3",
      action: () => handleTabChange("focus"),
      description: "Switch to Focus Management tab",
    },
    {
      key: "a",
      action: () => announceScreenReaderMessage(),
      description: "Announce message to screen reader",
    },
    {
      key: "ArrowRight",
      action: () => navigateFocus(1),
      description: "Move focus to next element",
    },
    {
      key: "ArrowLeft",
      action: () => navigateFocus(-1),
      description: "Move focus to previous element",
    },
  ]

  useKeyboardNavigation(shortcuts)

  const handleTabChange = (tab: string) => {
    document.querySelector(`[data-state="active"][data-value="${tab}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    announceMessage(`Switched to ${tab.replace("-", " ")} tab`)
    markTestPassed("keyboardTabNavigation")
  }

  const announceScreenReaderMessage = () => {
    if (announcement) {
      announceMessage(announcement)
      markTestPassed("screenReaderAnnouncement")
    }
  }

  const navigateFocus = (direction: number) => {
    const focusableElements = Array.from(
      document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
    )
    const newIndex = (focusIndex + direction + focusableElements.length) % focusableElements.length
    setFocusIndex(newIndex)
    ;(focusableElements[newIndex] as HTMLElement).focus()
    markTestPassed("keyboardFocusNavigation")
  }

  const markTestPassed = (testName: string) => {
    setTestResults((prev) => ({ ...prev, [testName]: true }))
  }

  return (
    <Tabs defaultValue="keyboard" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="keyboard">Keyboard Navigation</TabsTrigger>
        <TabsTrigger value="screen-reader">Screen Reader</TabsTrigger>
        <TabsTrigger value="focus">Focus Management</TabsTrigger>
      </TabsList>

      <TabsContent value="keyboard">
        <Card>
          <CardHeader>
            <CardTitle>Keyboard Navigation Testing</CardTitle>
            <CardDescription>
              Test keyboard navigation features. Use Tab to navigate between elements and Enter to activate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Keyboard Shortcuts</h3>
              <KeyboardShortcutsHelp shortcuts={shortcuts} />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Navigation Test</h3>
              <p>Try using Tab to navigate through these buttons and Enter to activate them:</p>
              <div className="flex flex-wrap gap-3 mt-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    onClick={() => {
                      announceMessage(`Button ${num} clicked`)
                      markTestPassed("buttonActivation")
                    }}
                  >
                    Button {num}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Form Controls</h3>
              <p>Test keyboard navigation in form controls:</p>
              <div className="grid gap-4 mt-3">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" onChange={() => markTestPassed("formInteraction")} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="airplane-mode" onCheckedChange={() => markTestPassed("formInteraction")} />
                  <Label htmlFor="airplane-mode">Enable feature</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <h3 className="font-medium mb-2">Test Results:</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className={testResults.keyboardTabNavigation ? "text-green-600" : "text-gray-500"}>
                    {testResults.keyboardTabNavigation ? "✓" : "○"} Tab Navigation
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={testResults.buttonActivation ? "text-green-600" : "text-gray-500"}>
                    {testResults.buttonActivation ? "✓" : "○"} Button Activation
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={testResults.formInteraction ? "text-green-600" : "text-gray-500"}>
                    {testResults.formInteraction ? "✓" : "○"} Form Interaction
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={testResults.keyboardFocusNavigation ? "text-green-600" : "text-gray-500"}>
                    {testResults.keyboardFocusNavigation ? "✓" : "○"} Arrow Key Navigation
                  </span>
                </li>
              </ul>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="screen-reader">
        <Card>
          <CardHeader>
            <CardTitle>Screen Reader Compatibility</CardTitle>
            <CardDescription>Test screen reader announcements and compatibility features.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Screen Reader Announcements</h3>
              <p>
                Type a message below and click the button to have it announced to screen readers. Make sure your screen
                reader is active.
              </p>
              <div className="flex gap-2 mt-3">
                <Input
                  placeholder="Enter message to announce"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  aria-label="Message to announce to screen reader"
                />
                <Button onClick={announceScreenReaderMessage}>Announce</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">ARIA Live Regions</h3>
              <p>
                The following region will update with dynamic content. Screen readers should announce these changes.
              </p>
              <div className="p-4 border rounded-md mt-3" aria-live="polite" aria-atomic="true">
                <p>Current time: {new Date().toLocaleTimeString()}</p>
                <Button
                  className="mt-2"
                  onClick={() => {
                    const liveRegion = document.querySelector('[aria-live="polite"]')
                    if (liveRegion) {
                      liveRegion.textContent = `Updated time: ${new Date().toLocaleTimeString()}`
                      markTestPassed("ariaLiveRegion")
                    }
                  }}
                >
                  Update Time
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Image Descriptions</h3>
              <p>Screen readers should announce the following image descriptions:</p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <img
                    src="/images/roofus.png"
                    alt="Roofus, the cartoon Pomeranian mascot of RoofFax, wearing a blue suit and standing on a rooftop"
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div>
                  <img
                    src="/simple-house.png"
                    alt="Illustration of a house with a roof"
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <h3 className="font-medium mb-2">Test Results:</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className={testResults.screenReaderAnnouncement ? "text-green-600" : "text-gray-500"}>
                    {testResults.screenReaderAnnouncement ? "✓" : "○"} Screen Reader Announcement
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={testResults.ariaLiveRegion ? "text-green-600" : "text-gray-500"}>
                    {testResults.ariaLiveRegion ? "✓" : "○"} ARIA Live Region
                  </span>
                </li>
              </ul>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="focus">
        <Card>
          <CardHeader>
            <CardTitle>Focus Management</CardTitle>
            <CardDescription>Test focus management and visual focus indicators.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Focus Indicators</h3>
              <p>
                Tab through the elements below to verify that focus indicators are visible and meet WCAG contrast
                requirements.
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <Button>Primary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <a href="#" className="underline text-blue-600">
                  Text Link
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Focus Trapping</h3>
              <p>The following dialog should trap focus when open, preventing focus from moving outside the dialog.</p>
              <Button
                onClick={() => {
                  const dialog = document.getElementById("focus-trap-dialog")
                  if (dialog) {
                    dialog.classList.remove("hidden")
                    const firstFocusable = dialog.querySelector("button") as HTMLElement
                    if (firstFocusable) firstFocusable.focus()
                    markTestPassed("focusTrapping")
                  }
                }}
              >
                Open Dialog
              </Button>

              <div
                id="focus-trap-dialog"
                className="hidden fixed inset-0 bg-black/50 flex items-center justify-center"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
              >
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                  <h2 id="dialog-title" className="text-xl font-bold mb-4">
                    Focus Trap Dialog
                  </h2>
                  <p className="mb-4">Focus should be trapped within this dialog. Try tabbing through the elements.</p>
                  <div className="space-y-4">
                    <Input placeholder="Input in dialog" />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button
                        onClick={() => {
                          document.getElementById("focus-trap-dialog")?.classList.add("hidden")
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Skip Links</h3>
              <p>
                Press Tab from the beginning of the page to verify that a skip link appears, allowing users to skip to
                the main content.
              </p>
              <div className="mt-3 p-4 border rounded-md">
                <p>
                  The skip link should appear at the very top of the page when you first press Tab. It may be hidden
                  until focused.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <h3 className="font-medium mb-2">Test Results:</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className={testResults.focusTrapping ? "text-green-600" : "text-gray-500"}>
                    {testResults.focusTrapping ? "✓" : "○"} Focus Trapping
                  </span>
                </li>
              </ul>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
