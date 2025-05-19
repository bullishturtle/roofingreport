export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Your Address",
      description: "Simply enter your property address and contact information.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our AI analyzes satellite imagery, public records, and weather data.",
    },
    {
      number: "03",
      title: "Get Your Report",
      description: "Receive a comprehensive report on your roof's condition and history.",
    },
  ]

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mb-4">
              {step.number}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
