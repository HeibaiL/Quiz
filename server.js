const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const defineQuizRoute = require("./routes/defineQuizRoute");
const homeRoute = require("./routes/homeRoute")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", homeRoute);

app.use("/definequiz", defineQuizRoute);

const db = mongoose
  .connect(
    process.env.DB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("connected to db"))
  .catch(err => console.log("Error connecting to DB", err));

app.listen(4000, () => console.log("Server up and running"));

module.exports=db;
