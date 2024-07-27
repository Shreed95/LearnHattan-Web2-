import Submission from "../models/submission.js";
import Contributor from "../models/contributor.js";
import User from "../models/user.js";

// Submission controller
export const submitAssignment = async (req, res) => {
  try {
    const { userId, courseId, assignmentId } = req.params;
    const { code } = req.body;

    // Check if a submission already exists for the user, course, and assignment
    const existingSubmission = await Submission.findOne({
      userId,
      courseId,
      assignmentId,
    });

    if (existingSubmission) {
      return res
        .status(200)
        .json({
          success: false,
          message: "Submission already exists for this assignment",
        });
    }

    // Find the contributor for the course
    const contributor = await Contributor.findOne({ courseId });

    if (!contributor) {
      return res
        .status(200)
        .json({
          success: false,
          message: "No Contributor found for the course",
        });
    }

    // Create a new submission
    const submission = new Submission({
      userId,
      courseId,
      assignmentId,
      code,
      contributorId: contributor.userId, // Assign the submission to the contributor
    });

    // Save the submission
    await submission.save();

    // Create a submitted assignment object
    const submittedAssignment = {
      userId: userId,
      courseId: courseId,
      assignmentId: assignmentId,
      code: code,
      submittedAt: new Date(),
    };

    // Update user's submitted assignments
    await User.findByIdAndUpdate(userId, {
      $push: { submittedAssignments: submittedAssignment },
    });

    res.status(200).json({
      success: true,
      message: "Assignment submitted successfully to the contributor",
    });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller function to get all submissions
export const getAllSubmissions = async (req, res) => {
  try {
    // Retrieve all submissions from the database
    const submissions = await Submission.find();

    // If no submissions found, return a 404 error
    if (!submissions) {
      return res.status(404).json({ message: "No submissions found" });
    }

    // If submissions found, return them in the response
    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error getting submissions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get all submissions based on courseId
export const getSubmissionsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Retrieve all submissions for the given courseId from the database
    const submissions = await Submission.find({ courseId });

    // If no submissions found, return a 404 error
    if (!submissions) {
      return res
        .status(404)
        .json({ message: "No submissions found for the given courseId" });
    }

    // If submissions found, return them in the response
    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error getting submissions by courseId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
