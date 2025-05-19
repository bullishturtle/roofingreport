"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"
import LoginModal from "@/components/auth/login-modal"
import RegisterModal from "@/components/auth/register-modal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const pathname = usePathname()
  const { user, status, logout } = useUser()

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Image
              src="/images/trust-the-fox-logo.png"
              alt="RoofFax Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-bold text-blue-600">RoofFax</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              isActive("/") ? "text-blue-600" : "text-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              isActive("/about") ? "text-blue-600" : "text-foreground"
            }`}
          >
            About
          </Link>
          <Link
            href="/features"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              isActive("/features") ? "text-blue-600" : "text-foreground"
            }`}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              isActive("/pricing") ? "text-blue-600" : "text-foreground"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              isActive("/contact") ? "text-blue-600" : "text-foreground"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {status === "authenticated" ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="default" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setLoginModalOpen(true)}>
                Login
              </Button>
              <Button variant="default" size="sm" onClick={() => setRegisterModalOpen(true)}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background">
          <div className="container py-6 flex flex-col gap-6">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                  isActive("/") ? "text-blue-600" : "text-foreground"
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                  isActive("/about") ? "text-blue-600" : "text-foreground"
                }`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href="/features"
                className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                  isActive("/features") ? "text-blue-600" : "text-foreground"
                }`}
                onClick={closeMenu}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                  isActive("/pricing") ? "text-blue-600" : "text-foreground"
                }`}
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                  isActive("/contact") ? "text-blue-600" : "text-foreground"
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </nav>

            <div className="flex flex-col gap-4">
              {status === "authenticated" ? (
                <>
                  <Link href="/dashboard" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => {
                      logout()
                      closeMenu()
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setLoginModalOpen(true)
                      closeMenu()
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => {
                      setRegisterModalOpen(true)
                      closeMenu()
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onRegisterClick={() => {
          setLoginModalOpen(false)
          setRegisterModalOpen(true)
        }}
      />

      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onLoginClick={() => {
          setRegisterModalOpen(false)
          setLoginModalOpen(true)
        }}
      />
    </header>
  )
}
