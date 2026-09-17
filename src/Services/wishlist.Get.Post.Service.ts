import { prisma } from "../lib/prisma.js";

export const getWishlistService = async (
    userId: string
) => {
    const savedBooks = await prisma.savedBook.findMany({
        where: {
            userId,
        },
        include: {
            listing: {
                include: {
                    book: true,
                    seller: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return savedBooks;
};