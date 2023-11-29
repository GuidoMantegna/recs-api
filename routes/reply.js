import { Router } from "express"
import { ReplyController } from "../controllers/reply.js"

export const replyRouter = Router()

replyRouter.get("/", ReplyController.get)
