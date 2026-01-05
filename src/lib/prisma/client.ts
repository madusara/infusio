/**
 * Prisma Client Instance
 * 
 * Singleton pattern to prevent multiple instances of Prisma Client
 * in development (due to hot reloading).
 */

import { PrismaClient } from '@/generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}


