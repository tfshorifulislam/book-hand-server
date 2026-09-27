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
    
    const data: any = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (image) data.image = image;

    return prisma.user.update({
        where: { id: userId },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        },
    });
};