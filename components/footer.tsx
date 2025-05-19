"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone, ArrowRight, Instagram, Twitter } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribeResult, setSubscribeResult] = useState<{ success: boolean; message: string } | null>(null)

  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    setSubscribeResult(null)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, simulate success
      setSubscribeResult({
        success: true,
        message: "Thank you for subscribing to our newsletter!",
      })
      setEmail("")

      // This would be replaced with actual API call in production
      console.log("Newsletter subscription for:", email)
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // }).then(res => res.json())
    } catch (error) {
      setSubscribeResult({
        success: false,
        message: "Something went wrong. Please try again.",
      })
      console.error("Newsletter subscription error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
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
                className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-yellow-500" />
                <a
                  href="mailto:info@rooffax.com"
                  className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
                >
                  info@rooffax.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-yellow-500" />
                <a
                  href="tel:+18508799172"
                  className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
                >
                  (850) 879-9172
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase text-gray-400 mb-2">For Contractors</h4>
              <a
                href="https://rooffaxpro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors duration-200"
              >
                Visit RoofFax Pro
              </a>
              {/* This will link to the pro portal in production */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Stay updated with the latest news, features, and tips from RoofFax.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  required
                  aria-label="Email for newsletter"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
              {subscribeResult && (
                <p className={`text-sm ${subscribeResult.success ? "text-green-400" : "text-red-400"}`}>
                  {subscribeResult.message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {currentYear} RoofFax. All rights reserved.</div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-yellow-500 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-yellow-500 text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-yellow-500 text-sm transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
