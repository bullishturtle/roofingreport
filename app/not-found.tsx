import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="mt-8 text-2xl font-bold text-gray-800">Page Not Found</h2>
        <p className="mt-4 text-gray-600">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/contact">
              <ArrowLeft className="h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Looking for something specific?</h3>
          <div className="flex gap-2">
            <Input placeholder="Search RoofFax..." className="flex-1" />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
