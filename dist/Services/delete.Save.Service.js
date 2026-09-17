import { prisma } from "../lib/prisma.js";
export const deleteSavedBookService = async (userId, listingId) => {
    const deletedBook = await prisma.savedBook.delete({
        where: {
            userId_listingId: {
                userId,
                listingId,
            },
        },
    });
    return deletedBook;
};
