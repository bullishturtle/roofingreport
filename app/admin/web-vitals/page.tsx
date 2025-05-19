import { WebVitalsDashboard } from "@/components/admin/web-vitals-dashboard"
import { WebVitalsInsights } from "@/components/admin/web-vitals-insights"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminNav } from "@/components/admin/admin-nav"

export const metadata = {
  title: "Web Vitals Dashboard - RoofFax Admin",
  description: "Monitor Core Web Vitals performance metrics for the RoofFax website",
}

export default function WebVitalsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Web Vitals Monitoring</h1>

      <AdminNav />

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="insights">Insights & Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6">
          <WebVitalsDashboard />
        </TabsContent>
        <TabsContent value="insights" className="mt-6">
          <WebVitalsInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}
