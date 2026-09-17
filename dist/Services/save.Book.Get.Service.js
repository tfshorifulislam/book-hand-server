import { prisma } from "../lib/prisma.js";
export const getSavedBookService = async (userId, listingId) => {
    const savedBook = await prisma.savedBook.findUnique({
        where: {
            userId_listingId: {
                userId,
                listingId,
            },
        },
    });
    console.log("SAVED BOOK RESULT:", savedBook);
    return !!savedBook;
};
