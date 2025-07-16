const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
const authMiddleware = require("../middleware/auth");
// const uploads = require("../uploads");


//create blog post
router.post('/create', authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, content,imageUrl } = req.body;
    const author = req.userId;
    let image;                   

    if (req.file) {
    image = "/uploads/" + req.file.filename;
  } else if (imageUrl) {
    image = imageUrl; // use default image
  } else {
    image = "/uploads/default.png"; // fallback image (optional)
  }

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content required" });
    }

    const blog = new Blog({
      title,
      content,
      author,
      image,
    });
        console.log("Image path used:", image);

    await blog.save();

    res.status(201).json({ success: true, blog });
  } catch (error) {
    console.error("Blog created error:", error);
    res.status(500).json({ success: false, message: "Failed to create blog" });
  }
});

// ✅ GET logged-in user's blogs
router.get("/my-blogs", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // extracted from cookie by middleware

    const blogs = await Blog.find({ author: req.userId }).populate("author", "_id name email").sort({ createdAt: -1 });
    console.log("Blogs found:", blogs.length); // ✅ log blog count


    res.status(200).json({ success: true, blogs });
  } catch (err) {
    console.error("Error fetching user blogs:", err);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
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

//display blog from id
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
});

// blog updates

router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    if (req.file) {
      blog.image = req.file.filename;
    }

    await blog.save();

    res.json({ success: true, blog });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ success: false, message: "Failed to update blog" });
  }
});

//blog delete
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only delete your own blogs" });
    }

    // ✅ Safe image deletion

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
});

// Public route: Get all blogs by all users
router.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("author", "name image email")
      .sort({ createdAt: -1 });

    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error.message); // log it!
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

// GET/api/blog search=keyword
router.get("/", async (req, res) => {
  const search = req.query.search || "";
  try {
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ]
    }).populate("author", "name");

    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error searching blogs:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;