import { RoofCondition } from "@/components/report/roof-condition"
import { ResponsiveIndicator } from "@/components/test/responsive-indicator"

export default function ResponsiveTestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Responsive Testing</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Roof Condition Component</h2>
        <RoofCondition />
      </div>

      <ResponsiveIndicator />
    </div>
  )
}
