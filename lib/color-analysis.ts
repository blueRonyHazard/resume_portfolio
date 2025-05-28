// Color analysis utilities for AI-powered theme generation

export interface ColorPalette {
  dominant: string
  secondary: string
  accent: string
  average: string
}

export interface Theme {
  background: string
  text: string
  accent: string
}

// Extract colors from an image using canvas
export async function extractColorsFromImage(imageSrc: string): Promise<ColorPalette> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        // Resize image for faster processing
        const maxSize = 150
        const ratio = Math.min(maxSize / img.width, maxSize / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const colors = extractDominantColors(imageData.data)

        resolve(colors)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = imageSrc
  })
}

// Extract dominant colors using color quantization
function extractDominantColors(imageData: Uint8ClampedArray): ColorPalette {
  const colorCounts: Record<string, number> = {}
  const step = 4 // Process every 4th pixel for performance

  let totalR = 0,
    totalG = 0,
    totalB = 0,
    pixelCount = 0

  // Count color frequencies and calculate average
  for (let i = 0; i < imageData.length; i += step * 4) {
    const r = imageData[i]
    const g = imageData[i + 1]
    const b = imageData[i + 2]
    const a = imageData[i + 3]

    // Skip transparent pixels
    if (a < 128) continue

    // Quantize colors to reduce noise
    const quantizedR = Math.floor(r / 32) * 32
    const quantizedG = Math.floor(g / 32) * 32
    const quantizedB = Math.floor(b / 32) * 32

    const colorKey = `${quantizedR},${quantizedG},${quantizedB}`
    colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1

    totalR += r
    totalG += g
    totalB += b
    pixelCount++
  }

  // Find most frequent colors
  const sortedColors = Object.entries(colorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([color]) => color.split(",").map(Number))

  // Calculate average color
  const avgR = Math.round(totalR / pixelCount)
  const avgG = Math.round(totalG / pixelCount)
  const avgB = Math.round(totalB / pixelCount)

  const dominant = rgbToHex(sortedColors[0] || [128, 128, 128])
  const secondary = rgbToHex(sortedColors[1] || [160, 160, 160])
  const accent = findAccentColor(sortedColors)
  const average = rgbToHex([avgR, avgG, avgB])

  return { dominant, secondary, accent, average }
}

// Find a good accent color that contrasts with dominant colors
function findAccentColor(colors: number[][]): string {
  if (colors.length < 3) {
    return "#3b82f6" // Default blue
  }

  // Look for a color that's different enough from the dominant colors
  for (let i = 2; i < Math.min(colors.length, 6); i++) {
    const [r, g, b] = colors[i]
    const saturation = calculateSaturation(r, g, b)

    if (saturation > 0.3) {
      return rgbToHex([r, g, b])
    }
  }

  // If no saturated color found, create one based on the dominant color
  const [r, g, b] = colors[0]
  const hsl = rgbToHsl(r, g, b)
  const accentHsl = [hsl[0], Math.max(0.6, hsl[1]), Math.min(0.7, Math.max(0.4, hsl[2]))]
  const accentRgb = hslToRgb(accentHsl[0], accentHsl[1], accentHsl[2])

  return rgbToHex(accentRgb)
}

// Generate theme based on extracted colors
export function generateTheme(colors: ColorPalette): Theme {
  const dominantLuminance = getLuminance(colors.dominant)
  const averageLuminance = getLuminance(colors.average)

  // Determine if we should use light or dark theme
  const shouldUseDarkTheme = dominantLuminance > 0.5 || averageLuminance > 0.6

  let background: string
  let text: string
  let accent: string

  if (shouldUseDarkTheme) {
    // Dark theme: darken the dominant color for background
    background = adjustBrightness(colors.dominant, -0.8)
    text = "#ffffff"
    accent = adjustSaturation(colors.accent, 0.3)
  } else {
    // Light theme: lighten the dominant color for background
    background = adjustBrightness(colors.dominant, 0.9)
    text = "#1f2937"
    accent = adjustSaturation(colors.accent, 0.2)
  }

  // Ensure good contrast
  const contrastRatio = getContrastRatio(background, text)
  if (contrastRatio < 4.5) {
    text = shouldUseDarkTheme ? "#f9fafb" : "#111827"
  }

  return { background, text, accent }
}

// Utility functions
function rgbToHex([r, g, b]: number[]): string {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [Number.parseInt(result[1], 16), Number.parseInt(result[2], 16), Number.parseInt(result[3], 16)]
    : [0, 0, 0]
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h * 360, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  if (s === 0) {
    const gray = Math.round(l * 255)
    return [gray, gray, gray]
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255)
  const g = Math.round(hue2rgb(p, q, h) * 255)
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255)

  return [r, g, b]
}

function calculateSaturation(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  const diff = max - min

  if (max === 0) return 0
  return diff / max
}

function getLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

function adjustBrightness(hex: string, factor: number): string {
  const [r, g, b] = hexToRgb(hex)
  const [h, s, l] = rgbToHsl(r, g, b)

  const newL = Math.max(0, Math.min(1, l + factor))
  const [newR, newG, newB] = hslToRgb(h, s, newL)

  return rgbToHex([newR, newG, newB])
}

function adjustSaturation(hex: string, factor: number): string {
  const [r, g, b] = hexToRgb(hex)
  const [h, s, l] = rgbToHsl(r, g, b)

  const newS = Math.max(0, Math.min(1, s + factor))
  const [newR, newG, newB] = hslToRgb(h, newS, l)

  return rgbToHex([newR, newG, newB])
}
