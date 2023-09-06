import User from "../models/User.model.js";
import express from "express";

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

export default router;
