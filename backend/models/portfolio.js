import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const PortfolioSchema = new mongoose.Schema({
  about: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  user: { type: ObjectId, ref: "User" },
});

mongoose.model("Portfolio", PortfolioSchema);
