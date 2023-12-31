import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      // the callback will be called when the new document is created
      validator: function (el) {
        return el === this.password
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  requests: Array
})

// Using the pre('save') middleware will process the data before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  // bcrypt.hash() will return a promise so the func() should be async
  this.password = await bcrypt.hash(this.password, 12)
  this.confirmPassword = undefined // we don't need to store the confirmPassword

  next()
})

// This is an instance method that will be available on all documents in a certain collection
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )
    return JWTTimestamp < changedTimestamp
  }
  return false
}

const User = mongoose.model("User", userSchema)

export default User
