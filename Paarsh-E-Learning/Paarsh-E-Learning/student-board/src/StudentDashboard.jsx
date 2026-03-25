// src/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Search, Menu, Book, User, Clipboard, Folder, Briefcase, 
  CreditCard, Settings, Home, Calendar, Clock, MessageCircle, 
  ChevronDown, Star, CheckCircle, TrendingUp, Target, AlertCircle,
  PlayCircle, Video, FileText, Filter, Plus, ChevronRight,
  Users, BarChart, Phone, Mail, Linkedin, Github, Upload, Edit,
  Eye, Share2, DollarSign, Lock, Check, ArrowRight, Activity,
  Zap, Gift, ExternalLink, Download, ChevronLeft, ChevronUp,
  Globe, Headphones, HelpCircle, LogOut, Heart, ThumbsUp,
  Award, Trophy, Shield, Package, FileCode,
  Database, Server, Cpu, Terminal, Code, GitBranch, Coffee, Music, Camera,
  Mic, PenTool, Layout, Palette, Type, Image, Film, Radio, Volume2,
  Smartphone, Tablet, Monitor, Watch, Airplay, Cast,
  Wifi, Bluetooth, Battery, Power, RefreshCw, RotateCcw,
  Save, Trash2, Copy, Scissors, MoreHorizontal, MoreVertical,
  Minus, Maximize2, Minimize2, XCircle, AlertTriangle,
  Info, Feather, Flag, Hash, Percent, Divide,
  Euro, Pound, Bitcoin, Wallet, Receipt, Tag, ShoppingBag, ShoppingCart, Truck,
  Box, Archive, Inbox, Send, MessageSquare, PhoneCall, Voicemail,
  MapPin, Map, Navigation, Compass, Cloud, CloudRain, CloudSnow, CloudLightning, Sun, Moon,
  Sunrise, Sunset, Wind, Thermometer, Droplets, Umbrella,
  Cookie, Pizza, Apple, Carrot, Drumstick, Wine, Beer, Cocktail,
  HardDrive, Tv, Printer, Scanner, Keyboard, Mouse, Speaker, Headphones as HeadsetIcon,
  Gamepad, Joystick, Dice, Chess, Crown, Sword, Skull, Ghost, Smile, Frown, Meh, Laugh,
  ThumbsDown, Medal, Fire, Droplet, Leaf, Tree, Flower, Bird, Fish, Cat, Dog, Rabbit,
  Whale, Octopus, Bug, Bee, Spider, Snake, Dragon, Horse,
  Car, Bike, Bus, Train, Plane, Rocket, Ship, Anchor, Mountain,
  PieChart, LineChart, TrendingDown
} from 'lucide-react';

// Import Section Components
import DashboardPage from './sections/DashboardPage';
import BuyCoursesPage from './sections/BuyCoursesPage'; // NEW IMPORT
import MyCoursesPage from './sections/MyCoursesPage';
import MyMentorsPage from './sections/MyMentorsPage';
import AssignmentsPage from './sections/AssignmentsPage';
import ResourcesPage from './sections/ResourcesPage';
import PlacementsPage from './sections/PlacementsPage';
import PaymentsPage from './sections/PaymentsPage';
import SettingsPage from './sections/SettingsPage';

const StudentDashboard = ({ setAuth }) => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'critical', title: 'Assignment Due Today', message: 'React Advanced Patterns - Due in 3 hours', time: '10 min ago', read: false },
    { id: 2, type: 'important', title: 'New Grade Published', message: 'Your JavaScript Fundamentals quiz: 92/100', time: '1 hour ago', read: false },
    { id: 3, type: 'info', title: 'New Module Unlocked', message: 'Advanced React Patterns now available', time: '2 hours ago', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Guest User',
    course: 'Not Enrolled',
    initials: 'GU'
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserData({
          name: parsedUser.name || 'Guest User',
          course: parsedUser.course || 'Not Enrolled',
          initials: parsedUser.name 
            ? parsedUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
            : 'GU'
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update auth state
    if (setAuth) {
      setAuth(false);
    }
    
    // Close user menu
    setShowUserMenu(false);
    
    // Redirect to login page
    navigate('/login');
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const NotificationBadge = ({ count }) => count > 0 ? (
    <span className="absolute -top-1 -right-1 bg-[#5BD1D7] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
      {count > 9 ? '9+' : count}
    </span>
  ) : null;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'buy-courses': // NEW CASE
        return <BuyCoursesPage setCurrentPage={setCurrentPage} />; ;
      case 'courses':
        return <MyCoursesPage />;
      case 'mentors':
        return <MyMentorsPage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'placements':
        return <PlacementsPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', active: currentPage === 'dashboard' },
    { id: 'buy-courses', icon: ShoppingBag, label: 'Buy Courses', badge: 'NEW', active: currentPage === 'buy-courses' }, // NEW ITEM
    { id: 'courses', icon: Book, label: 'My Courses', badge: '3', active: currentPage === 'courses' },
    { id: 'mentors', icon: Users, label: 'My Mentors', active: currentPage === 'mentors' },
    { id: 'assignments', icon: Clipboard, label: 'Assignments', badge: '1', active: currentPage === 'assignments' },
    { id: 'resources', icon: Folder, label: 'Resources', active: currentPage === 'resources' },
    { id: 'placements', icon: Briefcase, label: 'Placements', active: currentPage === 'placements' },
    { id: 'payments', icon: CreditCard, label: 'Payments', active: currentPage === 'payments' },
    { id: 'settings', icon: Settings, label: 'Settings', active: currentPage === 'settings' },
  ];

  return (
    <div className="min-h-screen bg-[#EFF6FF] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16 shadow-sm">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="p-2 hover:bg-[#ECFEFF] rounded-lg">
              <Menu className="w-5 h-5 text-[#384158]" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#14BDEE] to-[#5BD1D7] rounded-lg flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#384158]">Paarsh E Learning</div>
                <div className="text-xs text-[#76777A]">Student Dashboard</div>
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#76777A]" />
              <input
                type="text"
                placeholder="Search courses, materials, mentors..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE] bg-white"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="px-3 py-2 bg-[#14BDEE] text-white text-sm rounded-lg hover:bg-[#0DAAD8] hidden md:flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Quick Action
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-[#ECFEFF] rounded-lg relative"
              >
                <Bell className="w-5 h-5 text-[#384158]" />
                <NotificationBadge count={notifications.filter(n => !n.read).length} />
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-[#EFF6FF]">
                    <h3 className="font-semibold text-sm text-[#384158]">Notifications</h3>
                    <button className="text-xs text-[#14BDEE] hover:text-[#0DAAD8]">Mark all as read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-3 border-b border-gray-100 hover:bg-[#ECFEFF] cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}>
                        <div className="font-semibold text-sm text-[#384158]">{notif.title}</div>
                        <div className="text-xs text-[#76777A] mt-1">{notif.message}</div>
                        <div className="text-xs text-[#76777A] mt-1">{notif.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 hover:bg-[#ECFEFF] rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#14BDEE] to-[#5BD1D7] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userData.initials}
                </div>
                <ChevronDown className="w-4 h-4 text-[#384158]" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-3 border-b border-gray-200 bg-[#EFF6FF]">
                    <div className="font-semibold text-sm text-[#384158]">{userData.name}</div>
                    <div className="text-xs text-[#76777A]">{userData.course}</div>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-[#384158] hover:bg-[#ECFEFF] rounded flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentPage('settings');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-[#384158] hover:bg-[#ECFEFF] rounded flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="text-right hidden lg:block">
              <div className="text-xs text-[#76777A]">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
              <div className="text-xs font-semibold text-[#384158]">
                {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} IST
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16 flex-1">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 transition-all duration-300 z-40 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          <nav className="p-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  item.active 
                    ? 'bg-[#EFF6FF] text-[#14BDEE] border-l-4 border-[#14BDEE]' 
                    : 'text-[#384158] hover:bg-[#ECFEFF]'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className={`text-xs rounded-full px-2 py-0.5 ${
                        item.badge === 'NEW' 
                          ? 'bg-red-500 text-white' 
                          : 'bg-[#5BD1D7] text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;