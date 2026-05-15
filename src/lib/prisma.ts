import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || (() => {
  const dbUrl = process.env.DATABASE_URL;
  
  if (dbUrl && typeof window === "undefined") {
    const pool = new Pool({ connectionString: dbUrl });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  }
  
  return new PrismaClient();
})();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
