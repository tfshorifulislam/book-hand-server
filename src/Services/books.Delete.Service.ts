import { prisma } from "../lib/prisma.js";

export const deleteBookListingService = async (
    listingId: string,
    userId: string
) => {
    const listing = await prisma.bookListing.findUnique({
        where: {
            id: listingId,
        },
    });

    if (!listing) {
        throw new Error("Book listing not found");
    }

    // Only owner can delete
    if (listing.sellerId !== userId) {
        throw new Error("You can only delete your own listing");
    }

    await prisma.bookListing.delete({
        where: {
            id: listingId,
        },
    });

    return {
        message: "Book listing deleted successfully",
    };
};