import axios from 'axios';

/* ===================================================
   AXIOS INSTANCE
=================================================== */

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

/* ===================================================
   AUTH TOKEN AUTO ATTACH
=================================================== */

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


/* ===================================================
   ASSIGNMENT SERVICE
=================================================== */

export const assignmentService = {

  /* =============================
     📚 GET ALL ASSIGNMENTS
  ============================= */
  getStudentAssignments: async () => {
    const res = await api.get('/assignments/student');
    return res.data;
  },


  /* =============================
     📄 GET SINGLE SUBMISSION
  ============================= */
  getSubmission: async (assignmentId) => {
    const res = await api.get(`/assignments/${assignmentId}/submission`);
    return res.data;
  },


  /* =============================
     🚀 FINAL SUBMIT
  ============================= */
  submitAssignment: async (assignmentId, data) => {
    const res = await api.post(
      `/assignments/${assignmentId}/submit`,
      data
    );
    return res.data;
  },


  /* =============================
     💾 SAVE DRAFT (NEW ⭐)
  ============================= */
  updateSubmission: async (assignmentId, data, files = []) => {
    // if later you support file upload (FormData)
    if (files.length > 0) {
      const formData = new FormData();

      Object.keys(data).forEach(key =>
        formData.append(key, data[key])
      );

      files.forEach(file =>
        formData.append('files', file)
      );

      const res = await api.put(
        `/assignments/${assignmentId}/draft`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      return res.data;
    }

    // normal JSON draft save
    const res = await api.put(
      `/assignments/${assignmentId}/draft`,
      data
    );

    return res.data;
  },


  /* =============================
     🎓 ENROLLED COURSES
  ============================= */
  getStudentCourses: async () => {
    const res = await api.get('/courses/enrolled/my-courses');
    return res.data;
  },


  /* =============================
     👥 PEER REVIEWS (optional)
  ============================= */
  getPeerReviews: async () => {
    try {
      const res = await api.get('/assignments/peer-reviews');
      return res.data;
    } catch (err) {
      // avoid crash if route not implemented
      console.warn('Peer reviews route not found');
      return [];
    }
  }

};
