import { Router } from "express";
import { getChartController, getRecentPostController, getStatsController } from "../controllers/dashboard.controller";

const dashboardRouter = Router()

dashboardRouter.get("/stats", getStatsController)
dashboardRouter.get("/recent-posts", getRecentPostController)
dashboardRouter.get("/chart", getChartController)

export default dashboardRouter