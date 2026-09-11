import { prisma } from "../lib/prisma.js";
export const userProfileService = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    });
    return user;
};
