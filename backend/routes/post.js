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
    .then((posts) => res.json({ posts: posts.reverse() }))
    .catch((err) => console.log(err));
});

PostRouter.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => res.json({ mypost: mypost.reverse() }))
    .catch((err) => console.log(err));
});

PostRouter.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    { new: true }
  ).exec((error, result) => {
    if (error) return res.status(422).json({ error });
    res.json({ result });
  });
});

PostRouter.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    { new: true }
  ).exec((error, result) => {
    if (error) return res.status(422).json({ error });
    res.json({ result });
  });
});

PostRouter.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: {
        comments: comment,
      },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .exec((error, result) => {
      if (error) return res.status(422).json({ error });
      res.json({ result });
    });
});

PostRouter.put("/delete-comment", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: {
        comments: {
          text: req.body.text,
          postedBy: req.user._id,
        },
      },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .exec((error, result) => {
      if (error) return res.status(422).json({ error });
      res.json({ result });
    });
});
