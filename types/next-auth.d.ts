declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      image?: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
  }
}
