import jwt from "jsonwebtoken";
import User from "../models/User.model.js";


export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "No token found!" });
    }
    token = token.replace("Bearer ", "");
    const userToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findOne({ firstName: userToken.firstName })

    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }
    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
  // Once everything went well, go to the next middleware
  next();
};





// export const verifyToken = async (req, res, next) => {
//   try {
//     let token = req.header("Authorization");

//     if (!token) {
//       return res.status(403).send("Access denied");
//     }

//     if (token.startsWith("Bearer")) {
//       token = token.slice(7, token.length).trimLeft();
//     }

//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
