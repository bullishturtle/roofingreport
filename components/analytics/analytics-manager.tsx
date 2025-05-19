"use client"

import { useEffect } from "react"
import { loadScript, loadScriptWhenIdle, loadScriptOnInteraction } from "@/lib/script-manager"

type AnalyticsManagerProps = {
  gtmId?: string
  gaId?: string
  metaPixelId?: string
  linkedInId?: string
  hotjarId?: string
  crazyEggId?: string
  optimizelyId?: string
}

export function AnalyticsManager({
  gtmId,
  gaId,
  metaPixelId,
  linkedInId,
  hotjarId,
  crazyEggId,
  optimizelyId,
}: AnalyticsManagerProps) {
  useEffect(() => {
    // Load critical analytics immediately (with optimization)
    if (gtmId) {
      // Google Tag Manager - load with high priority but optimized
      loadScript({
        src: `https://www.googletagmanager.com/gtm.js?id=${gtmId}`,
        attributes: {
          async: true,
          "data-category": "analytics",
        },
        preconnectUrls: ["https://www.google-analytics.com", "https://stats.g.doubleclick.net"],
      }).catch(console.error)
    }

    if (gaId) {
      // Google Analytics - load with high priority but optimized
      loadScript({
        src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
        attributes: {
          async: true,
          "data-category": "analytics",
        },
        preconnectUrls: ["https://www.google-analytics.com"],
      })
        .then(() => {
          // Initialize GA
          window.dataLayer = window.dataLayer || []
          function gtag(...args: any[]) {
            window.dataLayer.push(args)
          }
          gtag("js", new Date())
          gtag("config", gaId, { anonymize_ip: true })
        })
        .catch(console.error)
    }

    // Load less critical analytics when the browser is idle
    if (metaPixelId) {
      loadScriptWhenIdle({
        src: "https://connect.facebook.net/en_US/fbevents.js",
        attributes: {
          "data-category": "marketing",
        },
        preconnectUrls: ["https://connect.facebook.net"],
      })

      // Initialize Meta Pixel
      window.fbq =
        window.fbq ||
        (() => {
          ;(window.fbq.q = window.fbq.q || []).push(arguments)
        })
      window._fbq = window._fbq || window.fbq
      window.fbq("init", metaPixelId)
      window.fbq("track", "PageView")
    }

    // Load marketing scripts only after user interaction
    if (linkedInId) {
      loadScriptOnInteraction({
        src: "https://snap.licdn.com/li.lms-analytics/insight.min.js",
        attributes: {
          "data-category": "marketing",
        },
      })

      // Initialize LinkedIn
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
      window._linkedin_data_partner_ids.push(linkedInId)
    }

    // Load experience analytics when browser is idle
    if (hotjarId) {
      loadScriptWhenIdle({
        src: "https://static.hotjar.com/c/hotjar-" + hotjarId + ".js?sv=6",
        attributes: {
          async: true,
          defer: true,
          "data-category": "analytics",
        },
      })

      // Initialize Hotjar
      window.hj =
        window.hj ||
        (() => {
          ;(window.hj.q = window.hj.q || []).push(arguments)
        })
      window.hj("event", "page_view")
    }

    // Load optimization tools when browser is idle
    if (optimizelyId) {
      loadScriptWhenIdle({
        src: `https://cdn.optimizely.com/js/${optimizelyId}.js`,
        attributes: {
          async: true,
          "data-category": "optimization",
        },
      })
    }

    // Load heatmap tools after interaction
    if (crazyEggId) {
      loadScriptOnInteraction({
        src: `https://script.crazyegg.com/pages/scripts/${crazyEggId}.js`,
        attributes: {
          async: true,
          "data-category": "analytics",
        },
      })
    }
  }, [gtmId, gaId, metaPixelId, linkedInId, hotjarId, crazyEggId, optimizelyId])

  return null
}

// Add TypeScript interfaces for analytics globals
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    fbq: any
    _fbq: any
    _linkedin_data_partner_ids: string[]
    hj: any
  }
}
