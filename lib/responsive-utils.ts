// Breakpoint values in pixels
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

// Media query strings for use in styled-components or CSS-in-JS
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  "2xl": `@media (min-width: ${breakpoints["2xl"]}px)`,

  // Max-width queries
  maxXs: `@media (max-width: ${breakpoints.xs - 1}px)`,
  maxSm: `@media (max-width: ${breakpoints.sm - 1}px)`,
  maxMd: `@media (max-width: ${breakpoints.md - 1}px)`,
  maxLg: `@media (max-width: ${breakpoints.lg - 1}px)`,
  maxXl: `@media (max-width: ${breakpoints.xl - 1}px)`,
  max2xl: `@media (max-width: ${breakpoints["2xl"] - 1}px)`,

  // Device-specific queries
  mobile: `@media (max-width: ${breakpoints.md - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.lg}px)`,

  // Orientation queries
  portrait: "@media (orientation: portrait)",
  landscape: "@media (orientation: landscape)",

  // High-density screens
  retina: "@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",
}

// Device detection (to be used client-side only)
export const getDeviceType = () => {
  if (typeof window === "undefined") return "desktop" // Default for SSR

  const width = window.innerWidth

  if (width < breakpoints.md) return "mobile"
  if (width < breakpoints.lg) return "tablet"
  return "desktop"
}

// Orientation detection (to be used client-side only)
export const getOrientation = () => {
  if (typeof window === "undefined") return "landscape" // Default for SSR

  return window.innerWidth > window.innerHeight ? "landscape" : "portrait"
}

// Safe area insets for notched devices
export const getSafeAreaInsets = () => {
  const style = {
    paddingTop: "env(safe-area-inset-top, 0px)",
    paddingRight: "env(safe-area-inset-right, 0px)",
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
    paddingLeft: "env(safe-area-inset-left, 0px)",
  }

  return style
}
