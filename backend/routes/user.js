import express from "express";
import mongoose from "mongoose";
import { requireLogin } from "../middleware/requireLogin.js";

export const UserRouter = express.Router();
const Post = mongoose.model("Post"),
  User = mongoose.model("User");

UserRouter.get("/user/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((error, posts) => {
          if (error) return res.status(422).json({ error });
          return res.json({ user, posts });
        });
    })
    .catch((err) => res.status(404).json({ error: "User not found." }));
});
