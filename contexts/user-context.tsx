"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  getCurrentUser,
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
  setUserType as setUserTypeAction,
} from "@/actions/auth-actions"

export type UserType = "Homeowner" | "Pro" | null

export interface User {
  id: string
  name: string
  email: string
  userType: UserType
  createdAt: Date
  lastLogin: Date
  emailVerified: boolean
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; needsVerification?: boolean; error?: string }>
  register: (
    name: string,
    email: string,
    password: string,
    userType: UserType,
  ) => Promise<{ success: boolean; message?: string; error?: string }>
  logout: () => Promise<void>
  setUserType: (type: UserType) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const { success, user } = await getCurrentUser()
        if (success && user) {
          // Convert string dates to Date objects
          user.createdAt = new Date(user.createdAt)
          user.lastLogin = new Date(user.lastLogin)
          setUser(user)
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const result = await loginAction(email, password)

      if (result.success && result.user) {
        // Convert string dates to Date objects
        result.user.createdAt = new Date(result.user.createdAt)
        result.user.lastLogin = new Date(result.user.lastLogin)

        setUser(result.user)
      }

      return result
    } catch (error: any) {
      console.error("Login failed:", error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, userType: UserType) => {
    setIsLoading(true)

    try {
      const result = await registerAction(name, email, password, userType)
      return result
    } catch (error: any) {
      console.error("Registration failed:", error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await logoutAction()
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const setUserType = async (type: UserType) => {
    if (user) {
      try {
        const { success, error } = await setUserTypeAction(type)

        if (!success) {
          throw new Error(error || "Failed to update user type")
        }

        setUser({ ...user, userType: type })
      } catch (error) {
        console.error("Failed to update user type:", error)
        throw error
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        setUserType,
      }}
    >
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
