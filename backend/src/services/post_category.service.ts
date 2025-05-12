import { prisma } from "../db/prisma";

export async function getAllCategoryService() {
    const categories = await prisma.categories.findMany()

    return categories
}

export async function createCategoryService(name: string, slug: string) {
    const newCategory = await prisma.categories.create({
        data: { name, slug }
    })

    return newCategory
}

export async function updateCategoryService(id: number, name: string, slug: string) {
    const updated = await prisma.categories.update({
        where: { id },
        data: {
            name, slug
        }
    })

    return updated
}

export async function deleteCategoryService(id: number) {
    const deleted = await prisma.categories.delete({ where: { id } })

    return deleted
}