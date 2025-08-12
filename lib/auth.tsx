"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock authentication - replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === "demo@example.com" && password === "password") {
        const mockUser: User = {
          id: "1",
          name: "Demo User",
          email: "demo@example.com",
          role: "user",
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        setIsLoading(false)
        return { success: true }
      } else {
        setIsLoading(false)
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "An error occurred during sign in" }
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock registration - replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: "user",
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "An error occurred during sign up" }
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { success: false, error: "Not authenticated" }

    try {
      // Mock profile update - replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Failed to update profile" }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
