import { Router } from "express"
import { UsersController } from "../controllers/usersController.js"
import { AuthController } from "../controllers/authController.js"

export const usersRouter = Router()

usersRouter.post("/signup", AuthController.signup)
usersRouter.post("/login", AuthController.login)

usersRouter.route("/").get(UsersController.getAll)

usersRouter
  .route("/:id")
  .get(UsersController.getUser)
  .delete(
    AuthController.protect,
    AuthController.restrictTo("admin"),
    UsersController.deleteUser
  )
  .patch(AuthController.protect, UsersController.updateUser)
