import express from "express";
import mongoose from "mongoose";
import { MONGOURI } from "./keys.js";
import "./models/user.js";
import "./models/post.js";
import { AuthRouter } from "./routes/auth.js";
import { PostRouter } from "./routes/post.js";

//Connect with database
mongoose.connect(MONGOURI);
mongoose.connection.on("connected", () => {
  console.log("Connect to Mongo");
});
mongoose.connection.on("error", (err) => {
  console.log(`Connecting Error : ${err}`);
});

//create a app and assign port for listening
const app = express();
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
app.use(express.json());
app.use(AuthRouter);
app.use(PostRouter);
