import { Router } from "express";
import { jwtCheckToken } from "../middlewares/jwt_check_token";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import postRouter from "./post.routes";
import categoryRouter from "./category.routes";
import dashboardRouter from "./dashboard.routes";

const apiRouter = Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/posts', postRouter)
apiRouter.use('/categories', categoryRouter)
apiRouter.use('/dashboard', jwtCheckToken, dashboardRouter)

export default apiRouter