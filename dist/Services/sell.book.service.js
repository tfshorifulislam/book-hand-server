import redis from "../config/redis.js";
import { prisma } from "../lib/prisma.js";
export const sellBookService = async (data) => {
    const book = await prisma.book.create({
        data: {
            title: data.title,
            author: data.author,
            category: data.category,
            language: data.language,
            description: data.description,
            coverImage: data.coverImage,
        },
    });
    const listing = await prisma.bookListing.create({
        data: {
            bookId: book.id,
            sellerId: data.userId,
            price: data.price,
            condition: data.condition,
        },
    });
    // Delete all books cache
    const keys = await redis.keys("books:*");
    if (keys.length > 0) {
        await redis.del(keys);
        console.log("BOOK CACHE INVALIDATED:", keys);
    }
    return { book, listing, };
};
