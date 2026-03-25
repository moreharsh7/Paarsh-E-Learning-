// src/App.js - UPDATED VERSION
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './StudentDashboard';
import CourseLearningPage from './sections/CourseLearningPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsAuthenticated(true);
    }
    setLoading(false);
    
    // Check if coming from main site
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') === 'main-site') {
      localStorage.setItem('cameFromMainSite', 'true');
    }
  }, []);

  const setAuth = (value) => {
    setIsAuthenticated(value);
    if (!value) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // Custom route wrapper for protected routes
  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    
    if (!isAuthenticated) {
      // Save the intended destination
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        localStorage.setItem('redirectAfterLogin', location.pathname);
      }
      return <Navigate to="/login" />;
    }
    
    return children;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 text-gray-600 font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <LoginPage setAuth={setAuth} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <RegisterPage setAuth={setAuth} />
            } 
          />
          
          {/* Protected Dashboard Route */}
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <StudentDashboard setAuth={setAuth} />
              </ProtectedRoute>
            } 
          />
          
          {/* Course Learning Page Route */}
          <Route 
            path="/course/:courseId/learn" 
            element={
              <ProtectedRoute>
                <CourseLearningPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Route */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Navigate to="/register" />
            } 
          />
          
          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;