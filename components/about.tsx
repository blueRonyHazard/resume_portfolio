"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Upload, Download } from "lucide-react"
import { useTheme } from "./theme-provider"
import { extractColorsFromImage, generateTheme } from "@/lib/color-analysis"
import Image from "next/image"

export function About() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { themes, updateTheme } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentTheme = themes.about

  useEffect(() => {
    if (selectedImage) {
      analyzeImage(selectedImage)
    }
  }, [selectedImage])

  const analyzeImage = async (imageSrc: string) => {
    setIsAnalyzing(true)
    try {
      const colors = await extractColorsFromImage(imageSrc)
      const theme = generateTheme(colors)
      updateTheme("about", theme)
    } catch (error) {
      console.error("Error analyzing image:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setSelectedImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      id="about"
      ref={ref}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-1000"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
      }}
      initial={{ backgroundColor: "#f9fafb" }}
      animate={{ backgroundColor: currentTheme.background }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.h2 className="text-4xl sm:text-5xl font-light mb-6" style={{ color: currentTheme.text }}>
                About
                <motion.span className="block font-bold" style={{ color: currentTheme.accent }}>
                  Me
                </motion.span>
              </motion.h2>

              <motion.p className="text-lg leading-relaxed mb-6 opacity-80" style={{ color: currentTheme.text }}>
                I'm a passionate full-stack developer with expertise in modern web technologies. I love creating
                beautiful, functional applications that solve real-world problems and provide exceptional user
                experiences.
              </motion.p>

              <motion.p className="text-lg leading-relaxed opacity-80" style={{ color: currentTheme.text }}>
                With a background in both design and development, I bring a unique perspective to every project,
                ensuring that form and function work together harmoniously.
              </motion.p>
            </div>

            {/* Skills */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: currentTheme.text }}>
                Skills & Technologies
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "Python",
                  "AWS",
                  "Tailwind CSS",
                  "Framer Motion",
                  "PostgreSQL",
                ].map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="p-3 rounded-lg border transition-colors"
                    style={{
                      borderColor: currentTheme.accent + "40",
                      backgroundColor: currentTheme.accent + "10",
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: currentTheme.text }}>
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Download Resume */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: currentTheme.accent,
                color: "white",
              }}
            >
              <Download size={20} />
              <span>Download Resume</span>
            </motion.button>
          </motion.div>

          {/* Image Upload & Display */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="relative">
              {selectedImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image src={selectedImage || "/placeholder.svg"} alt="About me" fill className="object-cover" />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
                      />
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-2xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center space-y-4 transition-colors"
                  style={{
                    borderColor: currentTheme.accent + "60",
                    backgroundColor: currentTheme.accent + "10",
                  }}
                >
                  <Upload size={48} style={{ color: currentTheme.accent }} />
                  <div className="text-center">
                    <p className="font-medium" style={{ color: currentTheme.text }}>
                      Upload your photo
                    </p>
                    <p className="text-sm opacity-60" style={{ color: currentTheme.text }}>
                      The theme will adapt to your image
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

            {selectedImage && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-lg border transition-colors"
                style={{
                  borderColor: currentTheme.accent,
                  color: currentTheme.accent,
                }}
              >
                Change Photo
              </motion.button>
            )}

            {/* Theme Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg border"
              style={{
                borderColor: currentTheme.accent + "40",
                backgroundColor: currentTheme.accent + "10",
              }}
            >
              <h4 className="font-medium mb-2" style={{ color: currentTheme.text }}>
                Current Theme
              </h4>
              <div className="flex space-x-2">
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: currentTheme.background }}
                  title="Background"
                />
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: currentTheme.text }}
                  title="Text"
                />
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: currentTheme.accent }}
                  title="Accent"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
