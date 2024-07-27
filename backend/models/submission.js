import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  }, // Added courseId field
  submittedAt: { type: Date, default: Date.now },
  code: { type: String, required: true },
  contributorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contributer",
    required: true,
  },
  check:{
    type: Boolean,
    default: false
  }
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
