"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserType = "homeowner" | "pro" | null
export type UserStatus = "loading" | "authenticated" | "unauthenticated"

interface User {
  id: string
  name: string
  email: string
  userType: UserType
  createdAt: string
  lastLogin: string
}

interface UserContextType {
  user: User | null
  status: UserStatus
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  setUserType: (type: UserType) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<UserStatus>("loading")
  const [isLoading, setIsLoading] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real app, this would be an API call to check the session
        const storedUser = localStorage.getItem("roofFaxUser")

        if (storedUser) {
          const userData = JSON.parse(storedUser)
          console.log("Session restored:", userData)
          setUser(userData)
          setStatus("authenticated")
        } else {
          setStatus("unauthenticated")
        }
      } catch (error) {
        console.error("Error checking session:", error)
        setStatus("unauthenticated")
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    console.log("Login attempt:", { email })

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation - in a real app, this would be an API call
      if (email && password) {
        // For demo purposes, any valid email/password combination works
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: email.split("@")[0],
          email,
          userType: null, // User type will be set separately
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        }

        setUser(mockUser)
        setStatus("authenticated")
        localStorage.setItem("roofFaxUser", JSON.stringify(mockUser))

        console.log("Login successful:", mockUser)
        setIsLoading(false)
        return { success: true, message: "Login successful" }
      }

      console.log("Login failed: Invalid credentials")
      setIsLoading(false)
      return { success: false, message: "Invalid email or password" }
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return { success: false, message: "An error occurred during login" }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    console.log("Registration attempt:", { name, email })

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation - in a real app, this would be an API call
      if (name && email && password) {
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          userType: null, // User type will be set separately
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        }

        setUser(mockUser)
        setStatus("authenticated")
        localStorage.setItem("roofFaxUser", JSON.stringify(mockUser))

        console.log("Registration successful:", mockUser)
        setIsLoading(false)
        return { success: true, message: "Registration successful" }
      }

      console.log("Registration failed: Invalid data")
      setIsLoading(false)
      return { success: false, message: "Please fill in all required fields" }
    } catch (error) {
      console.error("Registration error:", error)
      setIsLoading(false)
      return { success: false, message: "An error occurred during registration" }
    }
  }

  const logout = () => {
    console.log("Logging out user:", user?.email)
    setUser(null)
    setStatus("unauthenticated")
    localStorage.removeItem("roofFaxUser")
  }

  const setUserType = (type: UserType) => {
    if (user) {
      const updatedUser = { ...user, userType: type }
      setUser(updatedUser)
      localStorage.setItem("roofFaxUser", JSON.stringify(updatedUser))
      console.log("User type set:", type)
    } else {
      console.log("Cannot set user type: No user logged in")
    }
  }

  return (
    <UserContext.Provider value={{ user, status, login, register, logout, setUserType, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
