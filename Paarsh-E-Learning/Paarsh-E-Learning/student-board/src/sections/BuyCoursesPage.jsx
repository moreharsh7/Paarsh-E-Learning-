// src/sections/BuyCoursesPage.jsx - COMPLETE UPDATED VERSION (Without Categories Filter)
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, ShoppingCart, Star, Clock, Users,
  Search, Eye, Shield, Book,
  ChevronRight, Plus, Minus, X, Check,
  Calendar, BarChart, BookOpen, Filter
} from 'lucide-react';
import { getCourses, batchEnrollCourses, getCategories } from '../services/api';

// Static Level Filters
const LEVEL_FILTERS = [
  { id: 'all', name: 'All Levels', color: 'gray' },
  { id: 'beginner', name: 'Beginner', color: 'green' },
  { id: 'intermediate', name: 'Intermediate', color: 'blue' },
  { id: 'advanced', name: 'Advanced', color: 'purple' },
];

// Static Price Ranges
const PRICE_RANGES = [
  { id: 'all', name: 'All Prices', color: 'gray' },
  { id: 'under-5000', name: 'Under ₹5,000', color: 'green' },
  { id: '5000-10000', name: '₹5,000 - ₹10,000', color: 'blue' },
  { id: 'over-10000', name: 'Over ₹10,000', color: 'red' },
];

const BuyCoursesPage = ({ setCurrentPage }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // FILTER STATES
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCourseDetail, setShowCourseDetail] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Fetch courses only (no categories)
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Fetch only courses
      const coursesData = await getCourses();
      
      console.log('Fetched courses:', coursesData);
      
      if (coursesData && coursesData.length > 0) {
        // Process and validate courses
        const validatedCourses = coursesData.map(course => {
          // Use fee from your schema as price
          const price = parseFloat(course.fee) || 0;
          const originalPrice = price;
          
          // Get category info if available
          let categoryName = 'General';
          if (course.category) {
            if (typeof course.category === 'object' && course.category.subDomain) {
              categoryName = course.category.subDomain;
            } else if (course.categoryName) {
              categoryName = course.categoryName;
            }
          }
          
          return {
            ...course,
            // Map your schema fields to expected fields
            price: price,
            originalPrice: originalPrice,
            discount: course.discount || 0,
            rating: parseFloat(course.averageRating) || 4.5,
            reviews: parseInt(course.ratingCount) || 0,
            studentsEnrolled: parseInt(course.enrolledCount) || 0,
            // Store category info for display only
            categoryName: categoryName,
            level: course.level || 'beginner',
            duration: course.duration || 'Lifetime Access',
            instructor: course.instructor || { name: 'Instructor' },
            features: course.courseIncludes || [],
            shortDescription: course.shortDescription || 'No description available',
            description: course.fullDescription || course.shortDescription || 'No description available',
            thumbnail: course.thumbnail || '',
            // Map other fields from your schema if needed
            languages: course.languages || ['English'],
            certificate: course.certificate || false,
            tags: course.tags || []
          };
        });
        
        setCourses(validatedCourses);
        setFilteredCourses(validatedCourses);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      // Fallback to sample data
      const { sampleCourses } = getSampleData();
      setCourses(sampleCourses);
      setFilteredCourses(sampleCourses);
    } finally {
      setLoading(false);
    }
  };

  // Sample data for fallback
  const getSampleData = () => {
    const sampleCourses = [
      {
        _id: '1',
        title: 'Data Analytics',
        instructor: { name: 'Prof. A.N. Gharu' },
        shortDescription: 'Learn data analysis using Excel, SQL, Power',
        fee: 4999,
        price: 4999,
        originalPrice: 4999,
        discount: 0,
        averageRating: 4.5,
        ratingCount: 124,
        enrolledCount: 2345,
        studentsEnrolled: 2345,
        level: 'beginner',
        categoryName: 'Data Analytics',
        thumbnail: '',
        duration: '8 weeks',
        courseIncludes: ['Excel', 'SQL', 'Power BI', 'Data Visualization'],
        features: ['Excel', 'SQL', 'Power BI', 'Data Visualization'],
        languages: ['English'],
        certificate: true,
        tags: ['Data', 'Analytics', 'Excel']
      },
      {
        _id: '2',
        title: 'Full Stack Web Development',
        instructor: { name: 'Prof. Vandana Pawar' },
        shortDescription: 'Learn to build complete web applications',
        fee: 8999,
        price: 8999,
        originalPrice: 8999,
        discount: 0,
        averageRating: 4.8,
        ratingCount: 456,
        enrolledCount: 5678,
        studentsEnrolled: 5678,
        level: 'intermediate',
        categoryName: 'Web Development',
        thumbnail: '',
        duration: '12 weeks',
        courseIncludes: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        features: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        languages: ['English'],
        certificate: true,
        tags: ['Web', 'Development', 'Full Stack']
      },
      {
        _id: '3',
        title: 'Artificial Intelligence',
        instructor: { name: 'Prof. Vandana Pawar' },
        shortDescription: 'Understand core concepts of Artificial Intelligence',
        fee: 11999,
        price: 11999,
        originalPrice: 11999,
        discount: 0,
        averageRating: 4.7,
        ratingCount: 289,
        enrolledCount: 3456,
        studentsEnrolled: 3456,
        level: 'advanced',
        categoryName: 'AI & Machine Learning',
        thumbnail: '',
        duration: '16 weeks',
        courseIncludes: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Python'],
        features: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Python'],
        languages: ['English'],
        certificate: true,
        tags: ['AI', 'Machine Learning', 'Python']
      },
      {
        _id: '4',
        title: 'Generative AI',
        instructor: { name: 'Prof. Vandana Pawar' },
        shortDescription: 'Learn LLMs, prompt engineering, and AI',
        fee: 14999,
        price: 14999,
        originalPrice: 14999,
        discount: 0,
        averageRating: 4.9,
        ratingCount: 178,
        enrolledCount: 2987,
        studentsEnrolled: 2987,
        level: 'advanced',
        categoryName: 'AI & Machine Learning',
        thumbnail: '',
        duration: '10 weeks',
        courseIncludes: ['LLMs', 'Prompt Engineering', 'AI Applications', 'Ethics in AI'],
        features: ['LLMs', 'Prompt Engineering', 'AI Applications', 'Ethics in AI'],
        languages: ['English'],
        certificate: true,
        tags: ['AI', 'Generative AI', 'LLM']
      }
    ];
    
    return { sampleCourses };
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...courses];

    // Apply level filter
    if (selectedLevel !== 'all') {
      result = result.filter(course => 
        course.level && course.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    // Apply price filter (using fee field from your schema)
    if (selectedPrice !== 'all') {
      const coursePrice = (course) => parseFloat(course.price) || parseFloat(course.fee) || 0;
      
      switch(selectedPrice) {
        case 'under-5000':
          result = result.filter(course => {
            const price = coursePrice(course);
            return price > 0 && price <= 5000;
          });
          break;
        case '5000-10000':
          result = result.filter(course => {
            const price = coursePrice(course);
            return price > 5000 && price <= 10000;
          });
          break;
        case 'over-10000':
          result = result.filter(course => {
            const price = coursePrice(course);
            return price > 10000;
          });
          break;
      }
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(course =>
        course.title.toLowerCase().includes(term) ||
        (course.shortDescription && course.shortDescription.toLowerCase().includes(term)) ||
        (course.instructor?.name && course.instructor.name.toLowerCase().includes(term)) ||
        (course.categoryName && course.categoryName.toLowerCase().includes(term)) ||
        (course.tags && course.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => {
          const priceA = parseFloat(a.price) || parseFloat(a.fee) || 0;
          const priceB = parseFloat(b.price) || parseFloat(b.fee) || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const priceA = parseFloat(a.price) || parseFloat(a.fee) || 0;
          const priceB = parseFloat(b.price) || parseFloat(b.fee) || 0;
          return priceB - priceA;
        });
        break;
      case 'rating':
        result.sort((a, b) => {
          const ratingA = parseFloat(a.rating) || parseFloat(a.averageRating) || 0;
          const ratingB = parseFloat(b.rating) || parseFloat(b.averageRating) || 0;
          return ratingB - ratingA;
        });
        break;
      case 'popular':
      default:
        result.sort((a, b) => {
          const enrolledA = parseInt(a.studentsEnrolled) || parseInt(a.enrolledCount) || 0;
          const enrolledB = parseInt(b.studentsEnrolled) || parseInt(b.enrolledCount) || 0;
          return enrolledB - enrolledA;
        });
        break;
    }

    setFilteredCourses(result);
  }, [selectedLevel, selectedPrice, searchTerm, sortBy, courses]);

  // Cart functions
  const addToCart = (course) => {
    if (!cartItems.find(item => item.id === course._id)) {
      const price = parseFloat(course.price) || parseFloat(course.fee) || 0;
      const originalPrice = parseFloat(course.originalPrice) || price || 0;
      
      setCartItems(prev => [...prev, { 
        id: course._id, 
        title: course.title, 
        price: price,
        originalPrice: originalPrice,
        instructor: course.instructor?.name,
        thumbnail: course.thumbnail,
        quantity: 1 
      }]);
    }
  };

  const removeFromCart = (courseId) => {
    setCartItems(prev => prev.filter(item => item.id !== courseId));
  };

  const updateQuantity = (courseId, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === courseId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    const amount = parseFloat(price) || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Course detail functions
  const openCourseDetail = (course) => {
    setShowCourseDetail(course);
  };

  const closeCourseDetail = () => {
    setShowCourseDetail(null);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedLevel('all');
    setSelectedPrice('all');
    setSearchTerm('');
  };

  const CourseCard = ({ course }) => {
    const isInCart = cartItems.some(item => item.id === course._id);
    const coursePrice = parseFloat(course.price) || parseFloat(course.fee) || 0;
    const originalPrice = parseFloat(course.originalPrice) || coursePrice;
    const discount = originalPrice > coursePrice && originalPrice > 0
      ? Math.round(((originalPrice - coursePrice) / originalPrice) * 100)
      : (course.discount || 0);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Course Image */}
        <div className="relative h-40 bg-gradient-to-br from-blue-50 to-cyan-50">
          {course.thumbnail ? (
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center">
                    <div class="text-blue-400">
                      <BookOpen class="w-10 h-10" />
                    </div>
                  </div>
                `;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
          )}
          {course.certificate && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
              Certificate
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 text-sm">{course.title}</h3>
          <p className="text-xs text-gray-600 mb-2">{course.instructor?.name || 'Instructor'}</p>
          
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {course.shortDescription || 'Learn valuable skills'}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="font-medium">{(parseFloat(course.rating) || parseFloat(course.averageRating) || 0).toFixed(1)}</span>
              <span>({parseInt(course.reviews) || parseInt(course.ratingCount) || 0})</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{(parseInt(course.studentsEnrolled) || parseInt(course.enrolledCount) || 0).toLocaleString()}</span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800">{formatPrice(coursePrice)}</div>
              {originalPrice > coursePrice && (
                <div className="text-xs text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </div>
              )}
            </div>
            
            <div className="flex gap-1">
              {/* View Button */}
              <button
                onClick={() => openCourseDetail(course)}
                className="p-1.5 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors"
                title="View Details"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              
              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(course)}
                disabled={isInCart}
                className={`p-1.5 rounded transition-colors ${
                  isInCart
                    ? 'bg-green-100 text-green-600 cursor-default'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                title={isInCart ? "Already in Cart" : "Add to Cart"}
              >
                {isInCart ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <ShoppingCart className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    setCheckoutLoading(true);
    try {
      const courseIds = cartItems.map(item => item.id);
      await batchEnrollCourses(courseIds);
      alert('Successfully enrolled in courses!');
      setCartItems([]);
      setShowCart(false);
    } catch (error) {
      alert('Checkout failed: ' + error.message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 text-gray-600 font-medium">Loading courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Compact Cart */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Buy Courses</h1>
            <p className="text-sm text-gray-500 mt-1">Explore and enroll in premium courses</p>
          </div>
          
          {/* Compact Cart Icon */}
          <div className="relative">
            <button
              onClick={() => setShowCart(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Cart Summary Banner */}
      {cartItems.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 py-3 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <ShoppingCart className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart</span>
              <span className="text-blue-900 mx-2">•</span>
              <span className="font-bold text-blue-900">{formatPrice(calculateTotal())}</span>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              View Cart
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses by title, instructor, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>
        </div>

        {/* Main Content with Filters */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters (Only Skill Level and Price Range) */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                {(selectedLevel !== 'all' || selectedPrice !== 'all' || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Skill Level Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-700 mb-4">Skill Level</h3>
                <div className="space-y-2">
                  {LEVEL_FILTERS.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`flex items-center w-full p-3 rounded-lg transition-all ${
                        selectedLevel === level.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        level.color === 'gray' ? 'bg-gray-500' :
                        level.color === 'green' ? 'bg-green-500' :
                        level.color === 'blue' ? 'bg-blue-500' :
                        'bg-purple-500'
                      }`}></div>
                      <span className="text-gray-700">{level.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-4">Price Range</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map(price => (
                    <button
                      key={price.id}
                      onClick={() => setSelectedPrice(price.id)}
                      className={`flex items-center w-full p-3 rounded-lg transition-all ${
                        selectedPrice === price.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        price.color === 'gray' ? 'bg-gray-500' :
                        price.color === 'green' ? 'bg-green-500' :
                        price.color === 'blue' ? 'bg-blue-500' :
                        'bg-red-500'
                      }`}></div>
                      <span className="text-gray-700">{price.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-bold text-gray-800">{filteredCourses.length}</span> of{" "}
                  <span className="font-bold text-gray-800">{courses.length}</span> courses
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Courses Grid */}
          <div className="lg:w-3/4">
            {/* Sort Options */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Available Courses</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredCourses.length === courses.length 
                    ? "All available courses" 
                    : `Filtered courses (${filteredCourses.length} results)`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedLevel !== 'all' || selectedPrice !== 'all') && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedLevel !== 'all' && (
                  <div className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                    Level: {LEVEL_FILTERS.find(l => l.id === selectedLevel)?.name}
                    <button onClick={() => setSelectedLevel('all')} className="text-purple-600 hover:text-purple-800">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {selectedPrice !== 'all' && (
                  <div className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                    Price: {PRICE_RANGES.find(p => p.id === selectedPrice)?.name}
                    <button onClick={() => setSelectedPrice('all')} className="text-green-600 hover:text-green-800">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <div className="text-gray-700 font-medium text-lg mb-2">No courses found</div>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      {showCourseDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Course Details</h2>
              <button
                onClick={closeCourseDetail}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2">
                  {/* Course Image */}
                  <div className="h-48 lg:h-64 rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-blue-100 to-cyan-100">
                    {showCourseDetail.thumbnail ? (
                      <img 
                        src={showCourseDetail.thumbnail} 
                        alt={showCourseDetail.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-blue-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Title and Instructor */}
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {showCourseDetail.title}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    By <span className="font-medium">{showCourseDetail.instructor?.name || 'Expert Instructor'}</span>
                    {showCourseDetail.instructor?.designation && (
                      <span className="text-gray-500 ml-2">({showCourseDetail.instructor.designation})</span>
                    )}
                  </p>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {showCourseDetail.description || showCourseDetail.shortDescription || 'No description available.'}
                    </p>
                  </div>
                  
                  {/* What You'll Learn */}
                  {showCourseDetail.features && showCourseDetail.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-3">What You'll Learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {showCourseDetail.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Languages */}
                  {showCourseDetail.languages && showCourseDetail.languages.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-2">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {showCourseDetail.languages.map((language, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Right Column - Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-5 sticky top-4">
                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-bold text-gray-800">
                          {formatPrice(showCourseDetail.price)}
                        </span>
                        {showCourseDetail.originalPrice > showCourseDetail.price && (
                          <span className="text-lg text-gray-400 line-through">
                            {formatPrice(showCourseDetail.originalPrice)}
                          </span>
                        )}
                      </div>
                      {showCourseDetail.discount > 0 && (
                        <div className="inline-block bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded">
                          {showCourseDetail.discount}% OFF
                        </div>
                      )}
                      {showCourseDetail.certificate && (
                        <div className="inline-block bg-green-100 text-green-600 text-sm font-medium px-2 py-1 rounded ml-2">
                          Certificate Included
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          addToCart(showCourseDetail);
                          closeCourseDetail();
                        }}
                        className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                          cartItems.some(item => item.id === showCourseDetail._id)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {cartItems.some(item => item.id === showCourseDetail._id) ? (
                          <>
                            <Check className="w-5 h-5" />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => {
                          addToCart(showCourseDetail);
                          setShowCart(true);
                          closeCourseDetail();
                        }}
                        className="w-full py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                    
                    {/* Course Details */}
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Duration: {showCourseDetail.duration || 'Lifetime Access'}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <BarChart className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Level: {showCourseDetail.level ? showCourseDetail.level.charAt(0).toUpperCase() + showCourseDetail.level.slice(1) : 'All Levels'}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Category: {showCourseDetail.categoryName || 'General'}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Enrolled: {showCourseDetail.studentsEnrolled || showCourseDetail.enrolledCount || 0} students</span>
                      </div>
                      
                      {showCourseDetail.tags && showCourseDetail.tags.length > 0 && (
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex flex-wrap gap-1">
                            {showCourseDetail.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Guarantee Badge */}
                    <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-700">30-Day Money-Back Guarantee</span>
                      </div>
                      <p className="text-xs text-blue-600">
                        Full refund if you're not satisfied with the course quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800">Shopping Cart</h3>
                <p className="text-sm text-gray-500">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <div className="text-gray-600 font-medium">Your cart is empty</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        {item.thumbnail && (
                          <div className="w-12 h-10 bg-gray-100 rounded overflow-hidden">
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-800 truncate">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.instructor}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div className="text-right w-20">
                          <div className="font-bold text-blue-600 text-sm">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 ml-1"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-800">Total:</div>
                    <div className="text-xl font-bold text-blue-600">{formatPrice(calculateTotal())}</div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                  
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyCoursesPage;