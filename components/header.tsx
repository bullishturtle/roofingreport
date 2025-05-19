"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { Menu, X, User } from "lucide-react"

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const { isAuthenticated, user } = useUser()

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  const handleLoginClick = () => {
    setShowLoginModal(true)
    setShowRegisterModal(false)
  }

  const handleRegisterClick = () => {
    setShowRegisterModal(true)
    setShowLoginModal(false)
  }

  return (
    <>
      <header className="bg-black border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center mr-2">
                  <span className="text-black font-bold">R</span>
                </div>
                <span className="text-xl font-bold text-white">
                  Roof<span className="text-yellow-500">Fax</span>
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/features" className="text-gray-300 hover:text-yellow-500 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-yellow-500 transition-colors">
                Pricing
              </Link>
              <Link href="/testimonials" className="text-gray-300 hover:text-yellow-500 transition-colors">
                Testimonials
              </Link>
              {isAuthenticated && (
                <Link href="/dashboard" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Dashboard
                </Link>
              )}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button variant="outline" className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10">
                    <User className="mr-2 h-4 w-4" />
                    {user?.name.split(" ")[0]}
                  </Button>
                </Link>
              ) : (
                <>
                  <Button variant="ghost" onClick={handleLoginClick} className="text-gray-300 hover:text-white">
                    Sign In
                  </Button>
                  <Button onClick={handleRegisterClick} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Get Started Free
                  </Button>
                </>
              )}
            </div>

            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-gray-900 border-t border-yellow-500/20">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/features"
                className="block text-gray-300 hover:text-yellow-500 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block text-gray-300 hover:text-yellow-500 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Pricing
              </Link>
              <Link
                href="/testimonials"
                className="block text-gray-300 hover:text-yellow-500 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Testimonials
              </Link>
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="block text-gray-300 hover:text-yellow-500 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Dashboard
                </Link>
              )}

              <div className="pt-4 border-t border-gray-800">
                {isAuthenticated ? (
                  <Link href="/dashboard" onClick={() => setShowMobileMenu(false)}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      <User className="mr-2 h-4 w-4" />
                      My Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLoginClick()
                        setShowMobileMenu(false)
                      }}
                      className="w-full border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        handleRegisterClick()
                        setShowMobileMenu(false)
                      }}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      Get Started Free
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onRegisterClick={handleRegisterClick}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onLoginClick={handleLoginClick}
      />
    </>
  )
}
