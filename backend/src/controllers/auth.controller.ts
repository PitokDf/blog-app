import { Request, Response } from "express";
import { ResponseApiType } from "../types/api_types";
import { handlerAnyError } from "../errors/api_errors";
import { createUserService, existsEmail } from "../services/user.service";
import { hashing, verifyHash } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

export async function loginController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { email, password } = req.body

        const userExists = await existsEmail(email)
        const isPasswardMatch = await verifyHash(password, userExists?.password_hash!)
        if (!isPasswardMatch) {
            return res.status(400).json({
                success: false,
                message: "Login gagal, cek email dan password."
            })
        }

        const token = await generateToken(
            { id: userExists?.id!, email: userExists?.email!, first_name: userExists?.first_name!, last_name: userExists?.last_name!, role: userExists?.role! }
        )

        return res.status(200).json({
            success: true,
            message: `Welcome back ${userExists?.first_name}`,
            data: { token, user: userExists }
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}


export async function registerController(req: Request, res: Response<ResponseApiType>) {
    try {
        const { email, first_name, last_name, password } = req.body
        console.log(req.body);

        const hashedPassword = (await hashing(password))!
        const user = await createUserService(email, first_name, last_name, hashedPassword, "writter")
        const token = await generateToken(
            { id: user?.id!, email: user?.email!, first_name: user?.first_name!, last_name: user?.last_name!, role: user.role }
        )
        return res.status(200).json({
            success: true,
            message: "Berhsasil membuat akun",
            data: { user, token }
        })
    } catch (error) {
        return handlerAnyError(error, res)
    }
}