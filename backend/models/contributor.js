import mongoose from "mongoose";

const contributorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] // Array to store course IDs
  // You can add more fields to the contributor model if needed
});

const Contributor = mongoose.model("Contributor", contributorSchema);

export default Contributor;
