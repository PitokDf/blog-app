import { $Enums } from "@prisma/client";
import { prisma } from "../db/prisma";
import { AppError } from "../errors/api_errors";

export async function getAllUserService() {
    const users = await prisma.users.findMany()
    return users
}

export async function getUserByIdService(id: number) {
    const user = await prisma.users.findFirst({ where: { id } })

    if (!user) throw new AppError(`Penggunan dengan id: ${id}, tidak ditemukan.`, 404);

    return user
}

export async function createUserService(email: string, first_name: string, last_name: string, password_hash: string, role: $Enums.userRole) {
    const newUser = await prisma.users.create({
        data: {
            email, first_name, last_name, password_hash, role
        }
    })

    return newUser
}

export async function updateUserService(id: number, email: string, first_name: string, last_name: string, password_hash: string, role: $Enums.userRole) {
    await getUserByIdService(id)

    const updatedUser = await prisma.users.update({
        where: { id },
        data: {
            email, first_name, last_name, password_hash, role
        }
    })

    return updatedUser
}

export async function deleteUserService(id: number) {
    await getUserByIdService(id)
    const deletedUser = await prisma.users.delete({ where: { id } })

    return deletedUser
}

export async function existsEmail(email: string, ignoreId?: number) {
    const whereClause: any = { email }

    if (ignoreId) { whereClause.id = { not: ignoreId } }

    const existtingEmail = await prisma.users.findFirst({
        where: whereClause
    })

    return existtingEmail
}