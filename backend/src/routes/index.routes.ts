import { Router } from "express";
import { jwtCheckToken } from "../middlewares/jwt_check_token";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

const apiRouter = Router()

apiRouter.use('/users', jwtCheckToken, userRouter)
apiRouter.use('/auth', authRouter)

export default apiRouter