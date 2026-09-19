import { prisma } from "../lib/prisma.js";
export const getWishlistService = async (userId) => {
    const savedBooks = await prisma.savedBook.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            userId: true,
            listingId: true,
            createdAt: true,
            listing: {
                select: {
                    id: true,
                    bookId: true,
                    sellerId: true,
                    price: true,
                    condition: true,
                    description: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    book: {
                        select: {
                            id: true,
                            title: true,
                            author: true,
                            coverImage: true,
                            category: true,
                            language: true,
                        },
                    },
                    seller: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return savedBooks;
};
