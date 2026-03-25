import express from 'express';
import Progress from '../models/Progress.js';
import Lecture from '../models/lecture.js';
import auth from '../middleware/auth.js';

const router = express.Router(); // ⭐ THIS WAS MISSING

// =============================
// Mark lecture complete
// =============================
router.post('/lecture/:lectureId', auth, async (req, res) => {
  try {
    const { lectureId } = req.params;
    const userId = req.studentId;

    let progress = await Progress.findOne({ user: userId });

    if (!progress) {
      progress = new Progress({
        user: userId,
        completedLectures: []
      });
    }

    if (!progress.completedLectures.includes(lectureId)) {
      progress.completedLectures.push(lectureId);
    }

    await progress.save();

    res.json({
      success: true,
      completedLectures: progress.completedLectures
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});


// =============================
// Get course progress (dynamic)
// =============================
router.get('/course/:courseId', auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.studentId;

    const totalLectures = await Lecture.countDocuments({ course: courseId });

    const progress = await Progress.findOne({ user: userId });

    const completed = progress
      ? await Lecture.countDocuments({
          _id: { $in: progress.completedLectures },
          course: courseId
        })
      : 0;

    const percentage =
      totalLectures > 0
        ? Math.round((completed / totalLectures) * 100)
        : 0;

    res.json({
      completedLectures: progress?.completedLectures || [],
      totalLectures,
      percentage
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

export default router;
