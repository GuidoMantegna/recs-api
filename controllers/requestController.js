import Request from "../models/requestModel.js"
import AppError from "../util/AppError.js"

export class RequestsController {
  static async getAll(req, res, next) {
    // let filter = {}
    // if (req.params.tourId) filter = { tour: req.params.tourId }
    // if (req.params.userId) filter = { user: req.params.userId }
    try {
      const requests = await Request.find(req.query).populate("replies")

      // SEND RESPONSE
      res.status(200).json({
        status: "success",
        results: requests.length,
        data: {
          requests,
        },
      })
    } catch (err) {
      next(new AppError(`The user with id ${req.params.id} does not exists`, 404))
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
      next(new AppError(`The request with id ${req.params.id} does not exists`, 404))
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
