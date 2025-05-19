import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#070a12] border-t border-gray-800">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-black font-bold text-xl">
                R
              </div>
              <span className="text-xl font-bold">
                Roof<span className="text-yellow-500">Fax</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              The world's smartest roof and property report platform. Trusted by homeowners, built for professionals.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-yellow-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-yellow-500">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#how-it-works" className="text-gray-400 hover:text-yellow-500">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-400 hover:text-yellow-500">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-400 hover:text-yellow-500">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-yellow-500">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-yellow-500">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">For Professionals</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://rooffaxpro.com" className="text-gray-400 hover:text-yellow-500">
                  RoofFax Pro
                </Link>
              </li>
              <li>
                <Link href="/partner-program" className="text-gray-400 hover:text-yellow-500">
                  Partner Program
                </Link>
              </li>
              <li>
                <Link href="/api-documentation" className="text-gray-400 hover:text-yellow-500">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-yellow-500">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5 text-yellow-500" />
                <a href="mailto:Landon@rooffax.com" className="hover:text-yellow-500">
                  Landon@rooffax.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-5 w-5 text-yellow-500" />
                <a href="tel:+18508799172" className="hover:text-yellow-500">
                  (850) 879-9172
                </a>
              </li>
            </ul>
            <p className="mt-4 text-gray-400">RoofFax.Report (by Thomas Roofing & Repair Inc.)</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">Powered by RoofFax™ | All rights reserved</p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-400 hover:text-yellow-500 text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-yellow-500 text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
