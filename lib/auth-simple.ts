import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { simpleDb } from "@/lib/simple-db"

export const authOptions: NextAuthOptions = {
  providers: [
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

        // For demo purposes, we'll accept any login with admin@rooffax.com
        if (credentials.email === "admin@rooffax.com") {
          return {
            id: "1",
            email: "admin@rooffax.com",
            name: "Admin User",
            role: "admin",
          }
        }

        // For other users, check the simple database
        const user = await simpleDb.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          return null
        }

        // For demo purposes, we'll accept any password
        return {
          id: user.id,
          email: user.email,
          name: user.name || undefined,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
}
