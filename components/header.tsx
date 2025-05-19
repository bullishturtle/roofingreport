"use client"

import { useState } from "react"
import Link from "next/link"
import { useUser } from "@/contexts/user-context"
import { Menu, X } from "lucide-react"
import { LoginModal } from "./auth/login-modal"
import { RegisterModal } from "./auth/register-modal"

export function Header() {
  const { user, status, logout } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-black">
            <span className="text-xl font-bold">R</span>
          </div>
          <span className="ml-2 text-xl font-bold text-white">RoofFax</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-8">
            <li>
              <Link href="/features" className="text-sm text-gray-300 hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-sm text-gray-300 hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="text-sm text-gray-300 hover:text-white">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/3d-showcase" className="text-sm text-gray-300 hover:text-white">
                3D Showcase
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center space-x-4 md:flex">
          {status === "authenticated" ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Hello, {user?.name}</span>
              <button
                onClick={logout}
                className="rounded-md border border-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-800"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="rounded-md border border-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-800"
              >
                Sign In
              </button>
              <button
                onClick={() => setRegisterModalOpen(true)}
                className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-400"
              >
                Get Started Free
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="flex items-center md:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 bg-black p-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link href="/features" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>
            <Link
              href="/testimonials"
              className="text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </Link>
            <Link
              href="/3d-showcase"
              className="text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              3D Showcase
            </Link>

            {status === "authenticated" ? (
              <>
                <div className="pt-2 text-sm text-gray-300">Hello, {user?.name}</div>
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full rounded-md border border-gray-600 px-4 py-2 text-center text-white hover:bg-gray-800"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setLoginModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full rounded-md border border-gray-600 px-4 py-2 text-center text-white hover:bg-gray-800"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setRegisterModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full rounded-md bg-yellow-500 px-4 py-2 text-center font-medium text-black hover:bg-yellow-400"
                >
                  Get Started Free
                </button>
              </>
            )}
          </nav>
        </div>
      )}

      {/* Auth Modals */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <RegisterModal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)} />
    </header>
  )
}

export default Header
