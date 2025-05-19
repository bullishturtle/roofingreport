import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-200">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-4">RoofFax.Report</h3>
            <p className="text-gray-400 mb-4">By Thomas Roofing & Repair Inc.</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-400" />
                <a href="mailto:Landon@rooffax.com" className="hover:text-blue-400 transition-colors">
                  Landon@rooffax.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-400" />
                <a href="tel:+18508799172" className="hover:text-blue-400 transition-colors">
                  (850) 879-9172
                </a>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <nav className="grid gap-2">
              <Link href="#features" className="hover:text-blue-400 transition-colors">
                Features
              </Link>
              <Link href="#about" className="hover:text-blue-400 transition-colors">
                About Us
              </Link>
              <Link href="#demo" className="hover:text-blue-400 transition-colors">
                Demo
              </Link>
              <Link href="https://rooffaxpro.com" className="hover:text-blue-400 transition-colors">
                For Professionals
              </Link>
              <Link href="#contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <nav className="grid gap-2">
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/disclaimer" className="hover:text-blue-400 transition-colors">
                Disclaimer
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>Powered by RoofFax™ | All rights reserved © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
