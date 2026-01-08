import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@test.com";
  const password = "Admin123!";

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    console.log("Admin already exists");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name: "Admin", email, passwordHash, role: Role.ADMIN }
  });

  console.log("✅ Admin created:", { email, password });
}

main().finally(async () => prisma.$disconnect());
