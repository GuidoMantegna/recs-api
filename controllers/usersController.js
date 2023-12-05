import Users from "../models/userModel.js";

export class UsersController {
  static async getAll(req, res, next) {
    const users = await Users.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
    next();
  }
  static async createUser(req, res, next) {
    const newUser = await Users.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: newUser,
      },
    });
    next();
  }
  static async getUser(req, res, next) {
    const user = await Users.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
    next();
  }
  static async deleteUser(req, res, next) {
    await Users.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
    next();
  }
  static async updateUser(req, res, next) {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // returns the new updated document
      runValidators: true, // runs the validators again
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
}