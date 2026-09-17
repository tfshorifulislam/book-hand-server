import { prisma } from "../lib/prisma.js";

export const saveBookService = async (
    userId: string,
    listingId: string
) => {
    const savedBook = await prisma.savedBook.create({
        data: {
            userId,
            listingId,
        },
    });

    return savedBook;
};