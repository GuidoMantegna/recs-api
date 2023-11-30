import { Router } from "express"
import { UsersController } from "../controllers/users.js"

export const usersRouter = Router()

usersRouter
  .route("/")
  .get(UsersController.getAll)
  .post(UsersController.createUser)

usersRouter
  .route("/:id")
  .get(UsersController.getUser)
  .delete(UsersController.deleteUser)
  .patch(UsersController.updateUser)