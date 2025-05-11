import { body } from "express-validator";
import { existsEmail } from "../services/user.service";

export const loginValidator = [
    body("email").notEmpty().withMessage("Email harus diisi").bail()
        .isEmail().withMessage("Email tidak valid"),
    body("password").notEmpty().withMessage("Password harus diisi")
]

export const registerValidator = [
    body("email").notEmpty().withMessage("Email harus diisi").bail()
        .isEmail().withMessage("Email tidak valid")
        .custom(async (email) => {
            const exists = await existsEmail(email)

            if (exists) throw new Error("Email sudah digunakan");

            return true
        }),
    body("first_name").notEmpty().withMessage("First name harus diisi").bail()
        .isLength({ min: 3 }).withMessage("First name minimal 3 karakter"),
    body("last_name").optional().bail()
        .isLength({ min: 3 }).withMessage("Last name minimal 3 karakter"),
    body("password").notEmpty().withMessage("Password harus diisi").bail()
        .isLength({ min: 3 }).withMessage("Password minimal 3 karakter")
]