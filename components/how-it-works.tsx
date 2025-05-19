import { Search, Zap, FileText } from "lucide-react"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-[#0a0d17]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-500 mb-4 border border-yellow-500/20">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">How RoofFax Works</h2>
          <p className="max-w-[700px] text-gray-400 md:text-xl">
            Get comprehensive roof reports in seconds, not hours or days like our competitors.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border border-yellow-500/20 bg-black/20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
              <Search className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1. Enter Address</h3>
            <p className="text-gray-400">
              Simply enter any property address to get started. Our system will locate the property instantly.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border border-yellow-500/20 bg-black/20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Instant Analysis</h3>
            <p className="text-gray-400">
              Our AI analyzes satellite imagery, property data, and historical records in seconds.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border border-yellow-500/20 bg-black/20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
              <FileText className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Get Your Report</h3>
            <p className="text-gray-400">
              Receive a comprehensive report with measurements, damage assessment, and repair recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
