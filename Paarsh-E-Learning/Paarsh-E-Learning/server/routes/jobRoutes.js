const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JobOpportunity = require('../models/JobOpportunity');
const Application = require('../models/Application');
const Placement = require('../models/Placement');
const Enrollment = require('../models/Enrollment');

// Get all job opportunities
router.get('/', auth, async (req, res) => {
  try {
    const { category, search, location, type } = req.query;
    
    let filter = { status: 'active' };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (location && location !== 'all') {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (type && type !== 'all') {
      filter.type = type;
    }
    
    const jobs = await JobOpportunity.find(filter)
      .sort({ createdAt: -1 })
      .populate('applicants.student', 'name email')
      .limit(50);
    
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get job by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const job = await JobOpportunity.findById(req.params.id)
      .populate('applicants.student', 'name email');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply for a job
router.post('/apply', auth, async (req, res) => {
  try {
    const { jobId, resume, coverLetter } = req.body;
    
    // Check if job exists
    const job = await JobOpportunity.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if job is still active
    if (job.status !== 'active') {
      return res.status(400).json({ message: 'Job is no longer accepting applications' });
    }
    
    // Check if deadline has passed
    if (job.deadline && new Date(job.deadline) < new Date()) {
      return res.status(400).json({ message: 'Application deadline has passed' });
    }
    
    // Check if already applied
    const existingApplication = await Application.findOne({
      student: req.user.id,
      job: jobId
    });
    
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    
    // Check if student has enrollment for this course category
    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      'course.category': job.category
    }).populate('course');
    
    if (!enrollment) {
      return res.status(400).json({ 
        message: 'You need to be enrolled in a relevant course to apply for this job' 
      });
    }
    
    // Create application
    const application = new Application({
      student: req.user.id,
      job: jobId,
      course: enrollment.course._id,
      status: 'applied',
      resume: resume,
      coverLetter: coverLetter
    });
    
    await application.save();
    
    // Add applicant to job
    job.applicants.push({
      student: req.user.id,
      appliedAt: new Date(),
      status: 'applied'
    });
    
    await job.save();
    
    res.json({
      message: 'Application submitted successfully',
      application
    });
    
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student applications
router.get('/student/:studentId', auth, async (req, res) => {
  try {
    const applications = await Application.find({ student: req.params.studentId })
      .populate('job', 'title company location type salary')
      .populate('course', 'title')
      .sort({ appliedAt: -1 });
    
    // Format applications for frontend
    const formattedApplications = applications.map(app => ({
      _id: app._id,
      jobTitle: app.job?.title || 'Job',
      company: app.job?.company || 'Company',
      appliedDate: app.appliedAt.toLocaleDateString(),
      status: app.status,
      nextStep: getNextStep(app.status),
      timeline: getTimeline(app.status, app.createdAt)
    }));
    
    res.json(formattedApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get job offers for student
router.get('/offers/student/:studentId', auth, async (req, res) => {
  try {
    // Find applications with offer_received or accepted status
    const offers = await Application.find({
      student: req.params.studentId,
      status: { $in: ['offer_received', 'accepted'] }
    })
    .populate('job', 'title company')
    .populate('course', 'title')
    .sort({ 'offer.receivedAt': -1 });
    
    // Format offers for frontend
    const formattedOffers = offers.map(offer => ({
      _id: offer._id,
      role: offer.job?.title || 'Role',
      company: offer.job?.company || 'Company',
      salary: offer.offer?.salary || '₹8-12 LPA',
      joiningDate: offer.offer?.joiningDate ? 
        new Date(offer.offer.joiningDate).toLocaleDateString() : 
        'To be decided',
      status: offer.status,
      benefits: offer.offer?.benefits || ['Health Insurance', 'WFH Options']
    }));
    
    res.json(formattedOffers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept job offer
router.post('/offers/:id/accept', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    if (application.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    if (application.status !== 'offer_received') {
      return res.status(400).json({ message: 'No offer to accept' });
    }
    
    // Update application status
    application.status = 'accepted';
    await application.save();
    
    // Update placement record
    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      course: application.course
    });
    
    if (enrollment) {
      const placement = await Placement.findOne({ enrollment: enrollment._id });
      if (placement) {
        placement.currentStatus = 'placed';
        placement.placedCompany = application.job; // Note: job field contains job ID
        placement.placedAt = new Date();
        placement.remarks = 'Offer accepted by student';
        await placement.save();
      }
    }
    
    res.json({
      message: 'Offer accepted successfully',
      application
    });
    
  } catch (error) {
    console.error('Error accepting offer:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper functions
function getNextStep(status) {
  const steps = {
    'applied': 'Application Under Review',
    'under_review': 'Technical Assessment',
    'shortlisted': 'HR Interview',
    'interview_scheduled': 'Technical Interview',
    'offer_received': 'Documentation & Onboarding',
    'accepted': 'Joining Process',
    'rejected': 'Apply to Other Jobs'
  };
  return steps[status] || 'Application Under Review';
}

function getTimeline(status, createdAt) {
  const now = new Date();
  const created = new Date(createdAt);
  const daysPassed = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  
  if (status === 'applied') {
    return `Submitted ${daysPassed} days ago`;
  } else if (status === 'under_review') {
    return `Review in progress`;
  } else if (status === 'shortlisted') {
    return `Shortlisted for next round`;
  } else if (status === 'interview_scheduled') {
    return `Interview scheduled soon`;
  } else if (status === 'offer_received') {
    return `Offer received - respond within 7 days`;
  } else if (status === 'accepted') {
    return `Offer accepted`;
  } else if (status === 'rejected') {
    return `Application not selected`;
  }
  
  return 'Update pending';
}

module.exports = router;