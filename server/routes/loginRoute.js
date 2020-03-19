const route = require("express").Router();
const UserSchema = require("../models/userSchema");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

route.post("/", async (req, res) => {
  const currentUser = await UserSchema.findOne({ email: req.body.email });
  if (!currentUser) return res.status(401).json("User not found");

  const validPass = bcrypt.compareSync(req.body.password, currentUser.password);
  if (!validPass) return res.status(401).json("Password is not valid");
  const token = jwt.sign({ _id: currentUser._id }, process.env.SECRET_KEY);
  res.header("auth-token", token).json({token,email:currentUser.email});
});
module.exports = route;
