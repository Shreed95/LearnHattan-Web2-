import express from "express";
import Tutor from "../../models/tutor/tutor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();

// User Login route
router.post("/login", async (req, res) => {
  try {
    let email = req.body.email;
    try {
      let tutorData = await Tutor.findOne({ email });
      if (!tutorData) {
        return res
          .status(400)
          .json({ errors: "Try Logging-In with Correct Credentials." });
      }
      const passCompare = await bcrypt.compare(
        req.body.password,
        tutorData.password
      );
      if (!passCompare) {
        return res.status(400).json({ errors: "Incorrect Password" });
      }
      const data = {
        tutor: {
          id: tutorData._id,
        },
      };
      const authToken = jwt.sign(data, "SECRET123", { expiresIn: "30d" });
      res.json({
        success: true,
        authToken: authToken,
        tutor: data.tutor.id,
        isTutor: true,
      });
    } catch (err) {
      console.log(err);
      return res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default router;
