import express from 'express';
import Lecture from '../models/lecture.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get lectures by course
router.get('/course/:courseId', auth, async (req, res) => {
  try {
    const { courseId } = req.params;

    const lectures = await Lecture.find({ course: courseId })
      .sort({ lectureOrder: 1 })
      .populate('course', 'title description instructor thumbnail category');

    res.json(lectures);
  } catch (error) {
    console.error('Error fetching lectures:', error);
    res.status(500).json({ error: 'Failed to fetch lectures' });
  }
});

// Get single lecture
router.get('/:id', auth, async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) return res.status(404).json({ error: 'Lecture not found' });

    res.json(lecture);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lecture' });
  }
});

export default router;
