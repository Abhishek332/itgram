import express from "express";
import mongoose from "mongoose";
import { requireLogin } from "../middleware/requireLogin.js";

export const UserRouter = express.Router();
const Post = mongoose.model("Post"),
  User = mongoose.model("User");

UserRouter.get("/profile/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((error, posts) => {
          if (error) return res.status(422).json({ error });
          return res.json({ user, posts: posts.reverse() });
        });
    })
    .catch((err) => res.status(404).json({ error: "User not found." }));
});

UserRouter.put("/follow/:followingId", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        followings: req.params.followingId,
      },
    },
    { new: true },
    (error, result) => {
      if (error) return res.status(422).json({ error });
      User.findByIdAndUpdate(
        req.params.followingId,
        {
          $addToSet: {
            followers: req.user._id,
          },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => res.json(result))
        .catch((error) => res.status(422).json({ error }));
    }
  );
});

UserRouter.put("/unfollow/:followingId", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        followings: req.params.followingId,
      },
    },
    { new: true },
    (error, result) => {
      if (error) return res.status(422).json({ error });
      User.findByIdAndUpdate(
        req.params.followingId,
        {
          $pull: {
            followers: req.user._id,
          },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => res.json(result))
        .catch((error) => res.status(422).json({ error }));
    }
  );
});

UserRouter.put("/update-pic", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { profilePic: req.body.imageUrl },
    { new: true },
    (error, result) => {
      if (error) return res.status(422).json({ error });
      res.json({ result });
    }
  );
});
