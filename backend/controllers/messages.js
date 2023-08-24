import Message from "../models/Message.model.js";

export const createMessage = (req, res, next) => {
    const { author, receiver, text } = req.body;
  
    Message.create({author, receiver , text: text})
      .then(createdMessage => {res.status(201).json({createdMessage})})
      .catch((err) => {
        console.log(`Err while creating the message. ${err}`);
        next(err);
      });
  };

  //comment for commit
  