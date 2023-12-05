import { Router } from "express"
import { RepliesController } from "../controllers/repliesController.js"
import { AuthController } from "../controllers/authController.js"

export const repliesRouter = Router({ mergeParams: true })

repliesRouter
  .route("/")
  .get(RepliesController.getAll)
  .post(AuthController.protect, RepliesController.createOne)

repliesRouter
  .route("/:id")
  .get(AuthController.protect, RepliesController.getOne)
