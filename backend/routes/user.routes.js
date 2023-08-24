import User from "../models/User.model.js";
import express from "express"

const router = express.Router();

router.get("/user", (req, res, next) => {
    User.find()
    .then((allUsers) => res.status(200).json(allUsers))
    .catch((error) => next(error));
})

router.get("/user/:userId", (req, res, next) => {
    const {userId} = req.params

    User.findById(userId)
        .then((user) =>{
            res.status(200).json(user)
        })
        .catch(err => next(err))
})

export default router