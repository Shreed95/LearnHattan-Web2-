import User from "../models/user.js";

export const markVideoCompleted = (req, res) => {
  const { userId, courseId, videoId } = req.body;
  User.findOneAndUpdate(
    {
      _id: userId,
      "videoProgress.courseId": courseId,
      "videoProgress.videoId": videoId,
      "videoProgress.completed": false 
    },
    { $inc: { points: 1 }, $set: { "videoProgress.$.completed": true } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
        return res.status(200).json({ message: "User has already seen the video" });
      }
      return res.status(200).json({ points: user.points });
    }
  );
};

export const markAssignmentCompleted = (req, res) => {
  const { userId, courseId, assignmentId } = req.body;
  User.findOneAndUpdate(
    {
      _id: userId,
      "assignmentProgress.courseId": courseId,
      "assignmentProgress.assignmentId": assignmentId,
      "assignmentProgress.completed":false
    },
    { $inc: { points: 5 },$set: { "assignmentProgress.$.completed": true } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
        return res
          .status(200)
          .json({ message: "User has already completed the assignment" });
      }
      return res.status(200).json({ user });
    }
  );
};
