import { body } from "express-validator";

export const categoryValidator = [
    body("name").notEmpty().withMessage("Nama kategori harus diisi"),
    body("slug").notEmpty().withMessage("Slug kategori harus diisi")
]