import express from "express";
import User from "../models/user.js";
const router = express.Router();

// Update user profile route
router.post("/profile", async (req, res) => {
  try {
    const { username, description, interests } = req.body;

    // Find user by username and update profile data
    const updatedFields = { description, interests };
    if (req.file) updatedFields.photo = req.file.path;

    const user = await User.findOneAndUpdate({ username }, updatedFields, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
