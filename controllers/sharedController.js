import mongoose from "mongoose";

export class SharedController {
  static checkID(req, res, next, val) {
    const isIDValid = mongoose.Types.ObjectId.isValid(val)

    if (!isIDValid) {
      return res.status(404).json({
        status: "fail",
        message: "No document found with that ID",
      })
    }
    next()
  }
}