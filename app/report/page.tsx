import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  CloudLightning,
  Download,
  FileText,
  Home,
  Info,
  Layers,
  MessageSquare,
  Share2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { RoofMeasurements } from "@/components/report/roof-measurements"
import { PropertyDetails } from "@/components/report/property-details"
import { RoofCondition } from "@/components/report/roof-condition"
import { ReportActions } from "@/components/report/report-actions"

export default function ReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Dashboard</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-bold">Roof Report: 123 Main St, Anytown, USA</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Report ID: REP-1234</span>
                <span>•</span>
                <span>Generated: April 15, 2023</span>
                <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">
                  Completed
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
            <Button size="sm" className="gap-1">
              <FileText className="h-4 w-4" /> Create Proposal
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Property Overview</CardTitle>
                <CardDescription>Satellite imagery and 3D visualization of the property.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-md border bg-muted">
                  <Image
                    src="/placeholder.svg?height=450&width=800"
                    width={800}
                    height={450}
                    alt="Property Satellite View"
                    className="w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="aspect-video overflow-hidden rounded-md border bg-muted">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      width={400}
                      height={200}
                      alt="Property 3D Model"
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="aspect-video overflow-hidden rounded-md border bg-muted">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      width={400}
                      height={200}
                      alt="Property Heat Map"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="measurements" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="measurements">Measurements</TabsTrigger>
                <TabsTrigger value="condition">Condition</TabsTrigger>
                <TabsTrigger value="details">Property Details</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="measurements">
                <Card>
                  <CardHeader>
                    <CardTitle>Roof Measurements</CardTitle>
                    <CardDescription>Detailed measurements of the roof structure.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoofMeasurements />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="condition">
                <Card>
                  <CardHeader>
                    <CardTitle>Roof Condition Assessment</CardTitle>
                    <CardDescription>AI-powered analysis of the roof's current condition.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoofCondition />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                    <CardDescription>Information about the property and its characteristics.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PropertyDetails />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Property History</CardTitle>
                    <CardDescription>Historical data about the property and previous roof work.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 border-l-2 border-primary pl-4 pt-2">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Property Built</h4>
                          <p className="text-sm text-muted-foreground">1998</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 border-l-2 border-primary pl-4 pt-2">
                        <Layers className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Roof Installed</h4>
                          <p className="text-sm text-muted-foreground">2010 - Asphalt Shingles</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 border-l-2 border-primary pl-4 pt-2">
                        <CloudLightning className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Storm Damage</h4>
                          <p className="text-sm text-muted-foreground">March 2022 - Hail Storm</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 border-l-2 border-primary pl-4 pt-2">
                        <Home className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Last Inspection</h4>
                          <p className="text-sm text-muted-foreground">June 2022 - Minor Repairs</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <ReportActions />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-4 w-4" /> AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                    <h4 className="font-medium text-amber-600 mb-1">Potential Issues Detected</h4>
                    <p className="text-muted-foreground">
                      Signs of granule loss and minor wind damage on the south-facing slope.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                    <h4 className="font-medium text-blue-600 mb-1">Code Compliance</h4>
                    <p className="text-muted-foreground">
                      Current roof may not meet updated 2023 wind resistance codes for your area.
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                    <h4 className="font-medium text-green-600 mb-1">Recommendation</h4>
                    <p className="text-muted-foreground">
                      Consider scheduling an in-person inspection to assess potential storm damage claim.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1">
                  <MessageSquare className="h-4 w-4" /> Ask AI Assistant
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Similar Properties</CardTitle>
                <CardDescription>Recent roof work on similar properties in the area.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-14 w-14 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={`/placeholder.svg?height=56&width=56&text=Property ${i}`}
                          width={56}
                          height={56}
                          alt={`Similar Property ${i}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{100 + i * 100} Oak St, Anytown</h4>
                        <p className="text-xs text-muted-foreground">Roof Replacement - March 2023</p>
                        <p className="text-xs text-primary mt-1">View Report</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
