import Achievement from "../models/achivements.js";

const createAchievement = async (req, res) => {
  try {
    const { title, description, courseId } = req.body;
    const achievement = new Achievement({
      title,
      description,
      courseId: courseId,
    });
    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    console.error("Error creating achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.achievementId);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json(achievement);
  } catch (error) {
    console.error("Error fetching achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAchievement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.achievementId,
      { title, description },
      { new: true }
    );
    if (!updatedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json(updatedAchievement);
  } catch (error) {
    console.error("Error updating achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAchievement = async (req, res) => {
  try {
    const deletedAchievement = await Achievement.findByIdAndDelete(
      req.params.achievementId
    );
    if (!deletedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createAchievement,getAllAchievements,getAchievementById,updateAchievement,deleteAchievement };
