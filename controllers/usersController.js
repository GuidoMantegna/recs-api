import Users from "../models/userModel.js"
import AppError from "../util/AppError.js"

export class UsersController {
  static async getAll(req, res, next) {
    try {
      const users = await Users.find()

      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          users,
        },
      })
    } catch (err) {
      next(new AppError(err.message, 404))
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await Users.findById(req.params.id)

      if (!user) {
        return next(new AppError(`No user found with id ${req.params.id}`, 404))
      }
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      })
    } catch (err) {
      next(new AppError(err.message, 404))
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const user = await Users.findByIdAndDelete(req.params.id)
      if (!user) {
        return next(new AppError(`No user found with id ${req.params.id}`, 404))
      }

      res.status(204).json({
        status: "success",
        data: null,
      })
    } catch (err) {
      next(new AppError(err.message, 404))
    }
  }

  static async updateUser(req, res, next) {
    try {
      const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // returns the new updated document
        runValidators: true, // runs the validators again
      })

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      })
    } catch (err) {
      next(new AppError(`No user found with id ${req.params.id}`, 404))
    }
  }
}
