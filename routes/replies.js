import { Router } from "express"
import { RepliesController } from "../controllers/replies.js"

export const repliesRouter = Router()

repliesRouter.get("/", RepliesController.get)
