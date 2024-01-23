import Reply from "../models/replyModel.js"
import Request from "../models/requestModel.js"
import AppError from "../util/AppError.js"

export class RepliesController {
  static async getAll(req, res, next) {
    try {
      const replies = await Reply.find()

      res.status(200).json({
        status: "success",
        results: replies.length,
        data: {
          replies,
        },
      })
    } catch (err) {
      next(new AppError(err.message, 404))
    }
  }

  static async getOne(req, res, next) {
    try {
      const reply = await Reply.findById(req.params.id)

      res.status(200).json({
        status: "success",
        data: {
          reply,
        },
      })
    } catch (err) {
      next(new AppError(`No reply found with id ${req.params.id}`, 404))
    }
  }

  static async createOne(req, res, next) {
    try {
      const newReply = await Reply.create({
        ...req.body,
        request: req.params.requestId,
        user: req.user.id,
      })
      await Request.findByIdAndUpdate(req.params.requestId, {
        $push: { replies: newReply._id },
      })
      res.status(201).json({
        status: "success",
        data: {
          reply: newReply,
        },
      })
    } catch (err) {
      next(
        new AppError(`No request found with id ${req.params.requestId}`, 404)
      )
    }
  }

  static async likeOne(req, res, next) {
    try {
      const isLiked = await Reply.findById(req.params.id).where({
        likes: req.user.id,
      })
      const query = isLiked
        ? {
            $pull: { likes: req.user.id },
          }
        : {
            $addToSet: { likes: req.user.id },
          }
      const updatedReply = await Reply.findByIdAndUpdate(req.params.id, query, {
        new: true,
        runValidators: true,
      })

      res.status(200).json({
        status: "success",
        data: {
          reply: updatedReply,
        },
      })
    } catch (err) {
      next(new AppError(`No reply found with id ${req.params.id}`, 404))
    }
  }
}
