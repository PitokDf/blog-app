import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { createCategoryService, deleteCategoryService, getAllCategoryService, updateCategoryService } from "../services/post_category.service";

export async function getAllCategoryController(req: Request, res: Response<ResponseApiType>) {
    try {
        const categories = await getAllCategoryService()

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan semua kategori",
            data: categories
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}
export async function createCategoryController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { name, slug } = req.body

        const newCategory = await createCategoryService(name, slug)
        return res.status(201).json({
            success: true,
            message: `Berhasil menambahkan kategori baru`,
            data: newCategory
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}
export async function updateCategoryController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const { name, slug } = req.body

        const updatedCategory = await updateCategoryService(Number(id), name, slug)
        return res.status(200).json({
            success: true,
            message: `Berhasil memperbarui kategori`,
            data: updatedCategory
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}
export async function deleteCategoryController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const deleted = await deleteCategoryService(Number(id))

        return res.status(200).json({
            success: true, message: `Berhasil menghapus kategori: ${deleted.name}`
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}