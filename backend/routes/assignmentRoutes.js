// assignmentRoutes.js
import express from "express";
const router = express.Router();
import { completeAssignment, createAssignment, submitAssignment } from "../controllers/assignment.js";

// Create a new assignment document
router.post("/create", createAssignment);
router.post("/submit", submitAssignment);
router.post("/complete",completeAssignment);

export default router;
