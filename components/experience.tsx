"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"
import { useTheme } from "./theme-provider"
import { extractColorsFromImage, generateTheme } from "@/lib/color-analysis"
import Image from "next/image"

interface ExperienceItem {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  location: string
  description: string
  image: string
  technologies: string[]
  achievements: string[]
  companyUrl?: string
}

export function Experience() {
  const { themes, updateTheme } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const currentTheme = themes.experience

  const experienceData: ExperienceItem[] = [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Senior Full Stack Developer",
      startDate: "2022",
      endDate: "Present",
      location: "San Francisco, CA",
      description:
        "Leading development of scalable web applications using modern technologies. Responsible for architecture decisions, code reviews, and mentoring junior developers.",
      image: "/images/techcorp.jpg",
      technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Docker"],
      achievements: [
        "Increased application performance by 40%",
        "Led team of 5 developers",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Architected microservices handling 1M+ daily requests",
      ],
      companyUrl: "https://techcorp.com",
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "Frontend Developer",
      startDate: "2021",
      endDate: "2022",
      location: "Remote",
      description:
        "Developed responsive web applications and mobile-first interfaces. Collaborated closely with design team to implement pixel-perfect UI components.",
      image: "/images/startupxyz.jpg",
      technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GraphQL"],
      achievements: [
        "Built 15+ reusable UI components",
        "Improved mobile user experience by 35%",
        "Reduced bundle size by 25% through optimization",
        "Implemented real-time features using WebSockets",
      ],
      companyUrl: "https://startupxyz.com",
    },
    {
      id: "3",
      company: "Digital Agency Pro",
      position: "Junior Web Developer",
      startDate: "2020",
      endDate: "2021",
      location: "New York, NY",
      description:
        "Developed websites and web applications for various clients. Gained experience in multiple frameworks and content management systems.",
      image: "/images/agency.jpg",
      technologies: ["JavaScript", "PHP", "WordPress", "MySQL", "SASS", "jQuery"],
      achievements: [
        "Delivered 20+ client projects on time",
        "Improved website loading speeds by 50%",
        "Trained 3 new team members",
        "Maintained 99.9% uptime for client websites",
      ],
      companyUrl: "https://digitalagencypro.com",
    },
  ]

  useEffect(() => {
    // Analyze the first experience image for theme generation
    const analyzeExperienceTheme = async () => {
      try {
        const colors = await extractColorsFromImage(experienceData[0].image)
        const theme = generateTheme(colors)
        updateTheme("experience", theme)
      } catch (error) {
        console.error("Error analyzing experience image:", error)
      }
    }

    analyzeExperienceTheme()
  }, [updateTheme])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      id="experience"
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
              Professional
              <motion.span className="block font-bold" style={{ color: currentTheme.accent }}>
                Experience
              </motion.span>
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto" style={{ color: currentTheme.text }}>
              My professional journey showcasing growth, achievements, and the impact I've made in various
              organizations.
            </p>
          </motion.div>

          <div className="space-y-16">
            {experienceData.map((experience, index) => (
              <motion.div key={experience.id} variants={itemVariants} className="relative">
                {/* Timeline Line */}
                {index < experienceData.length - 1 && (
                  <div
                    className="absolute left-8 top-20 w-0.5 h-32 hidden lg:block"
                    style={{ backgroundColor: currentTheme.accent + "30" }}
                  />
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Company Image */}
                  <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={experience.image || "/placeholder.svg"}
                        alt={experience.company}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                      {/* Company Logo Overlay */}
                      <div className="absolute bottom-4 left-4">
                        <div
                          className="px-3 py-1 rounded-full text-white text-sm font-medium"
                          style={{ backgroundColor: currentTheme.accent }}
                        >
                          {experience.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Experience Content */}
                  <motion.div className="lg:col-span-2 space-y-6" whileHover={{ x: 5 }}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-lg" style={{ backgroundColor: currentTheme.accent + "20" }}>
                          <Briefcase size={24} style={{ color: currentTheme.accent }} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold" style={{ color: currentTheme.text }}>
                            {experience.position}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <p className="text-lg font-semibold" style={{ color: currentTheme.accent }}>
                              {experience.company}
                            </p>
                            {experience.companyUrl && (
                              <motion.a
                                href={experience.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                              >
                                <ExternalLink size={16} style={{ color: currentTheme.accent }} />
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm opacity-80" style={{ color: currentTheme.text }}>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>
                          {experience.startDate} - {experience.endDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{experience.location}</span>
                      </div>
                    </div>

                    <p className="text-base leading-relaxed opacity-90" style={{ color: currentTheme.text }}>
                      {experience.description}
                    </p>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <h5 className="font-semibold" style={{ color: currentTheme.text }}>
                        Technologies Used:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
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
                    </div>

                    {/* Achievements */}
                    <div className="space-y-2">
                      <h5 className="font-semibold" style={{ color: currentTheme.text }}>
                        Key Achievements:
                      </h5>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {experience.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="flex items-start space-x-2 text-sm opacity-80"
                            style={{ color: currentTheme.text }}
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: currentTheme.accent }}
                            />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
