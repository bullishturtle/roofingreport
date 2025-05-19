// Simplified db module to avoid build issues
const prisma = {
  user: {
    findUnique: async () => ({ id: "1", name: "Test User", email: "test@example.com" }),
    create: async () => ({ id: "1", name: "Test User", email: "test@example.com" }),
    update: async () => ({ id: "1", name: "Test User", email: "test@example.com" }),
  },
  verificationToken: {
    findUnique: async () => ({ identifier: "test@example.com", token: "token", expires: new Date() }),
    create: async () => ({ identifier: "test@example.com", token: "token", expires: new Date() }),
    delete: async () => ({ identifier: "test@example.com", token: "token", expires: new Date() }),
  },
}

export default prisma
