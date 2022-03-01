import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_SECRET } from "../keys.js";

const User = mongoose.model("User");

export const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "you must be login" });
  const token = authorization.replace("Bearer ", "");
  JWT.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: "you must be login" });
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
