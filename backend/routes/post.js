import express from "express";
import mongoose from "mongoose";
import { requireLogin } from "../middleware/requireLogin.js";

export const PostRouter = express.Router();
const Post = mongoose.model("Post");

PostRouter.get("/allpost", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name followers")
    .then((posts) => res.json({ posts: posts.reverse() }))
    .catch((err) => console.log(err));
});

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

PostRouter.put("/delete-post/:postId", (req, res) => {
  Post.deleteOne({ _id: req.params.postId })
    .then(() => res.json({ message: "Post deleted Successfully." }))
    .catch((error) => console.log(error));
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

PostRouter.get("/get-comments/:postId", requireLogin, (req, res) => {
  Post.findById(req.params.postId)
    .populate("comments.postedBy", "_id name followers")
    .then(({ comments }) => res.json({ comments }))
    .catch((err) => console.log(err));
});

PostRouter.put("/add-comment", requireLogin, (req, res) => {
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

PostRouter.put("/delete-comment/:postId", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $pull: {
        comments: req.body,
      },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .exec((error, { comments }) => {
      if (error) return res.status(422).json({ error });
      res.json({ comments });
    });
});

PostRouter.get("/get-likes/:postId", requireLogin, (req, res) => {
  Post.findById(req.params.postId)
    .populate("likes", "_id name followers")
    .then(({ likes }) => res.json({ likes }))
    .catch((err) => console.log(err));
});
