const express = require("express");
const { UserModel } = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config()

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, password, name, age } = req.body;
  try {
    // salt-rounds=5
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({email,password:secure_password,name,age});
        await user.save();
        res.send("Resistered");
      }
    });
  } catch (err) {
    res.send("Error in resistering the user");
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    const hashed_pass = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ "msg": "Login successfull", "token": token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong credentials");
    }
  } catch (err) {
    res.send("Something went wrong");
    console.log(err);
  }
});

module.exports = { userRouter };
