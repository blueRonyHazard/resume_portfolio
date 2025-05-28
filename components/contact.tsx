"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, Upload } from "lucide-react"
import { useTheme } from "./theme-provider"
import { extractColorsFromImage, generateTheme } from "@/lib/color-analysis"
import Image from "next/image"

export function Contact() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const { themes, updateTheme } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentTheme = themes.contact

  const analyzeImage = async (imageSrc: string) => {
    setIsAnalyzing(true)
    try {
      const colors = await extractColorsFromImage(imageSrc)
      const theme = generateTheme(colors)
      updateTheme("contact", theme)
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
        analyzeImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
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
      id="contact"
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
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-light mb-6" style={{ color: currentTheme.text }}>
              Get In
              <motion.span className="block font-bold" style={{ color: currentTheme.accent }}>
                Touch
              </motion.span>
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto" style={{ color: currentTheme.text }}>
              Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: currentTheme.text }}>
                    Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                    style={
                      {
                        borderColor: currentTheme.accent + "40",
                        backgroundColor: currentTheme.background,
                        color: currentTheme.text,
                        "--tw-ring-color": currentTheme.accent + "40",
                      } as React.CSSProperties
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: currentTheme.text }}
                  >
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                    style={
                      {
                        borderColor: currentTheme.accent + "40",
                        backgroundColor: currentTheme.background,
                        color: currentTheme.text,
                        "--tw-ring-color": currentTheme.accent + "40",
                      } as React.CSSProperties
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: currentTheme.text }}
                  >
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 resize-none"
                    style={
                      {
                        borderColor: currentTheme.accent + "40",
                        backgroundColor: currentTheme.background,
                        color: currentTheme.text,
                        "--tw-ring-color": currentTheme.accent + "40",
                      } as React.CSSProperties
                    }
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: currentTheme.accent,
                    color: "white",
                  }}
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & Image */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6" style={{ color: currentTheme.text }}>
                  Contact Information
                </h3>

                {[
                  { icon: Mail, label: "Email", value: "hello@example.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
                ].map(({ icon: Icon, label, value }) => (
                  <motion.div key={label} whileHover={{ x: 5 }} className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: currentTheme.accent + "20" }}>
                      <Icon size={20} style={{ color: currentTheme.accent }} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: currentTheme.text }}>
                        {label}
                      </p>
                      <p className="opacity-80" style={{ color: currentTheme.text }}>
                        {value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Background Image Upload */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium" style={{ color: currentTheme.text }}>
                  Section Background
                </h4>

                {selectedImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
                  >
                    <Image
                      src={selectedImage || "/placeholder.svg"}
                      alt="Contact background"
                      fill
                      className="object-cover"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video rounded-lg border-2 border-dashed cursor-pointer flex flex-col items-center justify-center space-y-3 transition-colors"
                    style={{
                      borderColor: currentTheme.accent + "60",
                      backgroundColor: currentTheme.accent + "10",
                    }}
                  >
                    <Upload size={32} style={{ color: currentTheme.accent }} />
                    <div className="text-center">
                      <p className="font-medium" style={{ color: currentTheme.text }}>
                        Upload background image
                      </p>
                      <p className="text-sm opacity-60" style={{ color: currentTheme.text }}>
                        Theme will adapt automatically
                      </p>
                    </div>
                  </motion.div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {selectedImage && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 px-4 rounded-lg border transition-colors text-sm"
                    style={{
                      borderColor: currentTheme.accent,
                      color: currentTheme.accent,
                    }}
                  >
                    Change Background
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
