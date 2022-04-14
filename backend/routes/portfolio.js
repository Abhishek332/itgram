import express from "express";
import mongoose from "mongoose";
import { requireLogin } from "../middleware/requireLogin.js";

export const PortfolioRouter = express.Router();
const Portfolio = mongoose.model("Portfolio");

PortfolioRouter.post("/create-portfolio", requireLogin, (req, res) => {
  const { about, whatsapp, github, linkedin } = req.body;
  if (!about || !whatsapp || !github || !linkedin)
    return res.status(422).json({ error: "Please fill all fields" });
  req.user.password = undefined;
  const portfolio = new Portfolio({
    about,
    whatsapp,
    github,
    linkedin,
    user: req.user,
  });
  portfolio
    .save()
    .then((result) =>
      res.json({
        message: "Portfolio Created Successfully",
        portfolioId: result._id,
      })
    )
    .catch((err) => console.log(err));
});
