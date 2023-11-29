import { Router } from "express"
import { RequestController } from "../controllers/request.js"

export const requestRouter = Router()

requestRouter.get("/", RequestController.get)
