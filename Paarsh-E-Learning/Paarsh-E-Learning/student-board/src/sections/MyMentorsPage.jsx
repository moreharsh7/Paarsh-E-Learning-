import React, { useState } from 'react';
import { 
  Users, MessageCircle, Video, Phone, Calendar, Star, 
  Clock, Award, TrendingUp, Target, Book, Code,
  Database, Server, Globe, Smartphone, Palette,
  ChevronRight, Filter, Search, Plus, MoreVertical,
  CheckCircle, XCircle, Bell, Heart, ThumbsUp,
  ExternalLink, Download, Upload, Edit, Trash2,
  RefreshCw, ChevronDown, ChevronUp, X, Check,
  Headphones, Mic, Camera, Share2, Bookmark,
  HelpCircle, Lock, Unlock, Zap, Shield, Mail,
  FileText
} from 'lucide-react';

const MyMentorsPage = () => {
  const [activeTab, setActiveTab] = useState('my-mentors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingDuration, setBookingDuration] = useState(30);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  const tabs = [
    { id: 'my-mentors', label: 'My Mentors' },
    { id: 'available', label: 'Available Mentors' },
    { id: 'sessions', label: 'Session History' },
    { id: 'messages', label: 'Messages' }
  ];

  const myMentors = [
    {
      id: 1,
      name: 'Rahul Verma',
      role: 'Senior Full Stack Developer',
      company: 'Google',
      experience: '8 years',
      specialization: ['React', 'Node.js', 'AWS', 'Microservices'],
      rating: 4.8,
      sessionsCompleted: 12,
      responseTime: '2 hours',
      availability: 'Mon-Fri, 10AM-6PM',
      online: true,
      nextSession: 'Today, 3:00 PM',
      avatarColor: 'from-purple-500 to-pink-600',
      bio: 'Specialized in building scalable web applications. Passionate about teaching clean code practices.',
      stats: {
        satisfaction: 96,
        punctuality: 98,
        knowledge: 95
      },
      communication: {
        email: true,
        chat: true,
        video: true,
        phone: true
      },
      languages: ['English', 'Hindi'],
      hourlyRate: '$75/hour'
    },
    {
      id: 2,
      name: 'Ananya Singh',
      role: 'React Expert',
      company: 'Meta',
      experience: '6 years',
      specialization: ['React', 'TypeScript', 'GraphQL', 'Performance'],
      rating: 4.9,
      sessionsCompleted: 8,
      responseTime: '1 hour',
      availability: 'Tue-Thu, 9AM-5PM',
      online: false,
      nextSession: 'Tomorrow, 10:00 AM',
      avatarColor: 'from-blue-500 to-teal-600',
      bio: 'Frontend architect with expertise in React ecosystem. Focus on performance optimization.',
      stats: {
        satisfaction: 98,
        punctuality: 95,
        knowledge: 97
      },
      communication: {
        email: true,
        chat: true,
        video: true,
        phone: false
      },
      languages: ['English'],
      hourlyRate: '$85/hour'
    },
    {
      id: 3,
      name: 'Priya Desai',
      role: 'UI/UX Design Lead',
      company: 'Adobe',
      experience: '7 years',
      specialization: ['Figma', 'UX Research', 'Prototyping', 'Design Systems'],
      rating: 4.7,
      sessionsCompleted: 5,
      responseTime: '4 hours',
      availability: 'Mon-Wed-Fri, 2PM-8PM',
      online: true,
      nextSession: 'Friday, 4:00 PM',
      avatarColor: 'from-pink-500 to-red-600',
      bio: 'Design thinking advocate with focus on user-centered design principles.',
      stats: {
        satisfaction: 94,
        punctuality: 96,
        knowledge: 93
      },
      communication: {
        email: true,
        chat: true,
        video: true,
        phone: true
      },
      languages: ['English', 'Hindi', 'Gujarati'],
      hourlyRate: '$70/hour'
    }
  ];

  const availableMentors = [
    {
      id: 4,
      name: 'Rajesh Kumar',
      role: 'DevOps Engineer',
      company: 'Amazon AWS',
      experience: '10 years',
      specialization: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      rating: 4.6,
      sessionsCompleted: 0,
      responseTime: '3 hours',
      availability: 'Flexible',
      online: true,
      avatarColor: 'from-green-500 to-emerald-600',
      bio: 'Cloud infrastructure expert with focus on automation and scalability.',
      stats: {
        satisfaction: 92,
        punctuality: 94,
        knowledge: 96
      },
      communication: {
        email: true,
        chat: true,
        video: true,
        phone: false
      },
      languages: ['English', 'Hindi'],
      hourlyRate: '$90/hour'
    },
    {
      id: 5,
      name: 'Siddharth Rao',
      role: 'Mobile Lead',
      company: 'Uber',
      experience: '9 years',
      specialization: ['React Native', 'iOS', 'Android', 'Mobile Architecture'],
      rating: 4.5,
      sessionsCompleted: 0,
      responseTime: '5 hours',
      availability: 'Weekends',
      online: false,
      avatarColor: 'from-orange-500 to-amber-600',
      bio: 'Cross-platform mobile development specialist with focus on performance.',
      stats: {
        satisfaction: 91,
        punctuality: 93,
        knowledge: 94
      },
      communication: {
        email: true,
        chat: true,
        video: true,
        phone: true
      },
      languages: ['English'],
      hourlyRate: '$80/hour'
    }
  ];

  const sessionHistory = [
    {
      id: 1,
      mentor: 'Rahul Verma',
      date: 'Jan 18, 2024',
      duration: '60 min',
      type: 'One-on-One',
      topic: 'Advanced State Management',
      rating: 5,
      notes: 'Discussed Redux Toolkit and Context API best practices',
      recording: true
    },
    {
      id: 2,
      mentor: 'Ananya Singh',
      date: 'Jan 15, 2024',
      duration: '45 min',
      type: 'Code Review',
      topic: 'Custom Hooks Implementation',
      rating: 4,
      notes: 'Reviewed custom hook patterns and optimization',
      recording: true
    },
    {
      id: 3,
      mentor: 'Priya Desai',
      date: 'Jan 12, 2024',
      duration: '90 min',
      type: 'Design Review',
      topic: 'Dashboard UI Design',
      rating: 5,
      notes: 'Feedback on user flow and accessibility',
      recording: false
    },
    {
      id: 4,
      mentor: 'Rahul Verma',
      date: 'Jan 8, 2024',
      duration: '60 min',
      type: 'Career Guidance',
      topic: 'System Design Interview Prep',
      rating: 5,
      notes: 'Prepared for FAANG system design interviews',
      recording: true
    }
  ];

  const messages = [
    {
      id: 1,
      mentor: 'Rahul Verma',
      message: 'Great work on the last assignment! Let\'s discuss async patterns in our next session.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      mentor: 'Ananya Singh',
      message: 'I\'ve reviewed your project. The component structure looks good!',
      time: '1 day ago',
      unread: false
    },
    {
      id: 3,
      mentor: 'Priya Desai',
      message: 'Check out these design resources I mentioned during our session.',
      time: '2 days ago',
      unread: false
    }
  ];

  const bookingSlots = [
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '12:00 PM', available: false },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: false },
    { time: '5:00 PM', available: true }
  ];

  const durationOptions = [15, 30, 45, 60];

  const MentorCard = ({ mentor, type = 'my' }) => {
    const isOnline = mentor.online;
    const isMyMentor = type === 'my';

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        {/* Mentor Header */}
        <div className={`bg-gradient-to-r ${mentor.avatarColor} p-6 text-white`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl font-bold">
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </div>
                {isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">{mentor.name}</h3>
                <p className="opacity-90">{mentor.role} • {mentor.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/50'}`} />
                    ))}
                  </div>
                  <span className="font-semibold">{mentor.rating}</span>
                  <span className="text-sm opacity-90">({mentor.sessionsCompleted} sessions)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {isMyMentor && mentor.nextSession && (
                <>
                  <div className="text-sm opacity-90">Next Session</div>
                  <div className="font-bold">{mentor.nextSession}</div>
                  <button className="mt-2 px-4 py-1 bg-white text-gray-800 text-sm rounded-lg hover:bg-gray-100">
                    Join
                  </button>
                </>
              )}
              {!isMyMentor && (
                <div className="text-xl font-bold">{mentor.hourlyRate}</div>
              )}
            </div>
          </div>
        </div>

        {/* Mentor Body */}
        <div className="p-6">
          {/* Bio */}
          <p className="text-gray-600 mb-4">{mentor.bio}</p>

          {/* Specialization Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.specialization.map(skill => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {skill}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-700">{mentor.stats.satisfaction}%</div>
              <div className="text-xs text-blue-600">Satisfaction</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-700">{mentor.stats.punctuality}%</div>
              <div className="text-xs text-green-600">Punctuality</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-700">{mentor.stats.knowledge}%</div>
              <div className="text-xs text-purple-600">Knowledge</div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Response Time: </span>
              <span className="font-medium">{mentor.responseTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Availability: </span>
              <span className="font-medium">{mentor.availability}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Languages: </span>
              <span className="font-medium">{mentor.languages.join(', ')}</span>
            </div>
          </div>

          {/* Communication Options */}
          <div className="flex gap-2 mb-4">
            {mentor.communication.email && (
              <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </div>
            )}
            {mentor.communication.chat && (
              <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                <MessageCircle className="w-3 h-3" />
                <span>Chat</span>
              </div>
            )}
            {mentor.communication.video && (
              <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                <Video className="w-3 h-3" />
                <span>Video</span>
              </div>
            )}
            {mentor.communication.phone && (
              <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                <Phone className="w-3 h-3" />
                <span>Phone</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {isMyMentor ? (
              <>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
                <button 
                  onClick={() => setSelectedMentor(mentor)}
                  className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule
                </button>
              </>
            ) : (
              <>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Request Session
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  View Profile
                </button>
              </>
            )}
            <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SessionCard = ({ session }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold text-gray-800">{session.mentor}</div>
          <div className="text-sm text-gray-600 mt-1">{session.topic}</div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-gray-500">{session.date}</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{session.duration}</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{session.type}</span>
          </div>
          {session.notes && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
              {session.notes}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < session.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <div className="flex gap-2">
            {session.recording && (
              <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                View Recording
              </button>
            )}
            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
              Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MessageCard = ({ message }) => (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer ${message.unread ? 'border-l-4 border-l-blue-500' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
          {message.mentor.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-800">{message.mentor}</div>
            <span className="text-xs text-gray-500">{message.time}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{message.message}</p>
          {message.unread && (
            <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
              New
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Mentors</h1>
          <p className="text-gray-600">Connect with experts for personalized guidance</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Find New Mentor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-gray-800">{myMentors.length}</div>
          <div className="text-sm text-gray-600">Assigned Mentors</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {myMentors.filter(m => m.online).length}/{myMentors.length}
          </div>
          <div className="text-sm text-gray-600">Online Now</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {sessionHistory.reduce((acc, session) => acc + parseInt(session.duration), 0)}h
          </div>
          <div className="text-sm text-gray-600">Total Session Time</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">
            {(myMentors.reduce((acc, mentor) => acc + mentor.rating, 0) / myMentors.length).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'my-mentors' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myMentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} type="my" />
              ))}
            </div>
          )}

          {activeTab === 'available' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Available Mentors</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {availableMentors.map(mentor => (
                  <MentorCard key={mentor.id} mentor={mentor} type="available" />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Session History</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Download All Records
                </button>
              </div>
              <div className="space-y-3">
                {sessionHistory.map(session => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    New Conversation
                  </button>
                  <button className="p-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {messages.map(message => (
                  <MessageCard key={message.id} message={message} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Schedule Session</h3>
                  <p className="text-gray-600">Book a session with {selectedMentor.name}</p>
                </div>
                <button 
                  onClick={() => setSelectedMentor(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Mentor Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${selectedMentor.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
                  {selectedMentor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{selectedMentor.name}</div>
                  <div className="text-sm text-gray-600">{selectedMentor.role}</div>
                  <div className="text-sm text-gray-600">{selectedMentor.hourlyRate}</div>
                </div>
              </div>

              {/* Duration Selection */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Select Duration</h4>
                <div className="flex gap-2">
                  {durationOptions.map(duration => (
                    <button
                      key={duration}
                      onClick={() => setBookingDuration(duration)}
                      className={`px-4 py-2 rounded-lg ${
                        bookingDuration === duration
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {duration} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Select Date</h4>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Available Time Slots</h4>
                <div className="grid grid-cols-4 gap-2">
                  {bookingSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setBookingTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg text-center ${
                        bookingTime === slot.time
                          ? 'bg-blue-600 text-white'
                          : slot.available
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Summary */}
              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{bookingDuration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{bookingDate || 'Select date'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{bookingTime || 'Select time'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium">
                      ${(parseInt(selectedMentor.hourlyRate.replace('$', '')) * (bookingDuration / 60)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Confirm Booking
                </button>
                <button 
                  onClick={() => setSelectedMentor(null)}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
            <Video className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-800">Schedule Mock Interview</div>
              <div className="text-sm text-gray-600">Practice with experts</div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
            <FileText className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <div className="font-medium text-gray-800">Request Code Review</div>
              <div className="text-sm text-gray-600">Get feedback on your projects</div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
            <Headphones className="w-5 h-5 text-purple-600" />
            <div className="text-left">
              <div className="font-medium text-gray-800">Office Hours</div>
              <div className="text-sm text-gray-600">Join group Q&A sessions</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyMentorsPage;