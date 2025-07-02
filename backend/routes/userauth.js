const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    
    const authHeader = req.headers["authorization"];
    
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.json({ message: "Token missing or expired" });
    }
    jwt.verify(token, "bookstore", (err, user) => {
      if (err) {
        console.log("token not found")
        return res.json({ message: "Token invalid", error: err.message });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.log("internal error")
    res.json({ message: "Internal server error" });
  }
};

module.exports = authentication;
