import Link from "next/link"
import { getAppVersion } from "@/lib/env"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const appVersion = getAppVersion()

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">RoofFax</h3>
            <p className="text-sm text-gray-600">
              The trusted source for comprehensive roof information, history, and condition assessments.
            </p>
            <div className="text-sm text-gray-500">
              <p>Email: Landon@rooffax.com</p>
              <p>Phone: (850) 879-9172</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-gray-600 hover:text-gray-900">
                  Get Report
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div className="space-y-4">
            <h4 className="font-semibold">RoofFax Ecosystem</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://therooffax.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  theRoofFax.com
                </a>
              </li>
              <li>
                <a
                  href="https://trustthefox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  trustthefox.com
                </a>
              </li>
              <li>
                <a
                  href="https://rooffaxpro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  rooffaxpro.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-4 md:mb-0">
            <p>Powered by RoofFax™ | All rights reserved © {currentYear}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span>Version {appVersion}</span>
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
