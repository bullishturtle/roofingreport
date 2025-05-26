import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/signup",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you would normally validate against your database
        // For demo purposes, we're using a simple check
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Demo users for testing
        if (credentials.email === "admin@rooffax.com" && credentials.password === "password") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@rooffax.com",
            role: "admin",
          }
        }

        if (credentials.email === "user@rooffax.com" && credentials.password === "password") {
          return {
            id: "2",
            name: "Demo User",
            email: "user@rooffax.com",
            role: "user",
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || ""
        session.user.role = token.role as string
      }
      return session
    },
  },
}
