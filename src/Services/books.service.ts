import { prisma } from "../lib/prisma.js"

export const getAllBookListings = async (
    page: number,
    limit: number) => {

    const skip = (page - 1) * limit;

    const listings = await prisma.bookListing.findMany({
        where: {
            status: 'AVAILABLE',
        },

        include: {
            book: true,
        },

        skip,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }

    });

    return listings;
}