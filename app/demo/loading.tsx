import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DemoLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header Skeleton */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Demo Header Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Analysis Progress Skeleton */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Skeleton className="w-5 h-5 mr-2" />
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Skeleton className="w-6 h-6 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Sample Results Skeleton */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Skeleton className="w-5 h-5 mr-2" />
                  <Skeleton className="h-6 w-40" />
                </CardTitle>
                <Skeleton className="h-4 w-56" />
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Info Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Skeleton className="w-4 h-4 mr-2" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="w-4 h-4 mr-2" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                </div>

                {/* Damage Assessment Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-5 w-36" />
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-start">
                        <Skeleton className="w-4 h-4 mr-2 mt-0.5 rounded-full" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <Skeleton className="h-12 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Skeleton */}
          <div className="mt-12">
            <Card className="bg-slate-800/30 border-slate-700 max-w-2xl mx-auto">
              <CardContent className="pt-6 text-center">
                <Skeleton className="h-6 w-64 mx-auto mb-4" />
                <Skeleton className="h-4 w-80 mx-auto mb-6" />
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center">
                    <Skeleton className="w-4 h-4 mr-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="w-4 h-4 mr-2" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Skeleton className="h-4 w-64 mx-auto mb-2" />
            <div className="flex justify-center space-x-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
