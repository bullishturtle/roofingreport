export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            How <span className="text-yellow-500">RoofFax</span> Works
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Get comprehensive roof and property reports in three simple steps. No complicated setup, no waiting for
            days.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gray-800 md:hidden"></div>
          <div className="absolute left-0 top-1/2 hidden h-1 w-full -translate-y-1/2 bg-gray-800 md:block"></div>

          <div className="grid gap-12 md:grid-cols-3">
            <Step
              number={1}
              title="Enter Address"
              description="Simply enter the property address to start the process."
            />
            <Step
              number={2}
              title="AI Analysis"
              description="Our AI analyzes satellite imagery, public records, and weather data."
            />
            <Step
              number={3}
              title="Get Report"
              description="Receive a comprehensive report with measurements, condition, and recommendations."
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="rounded-md bg-yellow-500 px-6 py-3 font-medium text-black hover:bg-yellow-400">
            Try It Now
          </button>
        </div>
      </div>
    </section>
  )
}

interface StepProps {
  number: number
  title: string
  description: string
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-2xl font-bold text-black">
        {number}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

export default HowItWorksSection
