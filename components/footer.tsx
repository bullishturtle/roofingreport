import { Facebook, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center text-black font-bold text-2xl">
              R
            </div>
            <div className="ml-2 text-2xl font-bold">
              Roof<span className="text-yellow-500">Fax</span>
            </div>
          </div>

          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-yellow-500 transition-colors">
              About
            </Link>
            <Link href="/features" className="hover:text-yellow-500 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-yellow-500 transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-yellow-500 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-yellow-500 transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-yellow-500 transition-colors">
              Privacy
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            <p>Business: RoofFax.Report (by Thomas Roofing & Repair Inc.)</p>
            <p>Email: Landon@rooffax.com</p>
            <p>Phone: (850) 879-9172</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-2">
              <a href="https://facebook.com" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Linkedin />
              </a>
            </div>
            <p className="text-gray-500 text-sm">Powered by RoofFax™ | All rights reserved</p>
            <div className="flex space-x-4 text-sm text-gray-500 mt-1">
              <Link href="/terms" className="hover:text-yellow-500 transition-colors">
                Terms of Service
              </Link>
              <span>|</span>
              <Link href="/privacy" className="hover:text-yellow-500 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
