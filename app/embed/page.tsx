export default function EmbedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-blue-950">
      <header className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold text-black">R</span>
          </div>
          <span className="text-xl font-bold text-white">RoofFax Widget Demo</span>
        </div>
      </header>

      <main className="container flex-1 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">Embed RoofFax in Your CRM</h1>
            <p className="text-gray-300">
              This page demonstrates how to embed the RoofFax widget in your CRM or website. Simply copy the iframe code
              below and paste it into your application.
            </p>

            <div className="rounded-lg bg-gray-800 p-4">
              <h3 className="mb-2 text-lg font-medium text-white">Embed Code</h3>
              <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-300">
                {`<iframe 
  src="${process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com"}/api/widget?address=123+Main+St" 
  width="100%" 
  height="600" 
  frameBorder="0"
></iframe>`}
              </pre>
            </div>

            <div className="rounded-lg bg-gray-800 p-4">
              <h3 className="mb-2 text-lg font-medium text-white">API Integration</h3>
              <p className="text-gray-300 mb-2">For direct API access, use our REST endpoints:</p>
              <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-300">
                {`GET /api/weather?address=123+Main+St
GET /api/measure?address=123+Main+St
GET /api/quote?address=123+Main+St&area=2000
GET /api/docs?reportId=abc123`}
              </pre>
            </div>
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-800 p-1">
            <div className="rounded bg-white p-4 h-full">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                    <span className="text-xl font-bold text-black">R</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">RoofFax</span>
                </div>
                <div className="text-sm text-gray-500">Widget Preview</div>
              </div>

              <div className="py-4">
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Property Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    defaultValue="123 Main St, Orlando, FL 32801"
                  />
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="text-lg font-medium text-gray-900">Roof Assessment</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Estimated Age</p>
                        <p className="font-medium">12-15 years</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Material</p>
                        <p className="font-medium">Asphalt Shingle</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Condition</p>
                        <p className="font-medium text-amber-600">Fair</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Est. Remaining Life</p>
                        <p className="font-medium">3-5 years</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="text-lg font-medium text-gray-900">Weather Events</h3>
                    <div className="mt-2">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          <span>Severe Hail (1.5"+)</span>
                        </div>
                        <span className="text-sm">Jun 2022</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                          <span>High Wind (45+ mph)</span>
                        </div>
                        <span className="text-sm">Sep 2022</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                          <span>Heavy Rain</span>
                        </div>
                        <span className="text-sm">Oct 2023</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="text-lg font-medium text-gray-900">Instant Quote</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Estimated Replacement Cost</p>
                      <p className="text-2xl font-bold text-gray-900">$12,500 - $15,800</p>
                      <button className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Get Detailed Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
