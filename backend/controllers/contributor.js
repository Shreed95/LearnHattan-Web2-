import User from "../models/user.js";
import Contributor from "../models/contributor.js";
import Assignment from "../models/assignment.js";
import Submission from "../models/submission.js";
import Course from "../models/course.js";
import mongoose from "mongoose";

// mark a user as a contributor for a specific course
const markContributorForCourse = async (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    // Check if the user is already marked as a contributor for the course
    if (course.contributors.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is already a contributor for this course" });
    }

    // Find the contributor by their user ID
    let contributor = await Contributor.findOne({ userId: userId });
    if (!contributor) {
      // If contributor record doesn't exist, create a new one
      contributor = new Contributor({ userId: userId, courseIds: [] });
    }

    // Push the courseId into the markedCourses array of the user
    user.markedCourses.push(courseId);
    await user.save();

    // Push the courseId into the courseIds array of the contributor
    contributor.courseIds.push(courseId);
    await contributor.save();

    // Push the userId into the contributors array of the course
    course.contributors.push(userId);
    await course.save();

    res.status(200).json({
      message: "User marked as contributor for the course",
      contributor: contributor,
    });
  } catch (error) {
    console.error("Error marking user as contributor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get marked courses for a contributor
const getMarkedCourses = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by their ID
    const user = await User.findById(userId).populate("markedCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is a contributor
    if (!user.contributor) {
      return res.status(400).json({ message: "User is not a contributor" });
    }

    // Extract marked courses from the user object
    const markedCourses = user.markedCourses;

    res.status(200).json({ success: true, data: markedCourses });
  } catch (error) {
    console.error("Error fetching marked courses:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Marking assignment as complete
const markAssignmentComplete = async (req, res) => {
  try {
    const { userId, assignmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid assignment ID" });
    }

    // Update assignment's submission status
    await Assignment.findByIdAndUpdate(assignmentId, {
      submissionStatus: "completed",
    });

    // Update user's completedAssignments
    await User.findByIdAndUpdate(userId, {
      $addToSet: { completedAssignments: assignmentId },
    });

    // Update the check field in the submission
    await Submission.findOneAndUpdate(
      { assignmentId, userId },
      { check: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Assignment marked as complete" });
  } catch (error) {
    console.error("Error marking assignment as complete:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Rejecting an assignment
const rejectAssignment = async (req, res) => {
  try {
    const { userId, assignmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid assignment ID" });
    }

    // Update assignment's submission status
    await Assignment.findByIdAndUpdate(assignmentId, {
      submissionStatus: "rejected",
    });

    // Add assignment to user's rejectedAssignments
    await User.findByIdAndUpdate(userId, {
      $addToSet: { rejectedAssignments: assignmentId },
    });

    await Submission.findOneAndUpdate(
      { assignmentId, userId },
      { check: true }
    );

    res.status(200).json({ success: true, message: "Assignment rejected" });
  } catch (error) {
    console.error("Error rejecting assignment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  markContributorForCourse,
  markAssignmentComplete,
  getMarkedCourses,
  rejectAssignment,
};
