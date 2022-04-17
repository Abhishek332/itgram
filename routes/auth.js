import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import Keys from "../config/keys.js";

const { JWT_SECRET } = Keys();

const User = mongoose.model("User");
export const AuthRouter = express.Router();

AuthRouter.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(422).json({ error: "Please fill all the fields" });
  User.findOne({ email })
    .then((existUser) => {
      if (existUser)
        return res
          .status(422)
          .json({ error: "User already exists, please Login" });
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({ name, email, password: hashedPassword });
          user
            .save()
            .then(() => {
              User.findOne({ email }).then((userFound) => {
                const { _id, profilePic, name, email, followers, followings } =
                  userFound;
                const token = JWT.sign({ _id }, JWT_SECRET);
                return res.json({
                  _id,
                  profilePic,
                  name,
                  email,
                  followers,
                  followings,
                  message: "Registered Successfully",
                  token,
                });
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

AuthRouter.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({ error: "Please fill all the fields" });
  User.findOne({ email })
    .then((userFound) => {
      if (!userFound)
        return res
          .status(422)
          .json({ error: "User doesn't exist, please SignUp" });
      bcrypt
        .compare(password, userFound.password)
        .then((doMatch) => {
          if (doMatch) {
            const { _id, profilePic, name, email, followings, followers } =
              userFound;
            const token = JWT.sign({ _id }, JWT_SECRET);
            return res.json({
              _id,
              profilePic,
              name,
              email,
              followings,
              followers,
              message: "Login Successful",
              token,
            });
          }
          res.status(422).json({ error: "Invalid email or password" });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
