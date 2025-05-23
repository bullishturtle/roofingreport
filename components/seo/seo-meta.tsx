"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article"
  twitterCard?: "summary" | "summary_large_image"
  noIndex?: boolean
  structuredData?: Record<string, any>
}

export function SEOMeta({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  noIndex = false,
  structuredData,
}: SEOProps) {
  const router = useRouter()

  // Default values
  const siteTitle = "RoofFax - The Trusted Source for Roof Information"
  const siteDescription = "Get comprehensive roof reports, history, and condition assessments for any property."
  const defaultOgImage = "https://therooffax.com/og-image.jpg"

  // Final values
  const finalTitle = title ? `${title} | RoofFax` : siteTitle
  const finalDescription = description || siteDescription
  const finalOgImage = ogImage || defaultOgImage
  const finalCanonical = canonical || `https://therooffax.com${router.asPath}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content="RoofFax" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:site" content="@rooffax" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  )
}
