// courseRoutes

import express from "express";
const router = express.Router();
import { addCourse,getAllContributorsForCourse,getCourseById } from "../controllers/course.js";

// Add a new course route
router.post("/add", addCourse);

// Get course details by courseId route
router.get("/:courseId", getCourseById);

// Route to get all contributors for a specific course
router.get("/:courseId/contributors", getAllContributorsForCourse);

export default router;
