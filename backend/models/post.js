import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  likes: [{ type: ObjectId, ref: "User" }],
  comments : [
    {
      text : String,
      postedBy:{type:ObjectId, "User"}
    }
  ],
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("Post", postSchema);
