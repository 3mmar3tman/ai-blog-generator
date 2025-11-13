import express from "express";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import User from "./routes/UserRout.js";
import Blogs from "./routes/BlogRout.js";
import Comment from "./routes/CommentRout.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/Users", User);
app.use("/Blog", Blogs);
app.use("/Comments", Comment);

connectDB();
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
