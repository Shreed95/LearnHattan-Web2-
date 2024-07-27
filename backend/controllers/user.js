import User from "../models/user.js";
import Course from "../models/course.js";
import Achievement from "../models/achivements.js";

// Enroll in a course route
const enrollUserInCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is already enrolled in the course
    if (user.enrolledCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "User is already enrolled in this course" });
    }

    // Add the course to the user's enrolled courses
    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({
      message: "Successfully enrolled in the course",
      enrolledCourses: user.enrolledCourses,
    });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get enrolled courses by user ID route
const getEnrolledCoursesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by their ID and populate enrolledCourses
    const user = await User.findById(userId).populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a submitted assignment object
const submitAssignment = async (req, res) => {
  try {
    const { userId, assignmentId, code } = req.body;

    // Create a submitted assignment object
    const submittedAssignment = {
      assignmentId: assignmentId,
      code: code,
      submittedAt: new Date(),
    };

    // Update user's submitted assignments
    await User.findByIdAndUpdate(userId, {
      $push: { submittedAssignments: submittedAssignment },
    });

    res
      .status(200)
      .json({ success: true, message: "Assignment submitted successfully" });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Mark a course as completed for a user
const completeCourseForUser = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is enrolled in the course
    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "User is not enrolled in this course" });
    }

    // Check if the course is already marked as completed for the user
    if (user.completedCourses.includes(courseId)) {
      return res.status(400).json({ message: "Course is already completed for this user" });
    }

    // Add the course to the user's completed courses array
    user.completedCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Course marked as completed for the user", completedCourses:user.completedCourses });
  } catch (error) {
    console.error("Error marking course as completed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Achievements to the user based on the completed course
const awardAchievementsToUser = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all achievements from the database that match the completed course
    const matchingAchievements = await Achievement.find({ course: courseId });

    // Award matching achievements to the user
    for (const achievement of matchingAchievements) {
      user.achievements.push(achievement._id);
    }

    // Save the updated user with achievements
    await user.save();

    res.status(200).json({ message: "Achievements awarded to the user", achievement:user.achievements });
  } catch (error) {
    console.error("Error awarding achievements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { enrollUserInCourse,getEnrolledCoursesByUserId,submitAssignment,completeCourseForUser,awardAchievementsToUser };
