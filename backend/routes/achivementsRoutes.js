// achievementRoutes.js

import express from "express";
const router = express.Router();
import { createAchievement,getAllAchievements,getAchievementById,updateAchievement, deleteAchievement } from "../controllers/achivements.js";

// Create a new achievement
router.post("/", createAchievement);

// Get all achievements
router.get("/", getAllAchievements);

// Get achievement by ID
router.get("/:achievementId", getAchievementById);

// Update achievement by ID
router.put("/:achievementId", updateAchievement);

// Delete achievement by ID
router.delete("/:achievementId", deleteAchievement);

export default router;
