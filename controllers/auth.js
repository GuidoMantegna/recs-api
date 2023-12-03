import Users from "../models/users.js"
import jwt from "jsonwebtoken"

const signToken = (id) => {
  return jwt.sign(
    // payload: an object for all the data that we're going to store inside of the token
    { id },
    // secret: basically a string for a secret
    process.env.JWT_SECRET,
    //options
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
}

export class AuthController {
  static async signup(req, res, next) {
    const newUser = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    })

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
    const user = await Users.findOne({ email }).select("+password")

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new Error("Incorrect email or password"))
    }

    // 3) If everything ok, send token to client
    res.status(200).json({
      status: "success",
      token: signToken(user._id),
    })
  }
}
