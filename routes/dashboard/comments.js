import express from "express";
import { authMiddleware } from "../../middleware/AuthMiddleware.js";
import Blog from "../../models/Blog.js";
import Comment from "../../models/Comment.js";
const router = express.Router()


// Route to add a comment to a blog post
router.post("/add-comment", authMiddleware, async (req, res) => {
  try {
    const { name, comment, blogId } = req.body;
    if (!name || !comment || !blogId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newComment = new Comment({
      name, 
        comment,
        blog: blogId,
    });
    await newComment.save();    
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
// Route to get all comments for a specific blog post
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
// Route to get all comments on blogs authored by the logged-in user
router.get("/user-comments" , authMiddleware,async(req,res)=> {
    try {

      const blogs = await Blog.find({author:req.user.id}) 
        const blogIds = blogs.map(b => b._id);

        const comments = await Comment.find({ blog: { $in: blogIds } })
         .populate("blog", "title category")

          .sort({ createdAt: -1 });

          res.status(200).json({
             success: true,
            count: comments.length,
            comments
          })
        
    } catch (error) {
        
    }
})


export default router;

