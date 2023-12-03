import Users from "../models/users.js";

export class AuthController {
  static async signup(req, res, next) {
    const newUser = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    res.status(201).json({
      status: "success",
      data: {
        data: newUser,
      },
    });
    next();
  }
}