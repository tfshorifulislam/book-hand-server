import redis from "../config/redis.js";
import { prisma } from "../lib/prisma.js";


export const saveBookService = async ( userId: string, listingId: string) => {
  const savedBook = await prisma.savedBook.create({ data: { userId, listingId, }, });

  const cacheKey = `saved:${userId}:${listingId}`;

  await redis.set(cacheKey, "1", {
    EX: 60 * 5,
  });

  return savedBook;
};