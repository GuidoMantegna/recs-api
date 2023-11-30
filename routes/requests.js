import { Router } from "express"
import { RequestsController } from "../controllers/requests.js"

export const requestsRouter = Router()

requestsRouter
  .route("/")
  .get(RequestsController.getAll)
  .post(RequestsController.createOne)
