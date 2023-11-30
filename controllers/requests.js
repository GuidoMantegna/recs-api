import Requests from "../models/requests.js"

export class RequestsController {
  // static async get(req, res) {
  //   res.send("REQUESTS")
  // }

  static async get(req, res, next) {
    // To allow for nested GET reviews on tour (hack)
    let filter = {}
    if (req.params.tourId) filter = { tour: req.params.tourId }
    if (req.params.userId) filter = { user: req.params.userId }
    // Get all requests
    const requests = await Requests.find(filter)

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: requests.length,
      data: {
        data: requests,
      },
    })
  }
}
