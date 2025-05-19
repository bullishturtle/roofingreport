import Link from "next/link"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-yellow-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center mr-2">
                <span className="text-black font-bold">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                Roof<span className="text-yellow-500">Fax</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">The World's Smartest Roof & Property Report</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Our Platforms</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://therooffax.com" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  TheRoofFax.com
                </a>
              </li>
              <li>
                <a href="https://trustthefox.com" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  TrustTheFox.com
                </a>
                <span className="ml-2 text-xs text-yellow-500">Coming Soon</span>
              </li>
              <li>
                <a href="https://rooffaxpro.com" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  RoofFaxPro.com
                </a>
                <span className="ml-2 text-xs text-yellow-500">Coming Soon</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <NewsletterSignup />

            <div className="mt-6 space-y-2">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-500 mr-2" />
                <a href="mailto:info@therooffax.com" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  info@therooffax.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-yellow-500 mr-2" />
                <a href="tel:+18508799172" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  (850) 879-9172
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RoofFax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
