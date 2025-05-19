/**
 * Script Manager Utility
 *
 * This utility provides functions to load third-party scripts in an optimized way,
 * reducing their impact on page performance.
 */

type ScriptAttributes = {
  id?: string
  async?: boolean
  defer?: boolean
  onload?: () => void
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload"
  preconnect?: boolean
  preload?: boolean
  "data-consent"?: string
  "data-category"?: string
}

type ScriptConfig = {
  src: string
  attributes?: ScriptAttributes
  preconnectUrls?: string[]
}

// Map to track loaded scripts
const loadedScripts = new Map<string, boolean>()

/**
 * Adds a preconnect link for a domain to improve connection time
 */
export function addPreconnect(url: string): void {
  if (typeof document === "undefined") return

  const domain = new URL(url).origin

  // Check if preconnect already exists
  if (document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
    return
  }

  const link = document.createElement("link")
  link.rel = "preconnect"
  link.href = domain
  link.crossOrigin = "anonymous"
  document.head.appendChild(link)

  // Also add DNS prefetch as fallback for browsers that don't support preconnect
  const dnsPrefetch = document.createElement("link")
  dnsPrefetch.rel = "dns-prefetch"
  dnsPrefetch.href = domain
  document.head.appendChild(dnsPrefetch)
}

/**
 * Loads a script with performance optimizations
 */
export function loadScript(config: ScriptConfig): Promise<void> {
  const { src, attributes = {}, preconnectUrls = [] } = config

  // Add preconnect for the script domain and any additional domains
  addPreconnect(src)
  preconnectUrls.forEach((url) => addPreconnect(url))

  // If script is already loaded, return resolved promise
  if (loadedScripts.get(src)) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = src

    // Apply attributes
    if (attributes.id) script.id = attributes.id
    if (attributes.async) script.async = true
    if (attributes.defer) script.defer = true
    if (attributes["data-consent"]) script.setAttribute("data-consent", attributes["data-consent"])
    if (attributes["data-category"]) script.setAttribute("data-category", attributes["data-category"])

    // Handle load event
    script.onload = () => {
      loadedScripts.set(src, true)
      if (attributes.onload) attributes.onload()
      resolve()
    }

    script.onerror = (error) => {
      reject(error)
    }

    document.body.appendChild(script)
  })
}

/**
 * Loads a script after the page becomes idle
 */
export function loadScriptWhenIdle(config: ScriptConfig): void {
  if (typeof window === "undefined") return

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      loadScript(config).catch((err) => console.error("Error loading script:", err))
    })
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      loadScript(config).catch((err) => console.error("Error loading script:", err))
    }, 2000)
  }
}

/**
 * Loads a script when an element is about to enter the viewport
 */
export function loadScriptOnVisible(elementId: string, config: ScriptConfig): void {
  if (typeof window === "undefined" || typeof document === "undefined") return

  const element = document.getElementById(elementId)
  if (!element) return

  // Add preconnect early
  if (config.preconnectUrls) {
    config.preconnectUrls.forEach((url) => addPreconnect(url))
  }
  addPreconnect(config.src)

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadScript(config).catch((err) => console.error("Error loading script:", err))
            observer.disconnect()
          }
        })
      },
      { rootMargin: "200px" },
    ) // Load when within 200px of viewport

    observer.observe(element)
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    loadScriptWhenIdle(config)
  }
}

/**
 * Loads a script after user interaction
 */
export function loadScriptOnInteraction(config: ScriptConfig): void {
  if (typeof window === "undefined" || typeof document === "undefined") return

  const eventTypes = ["mousedown", "keydown", "touchstart", "scroll"]

  const loadHandler = () => {
    loadScript(config).catch((err) => console.error("Error loading script:", err))
    // Remove all event listeners
    eventTypes.forEach((type) => {
      document.removeEventListener(type, loadHandler, { capture: true })
    })
  }

  // Add event listeners
  eventTypes.forEach((type) => {
    document.addEventListener(type, loadHandler, { once: true, passive: true, capture: true })
  })
}
