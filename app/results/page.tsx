"use client"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Download,
  Share2,
  Eye,
  EyeOff,
  MapPin,
  Calendar,
  Zap,
  Shield,
  BarChart3,
  FileText,
  Camera,
  CloudRain,
  Home,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Ruler,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function ResultsPage() {
  const [isBlurred, setIsBlurred] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([])

  useEffect(() => {
    // Generate random stars for the background
    const newStars = Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
    }))
    setStars(newStars)
  }, [])

  const propertyData = {
    address: "123 Main Street, Anytown, FL 32801",
    reportId: "RFX-2024-001234",
    generatedDate: "January 15, 2025",
    totalArea: "2,450 sq ft",
    pitch: "6:12",
    facets: 8,
    material: "Asphalt Shingles",
    roofAge: "8 years",
    condition: "Good",
    riskScore: 23,
    lastInspection: "March 2023",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white relative overflow-hidden">
      {/* Stars background */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Earth in background - closer now that we've "landed" */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-radial from-blue-500/30 to-transparent opacity-40 z-0"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="sm" className="text-white">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                <span className="text-black font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold">
                Roof<span className="text-yellow-500">Fax</span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-600 text-white bg-transparent">
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-gray-600 text-white bg-transparent">
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </header>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-green-500/20 rounded-full p-4">
              <CheckCircle className="text-green-400" size={48} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-green-400">Landing successful.</span> Welcome home.
          </h1>
          <p className="text-gray-300 mb-4">Your property coordinates have been decoded. Here's what we found.</p>

          {/* Fox mascot with message */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-black font-bold text-sm">🦊</span>
            </div>
            <p className="text-sm text-yellow-400 italic">"I see it clearly now. Your roof tells quite a story."</p>
          </div>
        </motion.div>

        {/* Property Info Header */}
        <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-yellow-500 mt-1" size={20} />
                  <div>
                    <h3 className="font-bold mb-1">Property Address</h3>
                    <p className="text-gray-300">{propertyData.address}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <FileText className="text-yellow-500 mt-1" size={20} />
                  <div>
                    <h3 className="font-bold mb-1">Report ID</h3>
                    <p className="text-gray-300">{propertyData.reportId}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <Calendar className="text-yellow-500 mt-1" size={20} />
                  <div>
                    <h3 className="font-bold mb-1">Generated</h3>
                    <p className="text-gray-300">{propertyData.generatedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blur Toggle */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setIsBlurred(!isBlurred)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
          >
            {isBlurred ? (
              <>
                <Eye size={16} className="mr-2" />
                Unlock Full Report (Upgrade Required)
              </>
            ) : (
              <>
                <EyeOff size={16} className="mr-2" />
                Preview Mode
              </>
            )}
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 max-w-4xl mx-auto bg-gray-900/50 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="storms">Storm Data</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="3d">3D View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Risk Score */}
              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="text-green-400" size={20} />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{propertyData.riskScore}/100</div>
                    <p className="text-sm text-gray-400 mb-4">Low Risk Score</p>
                    <Progress value={propertyData.riskScore} className="mb-2" />
                    <p className="text-xs text-gray-500">Based on age, condition, and weather exposure</p>
                  </div>
                </CardContent>
              </Card>

              {/* Roof Condition */}
              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="text-blue-400" size={20} />
                    Roof Condition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                      {propertyData.condition}
                    </Badge>
                    <p className="text-sm text-gray-400 mb-2">Age: {propertyData.roofAge}</p>
                    <p className="text-sm text-gray-400">Material: {propertyData.material}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Weather Exposure */}
              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudRain className="text-blue-400" size={20} />
                    Weather Exposure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Hail Risk</span>
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                        Moderate
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Wind Risk</span>
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        Low
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Storm Frequency</span>
                      <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                        High
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Ruler className="mx-auto text-yellow-500 mb-2" size={24} />
                  <h3 className="text-lg font-bold">{propertyData.totalArea}</h3>
                  <p className="text-xs text-gray-400">Total Area</p>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="mx-auto text-yellow-500 mb-2" size={24} />
                  <h3 className="text-lg font-bold">{propertyData.pitch}</h3>
                  <p className="text-xs text-gray-400">Roof Pitch</p>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Layers className="mx-auto text-yellow-500 mb-2" size={24} />
                  <h3 className="text-lg font-bold">{propertyData.facets}</h3>
                  <p className="text-xs text-gray-400">Roof Facets</p>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Clock className="mx-auto text-yellow-500 mb-2" size={24} />
                  <h3 className="text-lg font-bold">{propertyData.roofAge}</h3>
                  <p className="text-xs text-gray-400">Estimated Age</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="measurements">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="text-blue-400" size={20} />
                    Satellite Aerial Measurements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-6">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Satellite view of property"
                      width={400}
                      height={300}
                      className={`w-full rounded-md ${isBlurred ? "blur-sm" : ""}`}
                    />
                    {isBlurred && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                        <div className="text-center">
                          <Eye className="mx-auto text-yellow-500 mb-2" size={32} />
                          <p className="text-sm text-yellow-400">Upgrade to view detailed measurements</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Area:</span>
                      <span className={`font-bold ${isBlurred ? "blur-sm" : ""}`}>{propertyData.totalArea}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pitch:</span>
                      <span className={`font-bold ${isBlurred ? "blur-sm" : ""}`}>{propertyData.pitch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Facets:</span>
                      <span className={`font-bold ${isBlurred ? "blur-sm" : ""}`}>{propertyData.facets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Material:</span>
                      <span className={`font-bold ${isBlurred ? "blur-sm" : ""}`}>{propertyData.material}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="text-green-400" size={20} />
                    Detailed Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Roof Complexity Score</h4>
                      <Progress value={65} className="mb-2" />
                      <p className="text-sm text-gray-400">Moderate complexity due to multiple facets</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Accessibility Rating</h4>
                      <Progress value={80} className="mb-2" />
                      <p className="text-sm text-gray-400">Good accessibility for maintenance</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Drainage Efficiency</h4>
                      <Progress value={90} className="mb-2" />
                      <p className="text-sm text-gray-400">Excellent water drainage design</p>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        Get Detailed Measurements Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-purple-400" size={20} />
                  Property History Database
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6">
                  Access the complete history of your roof, including installations, repairs, inspections, and insurance
                  claims. Like CarFax for your roof.
                </p>

                <div className="space-y-4">
                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-500 rounded-full w-3 h-3"></div>
                      <h4 className="font-semibold">Original Installation</h4>
                      <Badge variant="outline" className="ml-auto">
                        June 2015
                      </Badge>
                    </div>
                    <p className={`text-sm text-gray-400 ${isBlurred ? "blur-sm" : ""}`}>
                      Asphalt Shingles - Professional installation by ABC Roofing Co.
                    </p>
                  </div>

                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-yellow-500 rounded-full w-3 h-3"></div>
                      <h4 className="font-semibold">Repair</h4>
                      <Badge variant="outline" className="ml-auto">
                        August 2018
                      </Badge>
                    </div>
                    <p className={`text-sm text-gray-400 ${isBlurred ? "blur-sm" : ""}`}>
                      Flashing repair after storm - Insurance claim #INS-2018-4567
                    </p>
                  </div>

                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-500 rounded-full w-3 h-3"></div>
                      <h4 className="font-semibold">Inspection</h4>
                      <Badge variant="outline" className="ml-auto">
                        {propertyData.lastInspection}
                      </Badge>
                    </div>
                    <p className={`text-sm text-gray-400 ${isBlurred ? "blur-sm" : ""}`}>
                      Insurance inspection after hail - No damage found
                    </p>
                  </div>

                  {isBlurred && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
                      <FileText className="mx-auto text-gray-500 mb-4" size={48} />
                      <p className="text-gray-400 mb-4">5+ additional historical records available</p>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">View Complete History</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storms">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="text-orange-400" size={20} />
                    Storm Tracking & Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-6">
                    <Image
                      src="/placeholder.svg?height=250&width=350"
                      alt="Storm tracking map"
                      width={350}
                      height={250}
                      className={`w-full rounded-md ${isBlurred ? "blur-sm" : ""}`}
                    />
                    {isBlurred && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                        <div className="text-center">
                          <CloudRain className="mx-auto text-yellow-500 mb-2" size={32} />
                          <p className="text-sm text-yellow-400">Upgrade for live storm tracking</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Major Storm:</span>
                      <span className={`${isBlurred ? "blur-sm" : ""}`}>Hurricane Ian - Sept 2022</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hail Events (5yr):</span>
                      <span className={`${isBlurred ? "blur-sm" : ""}`}>3 events</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Wind Speed:</span>
                      <span className={`${isBlurred ? "blur-sm" : ""}`}>85 mph</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="text-red-400" size={20} />
                    Risk Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-yellow-500/30 bg-yellow-500/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="text-yellow-500" size={16} />
                        <span className="font-semibold text-yellow-500">Moderate Risk</span>
                      </div>
                      <p className="text-sm text-gray-300">Peak hail season approaching (March-May)</p>
                    </div>

                    <div className="border border-green-500/30 bg-green-500/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="font-semibold text-green-500">Low Risk</span>
                      </div>
                      <p className="text-sm text-gray-300">No severe weather expected next 7 days</p>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        Enable Storm Alerts
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="text-cyan-400" size={20} />
                  AI-Generated Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Key Findings</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                        <div>
                          <p className="font-medium">Excellent Condition</p>
                          <p className={`text-sm text-gray-400 ${isBlurred ? "blur-sm" : ""}`}>
                            Roof shows minimal wear for its age. Expected lifespan: 12-15 more years.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <AlertTriangle className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                        <div>
                          <p className="font-medium">Maintenance Recommendation</p>
                          <p className={`text-sm text-gray-400 ${isBlurred ? "blur-sm" : ""}`}>
                            Schedule gutter cleaning and minor flashing inspection within 6 months.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <TrendingUp className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                        <div>
                          <p className="font-medium">Market Analysis</p>
                          <p className={`text-sm text-gray-400 ${isBlurred ? "blur-sm" : ""}`}>
                            Roof condition adds $8,500-$12,000 to property value compared to similar homes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Recommended Actions</h4>
                    <div className="space-y-3">
                      <div className="border border-gray-700 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Gutter Maintenance</span>
                          <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                            Priority: Medium
                          </Badge>
                        </div>
                        <p className={`text-sm text-gray-400 ${isBlurred ? "blur-sm" : ""}`}>
                          Clean gutters and check downspouts for proper drainage.
                        </p>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Annual Inspection</span>
                          <Badge variant="outline" className="border-green-500/30 text-green-400">
                            Priority: Low
                          </Badge>
                        </div>
                        <p className={`text-sm text-gray-400 ${isBlurred ? "blur-sm" : ""}`}>
                          Schedule professional inspection in 12 months.
                        </p>
                      </div>
                    </div>

                    {isBlurred && (
                      <div className="mt-6 text-center py-4 border-2 border-dashed border-gray-600 rounded-lg">
                        <p className="text-gray-400 mb-3">Get personalized maintenance timeline</p>
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Unlock AI Insights</Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="3d">
            <Card className="bg-black/40 border border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="text-purple-400" size={20} />
                  Interactive 3D Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="3D house model"
                      width={600}
                      height={400}
                      className={`w-full h-full object-cover ${isBlurred ? "blur-md" : ""}`}
                    />

                    {isBlurred ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <div className="text-center">
                          <Layers className="mx-auto text-yellow-500 mb-4" size={48} />
                          <h3 className="text-xl font-bold mb-2">Interactive 3D Model</h3>
                          <p className="text-gray-400 mb-4">Rotate, zoom, and explore your roof in detail</p>
                          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Unlock 3D View</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/80 rounded-lg p-3">
                          <p className="text-sm text-gray-300 mb-2">Interactive Controls:</p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              Click + Drag to Rotate
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Scroll to Zoom
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Double-click to Reset
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upgrade CTA */}
        <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm mt-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready for the Full Journey?</h2>
            <p className="text-gray-300 mb-6">
              This free report showed you the basics. Unlock unlimited reports, live storm tracking, and professional
              tools to navigate any property challenge.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="bg-yellow-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Zap className="text-yellow-500" size={24} />
                </div>
                <h4 className="font-semibold mb-1">Unlimited Reports</h4>
                <p className="text-sm text-gray-400">Pull reports for any property, anytime</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <CloudRain className="text-yellow-500" size={24} />
                </div>
                <h4 className="font-semibold mb-1">Live Storm Alerts</h4>
                <p className="text-sm text-gray-400">Real-time notifications for your properties</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="text-yellow-500" size={24} />
                </div>
                <h4 className="font-semibold mb-1">Pro Dashboard</h4>
                <p className="text-sm text-gray-400">Manage leads, projects, and analytics</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8">
                Start Pro Trial - Free for 14 Days
              </Button>
              <Button variant="outline" className="border-gray-600 text-white bg-transparent">
                View Pricing Plans
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="text-black font-bold text-sm">R</span>
            </div>
            <span className="text-lg font-bold">
              Roof<span className="text-yellow-500">Fax</span>
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-2">Powered by RoofFax™ | All rights reserved © 2025</p>
          <div className="flex justify-center gap-4 text-sm">
            <Button variant="link" className="text-gray-400 p-0 h-auto">
              Terms of Service
            </Button>
            <Button variant="link" className="text-gray-400 p-0 h-auto">
              Privacy Policy
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}
