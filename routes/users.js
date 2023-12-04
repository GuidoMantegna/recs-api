import { Router } from "express"
import { UsersController } from "../controllers/users.js"
import { AuthController } from "../controllers/auth.js"
// import { requestsRouter } from "./requests.js"

export const usersRouter = Router()

usersRouter.post("/signup", AuthController.signup)
usersRouter.post("/login", AuthController.login)

// usersRouter.use('/requests', requestsRouter)

usersRouter
  .route("/")
  .get(AuthController.protect, UsersController.getAll)
  .post(UsersController.createUser)

usersRouter
  .route("/:id")
  .get(UsersController.getUser)
  .delete(
    AuthController.protect,
    AuthController.restrictTo("admin"),
    UsersController.deleteUser
  )
  .patch(UsersController.updateUser)
