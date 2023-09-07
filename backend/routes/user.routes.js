import User from "../models/User.model.js";
import express from "express";
import upload from "../cloudinary.js"
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = express.Router();

//find user by name
router.get("/user", (req, res, next) => {
  const{firstName, lastName} = req.query
  
  User.find({firstName: firstName, lastName: lastName})
    .then((allUsers) => res.status(200).json(allUsers))
    .catch((error) => next(error));
});

// find User by id
router.get("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => next(err));
});

// router.patch(
//   "/",
//   fileUploader.single("avatar"),
//   isAuthenticated,
  
//   async (req, res, next) => {
//     try {
//       let avatar;
//       if (req.file) {
//         avatar = req.file.path;
//       }

//       const updatedUser = await User.findByIdAndUpdate(
//         req.user._id,
//         { avatar },
//         { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

  router.patch("/user/:userId/edit", upload.single("avatar"), (req, res, next) => {
    const {userId} = req.params
    const{firstName, lastName} = req.body;
    let avatar
    if (req.file) {
      avatar = req.file.path;
    }

    User.findByIdAndUpdate(userId, {firstName, lastName, avatar}, {new: true})
    .then(updatedUser => res.status(202).json(updatedUser))
    .catch(error => next(error));
  })


export default router;
