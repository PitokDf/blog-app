import { body } from "express-validator";
import { getAllCategory } from "../services/post_category.service";
import { slugPostExis } from "../services/post.service";

export const createPostValidator = [
    body("author_id").notEmpty().withMessage("Penulis id kosong"),
    body("slug").notEmpty().withMessage("slug harus diisi")
        .isLength({ min: 3 }).withMessage("Slug minimal 3 karakter")
        .custom(async (slug) => {
            const exists = await slugPostExis(slug)

            if (exists) throw new Error(`Slug: ${slug}, sudah tersedia`);
            return true
        }),
    body("title").notEmpty().withMessage("title harus diisi")
        .isLength({ min: 3 }).withMessage("title minimal 3 karakter"),
    body("content").notEmpty().withMessage("kontent harus diisi")
        .isLength({ min: 3 }).withMessage("kontent minimal 3 karakter"),
    body("summary").notEmpty().withMessage("summary harus diisi"),
    body("categoryIds").optional().bail()
        .isArray().withMessage("Kategori ID harus array")
        .custom(async (categoryIds: number[]) => {
            const categoriesID = (await getAllCategory()).map((ctg) => ctg.id)

            const invalid = categoryIds.filter((id) => !categoriesID.includes(id))

            if (invalid.length > 0) throw new Error("Ada kategori yang tidak tersedia");

            return true
        }),
]
export const updatePostValidator = [
    body("author_id").optional().bail()
        .notEmpty().withMessage("Penulis id kosong"),
    body("slug").optional().bail()
        .notEmpty().withMessage("slug harus diisi")
        .isLength({ min: 3 }).withMessage("Slug minimal 3 karakter")
        .custom(async (slug, { req }) => {
            const id = req.params?.id
            const exists = await slugPostExis(slug, Number(id))

            if (exists) throw new Error(`Slug: '${slug}', sudah tersedia`);
            return true
        }),
    body("title").optional().bail()
        .notEmpty().withMessage("title harus diisi")
        .isLength({ min: 3 }).withMessage("title minimal 3 karakter"),
    body("content").optional().bail()
        .notEmpty().withMessage("kontent harus diisi")
        .isLength({ min: 3 }).withMessage("kontent minimal 3 karakter"),
    body("summary").optional().bail()
        .notEmpty().withMessage("summary harus diisi"),
    body("categoryIds").optional().bail()
        .isArray().withMessage("Kategori ID harus array")
        .custom(async (categoryIds: number[]) => {
            const categoriesID = (await getAllCategory()).map((ctg) => ctg.id)

            const invalid = categoryIds.filter((id) => !categoriesID.includes(id))

            if (invalid.length > 0) throw new Error("Ada kategori yang tidak tersedia");

            return true
        }),
]
