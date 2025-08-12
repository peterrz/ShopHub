"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "light" | "dark"
type PrimaryColor = "blue" | "green" | "purple" | "orange" | "red"

interface ThemeContextType {
  theme: Theme
  primaryColor: PrimaryColor
  setTheme: (theme: Theme) => void
  setPrimaryColor: (color: PrimaryColor) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const primaryColors = {
  blue: {
    50: "rgb(239 246 255)",
    100: "rgb(219 234 254)",
    500: "rgb(59 130 246)",
    600: "rgb(37 99 235)",
    700: "rgb(29 78 216)",
    900: "rgb(30 58 138)",
  },
  green: {
    50: "rgb(240 253 244)",
    100: "rgb(220 252 231)",
    500: "rgb(34 197 94)",
    600: "rgb(22 163 74)",
    700: "rgb(21 128 61)",
    900: "rgb(20 83 45)",
  },
  purple: {
    50: "rgb(250 245 255)",
    100: "rgb(243 232 255)",
    500: "rgb(168 85 247)",
    600: "rgb(147 51 234)",
    700: "rgb(126 34 206)",
    900: "rgb(88 28 135)",
  },
  orange: {
    50: "rgb(255 247 237)",
    100: "rgb(254 237 213)",
    500: "rgb(249 115 22)",
    600: "rgb(234 88 12)",
    700: "rgb(194 65 12)",
    900: "rgb(154 52 18)",
  },
  red: {
    50: "rgb(254 242 242)",
    100: "rgb(254 226 226)",
    500: "rgb(239 68 68)",
    600: "rgb(220 38 38)",
    700: "rgb(185 28 28)",
    900: "rgb(127 29 29)",
  },
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>("blue")

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") as Theme
    const savedColor = localStorage.getItem("primaryColor") as PrimaryColor

    if (savedTheme) setTheme(savedTheme)
    if (savedColor) setPrimaryColor(savedColor)
  }, [])

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Apply primary color CSS variables
    const colors = primaryColors[primaryColor]
    root.style.setProperty("--primary-50", colors[50])
    root.style.setProperty("--primary-100", colors[100])
    root.style.setProperty("--primary-500", colors[500])
    root.style.setProperty("--primary-600", colors[600])
    root.style.setProperty("--primary-700", colors[700])
    root.style.setProperty("--primary-900", colors[900])

    // Save to localStorage
    localStorage.setItem("theme", theme)
    localStorage.setItem("primaryColor", primaryColor)
  }, [theme, primaryColor])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <ThemeContext.Provider value={{ theme, primaryColor, setTheme, setPrimaryColor, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
