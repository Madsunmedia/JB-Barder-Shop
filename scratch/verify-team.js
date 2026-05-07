const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

async function verifyTeam() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const count = await prisma.barber.count();
    console.log(`Total barbers in DB: ${count}`);
    
    const barbers = await prisma.barber.findMany();
    console.log('Barbers List:', barbers.map(b => b.name).join(', '));

    if (count === 3) {
      console.log('VERIFICATION SUCCESSFUL: Initial 3 barbers seeded.');
    } else {
      console.log(`VERIFICATION FAILED: Expected 3 barbers, found ${count}`);
    }
  } catch (error) {
    console.error('VERIFICATION FAILED:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyTeam();
