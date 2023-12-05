import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { promisify } from "util"

const signToken = (id) => {
  return jwt.sign(
    // payload: an object for all the data that we're going to store inside of the token
    { id },
    // secret: basically a string for a secret
    process.env.JWT_SECRET,
    // options
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
}

export class AuthController {
  static async signup(req, res, next) {
    const newUser = await User.create(req.body)

    res.status(201).json({
      status: "success",
      token: signToken(newUser._id),
      data: {
        data: newUser,
      },
    })
    next()
  }

  static async login(req, res, next) {
    const { email, password } = req.body

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new Error("Please provide email and password!"))
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password")

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new Error("Incorrect email or password"))
    }

    // 3) If everything ok, send token to client
    res.status(200).json({
      status: "success",
      token: signToken(user._id),
    })
  }

  static async protect(req, res, next) {
    // 1) Getting token and check of it's there
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
      return next(
        new Error("You are not logged id! Please log in to get access.")
      )
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      return next(
        new Error("The user belonging to this token does no longer exist.")
      )
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new Error("User recently changed password! Please log in again.")
      )
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser
    next()
  }

  static restrictTo(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new Error("You do not have permission to perform this action", 403)
        )
      }

      next()
    }
  }
}