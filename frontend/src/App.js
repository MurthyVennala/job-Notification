import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Components from './Components';

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
  StateJobs 
} = Components;

function App() {
  const [selectedState, setSelectedState] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={
            <div>
              <Hero />
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
                  <div className="lg:col-span-1">
                    <LatestNotifications />
                    <QuickLinks />
                  </div>
                  <div className="lg:col-span-2">
                    <LatestJobs />
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
                <StateJobs selectedState={selectedState} setSelectedState={setSelectedState} />
              </div>
            </div>
          } />
          <Route path="/state-jobs" element={<StateJobs selectedState={selectedState} setSelectedState={setSelectedState} />} />
          <Route path="/latest-jobs" element={<LatestJobs />} />
          <Route path="/admit-cards" element={<AdmitCards />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;