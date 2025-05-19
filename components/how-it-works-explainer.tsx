import Image from "next/image"
import { Search, FileText, CheckCircle } from "lucide-react"

export default function HowItWorksExplainer() {
  const steps = [
    {
      icon: Search,
      title: "Enter Your Address",
      description: "Simply enter your property address to start the process.",
    },
    {
      icon: FileText,
      title: "Get Your Report",
      description: "Our AI analyzes satellite imagery and data to generate a comprehensive roof report.",
    },
    {
      icon: CheckCircle,
      title: "Make Informed Decisions",
      description: "Use the detailed insights to plan maintenance, repairs, or discuss with contractors.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How RoofFax Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get detailed roof reports in minutes with our simple three-step process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 relative h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src="/roof-inspection-process.png"
            alt="Roof inspection process visualization"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  )
}
