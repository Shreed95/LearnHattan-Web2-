// userRoutes.js
import express from "express";
import User from "../models/user.js";
import Course from "../models/course.js";
import { awardAchievementsToUser, completeCourseForUser, enrollUserInCourse,getEnrolledCoursesByUserId,submitAssignment } from "../controllers/user.js";

const router = express.Router();

// Enroll user in a course
router.post("/enroll", enrollUserInCourse);

// Get enrolled courses by user ID route
router.get("/enrolled-courses/:userId", getEnrolledCoursesByUserId);

// Submit assignment route
router.post("/submit-assignment", submitAssignment);

// Mark a course as completed for a user route
router.post("/:userId/complete-course/:courseId", completeCourseForUser);

// Route to award achievements to the user based on the completed course
router.post("/:userId/award-achievements/:courseId", awardAchievementsToUser);

// Get all courses route
router.get("/allcourses", async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all users route
router.get("/allusers", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Backend route to get all users marked as contributors
router.get("/contributors", async (req, res) => {
  try {
    // Find all users where contributor field is true
    const contributors = await User.find({ contributor: true });

    res.status(200).json({ contributors });
  } catch (error) {
    console.error("Error fetching contributors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET user by ID
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
