import { prisma } from "../lib/prisma.js";

type UpdateProfileData = {
    userId: string;
    name?: string;
    email?: string;
    image?: string;
};

export const updateProfileService = async ({
    userId,
    name,
    email,
    image,
}: UpdateProfileData) => {
    if (
        name === undefined &&
        email === undefined &&
        image === undefined
    ) {
        throw new Error("No changes provided");
    }

    return prisma.user.update({
        where: { id: userId },
        data: {
            ...(name !== undefined && { name: name.trim() }),
            ...(email !== undefined && {
                email: email.trim().toLowerCase(),
            }),
            ...(image !== undefined && { image }),
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        },
    });
};