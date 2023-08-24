import express from "express";
import Message from "../models/Message.model.js";
import { createMessage } from "../controllers/messages.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = express.Router();

router.post("/message-create", verifyToken, createMessage);

router.get("/messages", (req, res, next) => {
  Message.find()
    .populate(["author", "receiver"])
    .then((allMessages) => {
      res.status(201).json(allMessages);
    })
    .catch((err) => {
      console.log(`Err while getting the message: ${err}`);
      next(err);
    });
});

router.get("/messages/:messageId", (req, res, next) => {
  const { messageId } = req.params;
  Message.findById(messageId)
    .populate(["author", "receiver"])
    .then((foundMessage) => {
      res.status(202).json(foundMessage);
    })
    .catch((error) => next(error));
});

router.delete("/messages/:messageId", (req, res, next) => {
  const { messageId } = req.params;

  Message.findByIdAndDelete(messageId)
    .then(deletedMessage => {
      res.status(200).json({message: "The message has been deleted"})
    })
    .catch((error) => next(error));
})

export default router;
