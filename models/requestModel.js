import mongoose from "mongoose"

const requestSchema = new mongoose.Schema(
  // SCHEMA DEFINITION
  {
    brief: {
      type: String,
      required: [true, "A request must have a brief description"],
      trim: true,
      maxlength: [
        140,
        "A request name must have less or equal than 140 characters",
      ],
      minlength: [
        1,
        "A request name must have more or equal than 1 characters",
      ],
      // validate: [validator.isAlpha, 'request name must only contain characters']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // select: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    replies: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Reply",
      },
    ],
  },
  // SCHEMA OPTIONS
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

requestSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",    
    select: "name photo",
  })
  next()
})

requestSchema.virtual("recs", {
  ref: "Reply",
  foreignField: "request",
  localField: "_id",
})

const Request = mongoose.model("Request", requestSchema)

export default Request
