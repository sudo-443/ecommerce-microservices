require("dotenv").config();
const jwt = require("jsonwebtoken");

function authMiddleWare(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ msg: "no token provided" });
    jwt.verify(authHeader, process.env.JWT_SECRET, (error, user) => {
      if (error) return res.status(403).json({ msg: "invalid token" });
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports= authMiddleWare
