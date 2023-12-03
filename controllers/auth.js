import Users from "../models/users.js"
import jwt from "jsonwebtoken"

export class AuthController {
  static async signup(req, res, next) {
    const newUser = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    })

    const token = jwt.sign(
      // payload: an object for all the data that we're going to store inside of the token
      { id: newUser._id },
      // secret: basically a string for a secret
      process.env.JWT_SECRET,
      //options
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.status(201).json({
      status: "success",
      token,
      data: {
        data: newUser,
      },
    })
    next()
  }
}
