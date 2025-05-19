export default function CTASection() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-black md:text-4xl">
                Ready to transform your roofing business?
              </h2>
              <p className="mb-6 text-black/80">
                Join thousands of successful contractors who are closing more deals and growing their business with
                RoofFax.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-md bg-black px-6 py-3 font-medium text-white hover:bg-gray-900">
                  Get Started Free
                </button>
                <button className="rounded-md border border-black bg-transparent px-6 py-3 font-medium text-black hover:bg-yellow-400">
                  Schedule Demo
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 text-center text-lg font-bold text-gray-900">Try RoofFax Risk-Free</div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="mr-2 h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>14-day free trial</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-2 h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>No credit card required</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-2 h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Cancel anytime</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-2 h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Full feature access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
