// server/seedPlacements.js
const mongoose = require('mongoose');
const Placement = require('./models/Placement');
require('dotenv').config();

const seedPlacements = async () => {
  try {
    console.log('🌱 Starting placement data seeding...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing placements
    await Placement.deleteMany({});
    console.log('🗑️ Cleared existing placements');

    // Create sample student and course IDs if they don't exist
    const studentId = new mongoose.Types.ObjectId('6983840f6f2e72a0512502d8');
    const courseId = new mongoose.Types.ObjectId('697c636e61e13f720a466360');

    // Sample placement data
    const placement = new Placement({
      studentId: studentId,
      courseId: courseId,
      totalCallsAllowed: 4,
      callsUsed: 1,
      currentStatus: 'in_process',
      interviews: [
        {
          interviewNo: 1,
          role: 'Full Stack Developer',
          companyName: 'TechCorp Solutions',
          companyIndustry: 'Technology',
          companyLocation: 'Bangalore, India',
          scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
          mode: 'Video Call',
          meetingLink: 'https://meet.google.com/abc-defg-hij',
          interviewer: 'Rahul Sharma (Tech Lead)',
          status: 'scheduled'
        }
      ],
      companies: [
        {
          name: 'TechCorp Solutions',
          industry: 'Technology',
          location: 'Bangalore, India',
          hrEmail: 'hr@techcorp.com',
          description: 'Leading technology company specializing in enterprise solutions'
        },
        {
          name: 'DigitalCraft',
          industry: 'Digital Agency',
          location: 'Hyderabad, India',
          hrEmail: 'careers@digitalcraft.com',
          description: 'Creative digital agency focusing on web and mobile applications'
        }
      ],
      jobOpportunities: [
        {
          title: 'Full Stack Developer',
          company: 'TechCorp Solutions',
          location: 'Bangalore, India',
          type: 'Full-time',
          description: 'Looking for a passionate Full Stack Developer to join our team and build amazing applications.',
          skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'JavaScript'],
          salary: '₹12-18 LPA',
          experience: '2-4 years',
          deadline: '2024-03-15',
          status: 'active',
          posted: '2 days ago'
        }
      ]
    });

    await placement.save();
    console.log('✅ Seeded placement data successfully');
    console.log(`📊 Created placement with ID: ${placement._id}`);

    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    
  } catch (error) {
    console.error('❌ Error seeding placements:', error);
    if (error.errors) {
      console.log('Validation errors:');
      Object.keys(error.errors).forEach(key => {
        console.log(`  ${key}: ${error.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

seedPlacements();