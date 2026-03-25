const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  /* ================= BASIC INFO ================= */
  title: {
    type: String,
    required: true,
    trim: true,
  },

  shortDescription: {
    type: String,
    required: true,
  },

  fullDescription: {
    type: String,
  },

  thumbnail: {
    type: String,
    required: true,
  },

  /* ================= PRICING & DISCOUNT ================= */
  price: {
    type: Number,
    required: true,
  },

  originalPrice: {
    type: Number,
  },

  discount: {
    type: Number,
    default: 0,
  },

  /* ================= COURSE DETAILS ================= */
  duration: {
    type: String,
    required: true,
  },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  instructor: {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    designation: {
      type: String,
    },
  },

  /* ================= FEATURES ================= */
  features: [{
    type: String,
  }],

  /* ================= STATS ================= */
  studentsEnrolled: {
    type: Number,
    default: 0,
  },

  rating: {
    type: Number,
    default: 0,
  },

  reviews: {
    type: Number,
    default: 0,
  },

  /* ================= STATUS ================= */
  bestSeller: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["active", "inactive", "draft"],
    default: "active",
  },

  /* ================= SYSTEM ================= */
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);