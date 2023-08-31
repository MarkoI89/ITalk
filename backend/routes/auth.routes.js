import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = express.Router();
const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (email === "" || password === "" || firstName === "" || lastName === "") {
    res.status(400).json({ message: "Please fill in all fields" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address" });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exist" });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });
    })
    .then((createdUser) => {
      const { email, firstName, lastName, _id } = createdUser;
      const user = { email, firstName, lastName, _id };

      res.status(201).json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "") {
    res.status(400).json({ message: "Enter your email" });
    return;
  } else if (password === "") {
    res.status(400).json({ message: "Enter your Password" });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, firstName, lastName } = foundUser;
        console.log(foundUser);

        const payload = { _id, email, firstName, lastName };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "1h",
        });
        console.log({ authToken });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server error" }));
});

router.get("/verify", verifyToken, (req, res) => res.json(req.user));

export default router;
