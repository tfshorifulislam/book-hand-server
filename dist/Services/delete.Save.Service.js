import { prisma } from "../lib/prisma.js";
import redis from "../config/redis.js";
export const deleteSavedBookService = async (userId, listingId) => {
    const deletedBook = await prisma.savedBook.delete({
        where: {
            userId_listingId: {
                userId,
                listingId,
            },
        },
    });
    const keys = await redis.keys(`books:user=${userId}:*`);
    if (keys.length > 0) {
        await redis.del(keys);
    }
    return deletedBook;
};
