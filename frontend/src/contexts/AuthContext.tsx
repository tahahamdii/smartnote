"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authAPI } from "../services/api"

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      authAPI
        .getCurrentUser()
        .then((response) => {
          setUser(response.data.user)
        })
        .catch(() => {
          localStorage.removeItem("token")
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password)
    const { token, user } = response.data

    localStorage.setItem("token", token)
    setUser(user)
  }

  const register = async (username: string, email: string, password: string) => {
    const response = await authAPI.register(username, email, password)
    const { token, user } = response.data

    localStorage.setItem("token", token)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
