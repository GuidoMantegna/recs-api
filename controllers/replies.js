import Replies from "../models/replies.js";

export class RepliesController {
  static async get(req, res) {
    res.send("REPLIES")
  }
  static async createOne(req, res, next) {
    console.log({PARAMS: req.params})
    const newReply = await Replies.create({...req.body, request: req.params.requestId, user: req.user.id });
    
    res.status(201).json({
      status: "success",
      data: {
        reply: newReply,
      },
    });
  }
}
