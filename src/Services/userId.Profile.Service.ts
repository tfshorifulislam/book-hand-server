import { prisma } from "../lib/prisma.js";

export const userProfileService = async (userId: string) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    })

    return user;
}