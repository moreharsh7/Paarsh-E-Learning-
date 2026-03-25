import React, { useState, useEffect } from 'react';
import {
  Briefcase, Building, MapPin, Calendar, DollarSign, CheckCircle,
  Users, TrendingUp, Target, Award, Trophy, Star, Clock, Filter,
  Search, Plus, ChevronRight, ChevronDown, Download, ExternalLink,
  Mail, Phone, Linkedin, MessageCircle, Video, FileText, Eye,
  Share2, Bookmark, ThumbsUp, Award as AwardIcon, Trophy as TrophyIcon,
  Star as StarIcon, Users as UsersIcon, Target as TargetIcon,
  Building as BuildingIcon, MapPin as MapPinIcon, Calendar as CalendarIcon,
  CheckCircle as CheckCircleIcon, TrendingUp as TrendingUpIcon,
  Download as DownloadIcon, ExternalLink as ExternalLinkIcon,
  Mail as MailIcon, Phone as PhoneIcon, Video as VideoIcon,
  MessageCircle as MessageCircleIcon, FileText as FileTextIcon
} from 'lucide-react';

// Correct imports
import { getMyCourses } from '../services/api';
import { 
  getPlacementData, 
  getInterviewsForStudent,
  getCompaniesForCourse,
  getJobOpportunities,
  getStudentApplications,
  getStudentOffers,
  getStudentEnrollments,
  applyForJob,
  scheduleMockInterview
} from '../services/placementApi';

const PlacementsPage = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Dynamic data states
  const [placementStats, setPlacementStats] = useState([
    { label: 'Placement Rate', value: '92%', icon: TrendingUp, color: 'text-[#14BDEE]', bg: 'bg-[#ECFEFF]' },
    { label: 'Average Salary', value: '₹12 LPA', icon: DollarSign, color: 'text-[#5BD1D7]', bg: 'bg-[#ECFEFF]' },
    { label: 'Companies Visited', value: '50+', icon: Building, color: 'text-[#14BDEE]', bg: 'bg-[#ECFEFF]' },
    { label: 'Students Placed', value: '240+', icon: Users, color: 'text-[#5BD1D7]', bg: 'bg-[#ECFEFF]' }
  ]);
  
  const [jobOpportunities, setJobOpportunities] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [offers, setOffers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [placementDetails, setPlacementDetails] = useState({
    totalCallsAllowed: 4,
    callsUsed: 0,
    currentStatus: 'not_started'
  });

  // Tabs with dynamic counts
  const [tabs, setTabs] = useState([
    { id: 'opportunities', label: 'Job Opportunities', count: 0 },
    { id: 'applications', label: 'My Applications', count: 0 },
    { id: 'interviews', label: 'Interviews', count: 0 },
    { id: 'offers', label: 'Offers', count: 0 },
    { id: 'companies', label: 'Companies', count: 0 },
    { id: 'preparation', label: 'Preparation' }
  ]);

  // Update tab counts when data changes
  useEffect(() => {
    const updatedTabs = tabs.map(tab => {
      switch(tab.id) {
        case 'opportunities':
          return { ...tab, count: jobOpportunities.length };
        case 'applications':
          return { ...tab, count: myApplications.length };
        case 'interviews':
          return { ...tab, count: interviews.length };
        case 'offers':
          return { ...tab, count: offers.length };
        case 'companies':
          return { ...tab, count: companies.length };
        default:
          return tab;
      }
    });
    setTabs(updatedTabs);
  }, [jobOpportunities, myApplications, interviews, offers, companies]);

  useEffect(() => {
    fetchUserData();
    fetchEnrolledCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchPlacementData();
    }
  }, [selectedCourse]);

  const fetchUserData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserData(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const courses = await getMyCourses();
      setEnrolledCourses(courses);
      if (courses.length > 0) {
        setSelectedCourse(courses[0]);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

// In fetchPlacementData function, add better error handling
const fetchPlacementData = async () => {
  if (!selectedCourse || !userData) return;

  try {
    setLoading(true);

    const studentId = userData._id || userData.id;
    const courseId = selectedCourse._id;

    console.log("📦 Fetching placement data for:", { studentId, courseId });

    // Fetch placement data using studentId and courseId
    const placementData = await getPlacementData(studentId, courseId);
    setPlacementDetails(placementData);

    // Fetch other data in parallel
    const [
      interviewsData,
      companiesData,
      jobsData,
      applicationsData,
      offersData
    ] = await Promise.all([
      getInterviewsForStudent(studentId, courseId),
      getCompaniesForCourse(courseId),
      getJobOpportunities(courseId),
      getStudentApplications(studentId),
      getStudentOffers(studentId)
    ]);

    setInterviews(interviewsData || []);
    setCompanies(companiesData || []);
    setJobOpportunities(jobsData || []);
    setMyApplications(applicationsData || []);
    setOffers(offersData || []);

    // Update stats
    updatePlacementStats(placementData, companiesData?.length || 0);

  } catch (err) {
    console.error("❌ Placement fetch error:", err);
    // Set default data on error
    setPlacementDetails({
      totalCallsAllowed: 4,
      callsUsed: 0,
      currentStatus: 'not_started'
    });
    setInterviews([]);
    setCompanies([]);
    setJobOpportunities([]);
    setMyApplications([]);
    setOffers([]);
    updatePlacementStats({}, 0);
  } finally {
    setLoading(false);
  }
};



  const updatePlacementStats = (placementData, companyCount) => {
    const stats = [
      { 
        label: 'Interviews Left', 
        value: `${placementData.totalCallsAllowed - placementData.callsUsed}`, 
        icon: TrendingUp, 
        color: 'text-[#14BDEE]', 
        bg: 'bg-[#ECFEFF]' 
      },
      { 
        label: 'Average Salary', 
        value: getAverageSalaryForCourse(selectedCourse?.title), 
        icon: DollarSign, 
        color: 'text-[#5BD1D7]', 
        bg: 'bg-[#ECFEFF]' 
      },
      { 
        label: 'Companies Available', 
        value: `${companyCount}+`, 
        icon: Building, 
        color: 'text-[#14BDEE]', 
        bg: 'bg-[#ECFEFF]' 
      },
      { 
        label: 'Status', 
        value: formatStatus(placementData.currentStatus), 
        icon: Users, 
        color: 'text-[#5BD1D7]', 
        bg: 'bg-[#ECFEFF]' 
      }
    ];
    setPlacementStats(stats);
  };

  const getAverageSalaryForCourse = (courseTitle) => {
    const salaryMap = {
      'Full Stack Development': '₹12-18 LPA',
      'Frontend Development': '₹8-15 LPA',
      'Backend Development': '₹10-20 LPA',
      'UI/UX Design': '₹6-12 LPA',
      'Data Science': '₹15-25 LPA',
      'default': '₹10-15 LPA'
    };
    
    if (!courseTitle) return salaryMap.default;
    
    for (const [key, value] of Object.entries(salaryMap)) {
      if (courseTitle.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    return salaryMap.default;
  };

  const formatStatus = (status) => {
    const statusMap = {
      'not_started': 'Not Started',
      'in_process': 'In Process',
      'placed': 'Placed',
      'closed': 'Closed'
    };
    return statusMap[status] || status;
  };

  const handleApplyJob = async (jobId) => {
    try {
      await applyForJob(jobId, userData._id || userData.id);
      alert('Application submitted successfully!');
      // Refresh applications list
      const applicationsData = await getStudentApplications(userData._id || userData.id);
      setMyApplications(applicationsData);
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to apply for job');
    }
  };

  const handleScheduleMockInterview = async () => {
    try {
      await scheduleMockInterview(userData._id || userData.id, selectedCourse._id);
      alert('Mock interview scheduled! Check your email for details.');
      // Refresh interview list
      const interviewsData = await getInterviewsForStudent(
        userData._id || userData.id, 
        selectedCourse._id
      );
      setInterviews(interviewsData);
    } catch (error) {
      console.error('Error scheduling mock interview:', error);
    }
  };

  const StatusBadge = ({ status }) => {
    const config = {
      active: { bg: 'bg-[#ECFEFF]', text: 'text-[#14BDEE]', label: 'Active' },
      'under review': { bg: 'bg-[#ECFEFF]', text: 'text-[#5BD1D7]', label: 'Under Review' },
      'interview scheduled': { bg: 'bg-[#EFF6FF]', text: 'text-[#14BDEE]', label: 'Interview Scheduled' },
      'offer received': { bg: 'bg-[#ECFEFF]', text: 'text-[#5BD1D7]', label: 'Offer Received' },
      accepted: { bg: 'bg-[#ECFEFF]', text: 'text-[#5BD1D7]', label: 'Accepted' },
      scheduled: { bg: 'bg-[#EFF6FF]', text: 'text-[#14BDEE]', label: 'Scheduled' },
      'not_started': { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Not Started' },
      'in_process': { bg: 'bg-blue-100', text: 'text-blue-600', label: 'In Process' },
      placed: { bg: 'bg-green-100', text: 'text-green-600', label: 'Placed' },
      closed: { bg: 'bg-red-100', text: 'text-red-600', label: 'Closed' },
      'applied': { bg: 'bg-yellow-100', text: 'text-yellow-600', label: 'Applied' },
      'shortlisted': { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Shortlisted' },
      'rejected': { bg: 'bg-red-100', text: 'text-red-600', label: 'Rejected' }
    };
    const { bg, text, label } = config[status.toLowerCase()] || config.active;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${bg} ${text}`}>
        {label}
      </span>
    );
  };

  const SkillTag = ({ skill }) => (
    <span className="px-2 py-1 bg-[#EFF6FF] text-[#384158] text-xs rounded">
      {skill}
    </span>
  );

  const JobCard = ({ job }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow hover:border-[#14BDEE]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={job.status || 'active'} />
            <span className="text-sm text-[#76777A]">{job.posted || 'Recently'}</span>
          </div>
          <h3 className="text-lg font-bold text-[#384158] mb-1">{job.title}</h3>
          <div className="flex items-center gap-3 text-sm text-[#76777A] mb-3">
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              {job.company}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {job.type}
            </div>
          </div>
          <p className="text-sm text-[#76777A] mb-4">{job.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {(job.skills || ['React', 'JavaScript', 'Node.js']).map((skill, idx) => (
              <SkillTag key={idx} skill={skill} />
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="font-bold text-[#384158]">{job.salary || '₹8-15 LPA'}</div>
              <div className="text-sm text-[#76777A]">Exp: {job.experience || '1-3 years'}</div>
              <div className="text-sm text-[#76777A]">Apply by: {job.deadline || 'Open'}</div>
            </div>
            <button 
              onClick={() => handleApplyJob(job._id || job.id)}
              className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ApplicationCard = ({ application }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#14BDEE] transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={application.status} />
            <span className="text-sm text-[#76777A]">
              Applied: {new Date(application.appliedAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
          <h4 className="font-bold text-[#384158] text-lg">{application.jobTitle}</h4>
          <div className="text-sm text-[#76777A] mb-3">{application.company}</div>
          <div className="text-sm text-[#384158] mb-2">
            <span className="font-medium">Next Step:</span> {application.nextStep || 'Under Review'}
          </div>
          <div className="text-sm text-[#14BDEE]">
            {application.timeline || 'Update pending'}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
            View Details
          </button>
          {application.status === 'Interview Scheduled' && (
            <button className="px-3 py-1 text-sm bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
              Join Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const InterviewCard = ({ interview }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#14BDEE] transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={interview.status} />
            <span className="text-sm font-medium text-[#384158]">
              Interview #{interview.interviewNo} of {placementDetails.totalCallsAllowed}
            </span>
          </div>
          <h4 className="font-bold text-[#384158] text-lg">{interview.role || 'Developer Role'}</h4>
          <div className="text-sm text-[#76777A] mb-3">{interview.company?.name || 'Company'}</div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-xs text-[#76777A]">Date & Time</div>
              <div className="text-sm font-medium text-[#384158]">
                {new Date(interview.scheduledAt || Date.now()).toLocaleDateString()}, {new Date(interview.scheduledAt || Date.now()).toLocaleTimeString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#76777A]">Mode</div>
              <div className="text-sm font-medium text-[#384158]">{interview.mode || 'Video Call'}</div>
            </div>
            <div>
              <div className="text-xs text-[#76777A]">Meeting Link</div>
              <div className="text-sm font-medium text-[#384158] truncate">
                {interview.meetingLink ? (
                  <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer" className="text-[#14BDEE] hover:underline">
                    Join Meeting
                  </a>
                ) : (
                  'Link not available'
                )}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#76777A]">Interviewer</div>
              <div className="text-sm font-medium text-[#384158]">{interview.interviewer || 'HR Manager'}</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {interview.meetingLink ? (
              <a
                href={interview.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors"
              >
                Join Interview
              </a>
            ) : (
              <button className="px-3 py-1 text-sm bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">
                Link Not Available
              </button>
            )}
            <button className="px-3 py-1 text-sm border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const OfferCard = ({ offer }) => (
    <div className="bg-gradient-to-r from-[#ECFEFF] to-[#EFF6FF] border border-[#5BD1D7] rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-[#5BD1D7]" />
            <StatusBadge status={offer.status || 'pending'} />
          </div>
          <h4 className="text-xl font-bold text-[#384158] mb-2">{offer.role || 'Software Developer'}</h4>
          <div className="text-lg text-[#76777A] mb-4">{offer.company || 'Company'}</div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-[#76777A]">Annual Salary</div>
              <div className="text-2xl font-bold text-[#384158]">{offer.salary || '₹12 LPA'}</div>
            </div>
            <div>
              <div className="text-sm text-[#76777A]">Joining Date</div>
              <div className="text-lg font-medium text-[#384158]">
                {offer.joiningDate || 'To be decided'}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mb-4">
            {(offer.benefits || ['Health Insurance', 'WFH Options', 'Paid Leave']).map((benefit, idx) => (
              <span key={idx} className="px-3 py-1 bg-white text-[#5BD1D7] text-sm rounded-full border border-[#5BD1D7]">
                {benefit}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="px-4 py-2 bg-[#5BD1D7] text-white rounded-lg hover:bg-[#4ABCC2] transition-colors">
            Accept Offer
          </button>
          <button className="px-4 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
            Negotiate Terms
          </button>
        </div>
      </div>
    </div>
  );

  const filteredJobs = jobOpportunities.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ((job.skills || []).some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8 bg-[#EFF6FF] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14BDEE] mx-auto"></div>
          <p className="mt-4 text-[#384158]">Loading placement data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6 bg-[#EFF6FF] min-h-screen">
      {/* Header with Course Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#384158]">Placements</h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-[#76777A]">Job opportunities, interviews, and placement support for</p>
            <select
              value={selectedCourse?._id || ''}
              onChange={(e) => {
                const course = enrolledCourses.find(c => c._id === e.target.value);
                setSelectedCourse(course);
              }}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE]"
            >
              {enrolledCourses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-[#76777A]">Interviews Used</div>
            <div className="text-lg font-bold text-[#14BDEE]">
              {placementDetails.callsUsed} / {placementDetails.totalCallsAllowed}
            </div>
          </div>
          <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upload Resume
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {placementStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-[#ECFEFF]">
              <div className="flex items-center gap-3">
                <div className={`p-3 ${stat.bg} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#384158]">{stat.value}</div>
                  <div className="text-sm text-[#76777A]">{stat.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-[#14BDEE] border-b-2 border-[#14BDEE]'
                    : 'text-[#76777A] hover:text-[#384158]'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-[#ECFEFF] text-[#14BDEE]'
                      : 'bg-[#EFF6FF] text-[#76777A]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#76777A]" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                />
              </div>
              <button className="px-3 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Jobs
              </button>
              <button className="px-4 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Profile
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'opportunities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#384158]">
                  Job Opportunities for {selectedCourse?.title}
                </h3>
                <div className="text-sm text-[#76777A]">
                  Showing {filteredJobs.length} jobs
                </div>
              </div>
              <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <JobCard key={job._id} job={job} />
                  ))
                ) : (
                  <div className="text-center py-8 text-[#76777A]">
                    No job opportunities found for this course. Check back later!
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#384158]">My Applications</h3>
              <div className="space-y-4">
                {myApplications.length > 0 ? (
                  myApplications.map(application => (
                    <ApplicationCard key={application._id} application={application} />
                  ))
                ) : (
                  <div className="text-center py-8 text-[#76777A]">
                    You haven't applied to any jobs yet. Browse opportunities and apply!
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'interviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#384158]">Interview Schedule</h3>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-[#76777A]">
                    Interviews left: {placementDetails.totalCallsAllowed - placementDetails.callsUsed}
                  </div>
                  <button 
                    onClick={handleScheduleMockInterview}
                    className="px-3 py-1 text-sm bg-[#5BD1D7] text-white rounded-lg hover:bg-[#4ABCC2] transition-colors"
                  >
                    Schedule Mock Interview
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {interviews.length > 0 ? (
                  interviews.map(interview => (
                    <InterviewCard key={interview._id} interview={interview} />
                  ))
                ) : (
                  <div className="text-center py-8 text-[#76777A]">
                    No interviews scheduled yet. Apply to jobs to get interview calls!
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#384158]">Job Offers</h3>
              <div className="space-y-4">
                {offers.length > 0 ? (
                  offers.map(offer => (
                    <OfferCard key={offer._id} offer={offer} />
                  ))
                ) : (
                  <div className="text-center py-8 text-[#76777A]">
                    No job offers yet. Keep applying and preparing for interviews!
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'companies' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#384158]">
                Companies Hiring for {selectedCourse?.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companies.length > 0 ? (
                  companies.map(company => (
                    <div key={company._id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#14BDEE] transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#ECFEFF] rounded-lg flex items-center justify-center text-[#14BDEE] font-bold">
                            {company.name?.substring(0, 2).toUpperCase() || 'CO'}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#384158]">{company.name}</h4>
                            <div className="text-sm text-[#76777A] mb-2">{company.industry}</div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-[#76777A]" />
                                <span className="text-sm text-[#384158]">{company.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4 text-[#76777A]" />
                                <span className="text-sm text-[#384158] truncate max-w-[150px]">{company.hrEmail}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="px-3 py-1 text-sm border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
                          View Jobs
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-[#76777A]">
                    No companies available for this course yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'preparation' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#384158]">
                Placement Preparation for {selectedCourse?.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-[#384158]">Course-Specific Resources</h4>
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#14BDEE] transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-[#384158]">
                            {selectedCourse?.title} Interview Questions
                          </div>
                          <div className="text-sm text-[#76777A] mt-1">Question Bank</div>
                          <div className="text-sm text-[#76777A] mt-2">
                            100+ curated questions
                          </div>
                        </div>
                        <button className="px-3 py-1 text-sm bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
                          Access
                        </button>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#14BDEE] transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-[#384158]">
                            Technical Assessment
                          </div>
                          <div className="text-sm text-[#76777A] mt-1">Test Series</div>
                          <div className="text-sm text-[#76777A] mt-2">
                            5 mock tests available
                          </div>
                        </div>
                        <button className="px-3 py-1 text-sm bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
                          Start Test
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-[#384158]">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full p-4 bg-white border border-gray-200 rounded-lg text-left hover:bg-[#EFF6FF] hover:border-[#14BDEE] transition-colors flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#14BDEE]" />
                      <div>
                        <div className="font-medium text-[#384158]">Update Resume</div>
                        <div className="text-sm text-[#76777A]">Upload latest version</div>
                      </div>
                    </button>
                    <button 
                      onClick={handleScheduleMockInterview}
                      className="w-full p-4 bg-white border border-gray-200 rounded-lg text-left hover:bg-[#EFF6FF] hover:border-[#14BDEE] transition-colors flex items-center gap-3"
                    >
                      <Video className="w-5 h-5 text-[#5BD1D7]" />
                      <div>
                        <div className="font-medium text-[#384158]">Mock Interview</div>
                        <div className="text-sm text-[#76777A]">Practice with expert</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-[#ECFEFF] rounded-xl p-6 border border-[#EFF6FF]">
        <h3 className="font-semibold text-[#384158] mb-4">Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 hover:border-[#14BDEE] border border-gray-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#60A5FA] to-[#14BDEE] rounded-full flex items-center justify-center text-white font-bold">
                RS
              </div>
              <div>
                <div className="font-medium text-[#384158]">Rahul Sharma</div>
                <div className="text-sm text-[#76777A]">Google, ₹25 LPA</div>
              </div>
            </div>
            <p className="text-sm text-[#76777A] italic">
              "The placement assistance was exceptional. Mock interviews helped me ace the real ones!"
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 hover:border-[#14BDEE] border border-gray-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#60A5FA] to-[#5BD1D7] rounded-full flex items-center justify-center text-white font-bold">
                PM
              </div>
              <div>
                <div className="font-medium text-[#384158]">Priya Mehta</div>
                <div className="text-sm text-[#76777A]">Amazon, ₹22 LPA</div>
              </div>
            </div>
            <p className="text-sm text-[#76777A] italic">
              "Resume building workshops and technical prep sessions were game-changers for me."
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 hover:border-[#14BDEE] border border-gray-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#60A5FA] to-[#14BDEE] rounded-full flex items-center justify-center text-white font-bold">
                AS
              </div>
              <div>
                <div className="font-medium text-[#384158]">Amit Singh</div>
                <div className="text-sm text-[#76777A]">Microsoft, ₹28 LPA</div>
              </div>
            </div>
            <p className="text-sm text-[#76777A] italic">
              "The personalized mentorship and company-specific preparation made all the difference."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementsPage;