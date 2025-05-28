"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ThemeContextType {
  themes: Record<
    string,
    {
      background: string
      text: string
      accent: string
    }
  >
  updateTheme: (section: string, theme: { background: string; text: string; accent: string }) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themes, setThemes] = useState<Record<string, { background: string; text: string; accent: string }>>({
    hero: { background: "#ffffff", text: "#1f2937", accent: "#3b82f6" },
    projects: { background: "#f9fafb", text: "#1f2937", accent: "#3b82f6" },
    education: { background: "#ffffff", text: "#1f2937", accent: "#3b82f6" },
    experience: { background: "#f9fafb", text: "#1f2937", accent: "#3b82f6" },
  })
  const [isDarkMode, setIsDarkMode] = useState(false)

  const updateTheme = (section: string, theme: { background: string; text: string; accent: string }) => {
    setThemes((prev) => ({
      ...prev,
      [section]: theme,
    }))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ThemeContext.Provider value={{ themes, updateTheme, isDarkMode, toggleDarkMode }}>
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
