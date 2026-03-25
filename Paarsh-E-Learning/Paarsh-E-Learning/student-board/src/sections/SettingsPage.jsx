import React, { useState } from 'react';
import { 
  Settings, User, Bell, Lock, Globe, Moon, Sun,
  Smartphone, Tablet, Monitor, Headphones, MessageCircle,
  Mail, Shield, Database, Trash2, Download, Upload,
  RefreshCw, CreditCard, Book, Users, Briefcase, Folder,
  ChevronRight, ChevronDown, Search, Filter, Plus,
  MoreVertical, Check, X, Edit, Eye, EyeOff, Key,
  Wifi, Bluetooth, Battery, Power, RotateCcw, Save,
  Copy, Scissors, MoreHorizontal, Minus, Maximize2,
  Minimize2, AlertTriangle, Info, Feather, Flag,
  Hash, Percent, Divide, DollarSign, Euro, Pound,
  Bitcoin, Wallet, Receipt, Tag, ShoppingBag,
  ShoppingCart, Truck, Package, Box, Archive, Inbox,
  Send, PhoneCall, Voicemail, MapPin, Map, Navigation, Compass, Cloud,
  CloudRain, CloudSnow, CloudLightning, Cookie, Pizza,
  Apple, Carrot, Drumstick, Wine, Beer, Cocktail,
  Coffee, Cpu, HardDrive, Radio, Tv, Printer,
  Scanner, Keyboard, Mouse, Speaker, Gamepad, Joystick, Dice, Chess, Crown, Sword, Skull,
  Ghost, Smile, Frown, Meh, Laugh, Heart,
  Star, ThumbsDown, Award, Trophy, Medal, Fire,
  Zap, Droplet, Leaf, Tree, Flower,
  Bird, Fish, Cat, Dog, Rabbit, Whale, Octopus, Bug, Bee, Spider, Snake, Dragon,
  Horse, Car, Bike, Bus, Train, Plane, Rocket, Ship,
  Anchor, Mountain, Umbrella, PieChart,
  LineChart, BarChart, TrendingUp, TrendingDown, Activity,
  Home, Calendar, Clock, Bookmark, Share2,
  Music, Camera, Mic, PenTool, Layout, Palette,
  Type, Image, Film, Volume2, Airplay,
  Cast, Sunrise, Sunset, Wind, Thermometer, Droplets,
  Github, Linkedin, Twitter, LogOut, HelpCircle, ExternalLink,
  AlertCircle, ChevronLeft
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    assignments: true,
    sessions: true,
    announcements: true
  });
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('IST');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'de', name: 'German', native: 'Deutsch' }
  ];

  const timezones = [
    { code: 'IST', name: 'Indian Standard Time (UTC+5:30)' },
    { code: 'EST', name: 'Eastern Standard Time (UTC-5)' },
    { code: 'PST', name: 'Pacific Standard Time (UTC-8)' },
    { code: 'GMT', name: 'Greenwich Mean Time (UTC+0)' },
    { code: 'CET', name: 'Central European Time (UTC+1)' }
  ];

  const connectedAccounts = [
    { id: 1, name: 'Google', email: 'priya.sharma@gmail.com', connected: true },
    { id: 2, name: 'GitHub', username: 'priyasharma', connected: true },
    { id: 3, name: 'LinkedIn', connected: false },
    { id: 4, name: 'Microsoft', connected: false }
  ];

  const loginHistory = [
    { device: 'MacBook Pro', location: 'Bangalore, IN', time: '2 hours ago', ip: '192.168.1.1' },
    { device: 'iPhone 13', location: 'Mumbai, IN', time: '1 day ago', ip: '192.168.1.2' },
    { device: 'Windows PC', location: 'Delhi, IN', time: '3 days ago', ip: '192.168.1.3' }
  ];

  const subscription = {
    plan: 'Pro Plan',
    price: '₹25,000',
    period: 'per course',
    status: 'active',
    nextBilling: 'Feb 15, 2024',
    features: [
      'Full course access',
      'Live sessions',
      'Mentor support',
      'Certificate',
      'Placement assistance'
    ]
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-[#14BDEE]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingItem = ({ icon: Icon, title, description, children }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#EFF6FF] rounded-lg">
          <Icon className="w-5 h-5 text-[#14BDEE]" />
        </div>
        <div>
          <div className="font-medium text-[#384158]">{title}</div>
          <div className="text-sm text-[#76777A] mt-1">{description}</div>
        </div>
      </div>
      {children}
    </div>
  );

  const NotificationToggle = ({ type, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="font-medium text-[#384158]">{label}</div>
        <div className="text-sm text-[#76777A]">{description}</div>
      </div>
      <ToggleSwitch
        enabled={notifications[type]}
        onChange={(value) => setNotifications(prev => ({ ...prev, [type]: value }))}
      />
    </div>
  );

  // Custom Microsoft icon component
  const Microsoft = ({ className }) => (
    <svg 
      className={className} 
      fill="currentColor" 
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
    </svg>
  );

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6 bg-[#EFF6FF] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#384158]">Settings</h1>
          <p className="text-[#76777A]">Manage your account preferences and settings</p>
        </div>
        <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
          Save Changes
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="p-4">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#ECFEFF] text-[#14BDEE]'
                        : 'text-[#76777A] hover:bg-[#EFF6FF]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#384158]">Profile Settings</h2>
                
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#60A5FA] to-[#5BD1D7] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      PS
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-[#14BDEE] text-white rounded-full hover:bg-[#0DA8D4] transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <div className="font-bold text-[#384158] text-lg">Priya Sharma</div>
                    <div className="text-[#76777A]">Full Stack Web Development</div>
                    <button className="mt-2 text-sm text-[#14BDEE] hover:text-[#0DA8D4] transition-colors">
                      Change Profile Picture
                    </button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#384158] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Priya Sharma"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#384158] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="priya.sharma@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#384158] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="+91 9876543210"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#384158] mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        defaultValue="1998-05-15"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-[#384158] mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="Full Stack Developer passionate about building scalable web applications. Currently learning advanced React patterns and system design."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                  />
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-medium text-[#384158] mb-4">Social Links</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-[#76777A]" />
                      <input
                        type="text"
                        placeholder="GitHub username"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-[#76777A]" />
                      <input
                        type="text"
                        placeholder="LinkedIn profile URL"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Twitter className="w-5 h-5 text-[#76777A]" />
                      <input
                        type="text"
                        placeholder="Twitter handle"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#384158]">Preferences</h2>
                
                {/* Appearance */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Appearance</h3>
                  <SettingItem
                    icon={darkMode ? Moon : Sun}
                    title="Dark Mode"
                    description="Switch between light and dark themes"
                  >
                    <ToggleSwitch
                      enabled={darkMode}
                      onChange={setDarkMode}
                    />
                  </SettingItem>
                </div>

                {/* Language & Region */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Language & Region</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#384158] mb-2">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name} ({lang.native})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#384158] mb-2">
                      Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                    >
                      {timezones.map(tz => (
                        <option key={tz.code} value={tz.code}>
                          {tz.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Learning Preferences */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Learning Preferences</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#384158] mb-2">
                      Preferred Learning Style
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button className="p-4 border border-gray-300 rounded-lg text-left hover:bg-[#EFF6FF] transition-colors">
                        <div className="font-medium text-[#384158]">Visual</div>
                        <div className="text-sm text-[#76777A] mt-1">Videos & diagrams</div>
                      </button>
                      <button className="p-4 border border-[#14BDEE] bg-[#ECFEFF] rounded-lg text-left">
                        <div className="font-medium text-[#14BDEE]">Auditory</div>
                        <div className="text-sm text-[#5BD1D7] mt-1">Lectures & discussions</div>
                      </button>
                      <button className="p-4 border border-gray-300 rounded-lg text-left hover:bg-[#EFF6FF] transition-colors">
                        <div className="font-medium text-[#384158]">Kinesthetic</div>
                        <div className="text-sm text-[#76777A] mt-1">Hands-on practice</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#384158] mb-2">
                      Daily Learning Goal
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent">
                      <option>1 hour per day</option>
                      <option selected>2 hours per day</option>
                      <option>3 hours per day</option>
                      <option>4+ hours per day</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#384158]">Security</h2>
                
                {/* Password */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Password</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#384158] mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-[#76777A]" />
                        ) : (
                          <Eye className="w-5 h-5 text-[#76777A]" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#384158] mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#384158] mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                    />
                  </div>

                  <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
                    Change Password
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#384158]">Two-Factor Authentication</div>
                      <div className="text-sm text-[#76777A] mt-1">Add an extra layer of security</div>
                    </div>
                    <ToggleSwitch
                      enabled={twoFactorAuth}
                      onChange={setTwoFactorAuth}
                    />
                  </div>

                  {twoFactorAuth && (
                    <div className="p-4 bg-[#ECFEFF] rounded-lg border border-[#14BDEE]">
                      <div className="font-medium text-[#384158] mb-2">Setup Instructions</div>
                      <ol className="space-y-2 text-sm text-[#5BD1D7]">
                        <li>1. Download Google Authenticator app</li>
                        <li>2. Scan the QR code with the app</li>
                        <li>3. Enter the 6-digit code to verify</li>
                      </ol>
                      <div className="mt-4 p-4 bg-white rounded border border-[#14BDEE] inline-block">
                        {/* QR Code Placeholder */}
                        <div className="w-32 h-32 bg-[#EFF6FF] flex items-center justify-center">
                          <div className="text-xs text-[#76777A]">QR Code</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Connected Devices */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Connected Devices</h3>
                  <div className="space-y-3">
                    {loginHistory.map((session, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-[#EFF6FF] rounded-lg hover:bg-[#ECFEFF] transition-colors">
                        <div>
                          <div className="font-medium text-[#384158]">{session.device}</div>
                          <div className="text-sm text-[#76777A]">{session.location}</div>
                          <div className="text-xs text-[#76777A]">{session.time}</div>
                        </div>
                        <button className="text-sm text-[#FF6B6B] hover:text-[#E53935] transition-colors">
                          Revoke Access
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#FF6B6B]">Danger Zone</h3>
                  <div className="p-4 border border-[#FF6B6B] rounded-lg bg-[#FFE5E5]">
                    <div className="font-medium text-[#D32F2F] mb-2">Delete Account</div>
                    <p className="text-sm text-[#D32F2F] mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-4 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#E53935] transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#384158]">Notifications</h2>
                
                {/* Notification Channels */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Notification Channels</h3>
                  <NotificationToggle
                    type="email"
                    label="Email Notifications"
                    description="Receive notifications via email"
                  />
                  <NotificationToggle
                    type="push"
                    label="Push Notifications"
                    description="Receive browser push notifications"
                  />
                  <NotificationToggle
                    type="sms"
                    label="SMS Notifications"
                    description="Receive SMS notifications (charges may apply)"
                  />
                </div>

                {/* Notification Types */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">What to Notify Me About</h3>
                  <NotificationToggle
                    type="assignments"
                    label="Assignment Updates"
                    description="Due dates, submissions, and grades"
                  />
                  <NotificationToggle
                    type="sessions"
                    label="Session Reminders"
                    description="Upcoming live sessions and mentor meetings"
                  />
                  <NotificationToggle
                    type="announcements"
                    label="Course Announcements"
                    description="New content, resources, and updates"
                  />
                </div>

                {/* Quiet Hours */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Quiet Hours</h3>
                  <div className="p-4 bg-[#EFF6FF] rounded-lg">
                    <div className="font-medium text-[#384158] mb-2">Do Not Disturb</div>
                    <p className="text-sm text-[#76777A] mb-4">
                      Set times when you don't want to receive notifications
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#384158] mb-2">
                          Start Time
                        </label>
                        <input
                          type="time"
                          defaultValue="22:00"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#384158] mb-2">
                          End Time
                        </label>
                        <input
                          type="time"
                          defaultValue="07:00"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#384158]">Integrations</h2>
                
                {/* Connected Accounts */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Connected Accounts</h3>
                  <div className="space-y-3">
                    {connectedAccounts.map(account => (
                      <div key={account.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#14BDEE] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#EFF6FF] rounded-lg">
                            {account.name === 'Google' && <Mail className="w-5 h-5 text-[#14BDEE]" />}
                            {account.name === 'GitHub' && <Github className="w-5 h-5 text-[#14BDEE]" />}
                            {account.name === 'LinkedIn' && <Linkedin className="w-5 h-5 text-[#14BDEE]" />}
                            {account.name === 'Microsoft' && <Microsoft className="w-5 h-5 text-[#14BDEE]" />}
                          </div>
                          <div>
                            <div className="font-medium text-[#384158]">{account.name}</div>
                            {account.email && (
                              <div className="text-sm text-[#76777A]">{account.email}</div>
                            )}
                            {account.username && (
                              <div className="text-sm text-[#76777A]">@{account.username}</div>
                            )}
                          </div>
                        </div>
                        {account.connected ? (
                          <button className="px-4 py-2 border border-[#FF6B6B] text-[#FF6B6B] rounded-lg hover:bg-[#FFE5E5] transition-colors">
                            Disconnect
                          </button>
                        ) : (
                          <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
                            Connect
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar Sync */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Calendar Sync</h3>
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-[#14BDEE] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-[#14BDEE]" />
                        <div>
                          <div className="font-medium text-[#384158]">Google Calendar</div>
                          <div className="text-sm text-[#76777A]">Sync your schedule</div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
                        Connect Calendar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Code Editor Preferences</h3>
                  <div>
                    <label className="block text-sm font-medium text-[#384158] mb-2">
                      Default Editor
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent">
                      <option>VS Code</option>
                      <option>WebStorm</option>
                      <option>Sublime Text</option>
                      <option>Atom</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Billing */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#384158]">Billing & Subscriptions</h2>
                
                {/* Current Plan */}
                <div className="p-6 bg-gradient-to-r from-[#ECFEFF] to-[#EFF6FF] rounded-xl border border-[#14BDEE]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-[#14BDEE]">Current Plan</div>
                      <div className="text-2xl font-bold text-[#384158]">{subscription.plan}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#14BDEE]">{subscription.price}</div>
                      <div className="text-sm text-[#14BDEE]">/{subscription.period}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm font-medium text-[#384158] mb-2">Plan Features</div>
                    <ul className="space-y-2">
                      {subscription.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-[#76777A] flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#5BD1D7]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
                      Upgrade Plan
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
                      Cancel Subscription
                    </button>
                  </div>
                </div>

                {/* Billing Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Billing Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#384158] mb-2">
                        Billing Cycle
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent">
                        <option>Monthly</option>
                        <option selected>Quarterly</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#384158] mb-2">
                        Next Billing Date
                      </label>
                      <div className="font-medium text-[#384158]">{subscription.nextBilling}</div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[#384158]">Payment Methods</h3>
                    <button className="text-sm text-[#14BDEE] hover:text-[#0DA8D4] transition-colors">
                      Add Payment Method
                    </button>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-[#14BDEE] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-[#14BDEE]" />
                        <div>
                          <div className="font-medium text-[#384158]">Visa •••• 4242</div>
                          <div className="text-sm text-[#76777A]">Expires 12/25</div>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-[#ECFEFF] text-[#14BDEE] text-xs rounded-full">
                        Default
                      </span>
                    </div>
                  </div>
                </div>

                {/* Billing History */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#384158]">Billing History</h3>
                  <button className="w-full p-4 border border-gray-300 rounded-lg text-left hover:bg-[#EFF6FF] hover:border-[#14BDEE] transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-[#384158]">Download All Invoices</div>
                        <div className="text-sm text-[#76777A]">Get all your billing records</div>
                      </div>
                      <Download className="w-5 h-5 text-[#14BDEE]" />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#14BDEE] transition-colors">
        <h3 className="font-semibold text-[#384158] mb-4">Data Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-[#EFF6FF] hover:border-[#14BDEE] transition-colors">
            <Download className="w-5 h-5 text-[#14BDEE] mb-2" />
            <div className="font-medium text-[#384158]">Export Data</div>
            <div className="text-sm text-[#76777A]">Download your learning data</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-[#EFF6FF] hover:border-[#14BDEE] transition-colors">
            <Database className="w-5 h-5 text-[#5BD1D7] mb-2" />
            <div className="font-medium text-[#384158]">Data Backup</div>
            <div className="text-sm text-[#76777A]">Backup your progress</div>
          </button>
          <button className="p-4 border border-[#FF6B6B] rounded-lg text-left hover:bg-[#FFE5E5] transition-colors">
            <Trash2 className="w-5 h-5 text-[#FF6B6B] mb-2" />
            <div className="font-medium text-[#D32F2F]">Clear Data</div>
            <div className="text-sm text-[#D32F2F]">Reset your learning progress</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;