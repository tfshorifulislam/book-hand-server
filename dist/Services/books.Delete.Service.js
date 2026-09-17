import { prisma } from "../lib/prisma.js";
export const deleteBookListingService = async (listingId, userId) => {
    console.log("DELETE listingId:", listingId);
    console.log("DELETE userId:", userId);
    const listing = await prisma.bookListing.findUnique({
        where: {
            id: listingId,
        },
    });
    console.log("FOUND LISTING:", listing);
    if (!listing) {
        throw new Error("Book listing not found");
    }
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
