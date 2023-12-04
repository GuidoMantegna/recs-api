import { Router } from "express"
import { UsersController } from "../controllers/users.js"
import { AuthController } from "../controllers/auth.js"

export const usersRouter = Router()

usersRouter.post("/signup", AuthController.signup)
usersRouter.post("/login", AuthController.login)

usersRouter
  .route("/")
  .get(AuthController.protect, UsersController.getAll)
  .post(UsersController.createUser)

usersRouter
  .route("/:id")
  .get(UsersController.getUser)
  .delete(UsersController.deleteUser)
  .patch(UsersController.updateUser)