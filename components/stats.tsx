export function Stats() {
  return (
    <section className="py-12 bg-[#0a0d17]">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-yellow-500/20 bg-black/20">
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-500">3.5M+</h3>
            <p className="text-gray-400 text-sm md:text-base">Roofs Analyzed</p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-yellow-500/20 bg-black/20">
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-500">15K+</h3>
            <p className="text-gray-400 text-sm md:text-base">Active Contractors</p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-yellow-500/20 bg-black/20">
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-500">98%</h3>
            <p className="text-gray-400 text-sm md:text-base">Accuracy Rate</p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-yellow-500/20 bg-black/20">
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-500">2.5X</h3>
            <p className="text-gray-400 text-sm md:text-base">Close Rate Increase</p>
          </div>
        </div>
      </div>
    </section>
  )
}
