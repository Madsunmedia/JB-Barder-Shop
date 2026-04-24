import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "ijbbarbershop@gmail.com";
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      email: adminEmail,
      name: "JB Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log({ admin });

  // Create default settings
  const settings = await prisma.settings.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      businessName: "JB Barbershop",
      phone: "+1 403 929 7321",
      email: "ijbbarbershop@gmail.com",
      address: "410 13 Street North, Lethbridge, Alberta T1H 2S2",
      hours: {
        mon: { open: "09:00", close: "20:00" },
        tue: { open: "09:00", close: "20:00" },
        wed: { open: "09:00", close: "20:00" },
        thu: { open: "09:00", close: "20:00" },
        fri: { open: "09:00", close: "20:00" },
        sat: { open: "09:00", close: "20:00" },
        sun: { open: "09:00", close: "19:00" },
      }
    },
  });

  console.log({ settings });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
