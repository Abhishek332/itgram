import express from "express";
import mongoose from "mongoose";
import { requireLogin } from "../middleware/requireLogin.js";

export const PostRouter = express.Router();
const Post = mongoose.model("Post");

PostRouter.post("/create-post", requireLogin, (req, res) => {
  const { title, body, photo } = req.body;
  if (!title || !body)
    return res
      .status(422)
      .json({ error: "Please enter post title and description." });
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) =>
      res.json({ message: "Posted Successfully", post: result })
    )
    .catch((err) => console.log(err));
});

PostRouter.get("/allpost", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => res.json({ posts }))
    .catch((err) => console.log(err));
});

PostRouter.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => res.json({ mypost }))
    .catch((err) => console.log(err));
});
