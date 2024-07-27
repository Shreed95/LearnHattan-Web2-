import express from "express";
import Tutor from "../../models/tutor/tutor.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.post("/register", async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  try {
    let tutorData = await Tutor.findOne({ email });
    if (tutorData) {
      return res
        .status(400)
        .json({ errors: "User With Same E-mail Address Exists" });
    }
    let tutordata = await Tutor.findOne({ username });
    if (tutordata) {
      return res.status(400).json({ errors: "User With Same Username Exists" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false });
  }

  const salt = await bcrypt.genSalt(10);
  let securePassword = await bcrypt.hash(req.body.password, salt);

  try {
    await Tutor.create({
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
