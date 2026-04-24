import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  { name: "Men's Skin Fade + Beard", price: 45, duration: 45, category: "haircut", description: "Precision fade and beard grooming." },
  { name: "Men's Skin Fade", price: 30, duration: 30, category: "haircut", description: "Clean skin-tight fade." },
  { name: "Men's Regular Cut", price: 25, duration: 30, category: "haircut", description: "Standard scissor or clipper cut." },
  { name: "Kids Regular Cut (12 & Under)", price: 20, duration: 20, category: "kids", description: "Haircut for the young gentlemen." },
  { name: "Kids Skin Fade (12 & Under)", price: 25, duration: 30, category: "kids", description: "Sharp fade for kids." },
  { name: "Men's Regular Haircut + Beard", price: 40, duration: 45, category: "haircut", description: "Standard cut plus beard detailing." },
  { name: "Hot Towel Shave", price: 25, duration: 15, category: "shave", description: "Traditional straight razor shave." },
  { name: "Beard Line Up", price: 15, duration: 15, category: "beard", description: "Clean up the edges of your beard." },
  { name: "Facials", price: 50, duration: 30, category: "grooming", description: "Rejuvenating skin treatment." },
  { name: "Ear & Nose Wax", price: 5, duration: 15, category: "grooming", description: "Quick grooming for ears and nose." },
  { name: "Senior's Cut (65+)", price: 20, duration: 25, category: "haircut", description: "Classic cut for our seasoned clients." },
  { name: "Beard Trim", price: 20, duration: 25, category: "beard", description: "Full beard shape and trim." }
];

async function main() {
  console.log("Seeding services...");
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.name }, // Using name as ID for seeding purposes, better to use real IDs in production
      update: {},
      create: {
        id: service.name.toLowerCase().replace(/ /g, "-"),
        name: service.name,
        price: service.price,
        duration: service.duration,
        description: service.description,
      },
    });
  }
  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
