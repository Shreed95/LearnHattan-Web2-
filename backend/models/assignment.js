import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  submissionStatus: { type: String, enum: ["pending", "submitted", "completed", "rejected"], default: "pending" },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who submitted the assignment
  submittedCode: { type: String }, // Code submitted by the user
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
