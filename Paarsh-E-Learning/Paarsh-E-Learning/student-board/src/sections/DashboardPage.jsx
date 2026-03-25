import React, { useState } from 'react';
import { 
  Calendar, Clock, MessageCircle, Book, FileText, Video, 
  CheckCircle, Folder, TrendingUp, Target, AlertCircle,
  Star, PlayCircle, ChevronRight, Filter, Users, BarChart,
  Bell, Download, Plus, Award, Trophy, TrendingDown,
  Activity, Zap, Gift, ExternalLink, ChevronLeft, ChevronUp,
  Heart, ThumbsUp, Shield, Coffee, Music, Camera, Mic,
  Headphones, PenTool, Layout, Palette, Type, Image, Film,
  Radio, Volume2, Smartphone, Tablet, Monitor, Watch,
  PieChart, LineChart, ArrowUp, ArrowDown, MoreVertical,
  Target as TargetIcon
} from 'lucide-react';

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState('overall');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // Student data
  const studentData = {
    name: 'Harshad More',
    course: 'Full Stack Web Development',
    progress: 65,
    mentor: {
      name: 'Rahul Verma',
      rating: 4.8,
      avatar: 'RV',
      online: true,
      nextSession: 'Today, 3:00 PM'
    },
    stats: {
      sessionsToday: 2,
      pendingAssignments: 1,
      unreadMessages: 3,
      daysToCompletion: 14
    },
    performance: {
      averageScore: 87,
      attendance: 95,
      currentGrade: 87.4,
      consistency: 94,
      engagement: 'High'
    }
  };

  // Chart data
  const studyHoursData = {
    week: [4, 3, 5, 2, 6, 4, 3],
    month: [4, 5, 4, 6, 5, 4, 3, 5, 4, 6, 5, 4, 3, 4, 5, 4, 6, 5, 4, 3, 4, 5, 6, 5, 4, 3, 4, 5, 4, 3],
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  };

  const skillDistribution = [
    { skill: 'React', level: 85, color: '#14BDEE' },
    { skill: 'Node.js', level: 78, color: '#5BD1D7' },
    { skill: 'Database', level: 70, color: '#60A5FA' },
    { skill: 'DevOps', level: 65, color: '#384158' },
  ];

  const performanceHistory = [
    { week: 'W1', score: 75 },
    { week: 'W2', score: 80 },
    { week: 'W3', score: 78 },
    { week: 'W4', score: 85 },
    { week: 'W5', score: 82 },
    { week: 'W6', score: 88 },
    { week: 'W7', score: 90 },
    { week: 'W8', score: 92 }
  ];

  const todaySchedule = [
    { time: '10:00 AM', type: 'self-study', title: 'React Hooks', duration: '1.5h', status: 'completed' },
    { time: '2:00 PM', type: 'assignment', title: 'Build Custom Hook', duration: '2h', status: 'upcoming' },
    { time: '3:00 PM', type: 'live-session', title: 'State Management', duration: '1h', status: 'upcoming' },
  ];

  const ProgressBar = ({ value, className = '', showLabel = false }) => (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-[#76777A] mb-1">
          <span>Progress</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${className}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  const CircularProgress = ({ value, size = 80, strokeWidth = 6, label = '' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-[#14BDEE] transition-all duration-1000"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <div className="text-lg font-bold text-[#384158]">{value}%</div>
          {label && <div className="text-xs text-[#76777A] mt-1">{label}</div>}
        </div>
      </div>
    );
  };

  // Study Hours Chart Component
  const StudyHoursChart = () => {
    const data = studyHoursData[selectedTimeRange];
    const labels = selectedTimeRange === 'week' ? studyHoursData.labels : 
                   Array.from({length: data.length}, (_, i) => i + 1);
    const maxValue = Math.max(...data);
    const chartHeight = 100;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-[#384158]">Study Hours</h4>
          <div className="flex gap-1">
            {['week', 'month'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  selectedTimeRange === range 
                    ? 'bg-[#14BDEE] text-white' 
                    : 'bg-gray-100 text-[#76777A] hover:bg-gray-200'
                }`}
              >
                {range.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-32 flex items-end gap-1 pt-4">
          {data.map((value, index) => {
            const height = (value / maxValue) * chartHeight;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-8 rounded-t-lg bg-[#14BDEE] transition-all duration-300 hover:opacity-80"
                  style={{ height: `${height}px` }}
                />
                <div className="text-xs text-[#76777A] mt-2">{labels[index]}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Skill Chart Component
  const SkillChart = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-[#384158]">Skill Proficiency</h4>
      <div className="space-y-3">
        {skillDistribution.map((skill, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#384158]">{skill.skill}</span>
              <span className="font-medium" style={{ color: skill.color }}>{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${skill.level}%`,
                  backgroundColor: skill.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Performance Chart Component
  const PerformanceChart = () => {
    const scores = performanceHistory.map(p => p.score);
    const labels = performanceHistory.map(p => p.week);
    const maxScore = Math.max(...scores);

    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-[#384158]">Performance Trend</h4>
        <div className="relative h-32">
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke="#14BDEE"
              strokeWidth="2"
              strokeLinecap="round"
              points={scores.map((score, index) => 
                `${(index / (scores.length - 1)) * 100},${100 - (score / maxScore) * 80}`
              ).join(' ')}
            />
            {scores.map((score, index) => (
              <circle
                key={index}
                cx={`${(index / (scores.length - 1)) * 100}%`}
                cy={`${100 - (score / maxScore) * 80}%`}
                r="3"
                fill="#14BDEE"
                className="hover:r-4 transition-all"
              />
            ))}
          </svg>
        </div>
        <div className="flex justify-between text-xs text-[#76777A]">
          {labels.map((label, index) => (
            <div key={index}>{label}</div>
          ))}
        </div>
      </div>
    );
  };

  // Course Progress Chart
  const CourseProgressChart = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-[#384158]">Course Progress</h4>
      <div className="flex items-center justify-center p-4">
        <div className="relative">
          <svg width="120" height="120" className="transform -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#E5E7EB"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#14BDEE"
              strokeWidth="10"
              fill="none"
              strokeDasharray="314"
              strokeDashoffset={314 - (studentData.progress / 100) * 314}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#384158]">{studentData.progress}%</div>
              <div className="text-xs text-[#76777A]">Completed</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-sm font-semibold text-[#384158]">12/18</div>
          <div className="text-xs text-[#76777A]">Modules</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-[#384158]">8/12</div>
          <div className="text-xs text-[#76777A]">Assignments</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-[#384158]">2/3</div>
          <div className="text-xs text-[#76777A]">Projects</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#384158]">Welcome back, {studentData.name}!</h1>
          <p className="text-[#76777A]">Here's your learning overview for today</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#14BDEE] text-white text-sm rounded-lg hover:bg-[#0DAAD8] flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Session
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#76777A]">Course Progress</div>
              <div className="text-2xl font-bold text-[#384158] mt-1">{studentData.progress}%</div>
            </div>
            <div className="p-2 bg-[#EFF6FF] rounded-lg">
              <Book className="w-5 h-5 text-[#14BDEE]" />
            </div>
          </div>
          <ProgressBar value={studentData.progress} className="bg-[#14BDEE] mt-3" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#76777A]">Avg. Score</div>
              <div className="text-2xl font-bold text-[#384158] mt-1">{studentData.performance.averageScore}%</div>
            </div>
            <div className="p-2 bg-[#ECFEFF] rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#5BD1D7]" />
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center gap-1 mt-2">
            <ArrowUp className="w-3 h-3" /> +5% from last week
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#76777A]">Today's Sessions</div>
              <div className="text-2xl font-bold text-[#384158] mt-1">{studentData.stats.sessionsToday}</div>
            </div>
            <div className="p-2 bg-[#EFF6FF] rounded-lg">
              <Calendar className="w-5 h-5 text-[#60A5FA]" />
            </div>
          </div>
          <div className="text-xs text-[#76777A] mt-2">Next: 3:00 PM</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#76777A]">Pending Tasks</div>
              <div className="text-2xl font-bold text-[#384158] mt-1">{studentData.stats.pendingAssignments}</div>
            </div>
            <div className="p-2 bg-[#ECFEFF] rounded-lg">
              <FileText className="w-5 h-5 text-[#384158]" />
            </div>
          </div>
          <div className="text-xs text-[#76777A] mt-2">Due soon: 1 assignment</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <StudyHoursChart />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <SkillChart />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <PerformanceChart />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <CourseProgressChart />
            </div>
          </div>

          {/* Active Course */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[#384158]">Active Course</h3>
                <p className="text-sm text-[#76777A]">{studentData.course}</p>
              </div>
              <button className="px-4 py-2 bg-[#14BDEE] text-white text-sm rounded-lg hover:bg-[#0DAAD8] flex items-center gap-2">
                <PlayCircle className="w-4 h-4" />
                Continue Learning
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#384158]">Modules</span>
                  <span className="text-sm font-medium text-[#76777A]">12/18</span>
                </div>
                <ProgressBar value={66} className="bg-[#14BDEE]" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#384158]">Assignments</span>
                  <span className="text-sm font-medium text-[#76777A]">8/12</span>
                </div>
                <ProgressBar value={66} className="bg-[#5BD1D7]" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#384158]">Projects</span>
                  <span className="text-sm font-medium text-[#76777A]">2/3</span>
                </div>
                <ProgressBar value={66} className="bg-[#60A5FA]" />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#14BDEE] to-[#5BD1D7] flex items-center justify-center text-white font-semibold">
                  {studentData.mentor.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#76777A]">Mentor</div>
                  <div className="font-medium text-[#384158]">{studentData.mentor.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#76777A]">Next Session</div>
                  <div className="font-medium text-[#14BDEE]">{studentData.mentor.nextSession}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Schedule & Quick Actions */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#384158]">Today's Schedule</h3>
              <button className="text-sm text-[#14BDEE] hover:text-[#0DAAD8]">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#EFF6FF] transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.type === 'live-session' ? 'bg-[#ECFEFF] text-[#5BD1D7]' :
                    item.type === 'self-study' ? 'bg-[#EFF6FF] text-[#14BDEE]' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.type === 'live-session' ? <Video className="w-5 h-5" /> :
                     item.type === 'self-study' ? <Book className="w-5 h-5" /> :
                     <FileText className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-[#384158]">{item.title}</div>
                    <div className="text-xs text-[#76777A] mt-1">{item.time} • {item.duration}</div>
                  </div>
                  {item.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="px-2 py-1 bg-[#14BDEE] text-white text-xs rounded">
                      Join
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-[#384158] mb-4">Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#384158]">Attendance</span>
                  <span className="text-sm font-medium text-[#14BDEE]">{studentData.performance.attendance}%</span>
                </div>
                <ProgressBar value={studentData.performance.attendance} className="bg-[#14BDEE]" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#384158]">Consistency</span>
                  <span className="text-sm font-medium text-[#5BD1D7]">{studentData.performance.consistency}%</span>
                </div>
                <ProgressBar value={studentData.performance.consistency} className="bg-[#5BD1D7]" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#384158]">Engagement</span>
                  <span className="text-sm font-medium text-[#60A5FA]">{studentData.performance.engagement}</span>
                </div>
                <ProgressBar value={90} className="bg-[#60A5FA]" />
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#384158]">Upcoming</h3>
              <button className="text-sm text-[#14BDEE] hover:text-[#0DAAD8]">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm text-[#384158]">Custom Hook Assignment</div>
                    <div className="text-xs text-[#76777A] mt-1">Due in 3 hours</div>
                  </div>
                  <div className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">High</div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-3 py-1.5 bg-[#14BDEE] text-white text-xs rounded hover:bg-[#0DAAD8]">
                    Continue
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 text-[#76777A] text-xs rounded hover:bg-gray-50">
                    Schedule
                  </button>
                </div>
              </div>
              
              <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm text-[#384158]">E-commerce Project</div>
                    <div className="text-xs text-[#76777A] mt-1">Due in 2 days</div>
                  </div>
                  <div className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">Medium</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#384158]">Recent Activity</h3>
          <button className="text-sm text-[#14BDEE] hover:text-[#0DAAD8]">
            View All Activity
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ECFEFF] flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#5BD1D7]" />
              </div>
              <div>
                <div className="font-medium text-sm text-[#384158]">Assignment Graded</div>
                <div className="text-xs text-[#76777A] mt-1">92/100 • 2 hours ago</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#14BDEE]" />
              </div>
              <div>
                <div className="font-medium text-sm text-[#384158]">Mentor Message</div>
                <div className="text-xs text-[#76777A] mt-1">Great work! • 4 hours ago</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                <Folder className="w-5 h-5 text-[#60A5FA]" />
              </div>
              <div>
                <div className="font-medium text-sm text-[#384158]">New Resources</div>
                <div className="text-xs text-[#76777A] mt-1">3 videos added • 1 day ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

