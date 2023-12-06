import { Router } from "express"
import { RepliesController } from "../controllers/repliesController.js"
import { AuthController } from "../controllers/authController.js"
import { SharedController } from "../controllers/sharedController.js"

export const repliesRouter = Router({ mergeParams: true })

// repliesRouter.param("id", SharedController.checkID)

repliesRouter
  .route("/")
  .get(RepliesController.getAll)
  .post(AuthController.protect, RepliesController.createOne)
  
  repliesRouter
  .route("/:id")
  .get(AuthController.protect, RepliesController.getOne)
  .patch(AuthController.protect, RepliesController.likeOne)
