const route = require("express").Router();
const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

route.post("/", async (req, res) => {
  //   const user = new User(req.body);
  const currentUser = await UserSchema.findOne({ email: req.body.email });
  if (currentUser)
    return res.status(401).json("This e-mail is taken, try another one");
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  

  const user = new UserSchema({ ...req.body, password: hashedPassword });
  user.save();
  res.json(user);
});
module.exports = route;
