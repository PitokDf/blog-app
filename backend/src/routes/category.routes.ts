import { Router } from "express";
import { createCategoryController, deleteCategoryController, getAllCategoryController, updateCategoryController } from "../controllers/category.controller";
import { categoryValidator } from "../validators/category.validator";
import { handleValidationErrors } from "../middlewares/handle_validation_errors";

const categoryRouter = Router()

categoryRouter.get("/", getAllCategoryController)
categoryRouter.put("/:id", categoryValidator, handleValidationErrors, updateCategoryController)
categoryRouter.post("/", categoryValidator, handleValidationErrors, createCategoryController)
categoryRouter.delete("/:id", deleteCategoryController)

export default categoryRouter