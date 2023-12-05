import Replies from "../models/replies.js";
import Requests from "../models/requests.js";

export class RepliesController {
  static async get(req, res) {
    res.send("REPLIES")
  }
  static async createOne(req, res, next) {
    console.log({PARAMS: req.params})
    const newReply = await Replies.create({...req.body, request: req.params.requestId, user: req.user.id });
    await Requests.findByIdAndUpdate(req.params.requestId, {
      $push: { replies: newReply._id },
    });
    
    res.status(201).json({
      status: "success",
      data: {
        reply: newReply,
      },
    });
  }
}
