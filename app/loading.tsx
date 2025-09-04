import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Skeleton */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                <span className="text-yellow-400">Roof</span>Fax
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Skeleton className="h-4 w-16 bg-slate-700" />
              <Skeleton className="h-4 w-24 bg-slate-700" />
              <Skeleton className="h-4 w-32 bg-slate-700" />
              <Skeleton className="h-10 w-32 bg-slate-700" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-8 w-64 bg-slate-700 mx-auto mb-6" />
            <Skeleton className="h-16 w-full bg-slate-700 mx-auto mb-6" />
            <Skeleton className="h-6 w-3/4 bg-slate-700 mx-auto mb-8" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Skeleton className="h-14 w-48 bg-slate-700" />
              <Skeleton className="h-14 w-40 bg-slate-700" />
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8">
              <Skeleton className="h-5 w-32 bg-slate-700" />
              <Skeleton className="h-5 w-36 bg-slate-700" />
              <Skeleton className="h-5 w-28 bg-slate-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections Skeleton */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-96 bg-slate-700 mx-auto mb-6" />
              <Skeleton className="h-6 w-64 bg-slate-700 mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                  <Skeleton className="h-12 w-12 bg-slate-700 mx-auto mb-4" />
                  <Skeleton className="h-6 w-32 bg-slate-700 mx-auto mb-3" />
                  <Skeleton className="h-4 w-full bg-slate-700 mb-2" />
                  <Skeleton className="h-4 w-3/4 bg-slate-700 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-80 bg-slate-700 mx-auto mb-6" />
              <Skeleton className="h-6 w-48 bg-slate-700 mx-auto" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <Skeleton className="w-12 h-12 rounded-full bg-slate-700 flex-shrink-0" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-48 bg-slate-700 mb-2" />
                      <Skeleton className="h-4 w-full bg-slate-700 mb-1" />
                      <Skeleton className="h-4 w-3/4 bg-slate-700" />
                    </div>
                  </div>
                ))}
              </div>
              <Skeleton className="h-80 w-full bg-slate-700 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
