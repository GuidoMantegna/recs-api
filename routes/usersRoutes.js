import { Router } from "express"
import { UsersController } from "../controllers/usersController.js"
import { AuthController } from "../controllers/authController.js"

export const usersRouter = Router()

usersRouter.post("/signup", AuthController.signup)
usersRouter.post("/login", AuthController.login)
usersRouter.get("/logout", AuthController.logout)

usersRouter.route("/").get(UsersController.getAll)

// protect all routes after this middleware
usersRouter.use(AuthController.protect)
usersRouter
  .route("/:id")
  .get(UsersController.getUser)
  .delete(AuthController.restrictTo("admin"), UsersController.deleteUser)
  .patch(UsersController.uploadUserPhoto, UsersController.resizeUserPhoto, UsersController.updateUser)
