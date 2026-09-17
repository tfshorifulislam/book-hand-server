import { prisma } from "../lib/prisma.js";

export const getSavedBookService = async (
    userId: string,
    listingId: string
) => {
    const savedBook = await prisma.savedBook.findUnique({
        where: {
            userId_listingId: {
                userId,
                listingId,
            },
        },
    });

    return !!savedBook;
};