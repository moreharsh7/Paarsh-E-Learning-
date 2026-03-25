import React, { useState } from 'react';
import { 
  Folder, Download, Search, Filter, Book, Video, 
  FileText, Code, Database, Server, Globe, Smartphone,
  Palette, Zap, ChevronRight, ChevronDown, Star,
  Heart, Bookmark, Share2, Eye, Clock, Calendar,
  Users, TrendingUp, Award, Trophy, Shield, Coffee,
  Music, Camera, Mic, Headphones, PenTool, Layout,
  Type, Image, Film, Radio, Volume2, Wifi, Battery,
  Power, RefreshCw, RotateCcw, Save, Trash2, Copy,
  Scissors, MoreHorizontal, MoreVertical, Minus,
  Maximize2, Minimize2, XCircle, AlertTriangle, Info,
  Feather, Flag, Hash, Percent, Divide, DollarSign,
  Euro, Pound, Bitcoin, CreditCard, Wallet, Receipt,
  Tag, ShoppingBag, ShoppingCart, Truck, Package, Box,
  Archive, Inbox, Send, Mail, MessageSquare, PhoneCall,
  Voicemail, MapPin, Map, Navigation, Compass, Cloud,
  CloudRain, CloudSnow, CloudLightning, Sun, Moon,
  Sunrise, Sunset, Wind, Thermometer, Droplets, Umbrella,
  Cookie, Pizza, Apple, Carrot, Drumstick, Wine, Beer,
  Cocktail, Cpu, HardDrive, Tv, Printer, Scanner,
  Keyboard, Mouse, Speaker, Gamepad, Joystick, Dice, 
  Chess, Crown, Sword, Skull, Ghost, Smile, Frown, 
  Meh, Laugh, ThumbsDown, Medal, Fire, Droplet, Leaf, 
  Tree, Flower, Bird, Fish, Cat, Dog, Rabbit, Whale, 
  Octopus, Bug, Bee, Spider, Snake, Dragon, Horse, 
  Car, Bike, Bus, Train, Plane, Rocket, Ship, Anchor, 
  Mountain, Briefcase, PieChart, LineChart, BarChart, 
  TrendingDown, Activity, ExternalLink, Upload, Edit, 
  Lock, Unlock, Bell, PlayCircle, X, Check, Plus, 
  ThumbsUp
} from 'lucide-react';

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [bookmarked, setBookmarked] = useState([1, 3, 7]);
  const [expandedResource, setExpandedResource] = useState(null);

  const categories = [
    { id: 'all', label: 'All Resources', count: 24, icon: Folder },
    { id: 'videos', label: 'Video Lectures', count: 8, icon: Video },
    { id: 'docs', label: 'Documentation', count: 6, icon: FileText },
    { id: 'code', label: 'Code Samples', count: 5, icon: Code },
    { id: 'books', label: 'E-books', count: 3, icon: Book },
    { id: 'cheatsheets', label: 'Cheat Sheets', count: 2, icon: Zap }
  ];

  const courses = [
    { id: 'all', label: 'All Courses' },
    { id: 'fs101', label: 'Full Stack Dev' },
    { id: 'ar201', label: 'Advanced React' },
    { id: 'db601', label: 'Database Design' }
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'pdf', label: 'PDF' },
    { id: 'video', label: 'Video' },
    { id: 'code', label: 'Code' },
    { id: 'link', label: 'External Link' }
  ];

  const resources = [
    {
      id: 1,
      title: 'React Hooks Complete Guide',
      course: 'Advanced React',
      category: 'videos',
      type: 'video',
      duration: '2h 15m',
      size: '1.2 GB',
      downloads: 245,
      rating: 4.8,
      uploaded: '2 days ago',
      description: 'Comprehensive guide to React Hooks with practical examples',
      tags: ['React', 'Hooks', 'useState', 'useEffect'],
      chapters: [
        { title: 'Introduction to Hooks', duration: '15m' },
        { title: 'useState Deep Dive', duration: '25m' },
        { title: 'useEffect Patterns', duration: '30m' },
        { title: 'Custom Hooks', duration: '45m' },
        { title: 'Performance Optimization', duration: '20m' }
      ],
      instructor: 'Ananya Singh',
      icon: Video,
      color: 'from-[#14BDEE] to-[#60A5FA]'
    },
    {
      id: 2,
      title: 'Node.js Best Practices',
      course: 'Full Stack Dev',
      category: 'docs',
      type: 'pdf',
      size: '4.5 MB',
      downloads: 187,
      rating: 4.6,
      uploaded: '1 week ago',
      description: 'Industry best practices for Node.js development',
      tags: ['Node.js', 'Backend', 'Best Practices', 'Security'],
      pages: 45,
      author: 'Rahul Verma',
      icon: FileText,
      color: 'from-[#5BD1D7] to-[#14BDEE]'
    },
    {
      id: 3,
      title: 'Authentication Flow Examples',
      course: 'Full Stack Dev',
      category: 'code',
      type: 'code',
      size: '15 MB',
      downloads: 321,
      rating: 4.9,
      uploaded: '3 days ago',
      description: 'Complete authentication implementations with JWT',
      tags: ['Authentication', 'JWT', 'Security', 'Express'],
      files: ['auth.controller.js', 'auth.routes.js', 'middleware.js'],
      language: 'JavaScript',
      icon: Code,
      color: 'from-[#60A5FA] to-[#5BD1D7]'
    },
    {
      id: 4,
      title: 'Database Design Patterns',
      course: 'Database Design',
      category: 'books',
      type: 'pdf',
      size: '8.2 MB',
      downloads: 156,
      rating: 4.7,
      uploaded: '2 weeks ago',
      description: 'Advanced database design patterns and optimization',
      tags: ['Database', 'Design Patterns', 'SQL', 'NoSQL'],
      pages: 120,
      author: 'Deepak Sharma',
      icon: Book,
      color: 'from-[#14BDEE] to-[#5BD1D7]'
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      course: 'Full Stack Dev',
      category: 'videos',
      type: 'video',
      duration: '1h 30m',
      size: '850 MB',
      downloads: 198,
      rating: 4.5,
      uploaded: '5 days ago',
      description: 'Essential UI/UX design principles for developers',
      tags: ['UI/UX', 'Design', 'Figma', 'Prototyping'],
      chapters: [
        { title: 'Color Theory', duration: '20m' },
        { title: 'Typography', duration: '25m' },
        { title: 'Layout Principles', duration: '30m' },
        { title: 'User Research', duration: '15m' }
      ],
      instructor: 'Priya Desai',
      icon: Video,
      color: 'from-[#5BD1D7] to-[#60A5FA]'
    },
    {
      id: 6,
      title: 'React Performance Cheat Sheet',
      course: 'Advanced React',
      category: 'cheatsheets',
      type: 'pdf',
      size: '2.1 MB',
      downloads: 278,
      rating: 4.8,
      uploaded: '1 week ago',
      description: 'Quick reference for React performance optimization',
      tags: ['React', 'Performance', 'Optimization', 'Memoization'],
      pages: 12,
      author: 'Ananya Singh',
      icon: Zap,
      color: 'from-[#60A5FA] to-[#14BDEE]'
    },
    {
      id: 7,
      title: 'Git & GitHub Workshop',
      course: 'Full Stack Dev',
      category: 'videos',
      type: 'video',
      duration: '3h 10m',
      size: '2.3 GB',
      downloads: 189,
      rating: 4.9,
      uploaded: '4 days ago',
      description: 'Complete Git and GitHub workflow workshop',
      tags: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
      chapters: [
        { title: 'Git Basics', duration: '40m' },
        { title: 'Branching Strategies', duration: '45m' },
        { title: 'Pull Requests', duration: '35m' },
        { title: 'CI/CD Integration', duration: '50m' },
        { title: 'Advanced Git', duration: '20m' }
      ],
      instructor: 'Rahul Verma',
      icon: Video,
      color: 'from-[#14BDEE] to-[#5BD1D7]'
    },
    {
      id: 8,
      title: 'API Design Patterns',
      course: 'Full Stack Dev',
      category: 'docs',
      type: 'pdf',
      size: '3.8 MB',
      downloads: 167,
      rating: 4.7,
      uploaded: '2 weeks ago',
      description: 'RESTful and GraphQL API design patterns',
      tags: ['API', 'REST', 'GraphQL', 'Design Patterns'],
      pages: 65,
      author: 'Rajesh Kumar',
      icon: FileText,
      color: 'from-[#5BD1D7] to-[#60A5FA]'
    }
  ];

  const learningPaths = [
    {
      id: 1,
      title: 'Frontend Mastery Path',
      description: 'Complete journey to becoming a frontend expert',
      duration: '12 weeks',
      resources: 24,
      progress: 65,
      icon: Layout,
      color: 'from-[#14BDEE] to-[#60A5FA]'
    },
    {
      id: 2,
      title: 'Backend Development',
      description: 'Master server-side development and APIs',
      duration: '10 weeks',
      resources: 18,
      progress: 40,
      icon: Server,
      color: 'from-[#5BD1D7] to-[#14BDEE]'
    },
    {
      id: 3,
      title: 'DevOps & Deployment',
      description: 'Learn deployment, containers, and CI/CD',
      duration: '8 weeks',
      resources: 15,
      progress: 25,
      icon: Zap,
      color: 'from-[#60A5FA] to-[#5BD1D7]'
    }
  ];

  const recentDownloads = [
    { id: 1, title: 'React Router Guide', downloaded: '2 hours ago' },
    { id: 2, title: 'CSS Grid Cheat Sheet', downloaded: '1 day ago' },
    { id: 3, title: 'TypeScript Handbook', downloaded: '2 days ago' },
    { id: 4, title: 'Express.js Tutorial', downloaded: '3 days ago' }
  ];

  const communityResources = [
    {
      id: 1,
      title: 'React Community Resources',
      description: 'Curated list of React libraries and tools',
      type: 'link',
      url: 'https://reactresources.com',
      votes: 124,
      icon: Globe,
      color: 'from-[#14BDEE] to-[#5BD1D7]'
    },
    {
      id: 2,
      title: 'Free Design Assets',
      description: 'Collection of free UI kits and icons',
      type: 'link',
      url: 'https://freedesignassets.com',
      votes: 89,
      icon: Palette,
      color: 'from-[#60A5FA] to-[#14BDEE]'
    },
    {
      id: 3,
      title: 'Developer Tools Directory',
      description: 'Comprehensive list of development tools',
      type: 'link',
      url: 'https://devtoolsdirectory.com',
      votes: 156,
      icon: Code,
      color: 'from-[#5BD1D7] to-[#60A5FA]'
    }
  ];

  const ProgressBar = ({ value, className = '' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${className}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  const ResourceCard = ({ resource }) => {
    const Icon = resource.icon;
    const isBookmarked = bookmarked.includes(resource.id);
    const isExpanded = expandedResource === resource.id;

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        {/* Header */}
        <div className={`bg-gradient-to-r ${resource.color} p-6 text-white`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">{resource.course}</div>
                <h3 className="text-xl font-bold mt-1 text-white">{resource.title}</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setBookmarked(prev => 
                  isBookmarked 
                    ? prev.filter(id => id !== resource.id)
                    : [...prev, resource.id]
                )}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isBookmarked ? (
                  <Bookmark className="w-5 h-5 fill-white" />
                ) : (
                  <Bookmark className="w-5 h-5 text-white/90" />
                )}
              </button>
              <button 
                onClick={() => setExpandedResource(isExpanded ? null : resource.id)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isExpanded ? <ChevronDown className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-4 text-white/90">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="text-sm">{resource.downloads} downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{resource.rating}</span>
            </div>
            {resource.duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{resource.duration}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{resource.uploaded}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-[#76777A] mb-4">{resource.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#EFF6FF] text-[#14BDEE] text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
              {/* Chapters for Videos */}
              {resource.chapters && (
                <div>
                  <h4 className="font-medium text-[#384158] mb-2">Chapters</h4>
                  <div className="space-y-2">
                    {resource.chapters.map((chapter, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 hover:bg-[#EFF6FF] rounded transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-[#ECFEFF] text-[#14BDEE] rounded-full flex items-center justify-center text-xs">
                            {idx + 1}
                          </div>
                          <span className="text-sm text-[#384158]">{chapter.title}</span>
                        </div>
                        <span className="text-sm text-[#76777A]">{chapter.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* File Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-[#76777A]">Size</div>
                  <div className="font-medium text-[#384158]">{resource.size}</div>
                </div>
                <div>
                  <div className="text-sm text-[#76777A]">Format</div>
                  <div className="font-medium text-[#384158]">{resource.type.toUpperCase()}</div>
                </div>
                {resource.pages && (
                  <div>
                    <div className="text-sm text-[#76777A]">Pages</div>
                    <div className="font-medium text-[#384158]">{resource.pages}</div>
                  </div>
                )}
                {resource.language && (
                  <div>
                    <div className="text-sm text-[#76777A]">Language</div>
                    <div className="font-medium text-[#384158]">{resource.language}</div>
                  </div>
                )}
              </div>

              {/* Author/Instructor */}
              <div className="p-3 bg-[#EFF6FF] rounded-lg">
                <div className="text-sm text-[#76777A]">By {resource.instructor || resource.author}</div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] flex items-center justify-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="px-4 py-2 border border-gray-300 text-[#76777A] rounded-lg hover:bg-[#EFF6FF] transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 border border-gray-300 text-[#76777A] rounded-lg hover:bg-[#EFF6FF] transition-colors">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const LearningPathCard = ({ path }) => {
    const Icon = path.icon;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:bg-[#EFF6FF] transition-colors">
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${path.color} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-[#384158]">{path.title}</div>
            <div className="text-sm text-[#76777A] mt-1">{path.description}</div>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-xs text-[#76777A]">{path.duration}</div>
              <div className="text-xs text-[#76777A]">{path.resources} resources</div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#384158]">Progress</span>
                <span className="font-medium text-[#14BDEE]">{path.progress}%</span>
              </div>
              <ProgressBar value={path.progress} className="bg-[#14BDEE]" />
            </div>
          </div>
          <button className="p-2 hover:bg-[#ECFEFF] rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-[#76777A]" />
          </button>
        </div>
      </div>
    );
  };

  const filteredResources = resources.filter(resource => {
    if (activeCategory !== 'all' && resource.category !== activeCategory) return false;
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#384158]">Resources</h1>
          <p className="text-[#76777A]">Access all your learning materials in one place</p>
        </div>
        <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] flex items-center gap-2 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Resource
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#384158]">{resources.length}</div>
          <div className="text-sm text-[#76777A]">Total Resources</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#14BDEE]">
            {resources.filter(r => r.category === 'videos').length}
          </div>
          <div className="text-sm text-[#76777A]">Video Lectures</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#5BD1D7]">
            {resources.reduce((acc, r) => acc + r.downloads, 0).toLocaleString()}
          </div>
          <div className="text-sm text-[#76777A]">Total Downloads</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#60A5FA]">
            {(resources.reduce((acc, r) => acc + r.rating, 0) / resources.length).toFixed(1)}
          </div>
          <div className="text-sm text-[#76777A]">Avg. Rating</div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex overflow-x-auto gap-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-[#14BDEE] text-white'
                    : 'bg-[#EFF6FF] text-[#76777A] hover:bg-[#ECFEFF]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-[#ECFEFF] text-[#14BDEE]'
                }`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Resources */}
        <div className="lg:col-span-2">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#76777A]" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE]"
                  />
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE] appearance-none"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="downloads">Most Downloaded</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#76777A] pointer-events-none" />
                </div>
              </div>
              
              <div className="flex gap-2">
                {courses.map(course => (
                  <button
                    key={course.id}
                    className="px-3 py-1.5 text-sm font-medium bg-[#EFF6FF] text-[#76777A] rounded-lg hover:bg-[#ECFEFF] whitespace-nowrap transition-colors"
                  >
                    {course.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filters */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {types.map(type => (
                <button
                  key={type.id}
                  className="px-3 py-1.5 text-sm font-medium bg-[#EFF6FF] text-[#76777A] rounded-lg hover:bg-[#ECFEFF] whitespace-nowrap transition-colors"
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#384158] mb-2">No resources found</h3>
              <p className="text-[#76777A]">Try changing your filters or search term</p>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Learning Paths */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-[#EFF6FF]">
              <h3 className="font-semibold text-[#384158]">Learning Paths</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {learningPaths.map(path => (
                  <LearningPathCard key={path.id} path={path} />
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-[#14BDEE] hover:text-[#0DAAD8] border-t border-gray-200 pt-4 transition-colors">
                Explore All Paths
              </button>
            </div>
          </div>

          {/* Recent Downloads */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-[#EFF6FF]">
              <h3 className="font-semibold text-[#384158]">Recent Downloads</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {recentDownloads.map(download => (
                  <div key={download.id} className="flex items-center justify-between p-2 hover:bg-[#EFF6FF] rounded transition-colors">
                    <div className="font-medium text-sm text-[#384158]">{download.title}</div>
                    <div className="text-xs text-[#76777A]">{download.downloaded}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Community Resources */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-[#EFF6FF]">
              <h3 className="font-semibold text-[#384158]">Community Resources</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {communityResources.map(resource => {
                  const Icon = resource.icon;
                  return (
                    <div key={resource.id} className="p-3 border border-gray-200 rounded-lg hover:bg-[#EFF6FF] transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${resource.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-[#384158]">{resource.title}</div>
                          <div className="text-sm text-[#76777A] mt-1">{resource.description}</div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 text-xs text-[#76777A]">
                              <ThumbsUp className="w-3 h-3" />
                              {resource.votes} votes
                            </div>
                            <a 
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#14BDEE] hover:text-[#0DAAD8] flex items-center gap-1 transition-colors"
                            >
                              Visit
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-[#EFF6FF]">
              <h3 className="font-semibold text-[#384158]">Your Stats</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#384158]">Resources Downloaded</span>
                    <span className="font-medium text-[#14BDEE]">24</span>
                  </div>
                  <ProgressBar value={80} className="bg-[#5BD1D7]" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#384158]">Bookmarked</span>
                    <span className="font-medium text-[#14BDEE]">{bookmarked.length}</span>
                  </div>
                  <ProgressBar value={(bookmarked.length/resources.length)*100} className="bg-[#14BDEE]" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#384158]">8.4 GB</div>
                  <div className="text-sm text-[#76777A]">Total Downloaded Size</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Playground */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#EFF6FF]">
          <div>
            <h3 className="font-semibold text-[#384158]">Code Playground</h3>
            <p className="text-sm text-[#76777A]">Practice coding directly in your browser</p>
          </div>
          <button className="px-4 py-2 bg-[#5BD1D7] text-white rounded-lg hover:bg-[#4AC1C7] transition-colors">
            Launch Playground
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#ECFEFF] rounded-lg border border-[#5BD1D7]">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-[#14BDEE]" />
                <div className="font-medium text-[#384158]">Live Editor</div>
              </div>
              <p className="text-sm text-[#76777A]">Write and test code in real-time</p>
            </div>
            <div className="p-4 bg-[#EFF6FF] rounded-lg border border-[#14BDEE]">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-[#5BD1D7]" />
                <div className="font-medium text-[#384158]">Quick Templates</div>
              </div>
              <p className="text-sm text-[#76777A]">Start with pre-built templates</p>
            </div>
            <div className="p-4 bg-[#ECFEFF] rounded-lg border border-[#60A5FA]">
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="w-5 h-5 text-[#14BDEE]" />
                <div className="font-medium text-[#384158]">Share & Collaborate</div>
              </div>
              <p className="text-sm text-[#76777A]">Share your code with peers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;