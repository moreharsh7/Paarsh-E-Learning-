// models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedLectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture'
  }],
  courseProgress: {
    type: Map,
    of: {
      completed: Number,
      total: Number,
      percentage: Number,
      lastAccessed: Date
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create index for faster queries
progressSchema.index({ user: 1 });

module.exports = mongoose.model('Progress', progressSchema);