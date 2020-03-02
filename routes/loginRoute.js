const route = require("express").Router();
const UserSchema = require("../models/userSchema");

route.post("/", async (req, res) => {
  const currentUser = await UserSchema.findOne({ email: req.body.email });
  if (!currentUser) return res.status(401).json("User not found");
  if (req.body.password !== currentUser.password)
    return res.status(401).json("User not found");
  res.json(currentUser);
});
module.exports = route;
