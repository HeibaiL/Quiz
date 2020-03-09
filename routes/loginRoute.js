const route = require("express").Router();
const UserSchema = require("../models/userSchema");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

route.post("/", async (req, res) => {
  const currentUser = await UserSchema.findOne({ email: req.body.email });
  if (!currentUser) return res.status(401).json("User not found");

  const validPass = bcrypt.compareSync(req.body.password, currentUser.password);
  console.log(validPass)
  if (!validPass) return res.status(401).json("Password is not valid");
  const token = jwt.sign({ _id:currentUser._id }, 'shhhhh');
  res.header("auth-token", token).json(token);


});
module.exports = route;
