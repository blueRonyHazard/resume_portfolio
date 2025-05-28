"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { useTheme } from "./theme-provider"
import { extractColorsFromImage, generateTheme } from "@/lib/color-analysis"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  featured?: boolean
}

export function Projects() {
  const { themes, updateTheme } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const currentTheme = themes.projects

  const projectsData: Project[] = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce platform built with Next.js, featuring real-time inventory management, seamless checkout experience, and advanced analytics dashboard.",
      image: "/images/ecommerce-project.jpg",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/username/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.vercel.app",
      featured: true,
    },
    {
      id: "2",
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and advanced project tracking.",
      image: "/images/task-management.jpg",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      githubUrl: "https://github.com/username/task-manager",
      liveUrl: "https://taskmanager-demo.vercel.app",
    },
    {
      id: "3",
      title: "AI Content Generator",
      description:
        "An AI-powered content generation tool that helps creators produce high-quality content using advanced language models and natural language processing.",
      image: "/images/ai-content.jpg",
      technologies: ["Python", "FastAPI", "OpenAI", "React", "TensorFlow"],
      githubUrl: "https://github.com/username/ai-content-generator",
      liveUrl: "https://ai-content-demo.vercel.app",
    },
    {
      id: "4",
      title: "Real-time Analytics Dashboard",
      description:
        "A comprehensive analytics dashboard with real-time data visualization, custom reporting, and interactive charts for business intelligence.",
      image: "/images/analytics-dashboard.jpg",
      technologies: ["Vue.js", "D3.js", "Node.js", "Redis", "Chart.js"],
      githubUrl: "https://github.com/username/analytics-dashboard",
      liveUrl: "https://analytics-demo.vercel.app",
    },
    {
      id: "5",
      title: "Mobile Banking App",
      description:
        "A secure mobile banking application with biometric authentication, transaction history, budget tracking, and investment portfolio management.",
      image: "/images/banking-app.jpg",
      technologies: ["React Native", "Firebase", "Node.js", "JWT", "Plaid API"],
      githubUrl: "https://github.com/username/mobile-banking",
      liveUrl: "https://banking-demo.vercel.app",
    },
    {
      id: "6",
      title: "Social Media Platform",
      description:
        "A modern social media platform with real-time messaging, content sharing, advanced privacy controls, and AI-powered content moderation.",
      image: "/images/social-platform.jpg",
      technologies: ["Next.js", "GraphQL", "PostgreSQL", "Redis", "AWS S3"],
      githubUrl: "https://github.com/username/social-platform",
      liveUrl: "https://social-demo.vercel.app",
    },
  ]

  useEffect(() => {
    // Analyze the first project image for theme generation
    const analyzeProjectTheme = async () => {
      try {
        const colors = await extractColorsFromImage(projectsData[0].image)
        const theme = generateTheme(colors)
        updateTheme("projects", theme)
      } catch (error) {
        console.error("Error analyzing project image:", error)
      }
    }

    analyzeProjectTheme()
  }, [updateTheme])

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
      id="projects"
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
              Featured
              <motion.span className="block font-bold" style={{ color: currentTheme.accent }}>
                Projects
              </motion.span>
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto" style={{ color: currentTheme.text }}>
              A collection of projects that showcase my skills and passion for creating innovative digital solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  project.featured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
                style={{
                  backgroundColor: currentTheme.background,
                  borderColor: currentTheme.accent + "20",
                }}
              >
                {/* Project Image */}
                <div className={`relative overflow-hidden ${project.featured ? "aspect-video" : "aspect-video"}`}>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-white text-sm font-medium"
                        style={{ backgroundColor: currentTheme.accent }}
                      >
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Overlay Links */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: currentTheme.text }}>
                    {project.title}
                  </h3>
                  <p className="text-sm opacity-80 mb-4 leading-relaxed" style={{ color: currentTheme.text }}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: currentTheme.accent + "20",
                          color: currentTheme.accent,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors"
                      style={{
                        borderColor: currentTheme.accent,
                        color: currentTheme.accent,
                      }}
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                      style={{
                        backgroundColor: currentTheme.accent,
                        color: "white",
                      }}
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Live</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
