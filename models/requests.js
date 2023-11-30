import mongoose from 'mongoose';
const requestsSchema = new mongoose.Schema(
  // SCHEMA DEFINITION
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal than 40 characters'],
      minlength: [10, 'A tour name must have more or equal than 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      // this function will be run each time that a new value is set for this field
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4,7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      // Here we validate if the price discount is actually lower than the price itself.
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      /* this object that we specified here is actually not for the schema type options, 
      is actually really an embedded object. In order for this object to be recognized 
      as geospatial JSON, we need the 'type' and the 'coordinates' properties. 
      Each of these sub-fields is then gonna get its own schema type options.*/
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number], // it expects an array of coordinates (1st Long. - 2nd Lat.)
      address: String,
      description: String,
    },
    locations: [
      /* by specifying basically an array of objects, this will then create brand new documents 
      inside of the parent document, which is, in this case, the tour. */
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        // All we save on a certain tour document is the IDs of the users
        // that are the tour guides for that specific tour.
        type: mongoose.Schema.ObjectId, // the type of each of the elements in the guides array must be a MongoDB ID.
        ref: 'User', // this really is how we establish references between different data sets in Mongoose.
      },
    ],
  },
  // SCHEMA OPTIONS
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Requests = mongoose.model('Requests', requestsSchema);

export default Requests;
