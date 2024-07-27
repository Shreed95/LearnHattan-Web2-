// assignmentRoutes.js
import express from "express";
const router = express.Router();
import { submitAssignment } from "../controllers/assignment.js";

// Create a new assignment document
router.post("/submit", submitAssignment);

export default router;
