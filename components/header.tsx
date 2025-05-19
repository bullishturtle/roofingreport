import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              TheRoofFax<span className="text-blue-600">.com</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="https://trustthefox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block text-gray-700 hover:text-blue-600 transition-colors"
            >
              For Homeowners
            </a>
            <a href="https://rooffaxpro.com" target="_blank" rel="noopener noreferrer">
              <Button>For Roofing Pros</Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
