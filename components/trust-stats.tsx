export function TrustStats() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 border-y border-yellow-500/20 bg-black/30 relative">
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 rounded-lg border-2 border-yellow-500/20 bg-black/50 backdrop-blur-sm shadow-lg">
            <div className="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              3.5M+
            </div>
            <div className="text-sm font-medium text-gray-400">Roofs Analyzed</div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 rounded-lg border-2 border-yellow-500/20 bg-black/50 backdrop-blur-sm shadow-lg">
            <div className="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              15K+
            </div>
            <div className="text-sm font-medium text-gray-400">Active Contractors</div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 rounded-lg border-2 border-yellow-500/20 bg-black/50 backdrop-blur-sm shadow-lg">
            <div className="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              98%
            </div>
            <div className="text-sm font-medium text-gray-400">Accuracy Rate</div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 rounded-lg border-2 border-yellow-500/20 bg-black/50 backdrop-blur-sm shadow-lg">
            <div className="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              2.5X
            </div>
            <div className="text-sm font-medium text-gray-400">Close Rate Increase</div>
          </div>
        </div>
      </div>
    </section>
  )
}
