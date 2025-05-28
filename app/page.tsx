"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Education } from "@/components/education"
import { Experience } from "@/components/experience"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
        <Navigation />

        <motion.div
          style={{ opacity }}
          className="fixed inset-0 bg-gradient-to-br from-gray-50 to-white pointer-events-none z-0"
        />

        <main className="relative z-10">
          <Hero />
          <Experience />
          <Projects />
          <Education />
        </main>
      </div>
    </ThemeProvider>
  )
}
