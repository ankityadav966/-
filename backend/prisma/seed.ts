import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  const passwordHash = await bcrypt.hash('demo1234', 10);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@demo.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@demo.com',
      passwordHash,
      todos: {
        create: [
          {
            title: 'Complete Todo Application',
            description: 'Finish the full-stack todo application using React, Node.js, and Prisma.',
            completed: false,
            priority: 'HIGH',
          },
          {
            title: 'Review PRs',
            description: 'Review pending pull requests on GitHub.',
            completed: false,
            priority: 'MEDIUM',
          },
          {
            title: 'Buy Groceries',
            description: 'Milk, Eggs, Bread, Vegetables.',
            completed: true,
            priority: 'LOW',
          }
        ]
      }
    }
  });

  console.log('Demo user created:', demoUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
