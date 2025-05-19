/**
 * Helper functions to ensure consistent path handling throughout the application
 */

/**
 * Converts a relative path to an absolute path using the @ alias
 * @param path The relative path to convert
 * @returns The absolute path with @ alias
 */
export function toAbsolutePath(path: string): string {
  // Remove any leading ./ or ../
  const cleanPath = path.replace(/^\.\.?\//, "")

  // Add the @ alias if it doesn't already exist
  if (!cleanPath.startsWith("@/")) {
    return `@/${cleanPath}`
  }

  return cleanPath
}

/**
 * Ensures that all lib imports use the correct path
 * @param path The path to check and fix
 * @returns The corrected path
 */
export function fixLibImport(path: string): string {
  // Fix double lib references (lib/lib/...)
  if (path.includes("lib/lib/")) {
    return path.replace("lib/lib/", "lib/")
  }

  // Fix missing @ in lib references
  if (path.startsWith("lib/") && !path.startsWith("@/lib/")) {
    return `@/${path}`
  }

  return path
}
