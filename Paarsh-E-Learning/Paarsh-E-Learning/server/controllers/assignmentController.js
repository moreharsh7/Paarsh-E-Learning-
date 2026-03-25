const Assignment = require('../models/Assignment');
const AssignmentSubmission = require('../models/AssignmentSubmission');
const Enrollment = require('../models/Enrollment');

// @desc    Get assignments for logged-in student
// @route   GET /api/assignments/student
// @access  Private (Student)
exports.getStudentAssignments = async (req, res) => {
  try {
    // Get student's enrolled courses
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate('course', 'title code');
    
    const courseIds = enrollments.map(enrollment => enrollment.course._id);
    
    // Find published assignments for these courses
    const assignments = await Assignment.find({
      course: { $in: courseIds },
      isPublished: true,
      status: { $in: ['published', 'draft'] }
    })
    .populate('course', 'title code')
    .sort({ dueDate: 1, priority: 1 });
    
    // Get existing submissions for these assignments
    const assignmentIds = assignments.map(a => a._id);
    const submissions = await AssignmentSubmission.find({
      student: req.user.id,
      assignment: { $in: assignmentIds }
    });
    
    // Combine assignments with submission status
    const assignmentsWithStatus = assignments.map(assignment => {
      const submission = submissions.find(s => 
        s.assignment.toString() === assignment._id.toString()
      );
      
      let status = 'not_started';
      if (submission) {
        status = submission.status;
        if (submission.status === 'graded') {
          status = 'graded';
        } else if (['submitted', 'under_review'].includes(submission.status)) {
          status = 'submitted';
        } else if (submission.status === 'draft') {
          status = 'in_progress';
        }
      }
      
      return {
        ...assignment.toObject(),
        status,
        courseName: assignment.course.title,
        courseCode: assignment.course.code,
        submissionId: submission?._id,
        score: submission?.score,
        grade: submission?.grade,
        feedback: submission?.feedback
      };
    });
    
    res.json(assignmentsWithStatus);
  } catch (error) {
    console.error('Error fetching student assignments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get assignment by ID
// @route   GET /api/assignments/:id
// @access  Private
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('course', 'title code instructor');
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Check if student is enrolled in the course
    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      course: assignment.course
    });
    
    if (!enrollment && req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }
    
    res.json(assignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Submit assignment
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
exports.submitAssignment = async (req, res) => {
  try {
    const { answerVideoUrl, notes, additionalFiles } = req.body;
    
    // Validate video URL
    if (!answerVideoUrl) {
      return res.status(400).json({ message: 'Video URL is required' });
    }
    
    // Get assignment
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Check if student is enrolled
    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      course: assignment.course
    });
    
    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }
    
    // Check if submission already exists
    let submission = await AssignmentSubmission.findOne({
      student: req.user.id,
      assignment: req.params.id
    });
    
    if (submission) {
      // Update existing submission
      submission.answerVideoUrl = answerVideoUrl;
      submission.notes = notes;
      submission.additionalFiles = additionalFiles || [];
      submission.status = 'submitted';
      submission.submittedAt = new Date();
      submission.resubmissionCount += 1;
      
      // Add to previous submissions
      submission.previousSubmissions.push({
        answerVideoUrl: submission.answerVideoUrl,
        submittedAt: submission.submittedAt,
        feedback: submission.feedback,
        score: submission.score
      });
    } else {
      // Create new submission
      submission = new AssignmentSubmission({
        student: req.user.id,
        studentName: req.user.name,
        studentEmail: req.user.email,
        course: assignment.course,
        courseName: assignment.course.title,
        courseCode: assignment.course.code,
        assignment: req.params.id,
        syllabusItemId: assignment.syllabusItemId,
        assignmentTitle: assignment.title,
        answerVideoUrl,
        notes,
        additionalFiles: additionalFiles || [],
        status: 'submitted',
        submittedAt: new Date()
      });
    }
    
    await submission.save();
    
    res.status(200).json({
      message: 'Assignment submitted successfully',
      submission
    });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get student's submission for an assignment
// @route   GET /api/assignments/:id/submission
// @access  Private (Student)
exports.getSubmission = async (req, res) => {
  try {
    const submission = await AssignmentSubmission.findOne({
      student: req.user.id,
      assignment: req.params.id
    });
    
    if (!submission) {
      return res.status(404).json({ message: 'No submission found' });
    }
    
    res.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Save assignment as draft
// @route   PUT /api/assignments/:id/submission
// @access  Private (Student)
exports.saveDraft = async (req, res) => {
  try {
    const { answerVideoUrl, notes, additionalFiles } = req.body;
    
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    let submission = await AssignmentSubmission.findOne({
      student: req.user.id,
      assignment: req.params.id
    });
    
    if (submission) {
      // Update draft
      submission.answerVideoUrl = answerVideoUrl || submission.answerVideoUrl;
      submission.notes = notes || submission.notes;
      submission.additionalFiles = additionalFiles || submission.additionalFiles;
      submission.status = 'draft';
    } else {
      // Create new draft
      submission = new AssignmentSubmission({
        student: req.user.id,
        studentName: req.user.name,
        studentEmail: req.user.email,
        course: assignment.course,
        courseName: assignment.course.title,
        courseCode: assignment.course.code,
        assignment: req.params.id,
        syllabusItemId: assignment.syllabusItemId,
        assignmentTitle: assignment.title,
        answerVideoUrl,
        notes,
        additionalFiles: additionalFiles || [],
        status: 'draft'
      });
    }
    
    await submission.save();
    
    res.json({
      message: 'Draft saved successfully',
      submission
    });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get peer reviews for student
// @route   GET /api/assignments/peer-reviews
// @access  Private (Student)


exports.getPeerReviews = async (req, res) => {
  try {
    // This would be your peer review logic
    // For now, return empty array or mock data
    res.json([]);
  } catch (error) {
    console.error('Error fetching peer reviews:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};