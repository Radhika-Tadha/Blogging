const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  console.log("TOKEN:", token); // ✅ DEBUG

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded); // ✅ DEBUG

    req.userId = decoded.userId; // ✅ correct key
    next();
  } catch (err) {
     console.error("JWT verification failed:", err); // ✅ DEBUG
    return res.status(401).json({ message: "Invalid token" });
  }
};
