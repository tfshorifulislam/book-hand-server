import { prisma } from "../lib/prisma.js";
export const getAllBookListings = async (page, limit) => {
    const skip = (page - 1) * limit;
    const [listings, total] = await prisma.$transaction([
        prisma.bookListing.findMany({
            where: {
                status: 'AVAILABLE',
            },
            include: {
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
                        image: true
                    },
                },
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.bookListing.count({
            where: {
                status: "AVAILABLE",
            },
        }),
    ]);
    return {
        listings,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
