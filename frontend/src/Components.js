import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Header Component with Authentication
const Header = ({ user, logout, searchJobs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchJobs(searchTerm);
      navigate('/search');
    }
  };

  return (
    <header className="bg-gray-800 text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-blue-600 p-2 rounded">
                <span className="text-white font-bold text-lg">GJP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Government Job Portal</h1>
                <p className="text-sm text-gray-300">Latest Government Jobs, Results & Admit Cards</p>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search jobs, organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-l text-gray-800 focus:outline-none"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 transition-colors"
                >
                  🔍
                </button>
              </div>
            </form>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user.full_name}</span>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Dashboard
                </button>
                {user.role === 'admin' && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Admin
                  </button>
                )}
                <button 
                  onClick={logout}
                  className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Register
                </button>
              </div>
            )}
            <img 
              src="https://images.unsplash.com/photo-1513342527372-b0f292ff0937?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwam9ic3xlbnwwfHx8Ymx1ZXwxNzUyMzkxODI3fDA&ixlib=rb-4.1.0&q=85" 
              alt="Government Building" 
              className="h-12 w-16 object-cover rounded"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

// Enhanced Navigation Component
const Navigation = ({ loadJobs }) => {
  const menuItems = [
    { label: 'Home', href: '/', category: null },
    { label: 'All India Govt Jobs', href: '/jobs', category: 'central_govt' },
    { label: 'State Govt Jobs', href: '/state-jobs', category: 'state_govt' },
    { label: 'Bank Jobs', href: '/jobs', category: 'banking' },
    { label: 'Teaching Jobs', href: '/jobs', category: 'teaching' },
    { label: 'Engineering Jobs', href: '/jobs', category: 'engineering' },
    { label: 'Railway Jobs', href: '/jobs', category: 'railway' },
    { label: 'Police/Defence Jobs', href: '/jobs', category: 'police_defence' },
    { label: 'Results', href: '/results', category: null }
  ];

  const handleCategoryClick = (category) => {
    if (category) {
      loadJobs({ category });
    }
  };

  return (
    <nav className="bg-blue-600 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-2">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href={item.href}
              onClick={(e) => {
                if (item.category) {
                  e.preventDefault();
                  handleCategoryClick(item.category);
                }
              }}
              className="px-3 py-1 text-sm hover:bg-blue-700 rounded transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Enhanced Hero Section
const Hero = ({ searchJobs }) => {
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = () => {
    if (heroSearch.trim()) {
      searchJobs(heroSearch);
      navigate('/search');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Gateway to Government Jobs
            </h2>
            <p className="text-gray-600 mb-6">
              Stay updated with the latest government job notifications, admit cards, and results. 
              Your career in public service starts here!
            </p>
            
            {/* Hero Search */}
            <div className="flex mb-6">
              <input
                type="text"
                placeholder="Search for government jobs..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleHeroSearch}
                className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Search Jobs
              </button>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/latest-jobs')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Latest Jobs
              </button>
              <a 
                href="https://wa.me/your-whatsapp-number" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                📱 WhatsApp Channel
              </a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1540839614876-2bfd74a01e04?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBndWlkYW5jZXxlbnwwfHx8Ymx1ZXwxNzUyMzkxODMzfDA&ixlib=rb-4.1.0&q=85" 
              alt="Career Guidance" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <input
              type="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <input
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <button 
              type="button"
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-800"
            >
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Register Form Component
const RegisterForm = ({ register }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    location: '',
    education_level: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            
            <input
              type="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            
            <input
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            
            <select
              value={formData.education_level}
              onChange={(e) => setFormData({...formData, education_level: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Education Level</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="diploma">Diploma</option>
              <option value="iti">ITI</option>
              <option value="graduate">Graduate</option>
              <option value="post_graduate">Post Graduate</option>
              <option value="btech">B.Tech</option>
              <option value="bcom">B.Com</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
          
          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign in here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Enhanced Latest Jobs Component with Backend Integration
const LatestJobs = ({ jobs, loading, applyForJob, user }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg">
        <div className="bg-blue-600 text-white px-4 py-3 rounded-t">
          <h3 className="font-semibold">Latest Jobs</h3>
        </div>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="bg-blue-600 text-white px-4 py-3 rounded-t">
        <h3 className="font-semibold">Latest Jobs ({jobs.length})</h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {jobs.slice(0, 10).map((job, index) => (
            <div key={job.id || index} className="border-b pb-3 last:border-b-0 job-card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 
                    className="text-blue-700 hover:underline cursor-pointer font-medium text-sm"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    ● {job.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">{job.organization}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(job.created_at || job.application_end_date).toLocaleDateString()}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {job.category?.replace('_', ' ').toUpperCase() || 'Government'}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {job.status || 'Active'}
                    </span>
                    <span className="text-xs text-gray-500">
                      👁 {job.views || 0} views
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => applyForJob(job.id)}
                      className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      {user ? 'Apply Now' : 'Login to Apply'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {jobs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No jobs found. Please try different filters.</p>
          </div>
        )}
        <div className="text-center mt-4">
          <button 
            onClick={() => navigate('/latest-jobs')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View All Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

// Keep existing components (LatestNotifications, JobCategories, etc.)
const LatestNotifications = () => {
  const notifications = [
    'Latest Notifications',
    'Government News',
    'Search Jobs',
    'State Jobs',
    'Select List',
    'Anganwadi/Outsourced',
    'EDUCATION',
    'Entrance',
    'Announcements',
    'Sarkari Result',
    'Admit Card',
    'Exam Results',
    'Answer Key',
    'Cutoff Marks',
    'Written Marks',
    'Interview Results',
    'EMPLOYMENT',
    'Eligibility',
    'Syllabus',
    'Question Paper',
    'Selection Process',
    'Previous Papers',
    'Games'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <h3 className="bg-blue-600 text-white px-4 py-2 rounded-t font-semibold mb-4">Notifications</h3>
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item flex items-center space-x-2">
            <span className="text-blue-600">●</span>
            <a href="#" className="text-sm text-blue-700 hover:underline">
              {notification}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickLinks = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="bg-red-600 text-white px-4 py-2 rounded-t font-semibold mb-4">Play FreeJobAlert Games</h3>
      <div className="text-center">
        <div className="bg-green-100 p-4 rounded-lg mb-4">
          <p className="text-green-800 font-semibold">🎮 Game Section</p>
          <p className="text-sm text-gray-600">Test your knowledge with our quiz games</p>
        </div>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors whatsapp-btn">
          📱 Join WhatsApp Channel
        </button>
      </div>
    </div>
  );
};

const JobCategories = () => {
  const categories = [
    { name: 'NHPC 361 Apprentices Online Form 2025', color: 'bg-blue-600' },
    { name: 'Indian Coast Guard Assistant Commandant Online Form 2025', color: 'bg-orange-600' },
    { name: 'Bank of Baroda 2500 LBO Online Form 2025', color: 'bg-red-600' },
    { name: 'IBPS PO/MT 5208 Online Form 2025', color: 'bg-green-600' },
    { name: 'Banking Group D Apply Online', color: 'bg-purple-600' },
    { name: 'CISF 1124 Constable Apply Online', color: 'bg-blue-700' },
    { name: 'SBI 6238 Technician Vacancy 2025', color: 'bg-pink-600' },
    { name: 'SBI PO Online Form 2025', color: 'bg-red-700' },
    { name: 'AIMS 4597 Various Vacancy Online Form 2025', color: 'bg-purple-700' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg mb-6">
      <div className="p-4">
        <div className="text-center mb-4">
          <img 
            src="https://images.unsplash.com/photo-1521338171421-f702be173d2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwYWNoaWV2ZW1lbnR8ZW58MHx8fGJsdWV8MTc1MjM5MTg0Nnww&ixlib=rb-4.1.0&q=85" 
            alt="Career Success" 
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <p className="text-sm text-center text-gray-600 bg-orange-100 p-2 rounded alert-banner">
            Click Here for Education Homepage
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((category, index) => (
            <div key={index} className={`${category.color} text-white p-3 rounded text-sm hover:opacity-90 cursor-pointer transition-opacity category-card`}>
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JobsByEducation = () => {
  const educationLevels = [
    { level: '10TH (17,146 jobs)', count: '17,146' },
    { level: 'Diploma (4,667 jobs)', count: '4,667' },
    { level: 'B.Com (2,698 jobs)', count: '2,698' },
    { level: 'ITI (18,198 jobs)', count: '18,198' },
    { level: 'B.Tech/B.E (16,791 jobs)', count: '16,791' },
    { level: 'Any Graduate (59,792 jobs)', count: '59,792' },
    { level: '12TH (35,719 jobs)', count: '35,719' },
    { level: 'B.Sc/B.E (13,387 jobs)', count: '13,387' },
    { level: 'Any Post Graduate (41,669 jobs)', count: '41,669' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="bg-blue-700 text-white px-4 py-3 rounded-t">
        <h3 className="font-semibold">Jobs by Education</h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {educationLevels.map((item, index) => (
            <a key={index} href="#" className="block text-blue-700 hover:underline text-sm notification-item">
              ● {item.level}
            </a>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700 transition-colors btn-primary">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

const AdmitCards = () => {
  const admitCards = [
    'CTET Admit Card 2025',
    'NEET Admit Card 2025',
    'UPSC Sevak Admit Card 2025',
    'JEE Mains Admit Card 2025',
    'IBPS PO Admit Card 2025',
    'SSC MTS Admit Card 2025',
    'Railway Group D Admit Card 2025',
    'UPSC CMS Admit Card 2025',
    'Banking PO Admit Card 2025'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="bg-orange-600 text-white px-4 py-3 rounded-t gradient-orange">
        <h3 className="font-semibold">Admit Card</h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {admitCards.map((card, index) => (
            <div key={index} className="text-blue-700 hover:underline cursor-pointer text-sm notification-item">
              ● {card}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700 transition-colors btn-primary">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

const Results = () => {
  const results = [
    'JCI Non Executive (Accounts) Result 2025',
    'IBS Steno, Personal Assistant and Other Posts Result 2025',
    'NHM Sukhikar Assistant Trainee Engineer / Trainee Officer Result 2025',
    'UPSC EPFO Personal Assistant Result 2025',
    'HPSC Assistant Professor Result 2025',
    'SSC Stenographer Grade C and D Exam Result 2025',
    'RSDC Group E (Group-25) Result 2025',
    'UPSSSC Junior Engineer (Civil) Result 2025',
    'UPSC Civil Supt Court Reader Result 2025'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="bg-green-600 text-white px-4 py-3 rounded-t gradient-green">
        <h3 className="font-semibold">Results</h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {results.map((result, index) => (
            <div key={index} className="text-blue-700 hover:underline cursor-pointer text-sm notification-item">
              ● {result}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors btn-primary">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

const StateJobs = ({ selectedState, setSelectedState, loadJobs }) => {
  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 
    'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleStateChange = (state) => {
    setSelectedState(state);
    if (state) {
      loadJobs({ state: state });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mt-8">
      <div className="bg-blue-700 text-white px-4 py-3 rounded-t gradient-blue">
        <h3 className="font-semibold">State Wise Government Jobs</h3>
      </div>
      <div className="p-4">
        <div className="mb-4 state-selector">
          <select 
            value={selectedState} 
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
        {selectedState && (
          <div className="bg-blue-50 p-4 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">Latest Jobs in {selectedState}</h4>
            <div className="space-y-2">
              <div className="text-blue-700 text-sm notification-item">● {selectedState} Police Constable Recruitment 2025</div>
              <div className="text-blue-700 text-sm notification-item">● {selectedState} Teacher Recruitment 2025</div>
              <div className="text-blue-700 text-sm notification-item">● {selectedState} Clerk Position 2025</div>
              <div className="text-blue-700 text-sm notification-item">● {selectedState} Forest Department Jobs 2025</div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
          {states.map((state, index) => (
            <button 
              key={index}
              onClick={() => handleStateChange(state)}
              className="text-xs bg-gray-100 hover:bg-blue-100 p-2 rounded text-blue-700 transition-colors"
            >
              {state}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Job Details Component
const JobDetails = ({ API, applyForJob, user }) => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadJobDetails();
  }, [jobId]);

  const loadJobDetails = async () => {
    try {
      const response = await axios.get(`${API}/jobs/${jobId}`);
      setJob(response.data);
    } catch (error) {
      setError('Failed to load job details');
      console.error('Error loading job:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Job not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4">
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-blue-100">{job.organization}</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Job Information</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Location:</strong> {job.location}, {job.state}</p>
                <p><strong>Category:</strong> {job.category?.replace('_', ' ').toUpperCase()}</p>
                <p><strong>Total Posts:</strong> {job.total_posts}</p>
                <p><strong>Min Education:</strong> {job.min_education?.replace('_', ' ').toUpperCase()}</p>
                {job.salary_min && (
                  <p><strong>Salary:</strong> ₹{job.salary_min.toLocaleString()} - ₹{job.salary_max?.toLocaleString()}</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Important Dates</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Application Start:</strong> {new Date(job.application_start_date).toLocaleDateString()}</p>
                <p><strong>Application End:</strong> {new Date(job.application_end_date).toLocaleDateString()}</p>
                {job.exam_date && (
                  <p><strong>Exam Date:</strong> {new Date(job.exam_date).toLocaleDateString()}</p>
                )}
                <p><strong>Views:</strong> {job.views}</p>
                <p><strong>Applications:</strong> {job.applications_count}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Job Description</h3>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => applyForJob(job.id)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              {user ? 'Apply Now' : 'Login to Apply'}
            </button>
            
            {job.official_notification_url && (
              <a
                href={job.official_notification_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Official Notification
              </a>
            )}
            
            {job.apply_online_url && (
              <a
                href={job.apply_online_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Apply Online
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Search Results Component
const SearchResults = ({ searchResults, searchQuery, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Search Results for "{searchQuery}"
        </h1>
        <p className="text-gray-600">Found {searchResults.length} jobs</p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.map((job, index) => (
            <div key={job.id || index} className="bg-white rounded-lg shadow-lg p-6 job-card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 
                    className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    {job.title}
                  </h3>
                  <p className="text-gray-600">{job.organization}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    📍 {job.location}, {job.state} | 🏢 {job.category?.replace('_', ' ').toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.description}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {job.total_posts} Posts
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Last Date: {new Date(job.application_end_date).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      👁 {job.views || 0} views
                    </span>
                  </div>
                </div>
                
                <div className="ml-4">
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {searchResults.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">No jobs found for "{searchQuery}". Try different keywords.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// User Dashboard Component
const UserDashboard = ({ user, API }) => {
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load user applications and notifications
      const [notificationsRes] = await Promise.all([
        axios.get(`${API}/notifications`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);
      
      setNotifications(notificationsRes.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.full_name}</h1>
        <p className="text-gray-600">Manage your job applications and stay updated</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Applications</h3>
          <p className="text-3xl font-bold">{applications.length}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Profile Views</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-orange-600 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <p className="text-3xl font-bold">{notifications.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
          {applications.length === 0 ? (
            <p className="text-gray-500">No applications yet. Start applying for jobs!</p>
          ) : (
            <div className="space-y-3">
              {applications.map((app, index) => (
                <div key={index} className="border-b pb-3">
                  <p className="font-medium">{app.job_title}</p>
                  <p className="text-sm text-gray-600">{app.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications yet.</p>
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notif, index) => (
                <div key={index} className="border-b pb-3">
                  <p className="font-medium">{notif.title}</p>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(notif.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPanel = ({ API, user }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newJob, setNewJob] = useState({
    title: '',
    organization: '',
    description: '',
    category: 'central_govt',
    location: '',
    state: '',
    min_education: 'graduate',
    total_posts: 1,
    application_start_date: '',
    application_end_date: '',
    salary_min: '',
    salary_max: ''
  });

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const [dashboardRes, jobsRes] = await Promise.all([
        axios.get(`${API}/admin/dashboard`),
        axios.get(`${API}/jobs?limit=100`)
      ]);
      
      setDashboardData(dashboardRes.data);
      setJobs(jobsRes.data);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      const jobData = {
        ...newJob,
        total_posts: parseInt(newJob.total_posts),
        salary_min: newJob.salary_min ? parseFloat(newJob.salary_min) : null,
        salary_max: newJob.salary_max ? parseFloat(newJob.salary_max) : null,
        application_start_date: new Date(newJob.application_start_date).toISOString(),
        application_end_date: new Date(newJob.application_end_date).toISOString()
      };

      await axios.post(`${API}/jobs`, jobData);
      alert('Job created successfully!');
      
      // Reset form and reload data
      setNewJob({
        title: '',
        organization: '',
        description: '',
        category: 'central_govt',
        location: '',
        state: '',
        min_education: 'graduate',
        total_posts: 1,
        application_start_date: '',
        application_end_date: '',
        salary_min: '',
        salary_max: ''
      });
      
      loadAdminData();
    } catch (error) {
      console.error('Failed to create job:', error);
      alert('Failed to create job');
    }
  };

  const deleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`${API}/jobs/${jobId}`);
        alert('Job deleted successfully!');
        loadAdminData();
      } catch (error) {
        console.error('Failed to delete job:', error);
        alert('Failed to delete job');
      }
    }
  };

  const seedMockData = async () => {
    try {
      await axios.post(`${API}/admin/seed-data`);
      alert('Mock data seeded successfully!');
      loadAdminData();
    } catch (error) {
      console.error('Failed to seed data:', error);
      alert('Failed to seed mock data');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
        <p className="text-gray-600">Manage jobs, users, and system settings</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {['dashboard', 'jobs', 'create-job'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && dashboardData && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold">Total Jobs</h3>
                  <p className="text-3xl font-bold">{dashboardData.total_jobs}</p>
                </div>
                <div className="bg-green-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold">Active Jobs</h3>
                  <p className="text-3xl font-bold">{dashboardData.active_jobs}</p>
                </div>
                <div className="bg-orange-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold">Total Users</h3>
                  <p className="text-3xl font-bold">{dashboardData.total_users}</p>
                </div>
                <div className="bg-purple-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold">Applications</h3>
                  <p className="text-3xl font-bold">{dashboardData.total_applications}</p>
                </div>
              </div>

              <div className="mb-6">
                <button
                  onClick={seedMockData}
                  className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Seed Mock Data
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Jobs</h3>
                  <div className="space-y-3">
                    {dashboardData.recent_jobs.map((job, index) => (
                      <div key={index} className="border p-3 rounded">
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-gray-600">{job.organization}</p>
                        <p className="text-xs text-gray-500">{job.category}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
                  <div className="space-y-3">
                    {dashboardData.recent_users.map((user, index) => (
                      <div key={index} className="border p-3 rounded">
                        <p className="font-medium">{user.full_name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Role: {user.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Jobs Management Tab */}
          {activeTab === 'jobs' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">All Jobs ({jobs.length})</h3>
              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <div key={job.id || index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-700">{job.title}</h4>
                        <p className="text-gray-600">{job.organization}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>📍 {job.location}</span>
                          <span>📊 {job.category}</span>
                          <span>👤 {job.total_posts} posts</span>
                          <span>👁 {job.views || 0} views</span>
                          <span>📝 {job.applications_count || 0} applications</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create Job Tab */}
          {activeTab === 'create-job' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Create New Job</h3>
              <form onSubmit={createJob} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      required
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <input
                      type="text"
                      required
                      value={newJob.organization}
                      onChange={(e) => setNewJob({...newJob, organization: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newJob.category}
                      onChange={(e) => setNewJob({...newJob, category: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="central_govt">Central Government</option>
                      <option value="state_govt">State Government</option>
                      <option value="banking">Banking</option>
                      <option value="railway">Railway</option>
                      <option value="teaching">Teaching</option>
                      <option value="engineering">Engineering</option>
                      <option value="police_defence">Police/Defence</option>
                      <option value="ssc">SSC</option>
                      <option value="upsc">UPSC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={newJob.location}
                      onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={newJob.state}
                      onChange={(e) => setNewJob({...newJob, state: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Education</label>
                    <select
                      value={newJob.min_education}
                      onChange={(e) => setNewJob({...newJob, min_education: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="10th">10th</option>
                      <option value="12th">12th</option>
                      <option value="diploma">Diploma</option>
                      <option value="iti">ITI</option>
                      <option value="graduate">Graduate</option>
                      <option value="post_graduate">Post Graduate</option>
                      <option value="btech">B.Tech</option>
                      <option value="bcom">B.Com</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Posts</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newJob.total_posts}
                      onChange={(e) => setNewJob({...newJob, total_posts: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Start Date</label>
                    <input
                      type="date"
                      required
                      value={newJob.application_start_date}
                      onChange={(e) => setNewJob({...newJob, application_start_date: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application End Date</label>
                    <input
                      type="date"
                      required
                      value={newJob.application_end_date}
                      onChange={(e) => setNewJob({...newJob, application_end_date: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary</label>
                    <input
                      type="number"
                      value={newJob.salary_min}
                      onChange={(e) => setNewJob({...newJob, salary_min: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Salary</label>
                    <input
                      type="number"
                      value={newJob.salary_max}
                      onChange={(e) => setNewJob({...newJob, salary_max: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                  <textarea
                    required
                    rows="4"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Create Job
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold mb-4">About Government Job Portal</h4>
            <p className="text-gray-300 text-sm">
              India's leading government job portal providing latest job notifications, 
              admit cards, and results for all competitive exams.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white footer-link">Latest Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white footer-link">Admit Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white footer-link">Results</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white footer-link">Syllabus</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white footer-link">Banking Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white footer-link">Railway Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white footer-link">Teaching Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white footer-link">Defence Jobs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Education Qualification</h4>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxlZHVjYXRpb258ZW58MHx8fGJsdWV8MTc1MjM5MTg0MXww&ixlib=rb-4.1.0&q=85" 
                alt="Education" 
                className="w-full h-24 object-cover rounded mb-2"
              />
              <p className="text-xs text-gray-400">Find jobs by your qualification level</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Government Job Portal. All rights reserved. | 
            <span className="text-red-400"> Your trusted source for government job opportunities.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Export all components
const Components = {
  Header,
  Navigation,
  Hero,
  LatestNotifications,
  JobCategories,
  QuickLinks,
  JobsByEducation,
  LatestJobs,
  AdmitCards,
  Results,
  Footer,
  StateJobs,
  LoginForm,
  RegisterForm,
  AdminPanel,
  JobDetails,
  SearchResults,
  UserDashboard
};

export default Components;