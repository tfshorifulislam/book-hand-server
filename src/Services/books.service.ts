import { prisma } from "../lib/prisma.js"

export const getAllBooks = async () => {
    const books = await prisma.book.findMany();
    return books;
}