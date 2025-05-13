import { mongo } from "../db/mongo";
import { prisma } from "../db/prisma";
import { AppError } from "../errors/api_errors";

export async function getAllPostService() {
    const posts = await prisma.posts.findMany({
        include: {
            users: { select: { first_name: true, last_name: true } }, post_categories:
                { include: { categories: { select: { name: true } } } }
        }
    })
    const postsContent = await mongo.articles.find().toArray()

    return { posts, postsContent }
}

export async function getPostBySlugService(slug: string) {
    const post = await prisma.posts.findFirst({
        where: { slug },
        include: {
            users: { select: { first_name: true, last_name: true } }, post_categories:
                { include: { categories: { select: { name: true } } } }
        }
    })

    if (!post) throw new AppError(`Post dengan slug: ${slug}, tidak tersedia.`, 404);

    const content = await mongo.articles.findOne({ postID: post.id })

    const meta = await prisma.post_meta.findFirst({
        where: { post_id: post.id, meta_key: "views" },
    })

    if (meta) {
        const newValue = isNaN(Number(meta.meta_value)) ? 0 : Number(meta.meta_value) + 1
        await prisma.post_meta.update({
            where: { id: meta.id },
            data: { meta_value: String(newValue) }
        })
    } else {
        await prisma.post_meta.create({
            data: { post_id: post.id, meta_key: "views", meta_value: "1" }
        })
    }
    return { ...post, content: content?.content || null }
}

export async function getPostByIdService(id: number) {
    const post = await prisma.posts.findFirst({
        where: { id }
    })

    if (!post) throw new AppError(`Post dengan id: ${id}, tidak tersedia.`, 404);

    const content = await mongo.articles.findOne({ postID: post.id })

    return { ...post, content: content?.content || null }
}

export async function slugPostExis(slug: string, ignoredId?: number) {
    let whereClause: any = { slug }

    if (ignoredId) {
        whereClause.id = { not: ignoredId }
    }
    const postSlug = await prisma.posts.findFirst({
        where: whereClause
    })

    return postSlug ? true : false
}

export async function createPostService(author_id: number, slug: string, title: string, content: string, summary: string, categoryIds?: number[]) {
    const tr = await prisma.$transaction(async (tr) => {
        const post = await tr.posts.create({
            data: { author_id, slug, title, summary }
        })

        if (categoryIds) {
            const categories = categoryIds.map((id) => ({
                category_id: id,
                post_id: post.id
            }))

            await tr.post_categories.createMany({
                data: categories
            })
        }

        await mongo.articles.insertOne({ updatedAt: post.updated_at!, createdAt: post.created_at!, content, postID: post.id })

        return { ...post }
    })

    return tr
}

export async function updatePostService
    (id: number, slug: string, title: string, content: string, summary: string, categoryIds?: number[]) {
    await getPostByIdService(id)

    const tr = await prisma.$transaction(async (tr) => {
        const updated = await tr.posts.update({
            where: { id },
            data: {
                title, slug, summary
            }
        })

        if (categoryIds) {
            await tr.post_categories.deleteMany({ where: { post_id: updated.id } })

            const categories = categoryIds.map((id) => ({
                category_id: id,
                post_id: updated.id
            }))

            await tr.post_categories.createMany({
                data: categories,
                skipDuplicates: true
            })
        }

        return updated
    })

    if (content !== undefined) {
        await mongo.articles.updateOne(
            { postID: tr.id },
            { $set: { content: content, updatedAt: new Date } }
        )
    }

    return { ...tr }
}

export async function deletePostService(id: number) {
    await getPostByIdService(id)

    const tr = await prisma.$transaction(async (tr) => {
        const deleted = await tr.posts.delete({ where: { id } })

        await tr.post_categories.deleteMany({ where: { post_id: deleted.id } })

        return deleted
    })

    await mongo.articles.deleteOne({ postID: tr.id })

    return tr
}