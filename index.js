import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import path from "path";

const app = express();

app.use(cors(
  {
    origin:["https://youtubeclone-c2bg0b88k-prajwals-projects-1b6a8b62.vercel.app"]
  }
));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/uploads", express.static(path.join("uploads")));

dotenv.config();

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/video", videoRoutes);
app.use("/comment", commentRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

const DB_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((error) => {
    console.log(error);
  });
