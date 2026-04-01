import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import categoryRoutes from './routes/categories.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import enrollmentRoutes from './routes/enrollments.js';
import placementRoutes from './routes/placementRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import lectureRoutes from './routes/lectureRoutes.js';
import progressRoutes from './routes/progressRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://paarshelearningweb.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("🌐 Request Origin:", origin);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

// serve uploads everything
app.use('/uploads', express.static(path.resolve('uploads')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/progress', progressRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(5000, () =>
    console.log('🚀 Server running at http://localhost:5000')
  );
});
