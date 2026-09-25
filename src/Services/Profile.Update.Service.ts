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
    const data: {
        name?: string;
        email?: string;
        image?: string;
    } = {};

    if (name !== undefined) {
        data.name = name.trim();
    }

    if (email !== undefined) {
        data.email = email.trim().toLowerCase();
    }

    if (image !== undefined) {
        data.image = image;
    }

    if (Object.keys(data).length === 0) {
        throw new Error("No changes provided");
    }

    return prisma.user.update({
        where: {
            id: userId,
        },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        },
    });
};