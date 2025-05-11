import { body } from "express-validator";
import { existsEmail } from "../services/user.service";
import { $Enums } from "@prisma/client";

const roleValues = Object.keys($Enums.userRole)
export const createUserValidator = [
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
        .isLength({ min: 3 }).withMessage("Password minimal 3 karakter"),

    body("role").notEmpty().withMessage("Role harus diisi").bail()
        .isIn(roleValues).withMessage(`Role hanya boleh: ${roleValues.join(", ")}`)
]

export const updateUserValidator = [
    body("email").optional().bail()
        .notEmpty().withMessage("Email harus diisi").bail()
        .isEmail().withMessage("Email tidak valid")
        .custom(async (email) => {
            const exists = await existsEmail(email)

            if (exists) throw new Error("Email sudah digunakan");

            return true
        }),
    body("first_name").optional().bail()
        .notEmpty().withMessage("First name harus diisi").bail()
        .isLength({ min: 3 }).withMessage("First name minimal 3 karakter"),

    body("last_name").optional().bail()
        .isLength({ min: 3 }).withMessage("Last name minimal 3 karakter"),

    body("password").optional().bail()
        .notEmpty().withMessage("Password harus diisi").bail()
        .isLength({ min: 3 }).withMessage("Password minimal 3 karakter"),

    body("role").optional().bail()
        .notEmpty().withMessage("Role harus diisi").bail()
        .isIn(roleValues).withMessage(`Role hanya boleh: ${roleValues.join(", ")}`)
]