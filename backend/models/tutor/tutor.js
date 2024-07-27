import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String }
});

const Tutor = mongoose.model("Tutor", tutorSchema);

export default Tutor;
