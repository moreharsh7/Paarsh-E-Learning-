// server/routes/categories.js
const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// GET all active categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ status: 'active' })
      .select('domain subDomain tagline description')
      .sort({ subDomain: 1 });
    
    // Format for frontend
    const formattedCategories = categories.map(cat => ({
      _id: cat._id,
      domain: cat.domain,
      subDomain: cat.subDomain,
      name: cat.subDomain, // For compatibility
      tagline: cat.tagline,
      description: cat.description
    }));
    
    res.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      message: 'Server error fetching categories', 
      error: error.message 
    });
  }
});

// GET categories with course counts (optional)
router.get('/with-counts', async (req, res) => {
  try {
    const categories = await Category.aggregate([
      { $match: { status: 'active' } },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: 'category',
          as: 'courses'
        }
      },
      {
        $project: {
          _id: 1,
          domain: 1,
          subDomain: 1,
          name: '$subDomain',
          tagline: 1,
          description: 1,
          count: { $size: '$courses' }
        }
      },
      { $sort: { subDomain: 1 } }
    ]);
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories with counts:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;