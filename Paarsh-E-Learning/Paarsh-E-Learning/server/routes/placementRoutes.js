const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import models
const Placement = require('../models/Placement');
const auth = require('../middleware/auth');

// Debug: Check if Placement model is properly imported
console.log('Placement model imported:', Placement ? 'Yes' : 'No');
console.log('Placement.findOne is a function?', typeof Placement.findOne === 'function' ? 'Yes' : 'No');

// =====================================================
// GET placement by student + course
// =====================================================
router.get('/:studentId/:courseId', auth, async (req, res) => {
  try {
    console.log('Fetching placement for:', req.params);
    const { studentId, courseId } = req.params;

    const placement = await Placement.findOne({
      studentId: new mongoose.Types.ObjectId(studentId),
      courseId: new mongoose.Types.ObjectId(courseId)
    });

    if (!placement) {
      console.log('Placement not found, creating default...');
      
      // Create default placement record
      const newPlacement = new Placement({
        studentId: new mongoose.Types.ObjectId(studentId),
        courseId: new mongoose.Types.ObjectId(courseId),
        totalCallsAllowed: 4,
        callsUsed: 0,
        currentStatus: 'not_started',
        interviews: [],
        companies: [],
        jobOpportunities: []
      });
      
      await newPlacement.save();
      console.log('Created new placement:', newPlacement._id);
      return res.json(newPlacement);
    }

    console.log('Found placement:', placement._id);
    res.json(placement);

  } catch (error) {
    console.error('Error in GET placement:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// =====================================================
// GET interviews
// =====================================================
router.get('/interviews/student/:studentId/course/:courseId', auth, async (req, res) => {
  try {
    console.log('Fetching interviews for:', req.params);
    const { studentId, courseId } = req.params;

    const placement = await Placement.findOne({
      studentId: new mongoose.Types.ObjectId(studentId),
      courseId: new mongoose.Types.ObjectId(courseId)
    });

    res.json(placement?.interviews || []);

  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// =====================================================
// GET companies
// =====================================================
router.get('/companies/course/:courseId', auth, async (req, res) => {
  try {
    console.log('Fetching companies for course:', req.params.courseId);

    // Get all placements for this course
    const placements = await Placement.find({
      courseId: new mongoose.Types.ObjectId(req.params.courseId)
    });

    // Combine companies from all placements
    const allCompanies = placements.flatMap(p => p.companies || []);
    
    // Remove duplicates by company name
    const uniqueCompanies = [];
    const seenNames = new Set();
    
    allCompanies.forEach(company => {
      if (company.name && !seenNames.has(company.name)) {
        seenNames.add(company.name);
        uniqueCompanies.push(company);
      }
    });

    console.log(`Found ${uniqueCompanies.length} unique companies`);
    res.json(uniqueCompanies);

  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// =====================================================
// GET job opportunities
// =====================================================
router.get('/job-opportunities/course/:courseId', auth, async (req, res) => {
  try {
    console.log('Fetching job opportunities for course:', req.params.courseId);

    const placements = await Placement.find({
      courseId: new mongoose.Types.ObjectId(req.params.courseId)
    });

    const allJobs = placements.flatMap(p => p.jobOpportunities || []);
    
    // Remove duplicates by job title and company
    const uniqueJobs = [];
    const seenJobs = new Set();
    
    allJobs.forEach(job => {
      const key = `${job.title}-${job.company}`;
      if (job.title && job.company && !seenJobs.has(key)) {
        seenJobs.add(key);
        uniqueJobs.push(job);
      }
    });

    console.log(`Found ${uniqueJobs.length} unique job opportunities`);
    res.json(uniqueJobs);

  } catch (error) {
    console.error('Error fetching job opportunities:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// =====================================================
// GET applications (dummy for now)
// =====================================================
router.get('/applications/student/:studentId', auth, async (req, res) => {
  try {
    console.log('Fetching applications for student:', req.params.studentId);
    res.json([]);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// =====================================================
// GET offers (dummy for now)
// =====================================================
router.get('/offers/student/:studentId', auth, async (req, res) => {
  try {
    console.log('Fetching offers for student:', req.params.studentId);
    res.json([]);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// =====================================================
// POST schedule mock interview
// =====================================================
router.post('/mock-interview', auth, async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    console.log('Scheduling mock interview for:', { studentId, courseId });

    // Find or create placement
    let placement = await Placement.findOne({
      studentId: new mongoose.Types.ObjectId(studentId),
      courseId: new mongoose.Types.ObjectId(courseId)
    });

    if (!placement) {
      placement = new Placement({
        studentId: new mongoose.Types.ObjectId(studentId),
        courseId: new mongoose.Types.ObjectId(courseId),
        totalCallsAllowed: 4,
        callsUsed: 0,
        currentStatus: 'not_started',
        interviews: [],
        companies: [],
        jobOpportunities: []
      });
    }

    // Check if calls are available
    if (placement.callsUsed >= placement.totalCallsAllowed) {
      return res.status(400).json({ 
        success: false,
        message: 'No interview calls available' 
      });
    }

    // Create mock interview
    const mockInterview = {
      interviewNo: placement.callsUsed + 1,
      role: 'Mock Interview - Practice Session',
      company: { 
        name: 'Practice Company',
        industry: 'Education',
        location: 'Remote'
      },
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      mode: 'Video Call',
      meetingLink: 'https://meet.google.com/mock-interview-practice',
      interviewer: 'Practice Interviewer (HR)',
      status: 'scheduled'
    };

    // Add to interviews array
    if (!placement.interviews) placement.interviews = [];
    placement.interviews.push(mockInterview);

    // Update placement
    placement.callsUsed += 1;
    if (placement.currentStatus === 'not_started') {
      placement.currentStatus = 'in_process';
    }

    await placement.save();

    res.json({
      success: true,
      message: 'Mock interview scheduled successfully',
      interview: mockInterview,
      placement: {
        callsUsed: placement.callsUsed,
        totalCallsAllowed: placement.totalCallsAllowed,
        currentStatus: placement.currentStatus
      }
    });

  } catch (error) {
    console.error('Error scheduling mock interview:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

module.exports = router;