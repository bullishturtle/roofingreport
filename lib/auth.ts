import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from "./db"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user.email) {
        // Check if user exists in our simple database
        let existingUser = await db.user.findUnique({
          where: { email: user.email },
        })

        if (!existingUser) {
          // Create new user
          existingUser = await db.user.create({
            data: {
              email: user.email,
              name: user.name || "",
              role: "user",
            },
          })
        }

        return true
      }
      return false
    },
    async session({ session, token }) {
      if (session.user?.email) {
        const user = await db.user.findUnique({
          where: { email: session.user.email },
        })
        if (user) {
          session.user.id = user.id
          session.user.role = user.role
        }
      }
      return session
    },
    async jwt({ token, user }) {
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
}
