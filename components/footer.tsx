import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 bg-black/70 border-t border-gray-800 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-yellow-500 rounded-full h-10 w-10 flex items-center justify-center text-black font-bold text-xl">
                R
              </div>
              <div className="ml-2 text-xl font-bold">
                Roof<span className="text-yellow-500">Fax</span>
              </div>
            </div>
            <p className="text-gray-400">The ultimate roof reporting platform for contractors and homeowners.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-yellow-500" />
                <a href="mailto:Landon@rooffax.com" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Landon@rooffax.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-yellow-500" />
                <a href="tel:+18508799172" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  (850) 879-9172
                </a>
              </li>
              <li className="flex items-center space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            RoofFax.Report (by Thomas Roofing & Repair Inc.) | Powered by RoofFax™ | All rights reserved ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
