const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobOpportunity',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  status: {
    type: String,
    enum: [
      'applied', 
      'under_review', 
      'shortlisted', 
      'interview_scheduled', 
      'offer_received', 
      'rejected', 
      'accepted',
      'withdrawn'
    ],
    default: 'applied'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  resume: {
    type: String,
    default: ''
  },
  coverLetter: {
    type: String,
    default: ''
  },
  interview: {
    scheduledAt: Date,
    meetingLink: String,
    interviewer: String,
    feedback: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
      default: 'scheduled'
    }
  },
  offer: {
    salary: String,
    joiningDate: Date,
    benefits: [String],
    receivedAt: Date,
    deadlineToAccept: Date
  },
  notes: {
    type: String,
    default: ''
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
applicationSchema.index({ student: 1, job: 1 }, { unique: true });
applicationSchema.index({ student: 1, status: 1 });
applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ appliedAt: -1 });

// Update lastUpdated timestamp before saving
applicationSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model('Application', applicationSchema);