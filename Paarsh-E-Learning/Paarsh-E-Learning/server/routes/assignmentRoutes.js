import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth.js';

import Assignment from '../models/Assignment.js';
import AssignmentSubmission from '../models/AssignmentSubmission.js';
import Enrollment from '../models/Enrollment.js';

const router = express.Router();


/* =========================
   GET STUDENT ASSIGNMENTS
========================= */
router.get('/student', auth, async (req, res) => {
  try {
    const userId = req.studentId;   // ⭐ FIXED

    const enrollments = await Enrollment.find({ student: userId });

    const courseIds = enrollments.map(e =>
      new mongoose.Types.ObjectId(e.course)
    );

    const assignments = await Assignment.find({
      course: { $in: courseIds },
      isPublished: true
    }).lean();

    res.json(assignments);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/draft', auth, async (req, res) => {
  try {
    let submission = await AssignmentSubmission.findOne({
      student: req.studentId,
      assignment: req.params.id
    });

    if (!submission) {
      submission = new AssignmentSubmission({
        student: req.studentId,
        studentName: req.student.name,
        assignment: req.params.id,
        answerVideoUrl: req.body.answerVideoUrl || '',
        notes: req.body.notes || ''
      });
    } else {
      submission.answerVideoUrl = req.body.answerVideoUrl || submission.answerVideoUrl;
      submission.notes = req.body.notes || submission.notes;
    }

    await submission.save();

    res.json(submission);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Draft save failed' });
  }
});

/* =========================
   GET SUBMISSION
========================= */
router.get('/:id/submission', auth, async (req, res) => {

  const submission = await AssignmentSubmission.findOne({
    student: req.studentId   // ⭐ FIXED
  });

  if (!submission) return res.json({ exists: false });

  res.json({ exists: true, ...submission });
});

/* =========================
   PEER REVIEWS (placeholder)
========================= */
router.get('/peer-reviews', auth, async (req, res) => {
  res.json([]); // return empty for now
});

/* =========================
   SUBMIT ASSIGNMENT
========================= */
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const assignment = await Assignment
      .findById(req.params.id)
      .populate('course', 'title name'); // 👈 IMPORTANT

    if (!assignment)
      return res.status(404).json({ message: 'Assignment not found' });

    const { answerVideoUrl } = req.body;

    let submission = await AssignmentSubmission.findOne({
      student: req.studentId,
      assignment: assignment._id
    });

    if (!submission) {
      submission = new AssignmentSubmission({
        student: req.studentId,
        studentName: req.student.name,

        /* 🔥 FIX STARTS HERE */
        course: assignment.course._id,
        courseName: assignment.course.title || assignment.course.name,
        /* 🔥 FIX ENDS HERE */

        assignment: assignment._id,
        syllabusItemId: assignment.syllabusItemId,
        assignmentTitle: assignment.title,
        answerVideoUrl
      });
    } else {
      submission.answerVideoUrl = answerVideoUrl;
    }

    await submission.save();

    res.json(submission);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Submit failed' });
  }
});


export default router;
