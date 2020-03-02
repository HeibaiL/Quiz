const route = require("express").Router();
const UserSchema = require("../models/userSchema");
var jwt = require('jsonwebtoken');

route.post("/", async (req, res) => {
  const currentUser = await UserSchema.findOne({ email: req.body.email });
  if (!currentUser) return res.status(401).json("User not found");
  if (req.body.password !== currentUser.password)
    return res.status(401).json("User not found");
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ _id:currentUser._id }, 'shhhhh');
  res.header("auth-token", token).json(token);


});
module.exports = route;
