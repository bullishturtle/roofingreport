"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone, Send } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // This will be replaced with actual newsletter API integration
      console.log("Newsletter subscription for:", email)

      setSubscribeMessage("Thanks for subscribing!")
      setEmail("")
    } catch (error) {
      console.error("Newsletter subscription error:", error)
      setSubscribeMessage("Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)

      // Clear message after 5 seconds
      setTimeout(() => {
        setSubscribeMessage("")
      }, 5000)
    }
  }

  return (
    <footer className="bg-gray-900 text-white" id="footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RoofFax</h3>
            <p className="text-gray-300 mb-4">
              The World's Smartest Roof & Property Report. Delivering truth, transparency, and technology.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-500 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} aria-hidden="true" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-500 transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin size={20} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-3">Subscribe to our newsletter for the latest updates.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-gray-800 border border-gray-700 rounded-l-md py-2 px-3 w-full text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  required
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 rounded-r-md flex items-center justify-center transition-colors"
                  disabled={isSubmitting}
                  aria-label="Subscribe to newsletter"
                >
                  <Send size={18} aria-hidden="true" />
                </button>
              </div>
              {subscribeMessage && (
                <p className="text-sm text-yellow-500" role="status">
                  {subscribeMessage}
                </p>
              )}
            </form>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail size={16} className="mr-2 text-gray-300" aria-hidden="true" />
                  <a href="mailto:Landon@rooffax.com" className="text-gray-300 hover:text-yellow-500 transition-colors">
                    Landon@rooffax.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 text-gray-300" aria-hidden="true" />
                  <a href="tel:+18508799172" className="text-gray-300 hover:text-yellow-500 transition-colors">
                    (850) 879-9172
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} RoofFax™ | All rights reserved</p>
          <div className="mt-2 text-sm">
            <span>
              For homeowners:{" "}
              <a href="https://trustthefox.com" className="text-yellow-500 hover:underline">
                trustthefox.com
              </a>
            </span>
            <span className="mx-2">|</span>
            <span>
              For contractors:{" "}
              <a href="https://rooffaxpro.com" className="text-yellow-500 hover:underline">
                rooffaxpro.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
