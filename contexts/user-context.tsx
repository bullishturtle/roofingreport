"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "homeowner" | "contractor" | "admin" | null
export type UserStatus = "loading" | "authenticated" | "unauthenticated"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
  lastLogin: Date
}

interface UserContextType {
  user: User | null
  status: UserStatus
  login: (email: string, password: string) => Promise<{ success: boolean; needsVerification?: boolean; error?: string }>
  register: (
    name: string,
    email: string,
    password: string,
    userType: "Homeowner" | "Pro",
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<UserStatus>("loading")
  const [isLoading, setIsLoading] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("rooffax_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        // Convert string dates back to Date objects
        parsedUser.createdAt = new Date(parsedUser.createdAt)
        parsedUser.lastLogin = new Date(parsedUser.lastLogin)
        setUser(parsedUser)
        setStatus("authenticated")
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("rooffax_user")
        setStatus("unauthenticated")
      }
    } else {
      setStatus("unauthenticated")
    }
  }, [])

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (email && password) {
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        role: email.includes("pro") || email.includes("contractor") ? "contractor" : "homeowner",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        lastLogin: new Date(),
      }

      setUser(mockUser)
      setStatus("authenticated")
      localStorage.setItem("rooffax_user", JSON.stringify(mockUser))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Invalid email or password" }
  }

  // Mock register function
  const register = async (name: string, email: string, password: string, userType: "Homeowner" | "Pro") => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock registration
    if (name && email && password) {
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: userType === "Pro" ? "contractor" : "homeowner",
        createdAt: new Date(),
        lastLogin: new Date(),
      }

      // Don't automatically log in after registration
      // Instead, we'd typically send a verification email
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Registration failed. Please check your information." }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setStatus("unauthenticated")
    localStorage.removeItem("rooffax_user")
  }

  return (
    <UserContext.Provider value={{ user, status, login, register, logout, isLoading }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
