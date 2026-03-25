// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'No authentication token, access denied' 
      });
    }
    
    const token = authHeader.replace('Bearer ', '').trim();
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
    
    // Find student
    const student = await Student.findById(decoded.id).select('-password');
    
    if (!student) {
      return res.status(401).json({ 
        message: 'Student not found' 
      });
    }
    
    // Attach student to request
    req.student = student;
    req.studentId = student._id;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expired' 
      });
    }
    
    res.status(500).json({ 
      message: 'Authentication failed',
      error: error.message 
    });
  }
};

module.exports = auth;