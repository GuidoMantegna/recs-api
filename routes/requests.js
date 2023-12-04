import { Router } from "express"
import { RequestsController } from "../controllers/requests.js"
import { AuthController } from "../controllers/auth.js"
import { repliesRouter } from "./replies.js"

export const requestsRouter = Router()

requestsRouter.use("/:requestId/replies", repliesRouter)

requestsRouter
  .route("/")
  .get(RequestsController.getAll)
  .post(AuthController.protect, RequestsController.createOne)
