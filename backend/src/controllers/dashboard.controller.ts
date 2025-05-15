import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { getRecentPost, getStatsService } from "../services/dashboard.service";
import { getAllPostService } from "../services/post.service";
import { prisma } from "../db/prisma";

export async function getStatsController(req: Request, res: Response<ResponseApiType>) {
    try {
        const stats = await getStatsService()

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan stats",
            data: stats
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function getRecentPostController(req: Request, res: Response<ResponseApiType>) {
    try {
        const recentPosts = (await getRecentPost())
            .map((post) => ({
                id: post.id,
                title: post.title,
                author: `${post.users.first_name} ${post.users.last_name}`,
                date: post.created_at,
                slug: post.slug,
                views: post.post_meta.reduce((acc, curr) => {
                    const totView = Number(curr.meta_value)
                    return acc + (isNaN(totView) ? 0 : totView)
                }, 0)
            }))

        return res.status(200).json({
            success: true,
            message: "berhasil mendapatkan recent posts",
            data: recentPosts
        })

    } catch (error) {
        return handlerAnyError(error, res)
    }
}

export async function getChartController(req: Request, res: Response<ResponseApiType>) {
    try {
        const posts = await getAllPostService()
        const category = await prisma.post_categories.findMany({
            include: { categories: true }
        })

        const mothNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const mothlyCount = Array.from({ length: 12 }).map((_, i) => ({
            name: mothNames[i],
            count: 0
        }))

        posts.posts.forEach((post) => {
            const month = post.created_at?.getMonth()
            mothlyCount[month!].count += 1
        })

        const categoryMap: Record<string, number> = {}
        category.forEach((item) => {
            const name = item.categories.name

            if (name) {
                categoryMap[name] = (categoryMap[name] || 0) + 1
            }
        })

        const categories = Object.entries(categoryMap).map(([name, value]) => ({
            name, value
        }))
        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data chart",
            data: {
                monthlyPostsData: mothlyCount,
                categoryData: categories
            }
        })

    } catch (error) {
        return handlerAnyError(error, res)
    }
}