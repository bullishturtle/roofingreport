import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to experience the future of roof reporting?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of homeowners and professionals who trust RoofFax for accurate, instant roof insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-8 py-3 rounded-md text-center"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo"
              className="border border-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-md text-center"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
