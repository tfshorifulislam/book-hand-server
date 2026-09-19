import { prisma } from "../lib/prisma.js";
export const getAllBookListings = async (page, limit, search, userId) => {
    const skip = (page - 1) * limit;
    const where = { status: "AVAILABLE",
        ...(search && {
            OR: [
                {
                    book: {
                        title: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    book: {
                        author: {
                            contains: search,
                            mode: "insensitive",
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
    if (!userId) {
        return {
            listings: listings.map((listing) => ({
                ...listing,
                isSaved: false,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    const listingIds = listings.map((listing) => listing.id);
    const savedBooks = await prisma.savedBook.findMany({
        where: {
            userId,
            listingId: {
                in: listingIds,
            },
        },
        select: {
            listingId: true,
        },
    });
    const savedListingIds = new Set(savedBooks.map((savedBook) => savedBook.listingId));
    const listingsWithSavedStatus = listings.map((listing) => ({ ...listing, isSaved: savedListingIds.has(listing.id), }));
    return {
        listings: listingsWithSavedStatus,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
