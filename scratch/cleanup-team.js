const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

async function cleanupTeam() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const deleted = await prisma.barber.deleteMany({
      where: { name: 'Automation Test' }
    });
    console.log(`Cleaned up ${deleted.count} test barbers.`);
    
    const count = await prisma.barber.count();
    console.log(`Final barbers count: ${count}`);
  } catch (error) {
    console.error('CLEANUP FAILED:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupTeam();
