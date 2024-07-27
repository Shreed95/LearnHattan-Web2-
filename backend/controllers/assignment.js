import Assignment from "../models/assignment.js";
import Course from "../models/course.js";
import User from "../models/user.js";

// Function to create a new assignment and update the course
const createAssignment = async (req, res) => {
  try {
    const { title, description, courseId } = req.body;

    // Create a new assignment
    const newAssignment = await Assignment.create({
      title,
      description,
      courseId
    });

    // Update the course to include the new assignment
    await Course.findByIdAndUpdate(courseId, {
      $push: { assignments: newAssignment._id }
    });

    res.status(201).json({ success: true, data: newAssignment });
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Function to submit an existing assignment
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, userId } = req.body;

    // Find the assignment by its ID
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if the assignment is already submitted
    if (assignment.submissionStatus === "submitted") {
      return res.status(400).json({ message: "Assignment is already submitted" });
    }

    // Update the assignment's submission status
    assignment.submissionStatus = "submitted";
    if (!assignment.submittedBy.includes(userId)) {
      assignment.submittedBy.push(userId);
    }
    await assignment.save();

    // Update the user's submitted assignments list
    await User.findByIdAndUpdate(userId, {
      $push: { submittedAssignments: { assignmentId: assignment._id, approved: false } }
    });

    res.status(200).json({ success: true, message: "Assignment submitted successfully", data: assignment });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



const completeAssignment = async (req, res) => {
  try {
    const { assignmentId, userId } = req.body;

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the assignment by its ID
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if the user has submitted the assignment
    const userSubmittedAssignment = user.submittedAssignments.find(
      (submitted) => submitted.assignmentId.toString() === assignmentId.toString()
    );

    if (!userSubmittedAssignment || userSubmittedAssignment.code === null) {
      return res.status(400).json({ message: "Assignment must be submitted before it can be completed" });
    }

    // Check if the assignment is already completed by the user
    if (assignment.completedBy.includes(userId)) {
      return res.status(400).json({ message: "Assignment is already completed by this user" });
    }

    // Mark the assignment as completed
    assignment.completedBy.push(userId);
    assignment.submissionStatus = "completed";
    await assignment.save();

    // Award points to the user
    user.points += 20;
    user.completedAssignments.push(assignmentId);
    await user.save();

    res.status(200).json({ message: "Assignment marked as completed and points awarded", points: user.points });
  } catch (error) {
    console.error("Error completing assignment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { submitAssignment, completeAssignment, createAssignment };