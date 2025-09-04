import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
              <Skeleton className="w-24 h-6" />
            </div>
            <Skeleton className="w-32 h-10" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Demo Header Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="w-64 h-8 mx-auto mb-6" />
            <Skeleton className="w-96 h-6 mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="w-48 h-12" />
              <Skeleton className="w-32 h-12" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Analysis Progress Skeleton */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <Skeleton className="w-48 h-6" />
                <Skeleton className="w-64 h-4" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Skeleton className="w-6 h-6 rounded-full" />
                      <Skeleton className="flex-1 h-4" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-12 h-4" />
                  </div>
                  <Skeleton className="w-full h-2 rounded-full" />
                </div>
              </CardContent>
            </Card>

            {/* Sample Results Skeleton */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <Skeleton className="w-48 h-6" />
                <Skeleton className="w-64 h-4" />
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Info Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="w-32 h-5" />
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Skeleton className="w-4 h-4 mr-2" />
                      <Skeleton className="w-48 h-4" />
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="w-4 h-4 mr-2" />
                      <Skeleton className="w-40 h-4" />
                    </div>
                  </div>
                </div>

                {/* Damage Assessment Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="w-36 h-5" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-20 h-6 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="w-32 h-5" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="flex items-start">
                        <Skeleton className="w-4 h-4 mr-2 mt-0.5" />
                        <Skeleton className="flex-1 h-4" />
                      </div>
                    ))}
                  </div>
                </div>

                <Skeleton className="w-full h-12 rounded" />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Skeleton */}
          <div className="mt-12">
            <Card className="bg-slate-800/30 border-slate-700 max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <Skeleton className="w-48 h-6 mx-auto mb-4" />
                <Skeleton className="w-64 h-4 mx-auto mb-6" />
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center">
                    <Skeleton className="w-4 h-4 mr-2" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="w-4 h-4 mr-2" />
                    <Skeleton className="w-40 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
