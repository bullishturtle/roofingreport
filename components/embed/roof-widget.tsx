"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Loader2, FileText, CloudLightning, Ruler, Calculator } from "lucide-react"
import axios from "axios"

// Define widget props
interface RoofWidgetProps {
  apiKey?: string
  defaultAddress?: string
  theme?: "light" | "dark"
  showTabs?: string[] // Array of tabs to show: "weather", "measure", "quote", "docs"
  height?: number
  width?: number
}

export function RoofWidget({
  apiKey,
  defaultAddress = "",
  theme = "dark",
  showTabs = ["weather", "measure", "quote", "docs"],
  height = 600,
  width = 400,
}: RoofWidgetProps) {
  const [address, setAddress] = useState(defaultAddress)
  const [searchInput, setSearchInput] = useState(defaultAddress)
  const [activeTab, setActiveTab] = useState(showTabs[0] || "measure")
  const [isLoading, setIsLoading] = useState(false)

  // Data states
  const [weatherData, setWeatherData] = useState<any>(null)
  const [measurementData, setMeasurementData] = useState<any>(null)
  const [quoteData, setQuoteData] = useState<any>(null)
  const [docsData, setDocsData] = useState<any>(null)

  // Fetch data when address changes
  useEffect(() => {
    if (address) {
      fetchData()
    }
  }, [address, activeTab])

  const fetchData = async () => {
    setIsLoading(true)

    try {
      // Fetch data based on active tab
      if (activeTab === "weather" && (!weatherData || weatherData.address !== address)) {
        const response = await axios.get(`/api/weather?location=${encodeURIComponent(address)}&history=true`)
        setWeatherData(response.data)
      }

      if (activeTab === "measure" && (!measurementData || measurementData.address !== address)) {
        const response = await axios.get(`/api/measure?address=${encodeURIComponent(address)}`)
        setMeasurementData(response.data)
      }

      if (activeTab === "quote" && (!quoteData || quoteData.address !== address)) {
        // First ensure we have measurement data
        let roofArea = measurementData?.roof?.totalArea
        if (!roofArea) {
          const measureResponse = await axios.get(`/api/measure?address=${encodeURIComponent(address)}`)
          roofArea = measureResponse.data.roof.totalArea
          if (!measurementData) setMeasurementData(measureResponse.data)
        }

        const response = await axios.get(`/api/quote?address=${encodeURIComponent(address)}&roofArea=${roofArea}`)
        setQuoteData(response.data)
      }

      if (activeTab === "docs" && (!docsData || docsData.address !== address)) {
        const response = await axios.get(`/api/docs?address=${encodeURIComponent(address)}`)
        setDocsData(response.data)
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab} data:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setAddress(searchInput)
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card
      className={`w-full max-w-[${width}px] h-[${height}px] overflow-hidden ${theme === "dark" ? "bg-gray-900 text-white border-gray-800" : "bg-white text-gray-900 border-gray-200"}`}
    >
      <CardHeader className={`pb-2 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <img src="/images/roofus.png" alt="RoofFax" className="h-6 w-6 rounded-full" />
            RoofFax
          </span>
          {address && <span className="text-sm font-normal truncate max-w-[200px]">{address}</span>}
        </CardTitle>
        <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
          Instant roof data and analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 space-y-3 overflow-y-auto" style={{ height: `calc(${height}px - 140px)` }}>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Enter property address..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={`${theme === "dark" ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"}`}
          />
          <Button
            type="submit"
            variant={theme === "dark" ? "default" : "outline"}
            size="icon"
            className={theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300 hover:bg-gray-100"}
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {showTabs.length > 1 && (
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              className={`grid w-full grid-cols-${showTabs.length} ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
            >
              {showTabs.includes("weather") && (
                <TabsTrigger value="weather" className="flex items-center gap-1">
                  <CloudLightning className="h-4 w-4" />
                  <span className="hidden sm:inline">Weather</span>
                </TabsTrigger>
              )}
              {showTabs.includes("measure") && (
                <TabsTrigger value="measure" className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  <span className="hidden sm:inline">Measure</span>
                </TabsTrigger>
              )}
              {showTabs.includes("quote") && (
                <TabsTrigger value="quote" className="flex items-center gap-1">
                  <Calculator className="h-4 w-4" />
                  <span className="hidden sm:inline">Quote</span>
                </TabsTrigger>
              )}
              {showTabs.includes("docs") && (
                <TabsTrigger value="docs" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Docs</span>
                </TabsTrigger>
              )}
            </TabsList>

            {/* Weather Tab Content */}
            {showTabs.includes("weather") && (
              <TabsContent value="weather" className="space-y-4 mt-2">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                  </div>
                ) : weatherData ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={weatherData.current.condition.icon || "/placeholder.svg"}
                          alt={weatherData.current.condition.text}
                          className="h-12 w-12"
                        />
                        <div>
                          <h3 className="text-xl font-bold">{weatherData.current.temp_f}°F</h3>
                          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            {weatherData.current.condition.text}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Feels like</p>
                        <p className="text-lg font-medium">{weatherData.current.feelslike_f}°F</p>
                      </div>
                    </div>

                    {weatherData.history?.events && (
                      <div className={`rounded-md p-3 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                        <h3 className="font-medium mb-2">Recent Storm Events</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {weatherData.history.events.map((event: any, index: number) => (
                            <div
                              key={index}
                              className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                            >
                              <div className="flex justify-between">
                                <span className="font-medium">{event.type}</span>
                                <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                  {event.date}
                                </span>
                              </div>
                              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                {event.description}
                              </p>
                              {event.wind_mph && (
                                <p className="text-xs mt-1">
                                  Wind: {event.wind_mph} mph | Rain: {event.precip_in}"
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : address ? (
                  <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    No weather data available
                  </div>
                ) : (
                  <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Enter an address to see weather data
                  </div>
                )}
              </TabsContent>
            )}

            {/* Measurement Tab Content */}
            {showTabs.includes("measure") && (
              <TabsContent value="measure" className="space-y-4 mt-2">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                  </div>
                ) : measurementData ? (
                  <div className="space-y-4">
                    <div className={`rounded-md p-3 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                      <h3 className="font-medium mb-2">Roof Measurements</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div
                          className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                        >
                          <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            Total Area
                          </p>
                          <p className="font-bold">{measurementData.roof.totalArea} sq ft</p>
                        </div>
                        <div
                          className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                        >
                          <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Pitch</p>
                          <p className="font-bold">{measurementData.roof.pitch}</p>
                        </div>
                        <div
                          className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                        >
                          <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Ridges</p>
                          <p className="font-bold">{measurementData.roof.ridges} ft</p>
                        </div>
                        <div
                          className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                        >
                          <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Valleys</p>
                          <p className="font-bold">{measurementData.roof.valleys} ft</p>
                        </div>
                      </div>
                    </div>

                    <div className={`rounded-md p-3 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                      <h3 className="font-medium mb-2">Condition Assessment</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span>Overall Condition:</span>
                        <span
                          className={`px-2 py-1 rounded-md text-sm ${
                            measurementData.condition.overall === "Excellent"
                              ? "bg-green-500/20 text-green-500"
                              : measurementData.condition.overall === "Good"
                                ? "bg-blue-500/20 text-blue-500"
                                : measurementData.condition.overall === "Fair"
                                  ? "bg-amber-500/20 text-amber-500"
                                  : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {measurementData.condition.overall}
                        </span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Estimated Age:</span>
                        <span className="text-sm">{measurementData.condition.estimatedAge} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Remaining Life:</span>
                        <span
                          className={`text-sm ${
                            measurementData.condition.remainingLife <= 2
                              ? "text-red-500"
                              : measurementData.condition.remainingLife <= 5
                                ? "text-amber-500"
                                : "text-green-500"
                          }`}
                        >
                          {measurementData.condition.remainingLife} years
                        </span>
                      </div>
                    </div>

                    {measurementData.condition.issues.length > 0 && (
                      <div className={`rounded-md p-3 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                        <h3 className="font-medium mb-2">Identified Issues</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {measurementData.condition.issues.map((issue: any, index: number) => (
                            <div
                              key={index}
                              className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                            >
                              <div className="flex justify-between">
                                <span className="font-medium">{issue.type}</span>
                                <span
                                  className={`text-xs px-1.5 py-0.5 rounded ${
                                    issue.severity === "Severe"
                                      ? "bg-red-500/20 text-red-500"
                                      : issue.severity === "Moderate"
                                        ? "bg-amber-500/20 text-amber-500"
                                        : "bg-yellow-500/20 text-yellow-500"
                                  }`}
                                >
                                  {issue.severity}
                                </span>
                              </div>
                              <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                {issue.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : address ? (
                  <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    No measurement data available
                  </div>
                ) : (
                  <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Enter an address to see roof measurements
                  </div>
                )}
              </TabsContent>
            )}

            {/* Quote Tab Content */}
            {showTabs.includes("quote") && (
              <TabsContent value="quote" className="space-y-4 mt-2">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                  </div>
                ) : quoteData ? (
                  <div className="space-y-4">
                    <div className={`rounded-md p-3 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                      <h3 className="font-medium mb-2">Pricing Options</h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {quoteData.options.map((option: any) => (
                          <div
                            key={option.id}
                            className={`p-2 rounded-md ${
                              option.recommended
                                ? theme === "dark"
                                  ? "bg-blue-900/50 border border-blue-700"
                                  : "bg-blue-50 border border-blue-200"
                                : theme === "dark"
                                  ? "bg-gray-700"
                                  : "bg-white border border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-medium">{option.name}</span>
                              <span className="font-bold">{formatCurrency(option.price)}</span>
                            </div>
                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              {option.description}
                            </p>
                            <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              Materials: {option.materials}
                            </p>
                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              Warranty: {option.warranty}
                            </p>
                            {option.recommended && (
                              <div
                                className={`text-xs mt-1 px-1.5 py-0.5 rounded inline-block ${
                                  theme === "dark" ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                Recommended
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`rounded-md p-3 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                      <h3 className="font-medium mb-2">Additional Services</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {quoteData.additionalServices.map((service: any) => (
                          <div
                            key={service.id}
                            className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-white border border-gray-200"}`}
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{service.name}</span>
                              <span className="font-bold">{formatCurrency(service.price)}</span>
                            </div>
                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              {service.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : address ? (
                  <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    No quote data available
                  </div>
                ) : (
                  <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Enter an address to see pricing
                  </div>
                )}
              </TabsContent>
            )}

            {/* Docs Tab Content */}
            {showTabs.includes("docs") && (
              <TabsContent value="docs" className="space-y-4 mt-2">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                  </div>
                ) : docsData && docsData.length > 0 ? (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {docsData.map((doc: any) => (
                      <div
                        key={doc.id}
                        className={`p-3 rounded-md ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-white"}`}>
                            <FileText className="h-6 w-6 text-blue-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{doc.title}</h3>
                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              {doc.date}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`text-xs px-1.5 py-0.5 rounded ${
                                  doc.status === "signed"
                                    ? "bg-green-500/20 text-green-500"
                                    : doc.status === "viewed"
                                      ? "bg-blue-500/20 text-blue-500"
                                      : doc.status === "sent"
                                        ? "bg-amber-500/20 text-amber-500"
                                        : doc.status === "expired"
                                          ? "bg-red-500/20 text-red-500"
                                          : "bg-gray-500/20 text-gray-500"
                                }`}
                              >
                                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                              </span>
                              <span
                                className={`text-xs px-1.5 py-0.5 rounded ${
                                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                                }`}
                              >
                                {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : address ? (
                  <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    No documents available
                  </div>
                ) : (
                  <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Enter an address to see documents
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        )}
      </CardContent>
      <CardFooter
        className={`p-3 ${theme === "dark" ? "bg-gray-800 border-t border-gray-700" : "bg-gray-100 border-t border-gray-200"}`}
      >
        <div className="w-full flex justify-between items-center">
          <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Powered by RoofFax</span>
          <Button
            size="sm"
            className={theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}
            onClick={() => window.open("https://rooffax.com", "_blank")}
          >
            Get Full Report
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
