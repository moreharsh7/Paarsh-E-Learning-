const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const sampleCourses = [
  // ==================== PROGRAMMING LANGUAGE ====================
  {
    title: 'C Language (Programming Fundamentals & Logic Building)',
    shortDescription: 'Master programming fundamentals, logic building, and problem-solving with C language',
    fullDescription: 'Learn C programming from scratch. Cover variables, loops, functions, arrays, pointers, memory management, and data structures. Perfect for building strong programming foundation.',
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    duration: '3 months',
    level: 'Beginner',
    category: 'Programming',
    instructor: {
      name: 'Prof. Rajesh Kumar',
      bio: 'Computer Science Professor with 15+ years of teaching experience',
      designation: 'Senior Faculty'
    },
    features: ['Basic Syntax', 'Control Structures', 'Functions', 'Arrays', 'Pointers', 'File Handling'],
    studentsEnrolled: 3200,
    rating: 4.7,
    reviews: 450,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'C++ Language (OOPs & Competitive Programming)',
    shortDescription: 'Learn Object-Oriented Programming and competitive coding with C++',
    fullDescription: 'Master C++ programming with OOP concepts, STL, and competitive programming techniques. Prepare for coding interviews and programming contests.',
    price: 4999,
    originalPrice: 8999,
    discount: 45,
    duration: '4 months',
    level: 'Intermediate',
    category: 'Programming',
    instructor: {
      name: 'Dr. Ankit Sharma',
      bio: 'Competitive Programming Coach, Ex-Amazon Engineer',
      designation: 'Lead Instructor'
    },
    features: ['OOP Concepts', 'STL', 'Templates', 'Exception Handling', 'Competitive Coding'],
    studentsEnrolled: 2800,
    rating: 4.8,
    reviews: 380,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Python Programming (Core Python & Automation)',
    shortDescription: 'Learn Python from basics to automation and web scraping',
    fullDescription: 'Complete Python programming course covering fundamentals, data structures, file handling, automation, web scraping, and building real-world applications.',
    price: 3999,
    originalPrice: 7999,
    discount: 50,
    duration: '3 months',
    level: 'Beginner',
    category: 'Programming',
    instructor: {
      name: 'Priya Patel',
      bio: 'Python Developer & Data Scientist with 8+ years experience',
      designation: 'Senior Python Developer'
    },
    features: ['Core Python', 'Automation', 'Web Scraping', 'GUI Applications', 'File Handling'],
    studentsEnrolled: 4200,
    rating: 4.9,
    reviews: 520,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec9?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Java Programming (Core Java & OOPs Concepts)',
    shortDescription: 'Master Java programming with deep understanding of OOPs concepts',
    fullDescription: 'Comprehensive Java course covering core Java, OOP principles, collections framework, multithreading, JDBC, and building enterprise applications.',
    price: 4499,
    originalPrice: 8499,
    discount: 47,
    duration: '4 months',
    level: 'Beginner',
    category: 'Programming',
    instructor: {
      name: 'Rahul Verma',
      bio: 'Java Architect with 12+ years of enterprise development experience',
      designation: 'Java Architect'
    },
    features: ['Core Java', 'OOPs', 'Collections', 'Multithreading', 'JDBC', 'Spring Framework'],
    studentsEnrolled: 3100,
    rating: 4.6,
    reviews: 420,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop',
    status: 'active'
  },

  // ==================== WEB & SOFTWARE DEVELOPMENT ====================
  {
    title: 'Full Stack Web Development',
    shortDescription: 'Build complete web applications with HTML, CSS, JavaScript, React.js & Database',
    fullDescription: 'Learn frontend with HTML, CSS, JavaScript, React and backend with Node.js, Express, MongoDB. Build full-stack applications from scratch.',
    price: 12999,
    originalPrice: 19999,
    discount: 35,
    duration: '6 months',
    level: 'Advanced',
    category: 'Web Development',
    instructor: {
      name: 'Siddharth Rao',
      bio: 'Full Stack Developer with 10+ years experience, Ex-Facebook',
      designation: 'Lead Full Stack Developer'
    },
    features: ['HTML/CSS', 'JavaScript', 'React.js', 'Node.js', 'MongoDB', 'REST APIs'],
    studentsEnrolled: 1850,
    rating: 4.8,
    reviews: 342,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Java Full Stack Development',
    shortDescription: 'Master Core Java, Spring Boot & Enterprise Applications development',
    fullDescription: 'Complete Java Full Stack development course covering Core Java, Spring Boot, Microservices, React, and building enterprise-grade applications.',
    price: 14999,
    originalPrice: 22999,
    discount: 35,
    duration: '7 months',
    level: 'Advanced',
    category: 'Web Development',
    instructor: {
      name: 'Anjali Singh',
      bio: 'Java Enterprise Architect with 15+ years experience',
      designation: 'Senior Java Architect'
    },
    features: ['Core Java', 'Spring Boot', 'Microservices', 'React', 'Docker', 'AWS'],
    studentsEnrolled: 1250,
    rating: 4.7,
    reviews: 280,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Python Full Stack Development',
    shortDescription: 'Master Python backend, automation, and APIs development',
    fullDescription: 'Learn Django, Flask, REST APIs, automation, and build complete Python web applications with frontend integration.',
    price: 11999,
    originalPrice: 18999,
    discount: 37,
    duration: '6 months',
    level: 'Intermediate',
    category: 'Web Development',
    instructor: {
      name: 'Neha Gupta',
      bio: 'Python Full Stack Developer with 8+ years experience',
      designation: 'Senior Python Developer'
    },
    features: ['Django', 'Flask', 'REST APIs', 'PostgreSQL', 'React', 'Docker'],
    studentsEnrolled: 1450,
    rating: 4.8,
    reviews: 310,
    bestSeller: false,
    thumbnail: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'PHP Web Development',
    shortDescription: 'Master Core PHP, MySQL & build web applications',
    fullDescription: 'Learn PHP programming, MySQL database, Laravel framework, and build dynamic web applications with user authentication and payment integration.',
    price: 8999,
    originalPrice: 14999,
    discount: 40,
    duration: '4 months',
    level: 'Intermediate',
    category: 'Web Development',
    instructor: {
      name: 'Amit Kumar',
      bio: 'PHP Developer with 10+ years experience in web development',
      designation: 'Senior PHP Developer'
    },
    features: ['Core PHP', 'MySQL', 'Laravel', 'REST APIs', 'Authentication', 'Payment Gateway'],
    studentsEnrolled: 2100,
    rating: 4.6,
    reviews: 380,
    bestSeller: false,
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'MERN Stack Development',
    shortDescription: 'Build modern web applications with MongoDB, Express, React, Node.js',
    fullDescription: 'Complete MERN stack development course covering MongoDB, Express.js, React.js, and Node.js. Build full-stack JavaScript applications.',
    price: 13999,
    originalPrice: 21999,
    discount: 36,
    duration: '6 months',
    level: 'Advanced',
    category: 'Web Development',
    instructor: {
      name: 'Vikram Singh',
      bio: 'MERN Stack Expert with 8+ years experience',
      designation: 'Lead JavaScript Developer'
    },
    features: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redux', 'JWT Auth'],
    studentsEnrolled: 1650,
    rating: 4.9,
    reviews: 290,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Front-End Development',
    shortDescription: 'Master React, UI/UX & Modern JavaScript Frameworks',
    fullDescription: 'Learn modern frontend development with React, Vue.js, TypeScript, UI/UX principles, and build responsive web applications.',
    price: 10999,
    originalPrice: 17999,
    discount: 39,
    duration: '5 months',
    level: 'Intermediate',
    category: 'Web Development',
    instructor: {
      name: 'Priya Desai',
      bio: 'Frontend Developer with 7+ years experience at Google',
      designation: 'Senior Frontend Engineer'
    },
    features: ['React', 'Vue.js', 'TypeScript', 'UI/UX', 'Responsive Design', 'State Management'],
    studentsEnrolled: 1950,
    rating: 4.7,
    reviews: 320,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Back-End Development',
    shortDescription: 'Master back-end development with Node.js/Django/Spring Boot',
    fullDescription: 'Learn server-side development with Node.js, Django, Spring Boot, database management, APIs, authentication, and deployment.',
    price: 11999,
    originalPrice: 19999,
    discount: 40,
    duration: '6 months',
    level: 'Advanced',
    category: 'Web Development',
    instructor: {
      name: 'Rajesh Mehta',
      bio: 'Backend Architect with 12+ years experience',
      designation: 'Backend Architect'
    },
    features: ['Node.js', 'Django', 'Spring Boot', 'APIs', 'Authentication', 'Database Design'],
    studentsEnrolled: 1350,
    rating: 4.8,
    reviews: 260,
    bestSeller: false,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
    status: 'active'
  },

  // ==================== MOBILE APPLICATION DEVELOPMENT ====================
  {
    title: 'Mobile App Development (Android / iOS)',
    shortDescription: 'Build native mobile applications for Android and iOS platforms',
    fullDescription: 'Learn mobile app development for both Android and iOS platforms using native technologies. Build, test, and deploy mobile applications.',
    price: 12999,
    originalPrice: 20999,
    discount: 38,
    duration: '6 months',
    level: 'Intermediate',
    category: 'Mobile Development',
    instructor: {
      name: 'Ananya Sharma',
      bio: 'Mobile App Developer with 50+ published apps',
      designation: 'Senior Mobile Developer'
    },
    features: ['Android Studio', 'Swift', 'Kotlin', 'iOS SDK', 'App Store', 'Google Play'],
    studentsEnrolled: 1650,
    rating: 4.7,
    reviews: 280,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Flutter Development',
    shortDescription: 'Build cross-platform mobile apps with Flutter and Dart',
    fullDescription: 'Learn Flutter framework and Dart programming language to build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.',
    price: 9999,
    originalPrice: 16999,
    discount: 41,
    duration: '5 months',
    level: 'Intermediate',
    category: 'Mobile Development',
    instructor: {
      name: 'Sandeep Reddy',
      bio: 'Flutter Developer with 30+ published cross-platform apps',
      designation: 'Flutter Expert'
    },
    features: ['Flutter', 'Dart', 'Cross-platform', 'State Management', 'Firebase', 'APIs'],
    studentsEnrolled: 1950,
    rating: 4.8,
    reviews: 310,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop',
    status: 'active'
  },

  // ==================== DATA, ANALYTICS & INTELLIGENCE ====================
  {
    title: 'Data Analytics',
    shortDescription: 'Master Excel, SQL, Power BI, Tableau for data analysis',
    fullDescription: 'Comprehensive data analytics course covering Excel, SQL, Power BI, Tableau. Learn data visualization, dashboard creation, and business intelligence.',
    price: 10999,
    originalPrice: 18999,
    discount: 42,
    duration: '5 months',
    level: 'Beginner',
    category: 'Data Analytics',
    instructor: {
      name: 'Dr. Sanjay Patel',
      bio: 'Data Analyst with 10+ years experience in Fortune 500 companies',
      designation: 'Senior Data Analyst'
    },
    features: ['Excel', 'SQL', 'Power BI', 'Tableau', 'Data Visualization', 'Dashboard'],
    studentsEnrolled: 2450,
    rating: 4.6,
    reviews: 380,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Data Science',
    shortDescription: 'Master Python, Statistics & Data Modeling for data science',
    fullDescription: 'Complete Data Science course covering Python programming, statistics, machine learning, data visualization, and real-world data science projects.',
    price: 15999,
    originalPrice: 24999,
    discount: 36,
    duration: '8 months',
    level: 'Advanced',
    category: 'Data Science',
    instructor: {
      name: 'Dr. Priya Sharma',
      bio: 'Data Scientist at Google, PhD in Machine Learning',
      designation: 'Senior Data Scientist'
    },
    features: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization', 'Pandas', 'NumPy'],
    studentsEnrolled: 1850,
    rating: 4.9,
    reviews: 410,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    status: 'active'
  },

  // ==================== ARTIFICIAL INTELLIGENCE & MACHINE LEARNING ====================
  {
    title: 'Artificial Intelligence (AI)',
    shortDescription: 'Comprehensive AI course covering fundamentals to advanced concepts',
    fullDescription: 'Learn AI fundamentals, problem-solving, search algorithms, knowledge representation, and intelligent agents. Build AI-powered applications.',
    price: 17999,
    originalPrice: 27999,
    discount: 36,
    duration: '9 months',
    level: 'Advanced',
    category: 'Artificial Intelligence',
    instructor: {
      name: 'Dr. Ravi Kumar',
      bio: 'AI Researcher with PhD in Artificial Intelligence',
      designation: 'AI Research Lead'
    },
    features: ['AI Fundamentals', 'Search Algorithms', 'Knowledge Representation', 'Expert Systems', 'AI Ethics'],
    studentsEnrolled: 1250,
    rating: 4.7,
    reviews: 240,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Machine Learning',
    shortDescription: 'Master Supervised & Unsupervised Learning algorithms',
    fullDescription: 'Complete Machine Learning course covering supervised learning, unsupervised learning, regression, classification, clustering, and model evaluation.',
    price: 16999,
    originalPrice: 25999,
    discount: 35,
    duration: '8 months',
    level: 'Advanced',
    category: 'Machine Learning',
    instructor: {
      name: 'Prof. Meena Iyer',
      bio: 'Machine Learning Engineer with 8+ years experience at Amazon',
      designation: 'Senior ML Engineer'
    },
    features: ['Supervised Learning', 'Unsupervised Learning', 'Regression', 'Classification', 'Clustering'],
    studentsEnrolled: 1950,
    rating: 4.8,
    reviews: 320,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Deep Learning',
    shortDescription: 'Master Neural Networks, CNNs and advanced deep learning',
    fullDescription: 'Learn deep learning concepts including neural networks, CNNs, RNNs, LSTMs, GANs, and implement them using TensorFlow and PyTorch.',
    price: 18999,
    originalPrice: 28999,
    discount: 34,
    duration: '9 months',
    level: 'Advanced',
    category: 'Deep Learning',
    instructor: {
      name: 'Dr. Arjun Nair',
      bio: 'Deep Learning Researcher with PhD in Neural Networks',
      designation: 'Deep Learning Specialist'
    },
    features: ['Neural Networks', 'CNNs', 'RNNs', 'LSTMs', 'TensorFlow', 'PyTorch'],
    studentsEnrolled: 1450,
    rating: 4.9,
    reviews: 280,
    bestSeller: false,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'NLP with Deep Learning',
    shortDescription: 'Master Chatbots, Language Models and Natural Language Processing',
    fullDescription: 'Learn Natural Language Processing with deep learning. Build chatbots, sentiment analysis, language models, text classification, and translation systems.',
    price: 16999,
    originalPrice: 25999,
    discount: 35,
    duration: '7 months',
    level: 'Advanced',
    category: 'Natural Language Processing',
    instructor: {
      name: 'Dr. Anjali Mehta',
      bio: 'NLP Researcher with 6+ years experience in language models',
      designation: 'NLP Engineer'
    },
    features: ['Chatbots', 'Sentiment Analysis', 'Language Models', 'Text Classification', 'Translation'],
    studentsEnrolled: 1150,
    rating: 4.7,
    reviews: 210,
    bestSeller: false,
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Generative AI',
    shortDescription: 'Master LLMs, Prompt Engineering & AI Content Creation',
    fullDescription: 'Learn Generative AI technologies including Large Language Models, prompt engineering, AI content creation, image generation, and AI-powered applications.',
    price: 14999,
    originalPrice: 23999,
    discount: 38,
    duration: '6 months',
    level: 'Intermediate',
    category: 'Generative AI',
    instructor: {
      name: 'Karan Jain',
      bio: 'AI Engineer specializing in Generative AI applications',
      designation: 'Generative AI Specialist'
    },
    features: ['LLMs', 'Prompt Engineering', 'AI Content Creation', 'Image Generation', 'AI Applications'],
    studentsEnrolled: 2850,
    rating: 4.9,
    reviews: 420,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    status: 'active'
  },

  // ==================== CLOUD & DEVOPS ====================
  {
    title: 'Cloud Computing',
    shortDescription: 'Master AWS and Azure cloud platforms',
    fullDescription: 'Learn cloud computing with AWS and Azure. Master cloud services, virtualization, storage, networking, security, and deployment on cloud platforms.',
    price: 13999,
    originalPrice: 21999,
    discount: 36,
    duration: '6 months',
    level: 'Intermediate',
    category: 'Cloud Computing',
    instructor: {
      name: 'Rohit Sharma',
      bio: 'Cloud Architect with AWS and Azure certifications',
      designation: 'Cloud Solution Architect'
    },
    features: ['AWS', 'Azure', 'Cloud Services', 'Virtualization', 'Storage', 'Security'],
    studentsEnrolled: 1950,
    rating: 4.8,
    reviews: 310,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'DevOps',
    shortDescription: 'Master CI/CD, Automation & Monitoring',
    fullDescription: 'Complete DevOps course covering CI/CD pipelines, automation, containerization, orchestration, monitoring, and infrastructure as code.',
    price: 15999,
    originalPrice: 24999,
    discount: 36,
    duration: '7 months',
    level: 'Advanced',
    category: 'DevOps',
    instructor: {
      name: 'Rajesh Kumar',
      bio: 'DevOps Engineer at Amazon Web Services',
      designation: 'Senior DevOps Engineer'
    },
    features: ['CI/CD', 'Docker', 'Kubernetes', 'Jenkins', 'Monitoring', 'Infrastructure as Code'],
    studentsEnrolled: 1650,
    rating: 4.7,
    reviews: 290,
    bestSeller: false,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
    status: 'active'
  },

  // ==================== CYBER SECURITY ====================
  {
    title: 'Cyber Security',
    shortDescription: 'Master Security Fundamentals & Threat Analysis',
    fullDescription: 'Learn cybersecurity fundamentals, network security, cryptography, threat analysis, vulnerability assessment, and security best practices.',
    price: 14999,
    originalPrice: 23999,
    discount: 38,
    duration: '7 months',
    level: 'Intermediate',
    category: 'Cybersecurity',
    instructor: {
      name: 'Vikram Singh',
      bio: 'Cybersecurity Expert and Ethical Hacker',
      designation: 'Security Consultant'
    },
    features: ['Network Security', 'Cryptography', 'Threat Analysis', 'Vulnerability Assessment', 'Security Tools'],
    studentsEnrolled: 1850,
    rating: 4.8,
    reviews: 320,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'Ethical Hacking',
    shortDescription: 'Master Penetration Testing & Vulnerability Assessment',
    fullDescription: 'Learn ethical hacking techniques, penetration testing, vulnerability assessment, network scanning, and security auditing for organizations.',
    price: 16999,
    originalPrice: 25999,
    discount: 35,
    duration: '8 months',
    level: 'Advanced',
    category: 'Ethical Hacking',
    instructor: {
      name: 'Arjun Mehta',
      bio: 'Certified Ethical Hacker with 10+ years experience',
      designation: 'Penetration Tester'
    },
    features: ['Penetration Testing', 'Vulnerability Assessment', 'Network Scanning', 'Security Auditing', 'Ethical Hacking Tools'],
    studentsEnrolled: 1450,
    rating: 4.9,
    reviews: 280,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
    status: 'active'
  },

  // ==================== SOFTWARE TESTING & QA ====================
  {
    title: 'Software Testing',
    shortDescription: 'Master Manual & Automation Testing',
    fullDescription: 'Learn software testing methodologies including manual testing, automation testing, test planning, test case design, and bug reporting.',
    price: 9999,
    originalPrice: 16999,
    discount: 41,
    duration: '5 months',
    level: 'Beginner',
    category: 'Software Testing',
    instructor: {
      name: 'Neha Reddy',
      bio: 'QA Lead with 8+ years experience in software testing',
      designation: 'QA Manager'
    },
    features: ['Manual Testing', 'Automation Testing', 'Test Planning', 'Test Cases', 'Bug Reporting'],
    studentsEnrolled: 2250,
    rating: 4.6,
    reviews: 340,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop',
    status: 'active'
  },
  {
    title: 'API & Automation Testing',
    shortDescription: 'Master Postman, Selenium & Testing Frameworks',
    fullDescription: 'Learn API testing with Postman, automation testing with Selenium, and testing frameworks for web and mobile applications.',
    price: 11999,
    originalPrice: 19999,
    discount: 40,
    duration: '6 months',
    level: 'Intermediate',
    category: 'Automation Testing',
    instructor: {
      name: 'Sandeep Kumar',
      bio: 'Automation Testing Expert with 7+ years experience',
      designation: 'Test Automation Engineer'
    },
    features: ['Postman', 'Selenium', 'API Testing', 'Test Automation', 'Testing Frameworks'],
    studentsEnrolled: 1650,
    rating: 4.7,
    reviews: 280,
    bestSeller: false,
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop',
    status: 'active'
  },

  // ==================== DESIGN & USER EXPERIENCE ====================
  {
    title: 'UI/UX Design',
    shortDescription: 'Master User Experience & Product Design',
    fullDescription: 'Learn UI/UX design principles, user research, wireframing, prototyping, visual design, and create stunning user interfaces.',
    price: 12999,
    originalPrice: 20999,
    discount: 38,
    duration: '6 months',
    level: 'Beginner',
    category: 'UI/UX Design',
    instructor: {
      name: 'Ananya Singh',
      bio: 'Lead UX Designer at Adobe, 8+ years experience',
      designation: 'UX Design Lead'
    },
    features: ['UI Design', 'UX Research', 'Wireframing', 'Prototyping', 'Figma', 'Adobe XD'],
    studentsEnrolled: 2450,
    rating: 4.8,
    reviews: 380,
    bestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    status: 'active'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert sample courses
    await Course.insertMany(sampleCourses);
    console.log(`Added ${sampleCourses.length} sample courses`);

    // Display summary by category
    console.log('\n📊 Courses by Category:');
    const categories = {};
    sampleCourses.forEach(course => {
      if (!categories[course.category]) {
        categories[course.category] = 0;
      }
      categories[course.category]++;
    });
    
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} courses`);
    });

    console.log('\n💰 Pricing Summary:');
    const minPrice = Math.min(...sampleCourses.map(c => c.price));
    const maxPrice = Math.max(...sampleCourses.map(c => c.price));
    const avgPrice = sampleCourses.reduce((sum, c) => sum + c.price, 0) / sampleCourses.length;
    console.log(`   Min Price: ₹${minPrice}`);
    console.log(`   Max Price: ₹${maxPrice}`);
    console.log(`   Avg Price: ₹${Math.round(avgPrice)}`);

    console.log('\n🎯 Best Selling Courses:');
    const bestSellers = sampleCourses.filter(c => c.bestSeller);
    bestSellers.forEach(course => {
      console.log(`   - ${course.title} (₹${course.price})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();