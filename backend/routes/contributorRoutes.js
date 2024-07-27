import express from "express";
const router = express.Router();
import { markContributorForCourse, markAssignmentComplete ,getMarkedCourses , rejectAssignment } from "../controllers/contributor.js";

// Route to mark a user as a contributor for a specific course
router.put("/:userId/mark-contributor/:courseId", markContributorForCourse);

router.get('/:userId/marked-courses', getMarkedCourses);

// Marking assignment as complete route
router.post("/mark-complete/:userId/:assignmentId", markAssignmentComplete);

// Route to reject an assignment
router.post('/mark-reject/:userId/:assignmentId', rejectAssignment);

export default router;