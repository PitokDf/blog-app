import { Router } from "express";
import {
    createPostController,
    deletePostController,
    getAllPostController,
    getPostByIdController,
    updatePostController
}
    from "../controllers/post.controller";
import { createPostValidator, updatePostValidator } from "../validators/post.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";

const postRouter = Router()

postRouter.get("/", getAllPostController)
postRouter.get("/:id", getPostByIdController)
postRouter.post("/", createPostValidator, handleValidationErrors, createPostController)
postRouter.delete("/:id", deletePostController)
postRouter.put("/:id", updatePostValidator, handleValidationErrors, updatePostController)

export default postRouter