import express from "express";
import mongoose from "mongoose";
import Keys from "./config/keys.js";
import "./models/user.js";
import "./models/post.js";
import "./models/portfolio.js";
import { AuthRouter } from "./routes/auth.js";
import { PostRouter } from "./routes/post.js";
import { UserRouter } from "./routes/user.js";
import { PortfolioRouter } from "./routes/portfolio.js";
// import path from 'path';
import cors from "cors";

const { MONGOURI } = Keys();

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

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("frontend/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://itgram.netlify.app",
      "https://google.com",
    ],
  })
);
app.use(express.json());
app.use(AuthRouter);
app.use(PostRouter);
app.use(UserRouter);
app.use(PortfolioRouter);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
