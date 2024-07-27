// models/UserProgress.js
const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  videosCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  // Add other progress fields as needed
});

module.exports = mongoose.model("UserProgress", userProgressSchema);
