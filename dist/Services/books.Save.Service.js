import { prisma } from "../lib/prisma.js";
import redis from "../config/redis.js";
export const saveBookService = async (userId, listingId) => {
    const savedBook = await prisma.savedBook.create({
        data: {
            userId,
            listingId,
        },
    });
    const keys = await redis.keys(`books:user=${userId}:*`);
    if (keys.length > 0) {
        await redis.del(...keys);
    }
    return savedBook;
};
