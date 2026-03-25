// src/pages/CourseLearningPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, Clock, CheckCircle, Lock, 
  BookOpen, Menu, ChevronRight, Home,
  Video, Users, Calendar, Download,
  ChevronLeft, ChevronDown, X, AlertCircle,
  FileText, BarChart3, Target, Star
} from 'lucide-react';
import { getLecturesByCourse, markLectureAsComplete, getCourseProgress } from '../services/api';

const CourseLearningPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [courseInfo, setCourseInfo] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState({ completed: 0, total: 0, percentage: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    if (courseId) {
      fetchLectures();
      fetchCourseProgress();
    }
  }, [courseId]);

  const fetchLectures = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getLecturesByCourse(courseId);
      
      // Sort lectures by lectureOrder
      const sortedLectures = data.sort((a, b) => a.lectureOrder - b.lectureOrder);
      
      setLectures(sortedLectures);
      
      // Set first lecture as selected if available
      if (sortedLectures.length > 0 && !selectedLecture) {
        setSelectedLecture(sortedLectures[0]);
      }
      
      // If lectures have course info, extract it
      if (data.length > 0 && data[0].course) {
        setCourseInfo(data[0].course);
      }
      
    } catch (error) {
      console.error('Error fetching lectures:', error);
      setError('Failed to load course content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseProgress = async () => {
    try {
      const data = await getCourseProgress(courseId);
      if (data.completedLectures) {
        setCompletedLectures(data.completedLectures);
        setProgress({
          completed: data.completedLectures.length,
          total: data.totalLectures || 0,
          percentage: data.percentage || 0
        });
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleLectureSelect = (lecture) => {
    setSelectedLecture(lecture);
    // Scroll to top when selecting new lecture
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkComplete = async (lectureId) => {
    try {
      await markLectureAsComplete(lectureId);
      
      if (!completedLectures.includes(lectureId)) {
        const updatedCompleted = [...completedLectures, lectureId];
        setCompletedLectures(updatedCompleted);
        
        // Update progress
        const totalLectures = lectures.length;
        const completedCount = updatedCompleted.length;
        const percentage = totalLectures > 0 ? Math.round((completedCount / totalLectures) * 100) : 0;
        
        setProgress({
          completed: completedCount,
          total: totalLectures,
          percentage: percentage
        });
      }
    } catch (error) {
      console.error('Error marking lecture complete:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return '';
    }
  };

  const getNextLecture = () => {
    if (!selectedLecture || lectures.length === 0) return null;
    const currentIndex = lectures.findIndex(l => l._id === selectedLecture._id);
    return currentIndex < lectures.length - 1 ? lectures[currentIndex + 1] : null;
  };

  const getPreviousLecture = () => {
    if (!selectedLecture || lectures.length === 0) return null;
    const currentIndex = lectures.findIndex(l => l._id === selectedLecture._id);
    return currentIndex > 0 ? lectures[currentIndex - 1] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 text-gray-600 font-medium">Loading course content...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Unable to load course</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchLectures}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/dashboard?section=my-courses')}
            className="ml-3 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={() => navigate('/dashboard?section=my-courses')}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-800"
              >
                <Home className="w-4 h-4" />
              </button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">My Courses</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-800 truncate max-w-xs">
                {courseInfo?.title || 'Course Learning'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="text-sm text-gray-600">
                Progress: <span className="font-bold text-blue-600">{progress.percentage}%</span>
              </div>
              <div className="text-xs text-gray-500">
                {progress.completed} of {progress.total} lectures
              </div>
            </div>
            
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Lectures List */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white border-r border-gray-200 overflow-hidden transition-transform duration-300 ease-in-out`}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Course Content
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {lectures.length} lectures • {completedLectures.length} completed
            </p>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-medium text-blue-600">{progress.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="h-[calc(100vh-180px)] overflow-y-auto">
            {lectures.length === 0 ? (
              <div className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No lectures available yet</p>
                <p className="text-sm text-gray-400 mt-1">Check back later for course content</p>
              </div>
            ) : (
              <div className="p-2">
                {lectures.map((lecture, index) => {
                  const isCompleted = completedLectures.includes(lecture._id);
                  const isSelected = selectedLecture?._id === lecture._id;
                  
                  return (
                    <div
                      key={lecture._id}
                      onClick={() => handleLectureSelect(lecture)}
                      className={`p-3 rounded-lg mb-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isSelected
                              ? 'bg-blue-500 text-white'
                              : isCompleted
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span className="text-xs font-medium">{index + 1}</span>
                            )}
                          </div>
                          {lecture.isPreview && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                              Preview
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium text-sm ${
                              isSelected ? 'text-blue-700' : 'text-gray-800'
                            }`}>
                              {lecture.lectureTitle}
                            </h3>
                            {lecture.lectureType === 'live' && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                                Live
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              {lecture.lectureType === 'video' ? (
                                <>
                                  <Video className="w-3 h-3" />
                                  <span>Video</span>
                                </>
                              ) : (
                                <>
                                  <Users className="w-3 h-3" />
                                  <span>Live Class</span>
                                </>
                              )}
                            </div>
                            
                            {lecture.shortDescription && (
                              <>
                                <span className="text-gray-300">•</span>
                                <p className="text-xs text-gray-500 truncate">
                                  {lecture.shortDescription}
                                </p>
                              </>
                            )}
                          </div>
                          
                          {lecture.lectureType === 'live' && lecture.liveClass?.scheduledAt && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(lecture.liveClass.scheduledAt)}</span>
                              <span>at {formatTime(lecture.liveClass.scheduledAt)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Lecture Player */}
        <div className="flex-1">
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {selectedLecture ? (
            <div className="max-w-6xl mx-auto p-4 md:p-6">
              {/* Lecture Header */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {selectedLecture.isPreview && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                          Preview
                        </span>
                      )}
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                        Lecture {selectedLecture.lectureOrder}
                      </span>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedLecture.lectureTitle}
                    </h1>
                    
                    {selectedLecture.shortDescription && (
                      <p className="text-gray-600">
                        {selectedLecture.shortDescription}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {!completedLectures.includes(selectedLecture._id) && (
                      <button
                        onClick={() => handleMarkComplete(selectedLecture._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 flex items-center gap-2 whitespace-nowrap"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark Complete
                      </button>
                    )}
                    
                    {selectedLecture.lectureType === 'video' && selectedLecture.videoUrl && (
                      <a
                        href={selectedLecture.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Video Player or Live Class Info */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                {selectedLecture.lectureType === 'video' ? (
                  selectedLecture.videoUrl ? (
                    <div className="relative aspect-video bg-black">
                      <video
                        key={selectedLecture._id}
                        controls
                        controlsList="nodownload"
                        className="w-full h-full"
                        poster={selectedLecture.thumbnail}
                        onEnded={() => {
                          if (!completedLectures.includes(selectedLecture._id)) {
                            handleMarkComplete(selectedLecture._id);
                          }
                        }}
                      >
                        <source src={selectedLecture.videoUrl} type="video/mp4" />
                        <source src={selectedLecture.videoUrl} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                      
                      {/* Video Controls Overlay */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
                          {selectedLecture.isPreview ? 'Preview Lecture' : 'Full Lecture'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-900 flex flex-col items-center justify-center p-6">
                      <Video className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-gray-300 text-lg mb-2">Video content not available</p>
                      <p className="text-gray-400 text-sm text-center max-w-md">
                        The video for this lecture hasn't been uploaded yet. Please check back later or contact support.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="p-8">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-blue-800">Live Class Session</h3>
                          <p className="text-blue-600">Join the interactive live session</p>
                        </div>
                      </div>
                      
                      {selectedLecture.liveClass ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg">
                              <h4 className="font-medium text-gray-700 mb-2">Scheduled Time</h4>
                              <div className="text-lg font-semibold text-gray-800">
                                {formatDate(selectedLecture.liveClass.scheduledAt)}
                              </div>
                              <div className="text-gray-600">
                                {formatTime(selectedLecture.liveClass.scheduledAt)}
                              </div>
                            </div>
                            
                            {selectedLecture.liveClass.duration && (
                              <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-medium text-gray-700 mb-2">Duration</h4>
                                <p className="text-lg font-semibold text-gray-800">
                                  {selectedLecture.liveClass.duration}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          {selectedLecture.liveClass.meetingLink && (
                            <div className="pt-4 border-t border-blue-200">
                              <a
                                href={selectedLecture.liveClass.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors"
                              >
                                <Play className="w-4 h-4" />
                                Join Live Class
                              </a>
                              <div className="mt-3 space-y-2">
                                <p className="text-sm text-blue-600">
                                  • Link will be active 15 minutes before the scheduled time
                                </p>
                                <p className="text-sm text-blue-600">
                                  • Ensure you have a stable internet connection
                                </p>
                                <p className="text-sm text-blue-600">
                                  • Test your audio and video before joining
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">Live class details are being scheduled.</p>
                          <p className="text-gray-400 text-sm mt-1">
                            Check back later or your email for updates.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Lecture Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {selectedLecture.lectureType === 'video' ? (
                        <Video className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Users className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Lecture Type</h4>
                      <p className="text-gray-800 font-medium">
                        {selectedLecture.lectureType === 'video' ? 'Video Lecture' : 'Live Session'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Last Updated</h4>
                      <p className="text-gray-800 font-medium">
                        {selectedLecture.updatedAt ? formatDate(selectedLecture.updatedAt) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      {completedLectures.includes(selectedLecture._id) ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Status</h4>
                      <p className={`font-medium ${
                        completedLectures.includes(selectedLecture._id) 
                          ? 'text-green-600' 
                          : 'text-gray-800'
                      }`}>
                        {completedLectures.includes(selectedLecture._id) 
                          ? 'Completed' 
                          : selectedLecture.isPreview 
                            ? 'Preview Available' 
                            : 'Not Started'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Additional Resources
                </h3>
                <div className="space-y-3">
                  {selectedLecture.lectureType === 'video' ? (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Download className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Download Video</p>
                          <p className="text-sm text-gray-500">Available in MP4 format</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Lecture Notes</p>
                          <p className="text-sm text-gray-500">Coming soon</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Live Session Recording</p>
                        <p className="text-sm text-gray-500">
                          Recording will be available here after the live session
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => {
                    const prevLecture = getPreviousLecture();
                    if (prevLecture) {
                      setSelectedLecture(prevLecture);
                    }
                  }}
                  disabled={!getPreviousLecture()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Lecture
                </button>
                
                <div className="flex items-center justify-center gap-2">
                  <div className="text-sm text-gray-500">
                    {lectures.findIndex(l => l._id === selectedLecture._id) + 1} of {lectures.length}
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    const nextLecture = getNextLecture();
                    if (nextLecture) {
                      setSelectedLecture(nextLecture);
                    } else {
                      // If no next lecture, mark as complete if not already
                      if (!completedLectures.includes(selectedLecture._id)) {
                        handleMarkComplete(selectedLecture._id);
                      }
                      alert('Congratulations! You have completed all lectures in this module.');
                    }
                  }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  {getNextLecture() ? (
                    <>
                      Next Lecture
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Complete Module
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center py-12">
              <div className="text-center max-w-md">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Lecture Selected</h3>
                <p className="text-gray-500 mb-6">
                  {lectures.length === 0 
                    ? 'This course has no lectures yet. Please check back later.'
                    : 'Select a lecture from the sidebar to start learning'
                  }
                </p>
                {lectures.length === 0 && (
                  <button
                    onClick={() => navigate('/dashboard?section=my-courses')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Back to My Courses
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;