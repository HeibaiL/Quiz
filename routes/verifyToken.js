const jwt = require("jsonwebtoken");


function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("Access Denied");
  try {
    const verified = jwt.verify(token, "shhhhh");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}
module.exports = auth;