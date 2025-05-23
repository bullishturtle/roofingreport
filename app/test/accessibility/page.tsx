import { AccessibilityTester } from "@/components/test/accessibility-tester"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility Testing | RoofFax",
  description: "Test keyboard navigation and screen reader compatibility",
}

export default function AccessibilityTestPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Accessibility Testing</h1>
      <p className="text-lg mb-8">
        Use this page to verify keyboard navigation and screen reader compatibility in the RoofFax application.
      </p>

      <AccessibilityTester />
    </div>
  )
}
