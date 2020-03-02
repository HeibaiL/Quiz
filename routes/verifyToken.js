const jwt = require("jsonwebtoken");


function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return req.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, "shhhhh");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}
