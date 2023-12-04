import mongoose from "mongoose"

const requestsSchema = new mongoose.Schema(
  // SCHEMA DEFINITION
  {
    brief: {
      type: String,
      required: [true, "A request must have a brief description"],
      // unique: true,
      // trim: true,
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
      select: false,
    },
    // user: [
    //   {
    //     // All we save on a certain request document is the IDs of the users
    //     // that are the request guides for that specific request.
    //     type: mongoose.Schema.ObjectId, // the type of each of the elements in the guides array must be a MongoDB ID.
    //     ref: 'Users', // this really is how we establish references between different data sets in Mongoose.
    //   },
    // ],
    user: {
      // All we save on a certain request document is the IDs of the users
      // that are the request guides for that specific request.
      type: mongoose.Schema.ObjectId, // the type of each of the elements in the guides array must be a MongoDB ID.
      ref: 'Users', // this really is how we establish references between different data sets in Mongoose.
    },
    replies: [
      {
        // All we save on a certain request document is the IDs of the users
        // that are the request guides for that specific request.
        type: mongoose.Schema.ObjectId, // the type of each of the elements in the guides array must be a MongoDB ID.
        ref: "Replies", // this really is how we establish references between different data sets in Mongoose.
      },
    ],
  },
  // SCHEMA OPTIONS
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

requestsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next()
})

requestsSchema.virtual("recs", {
  ref: "Replies",
  foreignField: "request",
  localField: "_id",
})

const Requests = mongoose.model("Requests", requestsSchema)

export default Requests
