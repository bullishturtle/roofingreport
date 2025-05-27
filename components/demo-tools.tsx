import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Satellite, CloudRain, FileText, Shield, MapPin, Camera } from "lucide-react"
import Link from "next/link"

export function DemoTools() {
  const tools = [
    {
      icon: <Satellite className="h-8 w-8 text-orange-500" />,
      title: "Aerial Measurements",
      description: "Get precise roof measurements from satellite imagery",
      demo: "View sample measurements for 123 Main St",
      link: "/demo/measurements",
    },
    {
      icon: <CloudRain className="h-8 w-8 text-blue-500" />,
      title: "Storm Timeline",
      description: "Track weather events and potential damage dates",
      demo: "See Hurricane Ian impact timeline",
      link: "/demo/storm-timeline",
    },
    {
      icon: <FileText className="h-8 w-8 text-green-500" />,
      title: "AI Property Report",
      description: "Comprehensive AI-generated property analysis",
      demo: "View sample AI report",
      link: "/demo/ai-report",
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Contractor Verification",
      description: "Verify door-to-door contractors and their credentials",
      demo: "Check ABC Roofing Company",
      link: "/demo/contractor-check",
    },
    {
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      title: "Property History",
      description: "Complete repair and ownership history",
      demo: "View property timeline",
      link: "/demo/property-history",
    },
    {
      icon: <Camera className="h-8 w-8 text-yellow-500" />,
      title: "Damage Assessment",
      description: "AI-powered damage detection from aerial photos",
      demo: "See damage analysis",
      link: "/demo/damage-assessment",
    },
  ]

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Try Our Tools <span className="text-orange-500">Free</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of RoofFax with these interactive demos. Get a taste of what our Pro platform offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 hover:border-orange-500/50 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  {tool.icon}
                  <CardTitle className="text-white group-hover:text-orange-400 transition-colors">
                    {tool.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-400">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <p className="text-sm text-gray-300 italic">"{tool.demo}"</p>
                </div>
                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  <Link href={tool.link}>Try Demo</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Want access to all tools and unlimited searches?</p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
          >
            <Link href="https://pro.therooffax.com">Upgrade to RoofFax Pro</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
