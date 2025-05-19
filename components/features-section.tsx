import { CloudLightning, Ruler, FileText, Phone, BarChart4, History, Users, Bot } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Ruler className="h-10 w-10 text-blue-600" />,
      title: "Satellite Aerial Measurements",
      description: "Get precise roof measurements using satellite imagery without climbing on your roof.",
    },
    {
      icon: <CloudLightning className="h-10 w-10 text-blue-600" />,
      title: "Storm Impact Analysis",
      description: "See how storms have affected your roof with historical weather data analysis.",
    },
    {
      icon: <Phone className="h-10 w-10 text-blue-600" />,
      title: "Property Skip Tracing",
      description: "Find and verify property owner contact information for accurate reporting.",
    },
    {
      icon: <FileText className="h-10 w-10 text-blue-600" />,
      title: "Quote Generation",
      description: "Receive detailed repair or replacement quotes based on your roof's condition.",
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-blue-600" />,
      title: "CRM Dashboard",
      description: "For professionals: manage leads, communications, and projects in one place.",
    },
    {
      icon: <History className="h-10 w-10 text-blue-600" />,
      title: "Property History Database",
      description: "Access complete historical records of your roof's maintenance and repairs.",
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "User Profile Routing",
      description: "Custom experiences for homeowners, contractors, realtors, and insurance agents.",
    },
    {
      icon: <Bot className="h-10 w-10 text-blue-600" />,
      title: "Roofus AI Assistant",
      description: "Get help from our AI assistant for all your roofing questions and concerns.",
    },
  ]

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600">
              Comprehensive Roof Intelligence
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              RoofFax.Report provides everything you need to know about your roof's condition, history, and future.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border p-6 transition-all hover:shadow-md"
            >
              <div className="p-2 rounded-full bg-blue-50">{feature.icon}</div>
              <h3 className="text-xl font-bold text-center">{feature.title}</h3>
              <p className="text-center text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
