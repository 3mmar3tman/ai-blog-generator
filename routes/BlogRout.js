import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
const router = express.Router();

router.post("/add-blog", async (req, res) => {
  console.log("Request body:", req.body);

  try {
    const { title, subtitle, description, category, author, published } =
      req.body;

    const newBlog = new Blog({
      title,
      subtitle,
      description,
      category,
      author,
      published,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/all-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "email name");

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/delet-blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ success: false, message: "blog not found" });
    } else {
      await Blog.findByIdAndDelete(id);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const now = new Date();
    const lastUpdated = new Date(blog.updatedAt);
    const secondDiff = (now - lastUpdated) / 1000;

    if (secondDiff > 2) {
      blog.views += 1;
      await blog.save();
    }

    await blog.save();

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
