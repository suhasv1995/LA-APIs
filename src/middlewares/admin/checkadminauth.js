const jwt = require("jsonwebtoken");

// middleware to validate token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      error: "Access denied !",
    });
  }
  try {
    const verified = jwt.verify(token, process.env.AUTHENTICATION_SECRET);
    req.user = verified;
    next(); // to continue the flow
  } catch (error) {
    res.status(400).json({
      error: "Token is not valid !",
    });
  }
};

module.exports = verifyToken;
