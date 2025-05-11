import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";
import { loginController, registerController } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post("/login", loginValidator, handleValidationErrors, loginController)
authRouter.post("/register", registerValidator, handleValidationErrors, registerController)

export default authRouter