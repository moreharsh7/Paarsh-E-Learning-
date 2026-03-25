// server/checkSchema.js
const mongoose = require('mongoose');
require('dotenv').config();

const checkSchema = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Get the Placement model
    const Placement = require('./models/Placement');
    
    // Check the schema
    console.log('\n📋 Placement Schema:');
    console.log('jobOpportunities field:', Placement.schema.paths.jobOpportunities);
    console.log('jobOpportunities schema type:', Placement.schema.paths.jobOpportunities.instance);
    console.log('jobOpportunities schema options:', Placement.schema.paths.jobOpportunities.options);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

checkSchema();