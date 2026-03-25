// src/sections/MyCoursesPage.jsx - COMPLETE UPDATED VERSION (FIXED)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Book, PlayCircle, Clock, Calendar, Users, Star, 
  ChevronRight, Filter, Search, ChevronDown, ChevronUp,
  MoreVertical, Video, Award, CheckCircle, AlertCircle,
  Plus, BarChart, Target, TrendingUp, FileText, Folder,
  Code, Database, Server, Smartphone, Palette, Zap, Lock,
  ExternalLink, Heart, MessageCircle, HelpCircle, Upload,
  Edit, Trash2, RefreshCw, Minus, X, Check, Eye, Download,
  BookOpen, GraduationCap, TrendingUp as TrendingUpIcon,
  FileText as FileTextIcon
} from 'lucide-react';
import { getMyCourses, getCourseProgress } from '../services/api';


const MyCoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('progress');
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    completedCourses: 0,
    averageProgress: 0,
    upcomingLiveSessions: 0,
    totalHours: 0
  });

  const filters = [
    { id: 'all', label: 'All Courses', icon: BookOpen },
    { id: 'active', label: 'Active', icon: PlayCircle },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar }
  ];

  const sortOptions = [
    { id: 'progress', label: 'Progress', icon: TrendingUpIcon },
    { id: 'alphabetical', label: 'Alphabetical', icon: FileTextIcon },
    { id: 'recent', label: 'Recent Activity', icon: Clock },
    { id: 'date', label: 'Start Date', icon: Calendar },
    { id: 'rating', label: 'Rating', icon: Star }
  ];

  // Fetch enrolled courses
  useEffect(() => {
    fetchMyCourses(
      
    );
  }, []);

 const fetchMyCourses = async () => {
  setLoading(true);

  try {
    const data = await getMyCourses();

    // 🔥 Fetch REAL progress for each course
    const coursesWithProgress = await Promise.all(
      data.map(async (course) => {
        const progressData = await getCourseProgress(course._id);

        const enrolledAt =
          course.enrolledAt || course.createdAt || new Date().toISOString();

        return {
          ...course,
          _id: course._id || course.courseId || course.id,
          enrollmentId: course.enrollmentId || course._id,
          title: course.title || 'Untitled Course',
          category: course.category || course.categoryName || 'General',
          instructor: course.instructor || { name: 'Expert Instructor' },

          // ✅ REAL PROGRESS FROM SERVER
          progress: progressData.percentage || 0,

          enrolledAt,
          price: course.price || course.fee || 0,
          duration: course.duration || 'Lifetime Access',
          level: course.level || 'Beginner',
          rating: parseFloat(course.rating || 4.5),
          reviews: parseInt(course.reviews || 0),
          studentsEnrolled: parseInt(course.studentsEnrolled || 0),
          shortDescription:
            course.shortDescription || 'Start your learning journey',
          description: course.description || 'No description available',
          features: course.features || ['Course Materials', 'Certificate'],
          certificate: course.certificate ?? true,
          thumbnail: course.thumbnail || '',
          languages: course.languages || ['English'],
          tags: course.tags || []
        };
      })
    );

    setCourses(coursesWithProgress);
    setFilteredCourses(coursesWithProgress);
    calculateStats(coursesWithProgress);

  } catch (err) {
    console.error(err);
    setError('Failed to load your courses. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const getSampleData = () => {
    return [
      {
        _id: '1',
        enrollmentId: 'enroll_1',
        title: 'Data Analytics Masterclass',
        category: 'Data Science',
        instructor: { name: 'Prof. A.N. Gharu', designation: 'Data Scientist' },
        progress: 75,
        enrolledAt: '2024-01-15T10:30:00.000Z',
        price: 4999,
        duration: '8 weeks',
        level: 'Intermediate',
        rating: 4.7,
        reviews: 234,
        studentsEnrolled: 3456,
        shortDescription: 'Master data analysis with Excel, SQL, Python and Power BI',
        description: 'Comprehensive course covering data analytics from basics to advanced techniques.',
        features: ['Excel', 'SQL', 'Python', 'Power BI', 'Data Visualization', 'Real Projects'],
        certificate: true,
        thumbnail: '',
        languages: ['English', 'Hindi'],
        tags: ['Data', 'Analytics', 'Excel', 'SQL']
      },
      {
        _id: '2',
        enrollmentId: 'enroll_2',
        title: 'Full Stack Web Development',
        category: 'Web Development',
        instructor: { name: 'Prof. Vandana Pawar', designation: 'Senior Developer' },
        progress: 30,
        enrolledAt: '2024-02-10T14:20:00.000Z',
        price: 8999,
        duration: '12 weeks',
        level: 'Beginner',
        rating: 4.9,
        reviews: 567,
        studentsEnrolled: 7890,
        shortDescription: 'Learn to build complete web applications from scratch',
        description: 'Full stack web development course covering frontend and backend technologies.',
        features: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Deployment'],
        certificate: true,
        thumbnail: '',
        languages: ['English'],
        tags: ['Web', 'Development', 'Full Stack', 'JavaScript']
      },
      {
        _id: '3',
        enrollmentId: 'enroll_3',
        title: 'Artificial Intelligence Fundamentals',
        category: 'AI & Machine Learning',
        instructor: { name: 'Prof. Vandana Pawar', designation: 'AI Researcher' },
        progress: 100,
        enrolledAt: '2024-01-05T09:15:00.000Z',
        price: 11999,
        duration: '16 weeks',
        level: 'Advanced',
        rating: 4.8,
        reviews: 456,
        studentsEnrolled: 5678,
        shortDescription: 'Master core concepts of AI and Machine Learning',
        description: 'Comprehensive AI course covering machine learning, neural networks, and deep learning.',
        features: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'TensorFlow', 'Projects'],
        certificate: true,
        thumbnail: '',
        languages: ['English'],
        tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow']
      },
      {
        _id: '4',
        enrollmentId: 'enroll_4',
        title: 'Generative AI & LLMs',
        category: 'AI & Machine Learning',
        instructor: { name: 'Prof. Vandana Pawar', designation: 'AI Expert' },
        progress: 0,
        enrolledAt: '2024-03-01T11:45:00.000Z',
        price: 14999,
        duration: '10 weeks',
        level: 'Advanced',
        rating: 4.9,
        reviews: 123,
        studentsEnrolled: 2345,
        shortDescription: 'Learn LLMs, prompt engineering, and AI applications',
        description: 'Advanced course on Generative AI, Large Language Models and practical applications.',
        features: ['LLMs', 'Prompt Engineering', 'AI Applications', 'Ethics in AI', 'Real Projects'],
        certificate: true,
        thumbnail: '',
        languages: ['English'],
        tags: ['Generative AI', 'LLM', 'ChatGPT', 'Prompt Engineering']
      }
    ];
  };

  const calculateStats = (coursesData) => {
    const totalCourses = coursesData.length;
    const activeCourses = coursesData.filter(c => c.progress < 100 && c.progress > 0).length;
    const completedCourses = coursesData.filter(c => c.progress === 100).length;
    const averageProgress = totalCourses > 0 
      ? Math.round(coursesData.reduce((sum, c) => sum + (c.progress || 0), 0) / totalCourses)
      : 0;
    
    // Calculate total estimated hours
    const totalHours = coursesData.reduce((sum, course) => {
      const duration = course.duration || '';
      const weeksMatch = duration.match(/(\d+)\s*weeks?/i);
      const hoursMatch = duration.match(/(\d+)\s*hours?/i);
      
      if (weeksMatch) {
        return sum + (parseInt(weeksMatch[1]) * 10); // 10 hours per week estimate
      } else if (hoursMatch) {
        return sum + parseInt(hoursMatch[1]);
      }
      return sum + 40; // Default 40 hours per course
    }, 0);
    
    setStats({
      totalCourses,
      activeCourses,
      completedCourses,
      averageProgress,
      upcomingLiveSessions: 2, // Static for now
      totalHours
    });
  };

  // Filter and sort courses
  useEffect(() => {
    let result = [...courses];

    // Filter by status
    if (activeFilter !== 'all') {
      if (activeFilter === 'active') {
        result = result.filter(course => course.progress < 100 && course.progress > 0);
      } else if (activeFilter === 'completed') {
        result = result.filter(course => course.progress === 100);
      } else if (activeFilter === 'upcoming') {
        result = result.filter(course => course.progress === 0);
      }
    }

    // Filter by search
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      result = result.filter(course =>
        course.title.toLowerCase().includes(term) ||
        (course.category && course.category.toLowerCase().includes(term)) ||
        (course.instructor?.name && course.instructor.name.toLowerCase().includes(term)) ||
        (course.shortDescription && course.shortDescription.toLowerCase().includes(term)) ||
        (course.tags && course.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }

    // Sort courses
    switch (sortBy) {
      case 'progress':
        result.sort((a, b) => b.progress - a.progress);
        break;
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
        result.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt));
        break;
      case 'date':
        result.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        result.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt));
    }

    setFilteredCourses(result);
  }, [activeFilter, searchQuery, sortBy, courses]);

  const formatPrice = (price) => {
    const amount = parseFloat(price) || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getCourseIcon = (category) => {
    const iconMap = {
      'Data Science': BarChart,
      'Data Analytics': BarChart,
      'Web Development': Code,
      'Development': Code,
      'AI & Machine Learning': Zap,
      'AI': Zap,
      'Machine Learning': Zap,
      'Mobile Development': Smartphone,
      'Design': Palette,
      'UI/UX Design': Palette,
      'DevOps': Server,
      'Marketing': TrendingUp,
      'Security': Lock,
      'Database': Database,
      'General': BookOpen
    };
    return iconMap[category] || BookOpen;
  };

  const getCourseColor = (category) => {
    const colorMap = {
      'Data Science': 'from-[#14BDEE] to-[#60A5FA]',
      'Data Analytics': 'from-[#14BDEE] to-[#60A5FA]',
      'Web Development': 'from-[#5BD1D7] to-[#14BDEE]',
      'Development': 'from-[#5BD1D7] to-[#14BDEE]',
      'AI & Machine Learning': 'from-[#9C27B0] to-[#673AB7]',
      'AI': 'from-[#9C27B0] to-[#673AB7]',
      'Machine Learning': 'from-[#9C27B0] to-[#673AB7]',
      'Mobile Development': 'from-[#FFA726] to-[#FF9800]',
      'Design': 'from-[#60A5FA] to-[#5BD1D7]',
      'UI/UX Design': 'from-[#60A5FA] to-[#5BD1D7]',
      'DevOps': 'from-[#14BDEE] to-[#5BD1D7]',
      'Marketing': 'from-[#FFA726] to-[#FF9800]',
      'Security': 'from-[#F44336] to-[#E53935]',
      'Database': 'from-[#60A5FA] to-[#14BDEE]',
      'General': 'from-[#14BDEE] to-[#60A5FA]'
    };
    return colorMap[category] || 'from-[#14BDEE] to-[#60A5FA]';
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 50) return 'bg-blue-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const getProgressText = (progress) => {
    if (progress === 100) return 'Completed';
    if (progress > 0) return 'In Progress';
    return 'Not Started';
  };

  const handleStartLearning = (courseId) => {
    navigate(`/course/${courseId}/learn`);
  };

  const handleRetry = () => {
    setError('');
    fetchMyCourses();
  };

  const handleClearFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-[#14BDEE] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 text-[#384158] font-medium">Loading your courses...</div>
          <p className="text-sm text-[#76777A] mt-2">Fetching your learning journey</p>
        </div>
      </div>
    );
  }

  if (error && courses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <div className="text-red-600 font-medium mb-2">{error}</div>
          <p className="text-gray-500 mb-6">Please check your connection and try again</p>
          <button 
            onClick={handleRetry}
            className="px-6 py-2.5 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#14BDEE]/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-[#14BDEE]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#384158]">My Courses</h1>
          </div>
          <p className="text-[#76777A]">Manage and track all your enrolled courses</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard?section=buy-courses')}
          className="px-4 py-2.5 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] flex items-center gap-2 transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Enroll New Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Book className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-[#384158]">{stats.totalCourses}</div>
          </div>
          <div className="text-sm text-[#76777A]">Total Courses</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <PlayCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-[#5BD1D7]">{stats.activeCourses}</div>
          </div>
          <div className="text-sm text-[#76777A]">Active</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-[#60A5FA]">{stats.completedCourses}</div>
          </div>
          <div className="text-sm text-[#76777A]">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <TrendingUpIcon className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-2xl font-bold text-[#14BDEE]">{stats.averageProgress}%</div>
          </div>
          <div className="text-sm text-[#76777A]">Avg Progress</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <GraduationCap className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-[#5BD1D7]">92%</div>
          </div>
          <div className="text-sm text-[#76777A]">Avg Grade</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-[#60A5FA]">{stats.totalHours}h</div>
          </div>
          <div className="text-sm text-[#76777A]">Total Hours</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#76777A]" />
              <input
                type="text"
                placeholder="Search courses by title, instructor, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 lg:w-80 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE] appearance-none bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#76777A] pointer-events-none" />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map(filter => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? 'bg-[#14BDEE] text-white shadow-sm'
                      : 'bg-[#EFF6FF] text-[#76777A] hover:bg-[#ECFEFF]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Active filters display */}
        {(activeFilter !== 'all' || searchQuery) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {activeFilter !== 'all' && (
                  <div className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
                    <span>{filters.find(f => f.id === activeFilter)?.label}</span>
                    <button 
                      onClick={() => setActiveFilter('all')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {searchQuery && (
                  <div className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2">
                    <span>Search: "{searchQuery}"</span>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium ml-2"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#384158]">My Learning Journey</h2>
          <p className="text-sm text-[#76777A]">
            {filteredCourses.length === courses.length 
              ? `All your enrolled courses (${courses.length})` 
              : `Showing ${filteredCourses.length} of ${courses.length} courses`
            }
          </p>
        </div>
        <div className="text-sm text-[#76777A]">
          Overall progress: <span className="font-bold text-[#14BDEE]">{stats.averageProgress}%</span>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map(course => {
            const isExpanded = expandedCourse === course.enrollmentId;
            const Icon = getCourseIcon(course.category);
            const colorClass = getCourseColor(course.category);
            const progressColor = getProgressColor(course.progress);
            const progressText = getProgressText(course.progress);
            
            return (
              <div 
                key={course.enrollmentId} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Course Header with Gradient */}
                <div className={`relative bg-gradient-to-r ${colorClass} p-6 text-white`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${progressColor} text-white`}>
                            {progressText}
                          </span>
                          <h3 className="text-xl font-bold mt-2">{course.title}</h3>
                          <p className="text-sm opacity-90 mt-1">
                            {course.category} • Enrolled: {formatDate(course.enrolledAt)}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setExpandedCourse(isExpanded ? null : course.enrollmentId)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-white" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Your Progress</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-700 ${progressColor}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Start Learning</span>
                        <span>Complete Course</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Body */}
                <div className="p-6">
                  {/* Course Description */}
                  <p className="text-[#76777A] mb-4 line-clamp-2">
                    {course.shortDescription || course.description || 'No description available'}
                  </p>
                  
                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-[#384158]">{course.level}</div>
                      <div className="text-xs text-[#76777A]">Level</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-[#384158]">{course.duration}</div>
                      <div className="text-xs text-[#76777A]">Duration</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-[#384158]">
                        {course.studentsEnrolled?.toLocaleString() || '0'}
                      </div>
                      <div className="text-xs text-[#76777A]">Enrolled</div>
                    </div>
                  </div>

                  {/* Instructor & Rating */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-[#EFF6FF] rounded-lg">
                    <div>
                      <div className="text-sm text-[#76777A]">Instructor</div>
                      <div className="font-medium text-[#384158]">
                        {course.instructor?.name || 'Expert Instructor'}
                        {course.instructor?.designation && (
                          <span className="text-gray-500 text-sm ml-2">({course.instructor.designation})</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-[#384158]">{course.rating?.toFixed(1)}</span>
                      <span className="text-[#76777A] text-sm">({course.reviews || 0})</span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-[#76777A]">Enrolled On</div>
                      <div className="font-medium text-[#384158]">
                        {formatDate(course.enrolledAt)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[#76777A]">Price Paid</div>
                      <div className="font-medium text-[#384158]">
                        {formatPrice(course.price)}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                      {/* Course Features */}
                      {course.features && course.features.length > 0 && (
                        <div>
                          <h4 className="font-medium text-[#384158] mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Course Includes
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {course.features.map((feature, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-[#EFF6FF] text-[#14BDEE] text-sm rounded-lg">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Completion Status */}
                      {course.progress === 100 && (
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-green-600" />
                            <div className="text-sm font-medium text-green-800">Course Completed!</div>
                          </div>
                          <div className="text-base font-bold text-green-700 mb-1">Congratulations!</div>
                          <div className="text-sm text-green-600">
                            You have successfully completed this course. Your certificate is ready for download.
                          </div>
                        </div>
                      )}

                      {/* Course Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <button className="px-4 py-2.5 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] text-sm font-medium transition-colors">
                          <div className="flex items-center justify-center gap-2">
                            <Award className="w-4 h-4" />
                            View Certificate
                          </div>
                        </button>
                        <button className="px-4 py-2.5 border border-[#14BDEE] text-[#14BDEE] rounded-lg hover:bg-[#EFF6FF] text-sm font-medium transition-colors">
                          <div className="flex items-center justify-center gap-2">
                            <FileText className="w-4 h-4" />
                            Materials
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Primary Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => handleStartLearning(course._id)}
                      className="flex-1 px-4 py-2.5 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] flex items-center justify-center gap-2 transition-colors font-medium"
                    >
                      <PlayCircle className="w-5 h-5" />
                      {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                    </button>
                    <div className="relative group">
                      <button className="p-2.5 border border-gray-300 text-[#76777A] rounded-lg hover:bg-[#EFF6FF] transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download Materials
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-lg flex items-center gap-2 border-t border-gray-200">
                          <Trash2 className="w-4 h-4" />
                          Unenroll
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Book className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-[#384158] mb-2">
            {courses.length === 0 ? 'No courses enrolled yet' : 'No courses found'}
          </h3>
          <p className="text-[#76777A] mb-6 max-w-md mx-auto">
            {courses.length === 0 
              ? 'Start your learning journey by enrolling in courses that match your interests and career goals.'
              : 'Try changing your filters or search term to find what you\'re looking for.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => navigate('/dashboard?section=buy-courses')}
              className="px-6 py-2.5 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] transition-colors font-medium"
            >
              Browse Courses
            </button>
            {courses.length > 0 && (
              <button 
                onClick={handleClearFilters}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Recent Activity Section */}
      {filteredCourses.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-[#EFF6FF]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#384158] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#14BDEE]" />
                Recent Activity
              </h3>
              <button className="text-sm text-[#14BDEE] hover:text-[#0DAAD8] font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-4">
            {filteredCourses.slice(0, 3).map(course => {
              const Icon = getCourseIcon(course.category);
              const colorClass = getCourseColor(course.category);
              
              return (
                <div 
                  key={course._id} 
                  className="flex items-center justify-between p-3 hover:bg-[#EFF6FF] rounded-lg cursor-pointer transition-colors group"
                  onClick={() => handleStartLearning(course._id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-[#384158] group-hover:text-[#14BDEE] transition-colors">
                        {course.title}
                      </div>
                      <div className="text-sm text-[#76777A]">
                        Last accessed: {formatDate(course.enrolledAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium text-[#384158]">{course.progress}%</div>
                      <div className="text-sm text-[#76777A]">Progress</div>
                    </div>
                    <button className="px-3 py-1.5 bg-[#14BDEE] text-white text-sm rounded hover:bg-[#0DAAD8] transition-colors opacity-0 group-hover:opacity-100">
                      Resume
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;