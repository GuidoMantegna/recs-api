import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { promisify } from "util"

const signToken = (id) => {
  return jwt.sign(
    // payload: an object for all the data that we're going to store inside of the token
    { id },
    // secret: basically a string for a secret
    `${process.env.JWT_SECRET}`, // wrap it with backtick to solve the problem of undefined process.env.JWT_SECRET
    // options
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)

  const cookieOptions = {
    /* expires will make that the browser or the client in general 
    will delete the cookie after it has expired. Set the expiration date 
    similar to the one that we set in the JWT */
    expires: new Date(
      // we need to convert it in milliseconds
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // the cookie cannot be accessed or modified in any way by the browser
  }
  // setting secure=true the cookie will be sent only on an encrypted connection (HTTPS)
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true

  /*
    1) attach the cookie to the response object
    2) specify the name of the cookie (JWT)
    3) specify the data we want to send (token)
    4) set the options for the cookie
  */
  res.cookie("jwt", token, cookieOptions)

  // Remove password from output
  user.password = undefined

  res.status(statusCode).json({
    status: "success",
    // we send the token to the client
    token,
    data: {
      user,
    },
  })
}

export class AuthController {
  static async signup(req, res, next) {
    const newUser = await User.create(req.body)

    createSendToken(newUser, 201, res)
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
    createSendToken(user, 200, res)
  }

  static async protect(req, res, next) {
    const { authorization, cookie } = req.headers
    let token

    // Check if the token comes from req.headers.authorization or req.headers.cookie and set it to token
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1]
    }
    if (cookie) {
      const splittedCookie = cookie.split("; ")
      const containsJWT = splittedCookie.some((c) => c.startsWith("jwt="))
      const JWTNotLoggedOut = !splittedCookie.some((c) =>
        c.includes("loggedout")
      )
      if (containsJWT && JWTNotLoggedOut) {
        token = splittedCookie.find((c) => c.startsWith("jwt=")).split("=")[1]
      }
    }

    if (!token) {
      return next(
        new Error("You are not logged in! Please log in to get access.")
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

  static logout = (req, res) => {
    // Instead of sending a token, we send 'loggedout'
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    })
    res.status(200).json({ status: "success" })
  }
}
