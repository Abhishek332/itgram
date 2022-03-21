import express from "express";
import mongoose from "mongoose";
import { requireLogin } from "../middleware/requireLogin.js";

export const CommentRouter = express.Router();
const Post = mongoose.model("Post");

CommentRouter.put("/add-comment", requireLogin, (req, res) => {
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

CommentRouter.get("/get-comments/:postId", requireLogin, (req, res) => {
  Post.findById(req.params.postId)
    .populate("comments.postedBy", "_id name")
    .then(({ comments }) => res.json({ comments }))
    .catch((err) => console.log(err));
});

CommentRouter.put("/delete-comment/:commentId", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: {
        comments: findById(req.params.commentId),
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
