import mongoose from "mongoose"

const replySchema = new mongoose.Schema(
  // SCHEMA DEFINITION
  {
    reply: {
      type: String,
      required: [true, "A reply must have a brief description"],
      trim: true,
      maxlength: [
        140,
        "A reply name must have less or equal than 140 characters",
      ],
      minlength: [1, "A reply name must have more or equal than 1 characters"],
      // validate: [validator.isAlpha, 'reply name must only contain characters']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    videoURL: {
      type: String,
      required: [true, "A reply must have a video URL"],
      trim: true,
      validate: {
        validator: function (value) {
          return value.includes("youtube")
        },
        message: "It must be a YouTube video link",
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    request: {
      type: mongoose.Schema.ObjectId,
      ref: "Request",
    },
  },
  // SCHEMA OPTIONS
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Reply = mongoose.model("Reply", replySchema)

export default Reply
