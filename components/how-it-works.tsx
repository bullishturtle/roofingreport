import { CheckCircle } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50" id="how-it-works">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How RoofFax Works</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Get comprehensive roof information in three simple steps
          </p>
        </div>

        <div className="grid gap-8 mt-12 md:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-bold">Enter Property Address</h3>
            <p className="text-gray-500">
              Simply enter the property address you want to research. Our system will locate the property in our
              database.
            </p>
            <ul className="space-y-2 text-left">
              <li className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                <span>Quick address lookup</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                <span>Automatic property identification</span>
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-bold">Generate Report</h3>
            <p className="text-gray-500">
              Our system compiles comprehensive data about the roof's history, condition, and estimated value.
            </p>
            <ul className="space-y-2 text-left">
              <li className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                <span>Detailed roof measurements</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                <span>Historical data analysis</span>
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-bold">Review Insights</h3>
            <p className="text-gray-500">
              Access your comprehensive roof report with actionable insights and recommendations.
            </p>
            <ul className="space-y-2 text-left">
              <li className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                <span>Professional assessment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                <span>Cost estimates and recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
