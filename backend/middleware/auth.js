const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // ✅ Read from cookie
  // console.log("COOKIE TOKEN:", token);
  
  if (!token) {
    return res.status(401).json({ message: "Cookie Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);
    req.userId = decoded.userId;
    next();

  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};