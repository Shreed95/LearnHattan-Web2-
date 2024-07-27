import express from "express";
const router = express.Router();
import { submitAssignment , getAllSubmissions , getSubmissionsByCourseId} from "../controllers/submission.js";

router.post('/submit/:userId/:courseId/:assignmentId', submitAssignment);

// Route to get all submissions
router.get('/allSubmissions', getAllSubmissions);

// Route to get all submissions based on courseId
router.get('/allSubmissions/:courseId', getSubmissionsByCourseId);

export default router;