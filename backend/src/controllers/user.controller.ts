import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { createUserService, deleteUserService, getAllUserService, getUserByIdService, updateUserService } from "../services/user.service";
import { hashing } from "../utils/bcrypt";

export async function getAllUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const users = await getAllUserService()
        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data",
            data: users
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function getUserByIdController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const user = await getUserByIdService(Number(id))

        return res.status(200).json({
            success: true,
            message: `Berhasil mendapatkan user id: ${id}`,
            data: user
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function updateUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const { email, first_name, last_name, password, role } = req.body

        let passwordhash = undefined

        if (password) await hashing(password);
        const updated = await updateUserService(Number(id), email, first_name, last_name, passwordhash!, role)

        return res.status(200).json({
            success: true,
            message: `Berhasil memperbarui user: ${updated.first_name}`,
            data: updated
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function createUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { email, first_name, last_name, password, role } = req.body

        const hashedPassword = await hashing(password)

        const newUser = await createUserService(email, first_name, last_name, hashedPassword!, role)

        return res.status(201).json({
            success: true,
            message: "Berhasil menambahkan user baru",
            data: newUser
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}
export async function deleteUserController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const deleted = await deleteUserService(Number(id))

        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus user: ${deleted.first_name}`
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}