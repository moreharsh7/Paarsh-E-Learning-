// In your frontend placementApi.js
const API_BASE_URL = 'https://paarsh-e-learning-p.onrender.com/api';

// Get placement data for a student and course
export const getPlacementData = async (studentId, courseId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No token found, using default data');
      return getDefaultPlacementData();
    }

    console.log(`📊 Fetching placement data for student: ${studentId}, course: ${courseId}`);

    const response = await fetch(`${API_BASE_URL}/placements/${studentId}/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ Placement data fetch failed: ${response.status}`);
      return getDefaultPlacementData();
    }

    const result = await response.json();
    console.log('✅ Placement data received:', result);
    return result;
  } catch (error) {
    console.error('❌ Error fetching placement data:', error);
    return getDefaultPlacementData();
  }
};
// Add this function in placementApi.js
const getDefaultPlacementData = () => {
  return {
    studentId: '',
    courseId: '',
    totalCallsAllowed: 0,
    callsUsed: 0,
    currentStatus: 'not_started',
    interviews: [],
    companies: [],
    jobOpportunities: []
  };
};

// Get interviews for student in course - THIS MATCHES
export const getInterviewsForStudent = async (studentId, courseId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No token found, returning default interviews');
      return getDefaultInterviews();
    }

    console.log(`📅 Fetching interviews for student: ${studentId}, course: ${courseId}`);

    const response = await fetch(`${API_BASE_URL}/placements/interviews/student/${studentId}/course/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ Interviews fetch failed: ${response.status}`);
      return getDefaultInterviews();
    }

    const result = await response.json();
    console.log(`✅ Fetched ${result.length} interviews`);
    return result;
  } catch (error) {
    console.error('❌ Error fetching interviews:', error);
    return getDefaultInterviews();
  }
};

// Get companies for course - THIS MATCHES
export const getCompaniesForCourse = async (courseId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No token found, returning default companies');
      return getDefaultCompanies();
    }

    console.log(`🏢 Fetching companies for course: ${courseId}`);

    const response = await fetch(`${API_BASE_URL}/placements/companies/course/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ Companies fetch failed: ${response.status}`);
      return getDefaultCompanies();
    }

    const result = await response.json();
    console.log(`✅ Fetched ${result.length} companies`);
    return result;
  } catch (error) {
    console.error('❌ Error fetching companies:', error);
    return getDefaultCompanies();
  }
};

// Get job opportunities - USE JOBS API INSTEAD
export const getJobOpportunities = async (courseId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No token found, returning default job opportunities');
      return getDefaultJobOpportunities();
    }

    console.log(`💼 Fetching job opportunities for course: ${courseId}`);

    // Use jobs API with course category
    const response = await fetch(`${API_BASE_URL}/jobs?category=${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ Job opportunities fetch failed: ${response.status}`);
      return getDefaultJobOpportunities();
    }

    const result = await response.json();
    console.log(`✅ Fetched ${result.length} job opportunities`);
    return result;
  } catch (error) {
    console.error('❌ Error fetching job opportunities:', error);
    return getDefaultJobOpportunities();
  }
};

// Get student applications - USE JOBS API
export const getStudentApplications = async (studentId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No token found, returning default applications');
      return getDefaultApplications();
    }

    console.log(`📋 Fetching applications for student: ${studentId}`);

    const response = await fetch(`${API_BASE_URL}/jobs/student/${studentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ Applications fetch failed: ${response.status}`);
      return getDefaultApplications();
    }

    const result = await response.json();
    console.log(`✅ Fetched ${result.length} applications`);
    return result;
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    return getDefaultApplications();
  }
};

// Get student offers - USE JOBS API
export const getStudentOffers = async (studentId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No token found, returning default offers');
      return getDefaultOffers();
    }

    console.log(`🏆 Fetching offers for student: ${studentId}`);

    const response = await fetch(`${API_BASE_URL}/jobs/offers/student/${studentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ Offers fetch failed: ${response.status}`);
      return getDefaultOffers();
    }

    const result = await response.json();
    console.log(`✅ Fetched ${result.length} offers`);
    return result;
  } catch (error) {
    console.error('❌ Error fetching offers:', error);
    return getDefaultOffers();
  }
};

// Apply for job - USE JOBS API
export const applyForJob = async (jobId, studentId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to apply for jobs');
    }

    console.log(`📝 Applying for job: ${jobId}`);

    const response = await fetch(`${API_BASE_URL}/jobs/apply`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ jobId, studentId })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to apply for job');
    }

    const data = await response.json();
    console.log('✅ Job application submitted:', data);
    return data;
  } catch (error) {
    console.error('❌ Error applying for job:', error);
    throw error;
  }
};

// Schedule mock interview - USE PLACEMENTS API
export const scheduleMockInterview = async (studentId, courseId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to schedule interviews');
    }

    console.log(`📅 Scheduling mock interview for student: ${studentId}, course: ${courseId}`);

    const response = await fetch(`${API_BASE_URL}/placements/mock-interview`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ studentId, courseId })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to schedule mock interview');
    }

    const data = await response.json();
    console.log('✅ Mock interview scheduled:', data);
    return data;
  } catch (error) {
    console.error('❌ Error scheduling mock interview:', error);
    throw error;
  }
};
