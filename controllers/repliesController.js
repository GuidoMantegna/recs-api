import mongoose from "mongoose"
import Reply from "../models/replyModel.js"
import Request from "../models/requestModel.js"

export class RepliesController {
  static async getAll(req, res, next) {
    const replies = await Reply.find()

    res.status(200).json({
      status: "success",
      results: replies.length,
      data: {
        replies,
      },
    })
    next()
  }

  static async getOne(req, res, next) {
    const reply = await Reply.findById(req.params.id)

    res.status(200).json({
      status: "success",
      data: {
        reply,
      },
    })
    next()
  }

  static async createOne(req, res, next) {
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
  }

  static async likeOne(req, res, next) {
    const updatedReply = await Reply.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user.id },
      },
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      status: "success",
      data: {
        reply: updatedReply,
      },
    })
  }
}
