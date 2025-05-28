"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { useTheme } from "./theme-provider"
import { extractColorsFromImage, generateTheme } from "@/lib/color-analysis"
import Image from "next/image"

interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  location: string
  description: string
  image: string
  achievements?: string[]
}

export function Education() {
  const { themes, updateTheme } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const currentTheme = themes.education

  const educationData: EducationItem[] = [
    {
      id: "1",
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science",
      startDate: "2020",
      endDate: "2022",
      location: "Stanford, CA",
      description:
        "Specialized in Machine Learning and Artificial Intelligence with focus on computer vision and natural language processing.",
      image: "/images/stanford.jpg",
      achievements: [
        "Graduated Summa Cum Laude",
        "Research Assistant in AI Lab",
        "Published 3 papers in top-tier conferences",
      ],
    },
    {
      id: "2",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science & Mathematics",
      startDate: "2016",
      endDate: "2020",
      location: "Berkeley, CA",
      description:
        "Double major in Computer Science and Mathematics with emphasis on algorithms, data structures, and statistical analysis.",
      image: "/images/berkeley.jpg",
      achievements: [
        "Dean's List for 6 semesters",
        "President of Computer Science Society",
        "Winner of Annual Hackathon 2019",
      ],
    },
    {
      id: "3",
      institution: "Online Certifications",
      degree: "Professional Certificates",
      field: "Cloud Computing & DevOps",
      startDate: "2022",
      endDate: "Present",
      location: "Remote",
      description: "Continuous learning through various online platforms to stay current with emerging technologies.",
      image: "/images/certifications.jpg",
      achievements: [
        "AWS Solutions Architect Professional",
        "Google Cloud Professional Developer",
        "Kubernetes Administrator (CKA)",
      ],
    },
  ]

  useEffect(() => {
    // Analyze the first education image for theme generation
    const analyzeEducationTheme = async () => {
      try {
        const colors = await extractColorsFromImage(educationData[0].image)
        const theme = generateTheme(colors)
        updateTheme("education", theme)
      } catch (error) {
        console.error("Error analyzing education image:", error)
      }
    }

    analyzeEducationTheme()
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
      id="education"
      ref={ref}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-1000"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
      }}
      initial={{ backgroundColor: "#ffffff" }}
      animate={{ backgroundColor: currentTheme.background }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-light mb-6" style={{ color: currentTheme.text }}>
              Educational
              <motion.span className="block font-bold" style={{ color: currentTheme.accent }}>
                Background
              </motion.span>
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto" style={{ color: currentTheme.text }}>
              My academic journey and continuous learning path that shaped my expertise in technology and innovation.
            </p>
          </motion.div>

          <div className="space-y-12">
            {educationData.map((education, index) => (
              <motion.div
                key={education.id}
                variants={itemVariants}
                className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Education Image */}
                <motion.div
                  className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={education.image || "/placeholder.svg"}
                      alt={education.institution}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </motion.div>

                {/* Education Content */}
                <motion.div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
                  whileHover={{ x: index % 2 === 1 ? 10 : -10 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: currentTheme.accent + "20" }}>
                      <GraduationCap size={24} style={{ color: currentTheme.accent }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: currentTheme.text }}>
                        {education.degree}
                      </h3>
                      <p className="text-lg opacity-80" style={{ color: currentTheme.text }}>
                        {education.field}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold" style={{ color: currentTheme.accent }}>
                      {education.institution}
                    </h4>

                    <div className="flex flex-wrap gap-4 text-sm opacity-80" style={{ color: currentTheme.text }}>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>
                          {education.startDate} - {education.endDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{education.location}</span>
                      </div>
                    </div>

                    <p className="text-base leading-relaxed opacity-90" style={{ color: currentTheme.text }}>
                      {education.description}
                    </p>

                    {education.achievements && (
                      <div className="space-y-2">
                        <h5 className="font-semibold" style={{ color: currentTheme.text }}>
                          Key Achievements:
                        </h5>
                        <ul className="space-y-1">
                          {education.achievements.map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * idx }}
                              className="flex items-center space-x-2 text-sm opacity-80"
                              style={{ color: currentTheme.text }}
                            >
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
