import express from "express"
import dotenv from "dotenv"
import apiRouter from "./routes/index.routes"
import { mongo } from "./db/mongo"
import morgan from "morgan"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 0

mongo.connect()

app.use(morgan("dev"))
app.use(express.json())

app.use("/api", apiRouter)
app.use("/", (req, res) => res.status(200).json({ message: "Server runnging" }))
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})