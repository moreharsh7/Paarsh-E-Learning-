const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', // Changed from 'User' to 'Student'
    required: true 
  },
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  enrollment: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Enrollment',
  sparse: true // Allows null values
},
  totalCallsAllowed: { 
    type: Number, 
    default: 4 
  },
  callsUsed: { 
    type: Number, 
    default: 0 
  },
  currentStatus: { 
    type: String, 
    enum: ['not_started', 'in_process', 'placed', 'closed'],
    default: 'not_started'
  },
  interviews: [{
    interviewNo: Number,
    role: String,
    company: { 
      name: String,
      industry: String,
      location: String
    },
    scheduledAt: Date,
    mode: String,
    meetingLink: String,
    interviewer: String,
    status: String,
    _id: false
  }],
  companies: [{
    name: String,
    industry: String,
    location: String,
    hrEmail: String,
    description: String,
    _id: false
  }],
  jobOpportunities: [{
    title: String,
    company: String,
    location: String,
    type: String,
    description: String,
    skills: [String],
    salary: String,
    experience: String,
    deadline: String,
    status: String,
    posted: String,
    _id: false
  }]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Placement', placementSchema);