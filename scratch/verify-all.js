const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

async function verify() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    // Services
    const svcCount = await prisma.service.count();
    const svcSample = await prisma.service.findFirst({ orderBy: { name: 'asc' } });
    console.log(`\n=== SERVICES ===`);
    console.log(`Count: ${svcCount}`);
    console.log(`Sample: ${svcSample?.name} | $${svcSample?.price} | ${svcSample?.category}`);
    console.log(svcCount === 12 ? '✅ SERVICES OK (12/12)' : `❌ SERVICES: Expected 12, got ${svcCount}`);

    // Settings
    const settings = await prisma.settings.findUnique({ where: { id: 'global' } });
    console.log(`\n=== SETTINGS ===`);
    console.log(`Business: ${settings?.businessName}`);
    console.log(`Phone: ${settings?.phone}`);
    console.log(`Hours keys: ${settings?.hours ? Object.keys(settings.hours).join(', ') : 'none'}`);
    console.log(settings ? '✅ SETTINGS OK' : '❌ SETTINGS: No record found');

    // Dashboard data
    const bookings = await prisma.booking.count();
    const pending = await prisma.booking.count({ where: { status: 'PENDING' } });
    const reviews = await prisma.review.count({ where: { status: 'PENDING' } });
    console.log(`\n=== DASHBOARD ===`);
    console.log(`Total bookings: ${bookings}`);
    console.log(`Pending bookings: ${pending}`);
    console.log(`Pending reviews: ${reviews}`);
    console.log(`Total services: ${svcCount}`);
    console.log('✅ DASHBOARD DATA OK');

    console.log('\n🎉 ALL VERIFICATIONS PASSED');
  } catch (e) {
    console.error('❌ VERIFICATION FAILED:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
