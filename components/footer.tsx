import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TheRoofFax.com</h3>
            <p className="text-gray-300 mb-2">by Thomas Roofing & Repair Inc.</p>
            <div className="flex items-center mt-4">
              <Mail className="h-5 w-5 mr-2 text-gray-300" />
              <a href="mailto:Landon@rooffax.com" className="text-gray-300 hover:text-white transition-colors">
                Landon@rooffax.com
              </a>
            </div>
            <div className="flex items-center mt-2">
              <Phone className="h-5 w-5 mr-2 text-gray-300" />
              <a href="tel:+18508799172" className="text-gray-300 hover:text-white transition-colors">
                (850) 879-9172
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Our Platforms</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://therooffax.com" className="text-gray-300 hover:text-white transition-colors">
                  TheRoofFax.com - Main Hub
                </a>
              </li>
              <li>
                <a href="https://trustthefox.com" className="text-gray-300 hover:text-white transition-colors">
                  TrustTheFox.com - For Homeowners
                </a>
              </li>
              <li>
                <a href="https://rooffaxpro.com" className="text-gray-300 hover:text-white transition-colors">
                  RoofFaxPro.com - For Roofing Pros
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-gray-300 hover:text-white transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-gray-300 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>Powered by RoofFax™ | All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
