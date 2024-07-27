import express from 'express';
import Course from '../../models/course.js';
import Tutor from '../../models/tutor/tutor.js';

const router = express.Router();

// Route to create a new course
router.post('/courses/add/:tutorId', async (req, res) => {
  try {
    // Get course details from the request body
    const { title, description, category, image, videos, resources, assignments } = req.body;
    // Get the tutor ID from the request parameters
    const tutorId = req.params.tutorId;

    // Find the tutor by their ID
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    // Create a new course document
    const course = new Course({
      title,
      description,
      category,
      image,
      videos,
      resources,
      assignments,
      tutor: tutor._id
    });

    // Save the course to the database
    await course.save();

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
