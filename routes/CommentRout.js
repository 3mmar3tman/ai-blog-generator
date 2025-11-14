import express from "express";
import Comment from "../models/Comment.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Add a new comment to a blog post
router.post("/add-comment", authMiddleware, async (req, res) => {
  try {
    const { username, comment, blogId } = req.body;

    if (!username || !comment || !blogId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newComment = await Comment.create({
      name: username,
      comment,
      blog: blogId,
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all comments for a specific blog post
router.get("/comments/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId });
    if (!comments) {
      return res.status(404).json({
        success: false,
        message: "No comments found for this blog post",
      });
    }
    res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// Delete a comment by ID
router.delete("/delete-comment/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    await Comment.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Updated comment
router.put("/update/:id", async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { comment },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
