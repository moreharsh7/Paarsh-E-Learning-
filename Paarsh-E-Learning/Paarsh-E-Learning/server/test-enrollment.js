// server/test-enrollment.js
require('dotenv').config();
const mongoose = require('mongoose');
const Enrollment = require('./models/Enrollment');
const Student = require('./models/Student');
const Course = require('./models/Course');

async function testEnrollment() {
  console.log('🧪 Testing Enrollment System...');
  
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Get a student
    const student = await Student.findOne();
    if (!student) {
      console.log('❌ No students found. Please register a student first.');
      return;
    }
    
    console.log(`👤 Student: ${student.name} (${student.email})`);
    
    // Get a course
    const course = await Course.findOne();
    if (!course) {
      console.log('❌ No courses found. Please seed the database first.');
      return;
    }
    
    console.log(`📚 Course: ${course.title} (${course.price} INR)`);
    
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: student._id,
      course: course._id
    });
    
    if (existingEnrollment) {
      console.log(`✅ Already enrolled in this course (Enrolled: ${existingEnrollment.enrolledAt})`);
    } else {
      console.log('❌ Not enrolled yet');
      
      // Create enrollment
      const enrollment = new Enrollment({
        student: student._id,
        course: course._id,
        status: 'active'
      });
      
      await enrollment.save();
      
      // Update course enrollment count
      course.studentsEnrolled += 1;
      await course.save();
      
      console.log(`✅ Created enrollment: ${enrollment._id}`);
    }
    
    // Get all enrollments for this student
    const enrollments = await Enrollment.find({ student: student._id })
      .populate('course', 'title price category');
    
    console.log(`\n📋 Student ${student.name}'s enrollments:`);
    enrollments.forEach(enrollment => {
      console.log(`   - ${enrollment.course.title} (${enrollment.progress}%) - Enrolled: ${enrollment.enrolledAt}`);
    });
    
    // Get enrollment stats
    const totalEnrollments = await Enrollment.countDocuments();
    const totalStudents = await Student.countDocuments({ 'enrolledCourses.0': { $exists: true } });
    const totalCourses = await Course.countDocuments();
    
    console.log('\n📊 Enrollment Statistics:');
    console.log(`   Total Enrollments: ${totalEnrollments}`);
    console.log(`   Students with courses: ${totalStudents}`);
    console.log(`   Total Courses: ${totalCourses}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
  }
}

testEnrollment();