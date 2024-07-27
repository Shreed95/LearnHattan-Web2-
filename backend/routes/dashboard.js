import express from "express";
import User from "../models/user.js";
const router = express.Router();

// Check if user's information is already filled
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.description && user.interests) {
      res.json({ isFilled: true });
    } else {
      res.json({ isFilled: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/user/display/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({
      description: user.description,
      interests: user.interests,
      selectedFile: user.photo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save user's information
router.post("/user/saveInfo", async (req, res) => {
  const { id, photo, description, interests } = req.body;
  try {
    let user = await User.findById(id);
    if (!user) {
      user = new User({ _id: id });
    }
    user.photo = photo;
    user.description = description;
    user.interests = interests;
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
