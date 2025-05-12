import { prisma } from "../db/prisma";

export async function getAllCategory() {
    const categories = await prisma.categories.findMany()

    return categories
}