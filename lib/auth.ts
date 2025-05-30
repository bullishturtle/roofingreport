import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Simple demo authentication
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        // Demo password check (in production, use proper hashing)
        if (user && credentials.password === "demo123") {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user.email) {
        // Check if user exists
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

        // Log the sign-in
        await db.auditLog.create({
          data: {
            action: "user_signin",
            userId: existingUser.id,
            details: `User signed in via ${account.provider}`,
          },
        })

        return true
      }
      return true
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
      if (user) {
        token.role = user.role
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
