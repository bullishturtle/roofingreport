// Create a separate file for the useToast hook
import { useToast as useToastOriginal } from "@/components/ui/toast"

export const useToast = useToastOriginal

// Re-export everything from the original toast
export * from "@/components/ui/toast"
