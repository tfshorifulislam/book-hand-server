import { prisma } from "../lib/prisma.js";

export const getUserBooksService = async (
  userId: string,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const [listings, total] = await prisma.$transaction([
    prisma.bookListing.findMany({
      where: {
        sellerId: userId,
        status: "AVAILABLE",
      },

      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            coverImage: true,
            category: true,
            language: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limit,
    }),

    prisma.bookListing.count({
      where: {
        sellerId: userId,
        status: "AVAILABLE",
      },
    }),
  ]);

  return {
    listings,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};