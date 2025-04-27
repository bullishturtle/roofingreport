"use client"

// This file will be loaded as a script tag after the page renders
// It will handle all client-side interactivity

// Create and mount the 3D model
function mountRoofusModel() {
  const container = document.getElementById("model-container")
  if (!container) return

  // Clear the container
  container.innerHTML = ""

  // Create a canvas for the 3D model
  const canvas = document.createElement("canvas")
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  container.appendChild(canvas)

  // Add a loading message
  const loadingMessage = document.createElement("div")
  loadingMessage.className = "absolute inset-0 flex items-center justify-center text-neon-gold"
  loadingMessage.textContent = "Loading 3D Model..."
  container.appendChild(loadingMessage)

  // Simulate loading the 3D model
  setTimeout(() => {
    loadingMessage.remove()

    // Add a static image as a placeholder for the 3D model
    const img = document.createElement("img")
    img.src = "/images/roofus.png"
    img.alt = "Roofus 3D Model"
    img.className = "w-full h-full object-contain"
    container.appendChild(img)
  }, 1000)
}

// Create and mount the Roofus AI Assistant
function mountRoofusAssistant() {
  // Create the assistant container
  const assistantContainer = document.createElement("div")
  assistantContainer.className = "fixed bottom-6 right-6 z-50"
  document.body.appendChild(assistantContainer)

  // Create the button
  const button = document.createElement("button")
  button.className =
    "rounded-full h-14 w-14 bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow flex items-center justify-center"
  assistantContainer.appendChild(button)

  // Add the icon to the button
  const icon = document.createElement("div")
  icon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>'
  button.appendChild(icon)

  // Add the screen reader text
  const srText = document.createElement("span")
  srText.className = "sr-only"
  srText.textContent = "Open Roofus AI Assistant"
  button.appendChild(srText)

  // Add click event listener
  let isOpen = false
  let chatContainer = null

  button.addEventListener("click", () => {
    isOpen = !isOpen

    if (isOpen) {
      // Create the chat container
      chatContainer = document.createElement("div")
      chatContainer.className =
        "absolute bottom-20 right-0 w-80 bg-black/90 border border-neon-gold/30 rounded-lg shadow-neon-glow overflow-hidden"
      assistantContainer.appendChild(chatContainer)

      // Create the header
      const header = document.createElement("div")
      header.className = "p-4 border-b border-neon-gold/30"
      header.innerHTML = '<h3 class="text-white font-medium">Roofus AI Assistant</h3>'
      chatContainer.appendChild(header)

      // Create the content
      const content = document.createElement("div")
      content.className = "p-4"
      content.innerHTML = `
        <p class="text-white/80 text-sm">Hi there! I'm Roofus, your AI roofing assistant. How can I help you today?</p>
        <div class="mt-4">
          <input type="text" placeholder="Type your message..." class="w-full bg-white/10 border border-neon-gold/30 rounded-md p-2 text-white placeholder:text-white/50">
        </div>
      `
      chatContainer.appendChild(content)
    } else if (chatContainer) {
      // Remove the chat container
      chatContainer.remove()
      chatContainer = null
    }
  })
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  mountRoofusModel()
  mountRoofusAssistant()
})
