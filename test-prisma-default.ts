import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("Connecting...");
  const users = await prisma.user.findMany();
  console.log("Users:", users);
}

main().catch(console.error).finally(() => prisma.$disconnect());
