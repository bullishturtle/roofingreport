import Image from "next/image"

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Enter Your Address",
      description: "Simply enter your property address to get started.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our AI analyzes satellite and aerial imagery of your roof.",
    },
    {
      number: "03",
      title: "Get Your Report",
      description: "Receive a comprehensive report on your roof's condition.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Getting your roof report is quick and easy with our simple 3-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 relative h-[300px] md:h-[400px]">
          <Image
            src="/roof-inspection-process.png"
            alt="How RoofFax works"
            fill
            style={{ objectFit: "cover", borderRadius: "0.5rem" }}
          />
        </div>
      </div>
    </section>
  )
}
