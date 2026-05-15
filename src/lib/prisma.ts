import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const dbUrl = process.env.DATABASE_URL;

let prisma: PrismaClient;

if (typeof window === "undefined") {
  if (dbUrl) {
    const pool = new Pool({ connectionString: dbUrl });
    const adapter = new PrismaPg(pool);
    prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
  } else {
    console.warn("DATABASE_URL is missing. Using standard PrismaClient (this may fail if DB is required).");
    prisma = globalForPrisma.prisma || new PrismaClient();
  }
} else {
  prisma = globalForPrisma.prisma || new PrismaClient();
}

export { prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
