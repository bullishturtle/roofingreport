"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DemoSection() {
  const [activeTab, setActiveTab] = useState("measurements")

  return (
    <section id="demo" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600">
              See RoofFax in Action
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our interactive demos to see how RoofFax.Report can help you understand your roof.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="measurements" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="measurements">Aerial Measurements</TabsTrigger>
              <TabsTrigger value="storm">Storm Analysis</TabsTrigger>
              <TabsTrigger value="history">Property History</TabsTrigger>
              <TabsTrigger value="quotes">Quote Generation</TabsTrigger>
            </TabsList>
            <TabsContent value="measurements" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Satellite Aerial Measurements</h3>
                  <p className="text-gray-600">
                    Our advanced satellite imagery provides precise measurements of your roof without anyone needing to
                    climb on it. Get accurate square footage, pitch, and material identification.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Total Area:</span>
                      <span className="font-bold">2,450 sq ft</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pitch:</span>
                      <span className="font-bold">6:12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Facets:</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Material:</span>
                      <span className="font-bold">Asphalt Shingles</span>
                    </div>
                  </div>
                  <Button>Get Your Roof Measurements</Button>
                </div>
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden border-2 border-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-center text-gray-500">
                      Interactive 3D Roof Measurement Viewer
                      <br />
                      (Enable JavaScript to view)
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="storm" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Live Storm Impact Analysis</h3>
                  <p className="text-gray-600">
                    Track historical weather events that may have impacted your roof. Our system analyzes hail, wind,
                    hurricane, and other severe weather data to assess potential damage.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Hail Events (5yr):</span>
                      <span className="font-bold">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Wind Events (5yr):</span>
                      <span className="font-bold">7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Significant Event:</span>
                      <span className="font-bold">March 15, 2023</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Damage Probability:</span>
                      <span className="font-bold text-yellow-600">Medium</span>
                    </div>
                  </div>
                  <Button>Check Your Storm History</Button>
                </div>
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden border-2 border-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-center text-gray-500">
                      Interactive Weather Event Map
                      <br />
                      (Enable JavaScript to view)
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Property History Database</h3>
                  <p className="text-gray-600">
                    Access the complete history of your roof, including installations, repairs, inspections, and
                    insurance claims. Like CarFax for your roof.
                  </p>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="font-bold">Original Installation</div>
                      <div className="text-sm text-gray-600">June 2015 - Asphalt Shingles</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="font-bold">Repair</div>
                      <div className="text-sm text-gray-600">August 2018 - Flashing repair after storm</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="font-bold">Inspection</div>
                      <div className="text-sm text-gray-600">March 2023 - Insurance inspection after hail</div>
                    </div>
                  </div>
                  <Button>View Your Roof's History</Button>
                </div>
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden border-2 border-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-center text-gray-500">
                      Interactive Timeline Viewer
                      <br />
                      (Enable JavaScript to view)
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="quotes" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Quote Generation System</h3>
                  <p className="text-gray-600">
                    Get instant, accurate quotes for roof repair or replacement based on your roof's measurements and
                    condition. Compare options and materials.
                  </p>
                  <div className="space-y-2">
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between">
                        <span className="font-bold">Basic Repair</span>
                        <span className="font-bold">$1,200 - $1,800</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Addresses current damage and leaks</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between">
                        <span className="font-bold">Partial Replacement</span>
                        <span className="font-bold">$4,500 - $6,200</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Replace damaged sections only</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between">
                        <span className="font-bold">Full Replacement</span>
                        <span className="font-bold">$8,900 - $12,400</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Complete roof replacement with warranty</p>
                    </div>
                  </div>
                  <Button>Generate Your Quote</Button>
                </div>
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden border-2 border-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-center text-gray-500">
                      Interactive Quote Builder
                      <br />
                      (Enable JavaScript to view)
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
