import Request from "../models/requestModel.js"

export class RequestsController {

  static async getAll(req, res, next) {
    // To allow for nested GET reviews on tour (hack)
    let filter = {}
    if (req.params.tourId) filter = { tour: req.params.tourId }
    if (req.params.userId) filter = { user: req.params.userId }
    // Get all requests
    const requests = await Request.find(filter).populate('replies')

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: requests.length,
      data: {
        requests,
      },
    })
  }

  static async createOne(req, res, next) {
    // Allow nested routes
    // if (!req.body.user) req.body.user = req.user.id
    // if (!req.body.tour) req.body.tour = req.params.tourId
    const newRequest = await Request.create({...req.body, user: req.user.id})

    res.status(201).json({
      status: "success",
      data: {
        request: newRequest,
      },
    })
    next()
  }
}
