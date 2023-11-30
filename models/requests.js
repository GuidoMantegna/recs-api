import mongoose from 'mongoose';

const requestsSchema = new mongoose.Schema(
  // SCHEMA DEFINITION
  {
    brief: {
      type: String,
      required: [true, 'A request must have a brief description'],
      // unique: true,
      // trim: true,
      maxlength: [140, 'A request name must have less or equal than 140 characters'],
      minlength: [1, 'A request name must have more or equal than 1 characters'],
      // validate: [validator.isAlpha, 'request name must only contain characters']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    user: [
      {
        // All we save on a certain request document is the IDs of the users
        // that are the request guides for that specific request.
        type: mongoose.Schema.ObjectId, // the type of each of the elements in the guides array must be a MongoDB ID.
        ref: 'User', // this really is how we establish references between different data sets in Mongoose.
      },
    ],
    replies: [
      {
        // All we save on a certain request document is the IDs of the users
        // that are the request guides for that specific request.
        type: mongoose.Schema.ObjectId, // the type of each of the elements in the guides array must be a MongoDB ID.
        ref: 'Replies', // this really is how we establish references between different data sets in Mongoose.
      },
    ],
    // duration: {
    //   type: Number,
    //   required: [true, 'A request must have a duration'],
    // },
    // maxGroupSize: {
    //   type: Number,
    //   required: [true, 'A request must have a group size'],
    // },
    // difficulty: {
    //   type: String,
    //   required: [true, 'A request must have a difficulty'],
    //   enum: {
    //     values: ['easy', 'medium', 'difficult'],
    //     message: 'Difficulty is either: easy, medium, difficult',
    //   },
    // },
    // ratingsAverage: {
    //   type: Number,
    //   default: 4.5,
    //   min: [1, 'Rating must be above 1.0'],
    //   max: [5, 'Rating must be below 5.0'],
    //   // this function will be run each time that a new value is set for this field
    //   set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4,7
    // },
    // ratingsQuantity: {
    //   type: Number,
    //   default: 0,
    // },
    // price: {
    //   type: Number,
    //   required: [true, 'A request must have a price'],
    // },
    // priceDiscount: {
    //   type: Number,
    //   // Here we validate if the price discount is actually lower than the price itself.
    //   validate: {
    //     validator: function (val) {
    //       // this only points to current doc on NEW document creation
    //       return val < this.price;
    //     },
    //     message: 'Discount price ({VALUE}) should be below regular price',
    //   },
    // },
    // summary: {
    //   type: String,
    //   trim: true,
    //   required: [true, 'A request must have a description'],
    // },
    // description: {
    //   type: String,
    //   trim: true,
    // },
    // imageCover: {
    //   type: String,
    //   required: [true, 'A request must have a cover image'],
    // },
    // images: [String],
    // startDates: [Date],
  },
  // SCHEMA OPTIONS
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Requests = mongoose.model('Requests', requestsSchema);

export default Requests;
