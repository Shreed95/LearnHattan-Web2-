import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
const router = express.Router();

// User registration route
router.post("/register", async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  try {
    let userData = await User.findOne({ email });
    if (userData) {
      return res
        .status(400)
        .json({ errors: "User With Same E-mail Address Exists" });
    }
    let userdata = await User.findOne({ username });
    if (userdata) {
      return res.status(400).json({ errors: "User With Same Username Exists" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false });
  }

  const salt = await bcrypt.genSalt(10);
  let securePassword = await bcrypt.hash(req.body.password, salt);

  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: securePassword,
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false });
  }
});

export default router;
