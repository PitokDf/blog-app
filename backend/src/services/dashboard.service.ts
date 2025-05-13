import { prisma } from "../db/prisma";

export async function getStatsService() {
    const userCount = await prisma.users.count()
    const postCount = await prisma.posts.count()
    const viewCount = (await prisma.post_meta.findMany({
        where: { meta_key: "views" },
        select: { meta_value: true }
    })).reduce((acc, curr) => {
        const views = Number(curr.meta_value)
        return acc + (isNaN(views) ? 0 : views)
    }, 0)

    return { userCount, postCount, viewCount }
}

export async function getRecentPost() {
    const recentPosts = await prisma.posts.findMany({
        orderBy: { created_at: "desc" },
        take: 5,
        include: {
            users: { select: { first_name: true, last_name: true } },
            post_meta: {
                where: { meta_key: "views" }
            }
        }
    })

    return recentPosts
}