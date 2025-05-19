"use client"

import { useEffect } from "react"
import { loadScriptOnInteraction, loadScriptOnVisible } from "@/lib/script-manager"

type MarketingScriptsProps = {
  chatbotId?: string
  popupId?: string
  reviewWidgetId?: string
}

export function MarketingScripts({ chatbotId, popupId, reviewWidgetId }: MarketingScriptsProps) {
  useEffect(() => {
    // Load chatbot only after user interaction
    if (chatbotId) {
      loadScriptOnInteraction({
        src: `https://widget.intercom.io/widget/${chatbotId}`,
        attributes: {
          async: true,
          "data-category": "marketing",
        },
      })
    }

    // Load popup script only when footer becomes visible
    if (popupId && document.getElementById("footer")) {
      loadScriptOnVisible("footer", {
        src: `https://cdn.popupsmart.com/bundle/${popupId}.js`,
        attributes: {
          async: true,
          "data-category": "marketing",
        },
      })
    }

    // Load review widget when its container is visible
    if (reviewWidgetId && document.getElementById("reviews-section")) {
      loadScriptOnVisible("reviews-section", {
        src: `https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js`,
        attributes: {
          async: true,
          "data-category": "marketing",
          "data-template-id": reviewWidgetId,
        },
      })
    }
  }, [chatbotId, popupId, reviewWidgetId])

  return null
}
