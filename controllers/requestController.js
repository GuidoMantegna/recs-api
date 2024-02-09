import Request from "../models/requestModel.js"
import AppError from "../util/AppError.js"

export class RequestsController {
  static async getAll(req, res, next) {
    let filter = {}
    if (req.query.user) filter = { user: { _id: req.query.user } }
    try {
      const requests = await Request.find(filter)
        .populate("replies")
        .sort("-createdAt")

      // SEND RESPONSE
      res.status(200).json({
        status: "success",
        results: requests.length,
        data: {
          requests,
        },
      })
    } catch (err) {
      next(
        new AppError(`The user with id ${req.params.id} does not exists`, 404)
      )
    }
  }

  static async getOne(req, res, next) {
    try {
      const request = await Request.findById(req.params.id).populate("replies")

      res.status(200).json({
        status: "success",
        data: {
          request,
        },
      })
    } catch (err) {
      next(
        new AppError(
          `The request with id ${req.params.id} does not exists`,
          404
        )
      )
    }
  }

  static async createOne(req, res, next) {
    try {
      const newRequest = await Request.create({
        ...req.body,
        user: req.user.id,
      })

      res.status(201).json({
        status: "success",
        data: {
          request: newRequest,
        },
      })
    } catch (err) {
      next(new AppError(err.message, 404))
    }
  }
}
