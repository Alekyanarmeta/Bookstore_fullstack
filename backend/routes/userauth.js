const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    // Fixed: Use req.headers (plural) and lowercase 'authorization'
    const authHeader = req.headers["authorization"];
    console.log("Auth Header:", authHeader);

    // Get token from "Bearer <token>"
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token:", token);

    if (!token) {
      return res.json({ message: "Token missing or expired" });
    }

    // Verify token
    jwt.verify(token, "bookstore", (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token invalid", error: err.message });
      }
      // Attach user info to request
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authentication;
