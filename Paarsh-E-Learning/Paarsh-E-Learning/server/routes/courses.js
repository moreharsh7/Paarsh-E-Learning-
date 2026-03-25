// server/routes/courses.js - UPDATED
const express = require('express');
const Course = require('../models/Course');
const Category = require('../models/Category');
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const router = express.Router();

// GET all courses with category population
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/courses - Fetching all courses');
    
    const { category, search, minPrice, maxPrice, level, populate } = req.query;
    
    let filter = { status: 'active' };
    
    // Handle category filter by ObjectId
    if (category && category !== 'all') {
      // Check if it's a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(category)) {
        filter.category = category;
      } else {
        // Find category by subDomain
        const foundCategory = await Category.findOne({ 
          subDomain: category,
          status: 'active' 
        });
        
        if (foundCategory) {
          filter.category = foundCategory._id;
        }
      }
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { 'instructor.name': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Price filter (using fee field from your schema)
    if (minPrice || maxPrice) {
      filter.fee = {};
      if (minPrice) filter.fee.$gte = Number(minPrice);
      if (maxPrice) filter.fee.$lte = Number(maxPrice);
    }
    
    if (level && level !== 'all') {
      filter.level = level;
    }
    
    // Build query
    let query = Course.find(filter);
    
    // Populate category if requested
    if (populate === 'category') {
      query = query.populate({
        path: 'category',
        select: 'subDomain domain tagline description status',
        match: { status: 'active' }
      });
    }
    
    const courses = await query
      .sort({ createdAt: -1 })
      .select('-__v');
    
    // Transform courses for frontend
    const transformedCourses = courses.map(course => {
      const courseObj = course.toObject ? course.toObject() : course;
      
      return {
        ...courseObj,
        // Map fee to price for frontend compatibility
        price: parseFloat(courseObj.fee) || 0,
        // Use category data if populated
        categoryName: courseObj.category 
          ? courseObj.category.subDomain 
          : 'General',
        // Map other fields
        averageRating: courseObj.averageRating || 0,
        ratingCount: courseObj.ratingCount || 0,
        enrolledCount: courseObj.enrolledCount || 0
      };
    });
    
    console.log(`Found ${transformedCourses.length} courses`);
    res.json(transformedCourses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// GET categories from Category collection
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({ status: 'active' })
      .select('_id domain subDomain tagline description')
      .sort({ subDomain: 1 });
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Rest of the routes remain the same...
// Rest of your routes remain the same...
// (GET enrolled/my-courses, check-enrollment, debug/enrollments, etc.

// GET my enrolled courses (FIXED VERSION)
router.get('/enrolled/my-courses', auth, async (req, res) => {
  try {
    const studentId = req.student.id;
    console.log(`📚 Fetching enrolled courses for student: ${studentId}`);
    
    const enrollments = await Enrollment.find({ 
      student: studentId,
      status: { $in: ['active', 'completed'] }
    })
    .populate({
      path: 'course',
      select: 'title shortDescription price originalPrice discount duration level category instructor features studentsEnrolled rating reviews bestSeller thumbnail status'
    })
    .sort({ enrolledAt: -1 });
    
    console.log(`📊 Found ${enrollments.length} enrollments for student ${studentId}`);
    
    if (enrollments.length === 0) {
      return res.json([]);
    }
    
    // Format the response
    const enrolledCourses = enrollments.map(enrollment => {
      const course = enrollment.course;
      if (!course) {
        return null;
      }
      
      return {
        _id: course._id,
        title: course.title,
        shortDescription: course.shortDescription,
        description: course.fullDescription || course.shortDescription,
        price: course.price,
        originalPrice: course.originalPrice,
        discount: course.discount,
        duration: course.duration,
        level: course.level,
        category: course.category,
        instructor: course.instructor,
        features: course.features || [],
        studentsEnrolled: course.studentsEnrolled || 0,
        rating: course.rating || 0,
        reviews: course.reviews || 0,
        bestSeller: course.bestSeller || false,
        thumbnail: course.thumbnail,
        enrollmentId: enrollment._id,
        enrolledAt: enrollment.enrolledAt,
        progress: enrollment.progress || 0,
        status: enrollment.status || 'active',
        lastAccessed: enrollment.lastAccessed
      };
    }).filter(course => course !== null);
    
    console.log(`✅ Returning ${enrolledCourses.length} enrolled courses`);
    res.json(enrolledCourses);
    
  } catch (error) {
    console.error('❌ Error fetching enrolled courses:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// GET single enrollment status
router.get('/check-enrollment/:courseId', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      student: req.student.id,
      course: req.params.courseId
    });
    
    res.json({
      isEnrolled: !!enrollment,
      enrollment: enrollment
    });
  } catch (error) {
    console.error('Error checking enrollment:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});
// ===========================================
// POST batch enroll multiple courses
// ===========================================
router.post('/enroll/batch', auth, async (req, res) => {
  try {
    const { courseIds } = req.body;
    const studentId = req.student.id;

    if (!courseIds || !Array.isArray(courseIds)) {
      return res.status(400).json({ message: 'No courses provided' });
    }

    const successful = [];

    for (const id of courseIds) {

      const already = await Enrollment.findOne({
        student: studentId,
        course: id
      });

      if (already) continue;

      const enrollment = await Enrollment.create({
        student: studentId,
        course: id,
        status: 'active',
        enrolledAt: new Date(),
        progress: 0
      });

      await Course.findByIdAndUpdate(id, {
        $inc: { studentsEnrolled: 1 }
      });

      successful.push(enrollment._id);
    }

    res.json({
      success: true,
      enrolled: successful.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// Test endpoint to verify enrollment
router.get('/debug/enrollments', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.student.id })
      .populate('course', 'title')
      .populate('student', 'name email');
    
    res.json({
      studentId: req.student.id,
      totalEnrollments: enrollments.length,
      enrollments: enrollments
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;