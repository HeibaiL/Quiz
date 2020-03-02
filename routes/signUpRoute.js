const route = require("express").Router();
const UserSchema = require("../models/userSchema");

route.post("/", async (req, res) => {
  //   const user = new User(req.body);
  const currentUser = await UserSchema.findOne({email:req.body.email});
  if(currentUser) return res.status(401).json("This e-mail is taken, try another one");
  const user = new UserSchema({...req.body})
  user.save();
  res.json(user)
});
module.exports = route;
