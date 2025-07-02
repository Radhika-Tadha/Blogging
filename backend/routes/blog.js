const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

//create blog post
router.post('/create', auth, upload.single("image"), async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.userId;
        const blog = new Blog({
            title,
            content,
            author,
            image: req.file ? req.file.filename : "default.png",
        });
        await blog.save();

        res.status(201).json({ success: true, blog });
    } catch (error) {
        console.error("Blog created error:", error);
        res.status(500).json({ success: false, message: "Failed to create blog" });
    }
});

// Get all blogs
router.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // latest blogs first
      .populate("author", "name image"); // get author name/image

    res.json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
});

module.exports = router;