import { PrismaClient } from "@prisma/client";

// give global definition of prisma to work throughout the app
declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === "production") {
  globalThis.prisma = client;
}

export default client;
