import Assignment from "../models/assignment.js";

const submitAssignment = async (req, res) => {
  try {
    const { title, description, userId, courseId } = req.body;
    const newAssignment = await Assignment.create({
      title,
      description,
      submittedBy: userId,
      courseId,

    });

    res.status(201).json({ success: true, data: newAssignment });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { submitAssignment };