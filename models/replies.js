import mongoose from "mongoose"

const repliesSchema = new mongoose.Schema(
  // SCHEMA DEFINITION
  {
    reply: {
      type: String,
      required: [true, "A reply must have a brief description"],
      // unique: true,
      // trim: true,
      maxlength: [
        140,
        "A reply name must have less or equal than 140 characters",
      ],
      minlength: [
        1,
        "A reply name must have more or equal than 1 characters",
      ],
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
      validate: {
        validator: function (value) {
          return value.includes("youtube")
        },
        message: "It must be a YouTube video link"
      }
    },
    user: {
      type: mongoose.Schema.ObjectId, // the type of each of the elements in the guides array must be a MongoDB ID.
      ref: 'Users', // this really is how we establish references between different data sets in Mongoose.
    },
    request: {
      type: mongoose.Schema.ObjectId, // the type of each of the elements in the guides array must be a MongoDB ID.
      ref: 'Requests', // this really is how we establish references between different data sets in Mongoose.
    },
    // replies: [
    //   {
    //     // All we save on a certain request document is the IDs of the users
    //     // that are the request guides for that specific request.
    //     type: mongoose.Schema.ObjectId, // the type of each of the elements in the guides array must be a MongoDB ID.
    //     ref: "Replies", // this really is how we establish references between different data sets in Mongoose.
    //   },
    // ],
  },
  // SCHEMA OPTIONS
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Replies = mongoose.model("Replies", repliesSchema)

export default Replies
