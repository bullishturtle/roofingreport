import { Search, Zap, Shield } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-yellow-500" />,
      title: "1. Enter Address",
      description: "Simply enter any property address to get started. Our system will locate the property instantly.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "2. Instant Analysis",
      description: "Our AI analyzes satellite imagery, property data, and historical records in seconds.",
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      title: "3. Get Your Report",
      description:
        "Receive a comprehensive roof report with measurements, condition assessment, and actionable insights.",
    },
  ]

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <div className="inline-block border border-yellow-500 text-yellow-500 font-semibold px-6 py-2 rounded-full mb-4">
          Simple Process
        </div>
        <h2 className="text-4xl font-bold mb-4">How RoofFax Works</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Get comprehensive roof reports in seconds, not hours or days like our competitors.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="border-2 border-yellow-500/30 rounded-xl p-8 bg-black/20 hover:bg-black/30 transition-colors"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-900/50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-300 max-w-2xl">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
