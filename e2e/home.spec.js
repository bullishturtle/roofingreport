// @ts-check
const { test, expect } = require("@playwright/test")

test.describe("Home Page", () => {
  test("should load the home page successfully", async ({ page }) => {
    await page.goto("/")

    // Check if the page title is correct
    await expect(page).toHaveTitle(/RoofFax/)

    // Check if the hero section is visible
    await expect(page.locator("text=Trusted by Homeowners")).toBeVisible()

    // Check if the search form is visible
    await expect(page.locator('input[placeholder*="property address"]')).toBeVisible()
    await expect(page.locator('button:has-text("Get Instant Report")')).toBeVisible()
  })

  test("should validate the search form", async ({ page }) => {
    await page.goto("/")

    // Try to submit with empty input
    const searchButton = page.locator('button:has-text("Get Instant Report")')
    await expect(searchButton).toBeDisabled()

    // Enter invalid address and check for validation
    const searchInput = page.locator('input[placeholder*="property address"]')
    await searchInput.fill("a")
    await searchInput.blur()

    // Check for validation error
    await expect(page.locator("text=Please enter a valid")).toBeVisible()

    // Enter valid address
    await searchInput.fill("123 Main Street, Anytown, USA")

    // Button should be enabled
    await expect(searchButton).toBeEnabled()
  })

  test("should navigate to different sections", async ({ page }) => {
    await page.goto("/")

    // Click on "See How It Works" button
    await page.locator('a:has-text("See How It Works")').click()

    // Check if the section is visible
    await expect(page.locator('h2:has-text("How RoofFax Works")')).toBeVisible()

    // Check if the stats section is visible
    await expect(page.locator("text=Roofs Analyzed")).toBeVisible()
  })

  test("should be responsive", async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/")

    // Check if mobile menu is visible
    await expect(page.locator("button.md\\:hidden")).toBeVisible()

    // Test on desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })

    // Check if desktop navigation is visible
    await expect(page.locator("nav.hidden.md\\:flex")).toBeVisible()
  })
})
