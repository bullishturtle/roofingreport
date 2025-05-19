import type React from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { ToastProvider } from "@/components/ui/toast"

// Create a custom render function that includes providers
const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return <ToastProvider>{children}</ToastProvider>
  }

  return render(ui, { wrapper: AllProviders, ...options })
}

// Re-export everything from testing-library
export * from "@testing-library/react"

// Override render method
export { customRender as render }
