import { prisma } from "../lib/prisma.js";

export const getAllBookListings = async (
    page: number,
    limit: number,
    search: string
) => {
    const skip = (page - 1) * limit;

    const where = {
        status: "AVAILABLE" as const,

        ...(search && {
            OR: [
                {
                    book: {
                        title: {
                            contains: search,
                            mode: "insensitive" as const,
                        },
                    },
                },
                {
                    book: {
                        author: {
                            contains: search,
                            mode: "insensitive" as const,
                        },
                    },
                },
            ],
        }),
    };

    const [listings, total] = await prisma.$transaction([
        prisma.bookListing.findMany({
            where,

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
                        image: true,
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
            where,
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