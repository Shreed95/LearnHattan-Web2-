import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String,
  },
  tutor: {
    type: String,
    required: true
  },
  videos: [{
    title: String,
    url: String
  }],
  resources: [{
    title: String,
    description: String,
    url: String
  }],
  assignments: [{
    title: String,
    description: String,
    deadline: Date
  }],
  contributors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]

  // Add more fields as needed for your course model
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
