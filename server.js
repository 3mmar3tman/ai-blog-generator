import express from "express";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import UserRout from "./routes/UserRout.js";
import BlogRout from "./routes/BlogRout.js";
import CommentRout from "./routes/CommentRout.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/Users", UserRout);
app.use("/Blog", BlogRout);
app.use("/Comments", CommentRout);

connectDB();
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
