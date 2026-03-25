// server/routes/enrollments.js
const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Get enrollments for a specific student
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // Find all active enrollments for this student
    const enrollments = await Enrollment.find({ 
      student: studentId,
      status: 'active'
    })
    .populate('course') // Populate course details
    .populate('student'); // Populate student details
    
    res.json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get enrollment by course and student
router.get('/student/:studentId/course/:courseId', async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    
    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
      status: 'active'
    }).populate('course');
    
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    
    res.json(enrollment);
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;