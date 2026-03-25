import React, { useState } from 'react';
import {
  User,
  Clipboard,
  Folder,
  Settings,
  Home,
  ChevronLeft,
  ChevronUp,
  LogOut,
  HelpCircle,
  Headphones,
  Mic,
  Camera,
  Video,
  Phone,
  Mail,
  Linkedin,
  Github,
  Upload,
  Edit,
  Eye,
  Share2,
  Download,
  DollarSign,
  Lock,
  Unlock,
  Bell,
  Filter,
  Search,
  Plus,
  ArrowRight,
  Activity,
  Zap,
  Gift,
  ExternalLink,
  PlayCircle,
  FileText,
  Users,
  Target,
  BarChart,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Receipt,
  Wallet,
  Tag,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  MoreVertical,
  X,
  Smartphone,
  Banknote,
  Book,
  Check,
  Coffee,
  Music,
  PenTool,
  Layout,
  Palette,
  Type as TypeIcon,
  Image,
  Film,
  Radio,
  Volume2,
  Tablet,
  Monitor,
  Watch,
  Airplay,
  Cast,
  Power,
  Wifi,
  Bluetooth,
  Battery,
  PieChart,
  LineChart,
  Briefcase,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Package,
  Box,
  Archive,
  Inbox,
  Send,
  MessageSquare,
  PhoneCall,
  Voicemail,
  MapPin,
  Map,
  Navigation,
  Compass,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Wind,
  Thermometer,
  Droplets,
  Umbrella,
  Cookie,
  Pizza,
  Apple,
  Carrot,
  Drumstick,
  Wine,
  Beer,
  Cocktail,
  Cpu,
  HardDrive,
  Database,
  Tv,
  Printer,
  Scanner,
  Keyboard,
  Mouse,
  Speaker,
  Gamepad,
  Joystick,
  Dice,
  Chess,
  Crown,
  Sword,
  Skull,
  Ghost,
  Smile,
  Frown,
  Meh,
  Laugh,
  Heart,
  Star,
  Bookmark,
  ThumbsDown,
  Award,
  Trophy,
  Medal,
  Flag,
  Fire,
  Droplet,
  Leaf,
  Tree,
  Flower,
  Feather,
  Bird,
  Fish,
  Cat,
  Dog,
  Rabbit,
  Whale,
  Octopus,
  Bug,
  Bee,
  Spider,
  Snake,
  Dragon,
  Horse,
  Car,
  Bike,
  Bus,
  Train,
  Plane,
  Rocket,
  Ship,
  Anchor,
  Globe,
  Mountain,
  Shield,
  ThumbsUp
} from 'lucide-react';

const PaymentsPage = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showAddCard, setShowAddCard] = useState(false);

  const tabs = [
    { id: 'history', label: 'Payment History' },
    { id: 'upcoming', label: 'Upcoming Payments', count: 2 },
    { id: 'methods', label: 'Payment Methods' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'refunds', label: 'Refund Requests' },
    { id: 'plans', label: 'Plans & Pricing' }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: 'Jan 15, 2024',
      amount: '₹25,000',
      description: 'Full Stack Development Course - Installment 3/4',
      method: 'Credit Card',
      status: 'success',
      invoice: 'INV-2024-0015',
      course: 'Full Stack Development',
      category: 'Tuition'
    },
    {
      id: 2,
      date: 'Jan 10, 2024',
      amount: '₹8,500',
      description: 'Advanced React Patterns Course',
      method: 'UPI',
      status: 'success',
      invoice: 'INV-2024-0010',
      course: 'Advanced React',
      category: 'Course Fee'
    },
    {
      id: 3,
      date: 'Jan 5, 2024',
      amount: '₹12,000',
      description: 'Database Design Course',
      method: 'Net Banking',
      status: 'success',
      invoice: 'INV-2024-0005',
      course: 'Database Design',
      category: 'Course Fee'
    },
    {
      id: 4,
      date: 'Dec 28, 2023',
      amount: '₹2,500',
      description: 'Certification Exam Fee',
      method: 'Credit Card',
      status: 'failed',
      invoice: 'INV-2023-1228',
      course: 'Certification',
      category: 'Exam Fee'
    },
    {
      id: 5,
      date: 'Dec 20, 2023',
      amount: '₹25,000',
      description: 'Full Stack Development Course - Installment 2/4',
      method: 'Credit Card',
      status: 'success',
      invoice: 'INV-2023-1220',
      course: 'Full Stack Development',
      category: 'Tuition'
    }
  ];

  const upcomingPayments = [
    {
      id: 1,
      dueDate: 'Feb 15, 2024',
      amount: '₹25,000',
      description: 'Full Stack Development Course - Final Installment',
      course: 'Full Stack Development',
      status: 'scheduled',
      autoPay: true
    },
    {
      id: 2,
      dueDate: 'Mar 1, 2024',
      amount: '₹15,000',
      description: 'UI/UX Design Course - First Installment',
      course: 'UI/UX Design',
      status: 'pending',
      autoPay: false
    }
  ];

  const paymentMethods = [
    {
      id: 'card1',
      type: 'credit-card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      name: 'Priya Sharma',
      default: true
    },
    {
      id: 'card2',
      type: 'credit-card',
      last4: '5555',
      brand: 'MasterCard',
      expiry: '08/24',
      name: 'Priya Sharma',
      default: false
    },
    {
      id: 'upi',
      type: 'upi',
      id: 'priya.sharma@oksbi',
      brand: 'Google Pay',
      default: false
    },
    {
      id: 'netbanking',
      type: 'bank',
      bank: 'HDFC Bank',
      account: 'XXXXXX1234',
      default: false
    }
  ];

  const invoices = [
    {
      id: 'INV-2024-0015',
      date: 'Jan 15, 2024',
      amount: '₹25,000',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2024-0010',
      date: 'Jan 10, 2024',
      amount: '₹8,500',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2024-0005',
      date: 'Jan 5, 2024',
      amount: '₹12,000',
      status: 'paid',
      downloadUrl: '#'
    }
  ];

  const refundRequests = [
    {
      id: 'REF-2023-001',
      date: 'Dec 28, 2023',
      amount: '₹2,500',
      description: 'Certification Exam Fee',
      status: 'pending',
      reason: 'Payment failed but amount deducted'
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: '₹15,000',
      period: 'per course',
      features: [
        'Access to course materials',
        'Basic assignments',
        'Email support',
        'Certificate of completion'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '₹25,000',
      period: 'per course',
      features: [
        'Everything in Basic',
        'Live sessions',
        'Project reviews',
        'Mentor support',
        'Career guidance'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '₹40,000',
      period: 'per course',
      features: [
        'Everything in Pro',
        '1:1 mentorship',
        'Interview preparation',
        'Placement assistance',
        'Lifetime access'
      ],
      popular: false
    }
  ];

  const scholarships = [
    {
      name: 'Merit Scholarship',
      discount: '25%',
      criteria: 'Maintain 90%+ grade',
      status: 'active'
    },
    {
      name: 'Early Bird Discount',
      discount: '15%',
      criteria: 'Enroll 30 days before start',
      status: 'upcoming'
    }
  ];

  const taxDocuments = [
    { year: '2023-24', type: 'Form 16A', status: 'available' },
    { year: '2022-23', type: 'Form 16A', status: 'available' },
    { year: '2021-22', type: 'Form 16A', status: 'available' }
  ];

  const StatusBadge = ({ status }) => {
    const config = {
      success: { bg: 'bg-[#ECFEFF]', text: 'text-[#5BD1D7]', label: 'Success' },
      failed: { bg: 'bg-[#ECFEFF]', text: 'text-[#FF6B6B]', label: 'Failed' },
      pending: { bg: 'bg-[#ECFEFF]', text: 'text-[#FFA726]', label: 'Pending' },
      scheduled: { bg: 'bg-[#ECFEFF]', text: 'text-[#14BDEE]', label: 'Scheduled' },
      paid: { bg: 'bg-[#ECFEFF]', text: 'text-[#5BD1D7]', label: 'Paid' }
    };
    const { bg, text, label } = config[status];
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${bg} ${text}`}>
        {label}
      </span>
    );
  };

  const PaymentCard = ({ payment }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow hover:border-[#14BDEE]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={payment.status} />
            <span className="text-xs text-[#76777A]">{payment.date}</span>
          </div>
          <div className="font-bold text-[#384158] text-lg">{payment.amount}</div>
          <div className="text-sm text-[#76777A] mt-1">{payment.description}</div>
          <div className="flex items-center gap-3 mt-2">
            <div className="text-xs text-[#76777A]">{payment.method}</div>
            <span className="text-gray-400">•</span>
            <div className="text-xs text-[#76777A]">{payment.course}</div>
            <span className="text-gray-400">•</span>
            <div className="text-xs text-[#76777A]">{payment.category}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-xs text-[#76777A]">Invoice</div>
            <div className="text-sm font-medium text-[#384158]">{payment.invoice}</div>
          </div>
          <button 
            onClick={() => setSelectedPayment(payment)}
            className="p-2 hover:bg-[#EFF6FF] rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-[#76777A]" />
          </button>
        </div>
      </div>
    </div>
  );

  const PaymentMethodCard = ({ method }) => (
    <div className={`bg-white border rounded-xl p-4 ${
      method.default ? 'border-[#14BDEE] bg-[#ECFEFF]' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            method.type === 'credit-card' ? 'bg-[#ECFEFF]' :
            method.type === 'upi' ? 'bg-[#ECFEFF]' :
            'bg-[#ECFEFF]'
          }`}>
            {method.type === 'credit-card' ? (
              <CreditCard className="w-6 h-6 text-[#14BDEE]" />
            ) : method.type === 'upi' ? (
              <Smartphone className="w-6 h-6 text-[#5BD1D7]" />
            ) : (
              <Banknote className="w-6 h-6 text-[#60A5FA]" />
            )}
          </div>
          <div>
            <div className="font-medium text-[#384158]">
              {method.type === 'credit-card' ? `${method.brand} •••• ${method.last4}` :
               method.type === 'upi' ? `${method.brand}` :
               `${method.bank}`}
            </div>
            <div className="text-sm text-[#76777A] mt-1">
              {method.type === 'credit-card' ? `Expires ${method.expiry}` :
               method.type === 'upi' ? method.id :
               `Account •••• ${method.account}`}
            </div>
            {method.name && (
              <div className="text-sm text-[#76777A]">{method.name}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {method.default && (
            <span className="px-2 py-1 bg-[#ECFEFF] text-[#14BDEE] text-xs rounded-full">
              Default
            </span>
          )}
          <div className="flex gap-2">
            {!method.default && (
              <button className="px-3 py-1 text-sm text-[#14BDEE] hover:text-[#0DA8D4] transition-colors">
                Set Default
              </button>
            )}
            <button className="px-3 py-1 text-sm text-[#FF6B6B] hover:text-[#E53935] transition-colors">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PlanCard = ({ plan }) => (
    <div className={`bg-white border rounded-xl p-6 ${
      plan.popular 
        ? 'border-[#14BDEE] shadow-lg relative' 
        : 'border-gray-200'
    }`}>
      {plan.popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="px-4 py-1 bg-[#14BDEE] text-white text-sm font-medium rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-[#384158]">{plan.name}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold text-[#384158]">{plan.price}</span>
          <span className="text-[#76777A]">/{plan.period}</span>
        </div>
      </div>
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="text-sm text-[#76777A] flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#5BD1D7] flex-shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
        plan.popular
          ? 'bg-[#14BDEE] text-white hover:bg-[#0DA8D4]'
          : 'bg-[#EFF6FF] text-[#384158] hover:bg-[#ECFEFF]'
      }`}>
        Choose Plan
      </button>
    </div>
  );

  const filteredPayments = paymentHistory.filter(payment => 
    payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6 bg-[#EFF6FF] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#384158]">Payments</h1>
          <p className="text-[#76777A]">Manage your payments, invoices, and billing</p>
        </div>
        <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Make Payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#384158]">₹70,500</div>
          <div className="text-sm text-[#76777A]">Total Paid</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#FFA726]">₹40,000</div>
          <div className="text-sm text-[#76777A]">Upcoming Payments</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#5BD1D7]">5</div>
          <div className="text-sm text-[#76777A]">Successful Payments</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#FF6B6B]">1</div>
          <div className="text-sm text-[#76777A]">Failed Payments</div>
        </div>
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
                {tab.count && (
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
                  placeholder="Search payments..."
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
            <button className="px-4 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Statements
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#384158]">Payment History</h3>
              <div className="space-y-3">
                {filteredPayments.map(payment => (
                  <PaymentCard key={payment.id} payment={payment} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#384158]">Upcoming Payments</h3>
              <div className="space-y-4">
                {upcomingPayments.map(payment => (
                  <div key={payment.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#14BDEE] transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-[#76777A]" />
                          <span className="text-sm font-medium text-[#384158]">
                            Due {payment.dueDate}
                          </span>
                          {payment.autoPay && (
                            <span className="px-2 py-1 bg-[#ECFEFF] text-[#5BD1D7] text-xs rounded-full">
                              Auto-pay enabled
                            </span>
                          )}
                        </div>
                        <div className="font-bold text-[#384158] text-xl">{payment.amount}</div>
                        <div className="text-sm text-[#76777A] mt-1">{payment.description}</div>
                        <div className="text-sm text-[#76777A] mt-2">{payment.course}</div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
                          Pay Now
                        </button>
                        {payment.autoPay && (
                          <button className="text-sm text-[#FF6B6B] hover:text-[#E53935] transition-colors">
                            Disable Auto-pay
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Installment Plan */}
              <div className="bg-[#ECFEFF] border border-[#14BDEE] rounded-xl p-6">
                <h4 className="font-medium text-[#384158] mb-4">Installment Plan</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#14BDEE]">Full Stack Development Course</span>
                      <span className="font-medium text-[#384158]">₹75,000</span>
                    </div>
                    <div className="h-2 bg-[#EFF6FF] rounded-full overflow-hidden">
                      <div className="h-full bg-[#14BDEE]" style={{ width: '75%' }} />
                    </div>
                    <div className="flex justify-between text-xs text-[#14BDEE] mt-1">
                      <span>3/4 installments paid</span>
                      <span>₹25,000 remaining</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'methods' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#384158]">Payment Methods</h3>
                <button 
                  onClick={() => setShowAddCard(true)}
                  className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Method
                </button>
              </div>
              
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <PaymentMethodCard key={method.id} method={method} />
                ))}
              </div>

              {/* Add Card Form */}
              {showAddCard && (
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-[#384158]">Add New Card</h4>
                    <button 
                      onClick={() => setShowAddCard(false)}
                      className="p-2 hover:bg-[#EFF6FF] rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-[#76777A]" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#384158] mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#384158] mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#384158] mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#384158] mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="Priya Sharma"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="default" className="rounded" />
                      <label htmlFor="default" className="text-sm text-[#384158]">
                        Set as default payment method
                      </label>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-3 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors font-medium">
                        Add Card
                      </button>
                      <button 
                        onClick={() => setShowAddCard(false)}
                        className="px-4 py-3 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#384158]">Invoices</h3>
                <button className="px-4 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
                  Request All Invoices
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-[#384158]">Invoice ID</th>
                      <th className="text-left py-3 text-sm font-medium text-[#384158]">Date</th>
                      <th className="text-left py-3 text-sm font-medium text-[#384158]">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-[#384158]">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-[#384158]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map(invoice => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-[#EFF6FF] transition-colors">
                        <td className="py-3 text-sm font-medium text-[#384158]">{invoice.id}</td>
                        <td className="py-3 text-sm text-[#76777A]">{invoice.date}</td>
                        <td className="py-3 text-sm font-medium text-[#384158]">{invoice.amount}</td>
                        <td className="py-3">
                          <StatusBadge status={invoice.status} />
                        </td>
                        <td className="py-3">
                          <button className="text-sm text-[#14BDEE] hover:text-[#0DA8D4] transition-colors flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'refunds' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#384158]">Refund Requests</h3>
              <div className="space-y-3">
                {refundRequests.map(request => (
                  <div key={request.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#14BDEE] transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-[#384158]">{request.id}</span>
                          <StatusBadge status={request.status} />
                        </div>
                        <div className="font-bold text-[#384158]">{request.amount}</div>
                        <div className="text-sm text-[#76777A] mt-1">{request.description}</div>
                        <div className="text-sm text-[#76777A] mt-2">Reason: {request.reason}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#76777A]">{request.date}</div>
                        <button className="mt-2 text-sm text-[#14BDEE] hover:text-[#0DA8D4] transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="space-y-8">
              {/* Pricing Plans */}
              <div>
                <h3 className="text-lg font-semibold text-[#384158] mb-6">Course Plans & Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pricingPlans.map(plan => (
                    <PlanCard key={plan.name} plan={plan} />
                  ))}
                </div>
              </div>

              {/* Scholarships & Discounts */}
              <div className="bg-gradient-to-r from-[#ECFEFF] to-[#EFF6FF] rounded-xl p-6 border border-[#14BDEE]">
                <h4 className="font-medium text-[#384158] mb-4">Scholarships & Discounts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scholarships.map(scholarship => (
                    <div key={scholarship.name} className="bg-white rounded-lg p-4 hover:border-[#14BDEE] border border-gray-200 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-[#384158]">{scholarship.name}</div>
                        <span className="text-lg font-bold text-[#5BD1D7]">{scholarship.discount}</span>
                      </div>
                      <div className="text-sm text-[#76777A]">{scholarship.criteria}</div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          scholarship.status === 'active' 
                            ? 'bg-[#ECFEFF] text-[#5BD1D7]' 
                            : 'bg-[#ECFEFF] text-[#14BDEE]'
                        }`}>
                          {scholarship.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax Documents */}
              <div>
                <h4 className="font-medium text-[#384158] mb-4">Tax Documents</h4>
                <div className="space-y-3">
                  {taxDocuments.map(doc => (
                    <div key={doc.year} className="flex items-center justify-between p-3 bg-[#EFF6FF] rounded-lg hover:bg-[#ECFEFF] transition-colors">
                      <div>
                        <div className="font-medium text-[#384158]">{doc.year}</div>
                        <div className="text-sm text-[#76777A]">{doc.type}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          doc.status === 'available' 
                            ? 'bg-[#ECFEFF] text-[#5BD1D7]' 
                            : 'bg-[#EFF6FF] text-[#76777A]'
                        }`}>
                          {doc.status}
                        </span>
                        <button className="text-sm text-[#14BDEE] hover:text-[#0DA8D4] transition-colors">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#384158]">Payment Details</h3>
                  <p className="text-[#76777A]">{selectedPayment.invoice}</p>
                </div>
                <button 
                  onClick={() => setSelectedPayment(null)}
                  className="p-2 hover:bg-[#EFF6FF] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#76777A]" />
                </button>
              </div>

              {/* Payment Info */}
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#76777A]">Amount</div>
                  <div className="text-2xl font-bold text-[#384158]">{selectedPayment.amount}</div>
                </div>
                <div>
                  <div className="text-sm text-[#76777A]">Date</div>
                  <div className="font-medium text-[#384158]">{selectedPayment.date}</div>
                </div>
                <div>
                  <div className="text-sm text-[#76777A]">Description</div>
                  <div className="font-medium text-[#384158]">{selectedPayment.description}</div>
                </div>
                <div>
                  <div className="text-sm text-[#76777A]">Payment Method</div>
                  <div className="font-medium text-[#384158]">{selectedPayment.method}</div>
                </div>
                <div>
                  <div className="text-sm text-[#76777A]">Status</div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedPayment.status} />
                    {selectedPayment.status === 'failed' && (
                      <button className="text-sm text-[#14BDEE] hover:text-[#0DA8D4] transition-colors">
                        Retry Payment
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <button className="flex-1 px-4 py-3 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors font-medium">
                  Download Invoice
                </button>
                <button className="px-4 py-3 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#14BDEE] transition-colors">
        <h3 className="font-semibold text-[#384158] mb-4">Payment Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-[#76777A]">Total Paid This Month</span>
            <span className="font-bold text-[#384158]">₹33,500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#76777A]">Total Paid This Year</span>
            <span className="font-bold text-[#384158]">₹70,500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#76777A]">Upcoming Payments</span>
            <span className="font-bold text-[#FFA726]">₹40,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#76777A]">Pending Refunds</span>
            <span className="font-bold text-[#FF6B6B]">₹2,500</span>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between font-bold text-lg">
              <span className="text-[#384158]">Balance Due</span>
              <span className="text-[#14BDEE]">₹40,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;