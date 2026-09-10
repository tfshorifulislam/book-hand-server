import { prisma } from "../lib/prisma.js";

type SellBookData = {
    userId: string;
    title: string;
    author: string;
    category: string;
    language: string;
    description: string;
    coverImage: string;
    price: number;
    condition: string;
};

export const sellBookService = async (data: SellBookData) => {
    const book = await prisma.book.create({
        data: {
            title: data.title,
            author: data.author,
            category: data.category,
            language: data.language,
            description: data.description,
            coverImage: data.coverImage,
        },
    });

    const listing = await prisma.bookListing.create({
        data: {
            bookId: book.id,
            sellerId: data.userId,
            price: data.price,
            condition: data.condition,
        },
    });

    return { book, listing, };
};