import { prisma } from "../lib/prisma.js";
export const saveBookService = async (userId, listingId) => {
    const savedBook = await prisma.savedBook.create({
        data: {
            userId,
            listingId,
        },
    });
    return savedBook;
};
