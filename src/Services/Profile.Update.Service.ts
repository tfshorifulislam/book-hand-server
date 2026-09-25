import { prisma } from "../lib/prisma.js";

export const updateProfileService = async ({
    userId,
    name,
    email,
    image,
}: {
    userId: string;
    name?: string;
    email?: string;
    image?: string;
}) => {
    if (!name && !email && !image) {
        throw new Error("No changes provided");
    }

    return prisma.user.update({
        where: { id: userId },
        data: {
            ...(name && { name: name.trim() }),
            ...(email && { email: email.trim().toLowerCase() }),
            ...(image && { image }),
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        },
    });
};