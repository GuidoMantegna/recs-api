import { Router } from "express"
import { RequestsController } from "../controllers/requests.js"
import { AuthController } from "../controllers/auth.js"

export const requestsRouter = Router()

requestsRouter
  .route("/")
  .get(RequestsController.getAll)
  .post(AuthController.protect, RequestsController.createOne)
