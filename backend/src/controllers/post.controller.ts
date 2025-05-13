import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { createPostService, deletePostService, getAllPostService, getPostByIdService, getPostBySlugService, updatePostService } from "../services/post.service";

export async function getAllPostController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { posts, postsContent } = await getAllPostService()
        const articles = posts.map((post) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            summary: post.summary,
            author: `${post.users.first_name} ${post.users.last_name}`,
            publishedAt: post.created_at,
            category: post.post_categories.map((post) => post.categories.name),
            content: postsContent.find((content) => content.postID === post.id)?.content || null
        }))

        return res.status(200).jsonp({
            success: true,
            message: "Berhasil mendapatkan data post",
            data: articles
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function getPostByIdController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { slug } = req.params
        const post = await getPostBySlugService(slug)

        const postMap = {
            id: post.id,
            title: post.title,
            slug: post.slug,
            author: post.users.first_name,
            summary: post.summary,
            publishedAt: post.created_at,
            category: post.post_categories.map((cate) => ({ id: cate.category_id, name: cate.categories.name })),
            content: post.content
        }
        return res.status(200).json({
            success: true,
            message: `berhasil mendapatkan post: ${slug}`,
            data: postMap,
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function createPostController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { author_id, slug, title, content, summary, categoryIds } = req.body

        const newPost = await createPostService(Number(author_id), slug, title, content, summary, categoryIds)

        return res.status(201).json({
            success: true,
            message: `Berhasil menambahkan post: ${slug}`,
            data: newPost
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function updatePostController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const { slug, title, content, summary, categoryIds } = req.body

        const updated = await updatePostService(Number(id), slug, title, content, summary, categoryIds)

        return res.status(200).jsonp({
            success: true,
            message: `Berhasil memperbarui post: ${updated.title}`,
            data: updated
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function deletePostController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { id } = req.params
        const deleted = await deletePostService(Number(id))

        return res.status(200).json({
            success: true,
            message: `Berhasil menghapus post: ${deleted.title}`
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}