import { Router } from "express"
import { RequestsController } from "../controllers/requestController.js"
import { SharedController } from "../controllers/sharedController.js"
import { AuthController } from "../controllers/authController.js"
import { repliesRouter } from "./repliesRoutes.js"

export const requestsRouter = Router()

// requestsRouter.param("requestId", SharedController.checkID)

requestsRouter.use("/:requestId/replies", repliesRouter)

requestsRouter
  .route("/")
  .get(RequestsController.getAll)
  .post(AuthController.protect, RequestsController.createOne)
