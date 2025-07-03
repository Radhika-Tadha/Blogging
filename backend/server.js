const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const cookieParser = require("cookie-parser");

app.use(cors({
  origin: "http://localhost:3000",//Only allow your frontend origin
  credentials: true, //Allow cookies
}));
//body parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // ✅ REQUIRED for req.body

// Serve static images from uploads

app.use("/uploads", express.static("uploads"));

// ✅ Import your route files here
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");


// ✅ Use routes with prefixes
app.use("/api/auth", authRoutes); // for login/signup/me
app.use("/api/user", userRoutes); // for update-profile
app.use("/api/blog", blogRoutes); // for blog insert



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo Error:", err));

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
