import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Components from './Components';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const { 
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
} = Components;

function App() {
  const [selectedState, setSelectedState] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Check authentication on app load
  useEffect(() => {
    if (token) {
      // Verify token and get user info
      verifyToken();
    }
    loadJobs();
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    }
  };

  const loadJobs = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });
      
      const response = await axios.get(`${API}/jobs?${params}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API}/auth/login`, {
        email,
        password
      });
      
      const { access_token } = response.data;
      setToken(access_token);
      localStorage.setItem('token', access_token);
      
      // Get user info
      await verifyToken();
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API}/auth/register`, userData);
      
      // Auto-login after registration
      const loginResult = await login(userData.email, userData.password);
      return loginResult;
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const searchJobs = async (query, filters = {}) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams({ q: query });
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });
      
      const response = await axios.get(`${API}/search/jobs?${params}`);
      setSearchResults(response.data);
      setSearchQuery(query);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async (jobId) => {
    if (!token) {
      alert('Please login to apply for jobs');
      return { success: false };
    }

    try {
      await axios.post(`${API}/jobs/${jobId}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert('Application submitted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.detail || 'Application failed';
      alert(message);
      return { success: false, error: message };
    }
  };

  // App context
  const appContext = {
    user,
    token,
    jobs,
    loading,
    searchQuery,
    searchResults,
    selectedState,
    setSelectedState,
    login,
    register,
    logout,
    loadJobs,
    searchJobs,
    applyForJob,
    API
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header {...appContext} />
        <Navigation {...appContext} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div>
              <Hero {...appContext} />
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
                  <div className="lg:col-span-1">
                    <LatestNotifications />
                    <QuickLinks />
                  </div>
                  <div className="lg:col-span-2">
                    <LatestJobs {...appContext} />
                  </div>
                  <div className="lg:col-span-1">
                    <JobCategories />
                    <JobsByEducation />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  <AdmitCards />
                  <Results />
                </div>
                <StateJobs {...appContext} />
              </div>
            </div>
          } />
          
          {/* Authentication Routes */}
          <Route path="/login" element={
            user ? <Navigate to="/dashboard" /> : <LoginForm {...appContext} />
          } />
          <Route path="/register" element={
            user ? <Navigate to="/dashboard" /> : <RegisterForm {...appContext} />
          } />
          
          {/* Job Routes */}
          <Route path="/jobs/:jobId" element={<JobDetails {...appContext} />} />
          <Route path="/search" element={<SearchResults {...appContext} />} />
          <Route path="/state-jobs" element={<StateJobs {...appContext} />} />
          <Route path="/latest-jobs" element={<LatestJobs {...appContext} />} />
          <Route path="/admit-cards" element={<AdmitCards />} />
          <Route path="/results" element={<Results />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            user ? <UserDashboard {...appContext} /> : <Navigate to="/login" />
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            user?.role === 'admin' ? <AdminPanel {...appContext} /> : <Navigate to="/" />
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;