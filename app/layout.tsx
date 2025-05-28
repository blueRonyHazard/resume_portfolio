import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Portfolio | Pritam Ghosh",
  description:
    "A minimalistic, animated portfolio website with dynamic AI-powered theme generation that adapts to your images for optimal visual harmony.",
  keywords: ["portfolio", "developer", "AI", "theme generation", "web design", "Next.js"],
  authors: [{ name: "Pritam Ghosh" }],
  openGraph: {
    title: "AI-Powered Portfolio | Pritam Ghosh",
    description: "A minimalistic, animated portfolio website with dynamic AI-powered theme generation",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Portfolio | Pritam Ghosh",
    description: "A minimalistic, animated portfolio website with dynamic AI-powered theme generation",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-roboto antialiased">{children}</body>
    </html>
  )
}
