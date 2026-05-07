const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

async function verifyReviews() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const count = await prisma.review.count();
    console.log(`Total reviews in DB: ${count}`);
    
    const approved = await prisma.review.count({ where: { status: 'APPROVED' } });
    console.log(`Approved reviews: ${approved}`);
    
    const sample = await prisma.review.findFirst({
        orderBy: { createdAt: 'desc' }
    });
    console.log('Sample review:', JSON.stringify(sample, null, 2));

    if (count > 0) {
      console.log('VERIFICATION SUCCESSFUL');
    } else {
      console.log('VERIFICATION FAILED: No reviews found');
    }
  } catch (error) {
    console.error('VERIFICATION FAILED:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyReviews();
