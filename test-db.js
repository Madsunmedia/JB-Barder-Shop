const { PrismaClient } = require('@prisma/client');

async function testConnection(url, name) {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  });

  try {
    console.log(`Testing ${name}...`);
    const count = await prisma.availabilityBlock.count();
    console.log(`SUCCESS [${name}]: Reached DB. Availability block count =`, count);
  } catch (error) {
    console.error(`FAILED [${name}]:`, error.message);
  } finally {
    await prisma.$disconnect();
  }
}

async function run() {
  const urlWithoutSSL = "postgresql://jb_admin:3SdDuQ9LxAzrZbj2yVk1FXR674YNQqZV@dpg-d7rd4e77f7vs73ct5qh0-a.oregon-postgres.render.com/jb_barbershop";
  const urlWithSSL = "postgresql://jb_admin:3SdDuQ9LxAzrZbj2yVk1FXR674YNQqZV@dpg-d7rd4e77f7vs73ct5qh0-a.oregon-postgres.render.com/jb_barbershop?sslmode=require&schema=public";

  await testConnection(urlWithoutSSL, "URL Without SSL");
  console.log("-------------------");
  await testConnection(urlWithSSL, "URL With SSL");
}

run();
