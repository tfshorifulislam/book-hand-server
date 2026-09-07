import { prisma } from "../lib/prisma.js"

export const getAllBookListings = async () => {
    
    const listings = await prisma.bookListing.findMany({
        where:{
            status: 'Available',
        },
        include:{
            book:true,
        },

    });

    return listings;
}