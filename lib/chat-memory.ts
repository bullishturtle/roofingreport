import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}

type ChatMemoryState = {
  conversations: Record<string, ChatMessage[]>
  addMessage: (conversationId: string, message: ChatMessage) => void
  getConversation: (conversationId: string) => ChatMessage[]
  clearConversation: (conversationId: string) => void
}

export const useChatMemory = create<ChatMemoryState>()(
  persist(
    (set, get) => ({
      conversations: {},

      addMessage: (conversationId, message) =>
        set((state) => {
          const currentConversation = state.conversations[conversationId] || []
          return {
            conversations: {
              ...state.conversations,
              [conversationId]: [...currentConversation, message],
            },
          }
        }),

      getConversation: (conversationId) => {
        return get().conversations[conversationId] || []
      },

      clearConversation: (conversationId) =>
        set((state) => {
          const { [conversationId]: _, ...rest } = state.conversations
          return { conversations: rest }
        }),
    }),
    {
      name: "roofus-chat-memory",
    },
  ),
)
