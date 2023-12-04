import { Router } from "express"
import { RepliesController } from "../controllers/replies.js"
import { AuthController } from "../controllers/auth.js"

export const repliesRouter = Router({ mergeParams: true })

repliesRouter
  .route("/")
  .get(RepliesController.get)
  .post(AuthController.protect, RepliesController.createOne)
