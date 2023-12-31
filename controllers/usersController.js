import Users from "../models/userModel.js"
import AppError from "../util/AppError.js"
import multer from "multer"

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
  // - 1st argument is an error if there is one, and if not, then just null.
  // - 2nd argument is the actual destination.
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`); 
  }
});


// test if the uploaded file is an image.
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export class UsersController {
  static async getAll(req, res, next) {
    try {
      const users = await Users.find()

      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          users,
        },
      })
    } catch (err) {
      next(new AppError(err.message, 404))
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await Users.findById(req.params.id)

      if (!user) {
        return next(new AppError(`No user found with id ${req.params.id}`, 404))
      }
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      })
    } catch (err) {
      next(new AppError(err.message, 404))
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const user = await Users.findByIdAndDelete(req.params.id)
      if (!user) {
        return next(new AppError(`No user found with id ${req.params.id}`, 404))
      }

      res.status(204).json({
        status: "success",
        data: null,
      })
    } catch (err) {
      next(new AppError(err.message, 404))
    }
  }

  static async updateUser(req, res, next) {
    if (req.file) req.body.photo = req.file.originalname;
    console.log(req.file)
    console.log(req.body)
    try {
      const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // returns the new updated document
        runValidators: true, // runs the validators again
      })

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      })
    } catch (err) {
      next(new AppError(`No user found with id ${req.params.id}`, 404))
    }
  }

  static uploadUserPhoto = upload.single('photo');
}
