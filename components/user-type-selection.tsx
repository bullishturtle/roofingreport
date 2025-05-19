"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Briefcase } from "lucide-react"
import { useUser, type UserType } from "@/contexts/user-context"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"

export function UserTypeSelection() {
  const [selectedType, setSelectedType] = useState<UserType>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const { isAuthenticated, user, setUserType } = useUser()

  const handleTypeSelection = (type: UserType) => {
    setSelectedType(type)

    if (isAuthenticated) {
      // If user is already logged in, just update their type
      setUserType(type)
    } else {
      // Otherwise show registration modal
      setShowRegisterModal(true)
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Button
          onClick={() => handleTypeSelection("Homeowner")}
          className={`h-auto py-8 px-6 flex flex-col items-center text-center transition-all duration-300 ${
            selectedType === "Homeowner" || user?.userType === "Homeowner"
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : "bg-gray-800 hover:bg-gray-700 text-white border border-yellow-500/30"
          }`}
        >
          <Home className="h-12 w-12 mb-4" />
          <h3 className="text-xl font-bold mb-2">I'm a Homeowner</h3>
          <p className="text-sm opacity-80">
            Get a detailed report on your roof's condition, storm history, and repair needs
          </p>
        </Button>

        <Button
          onClick={() => handleTypeSelection("Pro")}
          className={`h-auto py-8 px-6 flex flex-col items-center text-center transition-all duration-300 ${
            selectedType === "Pro" || user?.userType === "Pro"
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : "bg-gray-800 hover:bg-gray-700 text-white border border-yellow-500/30"
          }`}
        >
          <Briefcase className="h-12 w-12 mb-4" />
          <h3 className="text-xl font-bold mb-2">I'm a Roofing Pro</h3>
          <p className="text-sm opacity-80">
            Access tools for roof measurements, storm tracking, lead generation, and more
          </p>
        </Button>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onRegisterClick={handleRegisterClick}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onLoginClick={handleLoginClick}
        initialUserType={selectedType}
      />
    </>
  )
}
