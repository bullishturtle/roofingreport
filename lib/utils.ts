import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

// For development/demo purposes only
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// For development/demo purposes only
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Log user actions for debugging
export function logUserAction(action: string, data?: any): void {
  console.log(`[USER ACTION] ${action}`, data || "")
}

// Log system events for debugging
export function logSystemEvent(event: string, data?: any): void {
  console.log(`[SYSTEM EVENT] ${event}`, data || "")
}

// Log errors for debugging
export function logError(error: Error, context?: string): void {
  console.error(`[ERROR]${context ? ` [${context}]` : ""}`, error)
}
