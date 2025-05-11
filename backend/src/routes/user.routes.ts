import { Router } from "express";
import { createUserController, deleteUserController, getAllUserController, getUserByIdController, updateUserController } from "../controllers/user.controller";
import { createUserValidator, updateUserValidator } from "../validators/user.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";

const userRouter = Router()

userRouter.get("/", getAllUserController)
userRouter.get("/:id", getUserByIdController)
userRouter.post("/", createUserValidator, handleValidationErrors, createUserController)
userRouter.put("/:id", updateUserValidator, handleValidationErrors, updateUserController)
userRouter.delete("/:id", deleteUserController)

export default userRouter