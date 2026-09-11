import { prisma } from "../lib/prisma.js";

export const bookDetsilsService = async (id: string) => {
    return await prisma.bookListing.findUnique({
        where: {
            id,
        },
        include: {
            book: true,
            seller: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
    });
};