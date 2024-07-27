import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Reference to the course
});

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;
