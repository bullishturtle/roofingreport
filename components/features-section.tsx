import { Shield, BarChart, Clock, Zap, FileText, Users } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Comprehensive Analysis",
      description: "Get detailed insights about your roof condition, materials, and potential issues.",
    },
    {
      icon: BarChart,
      title: "Data-Driven Reports",
      description: "Our reports are based on real data, satellite imagery, and AI analysis.",
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "No waiting for inspectors. Get your roof report in minutes, not days.",
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Advanced algorithms analyze your roof for damage, wear, and potential problems.",
    },
    {
      icon: FileText,
      title: "Detailed Documentation",
      description: "Receive professional documentation you can share with contractors or insurance.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our team of roof experts is available to help interpret your report.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes TheRoofFax.com the leading platform for roof reports and assessments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
