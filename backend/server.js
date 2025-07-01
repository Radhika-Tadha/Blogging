const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ REQUIRED for req.body

// Serve static images from uploads
app.use("/uploads", express.static("uploads"));

// ✅ Import your route files here
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// ✅ Use routes with prefixes
app.use("/api/auth", authRoutes); // for login/signup/me
app.use("/api/user", userRoutes); // for update-profile



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo Error:", err));

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
