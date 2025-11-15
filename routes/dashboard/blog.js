import express from "express";
import { authMiddleware } from "../../middleware/AuthMiddleware.js";
import path from "path";

import multer from "multer";
import Blog from "../../models/Blog.js";

const router = express.Router();        

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route to create a new blog post with image upload
router.post("/create", authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, description, category,published } = req.body;
    const image = req.file ? req.file.path : null;
    const author = req.user.id; // Assuming authMiddleware sets req.user
    const newBlog = new Blog({
        title,
        subtitle, 
        description,
        category,
        published,
        thumbnail: image,
        author,
    });
    await newBlog.save();
    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}); 
// Route to get all blog posts
router.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
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

// Route to delete a blog post by ID
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//

export default router;
