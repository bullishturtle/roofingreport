import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to detect browser environment
export function isBrowser(): boolean {
  return typeof window !== "undefined"
}

// Helper to detect server environment
export function isServer(): boolean {
  return !isBrowser()
}
