import express from "express";
import { markVideoCompleted,markAssignmentCompleted } from "../controllers/userRanking.js";
const router = express.Router();

router.post('/mark-video-completed', markVideoCompleted);
router.post('/mark-assignment-completed', markAssignmentCompleted);

export default router;