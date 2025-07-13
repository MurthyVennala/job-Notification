import React, { useState } from 'react';

// Header Component
const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded">
              <span className="text-white font-bold text-lg">FJA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">FreeJobAlert.Com</h1>
              <p className="text-sm text-gray-300">Government Exam Result Admit Card</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1513342527372-b0f292ff0937?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwam9ic3xlbnwwfHx8Ymx1ZXwxNzUyMzkxODI3fDA&ixlib=rb-4.1.0&q=85" 
            alt="Government Building" 
            className="h-12 w-16 object-cover rounded"
          />
        </div>
      </div>
    </header>
  );
};

// Navigation Component
const Navigation = () => {
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'All India Govt Jobs', href: '/all-india-jobs' },
    { label: 'State Govt Jobs', href: '/state-jobs' },
    { label: 'Bank Jobs', href: '/bank-jobs' },
    { label: 'Teaching Jobs', href: '/teaching-jobs' },
    { label: 'Engineering Jobs', href: '/engineering-jobs' },
    { label: 'Railway Jobs', href: '/railway-jobs' },
    { label: 'Police/Defence Jobs', href: '/police-defence' },
    { label: 'Result/Online Jobs', href: '/results' }
  ];

  return (
    <nav className="bg-blue-600 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-2">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href={item.href}
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

// Hero Section with Career Guidance Banner
const Hero = () => {
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
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Latest Jobs
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                📱 WhatsApp Channel
              </button>
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

// Latest Notifications Component
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
          <div key={index} className="flex items-center space-x-2">
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

// Quick Links Component
const QuickLinks = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="bg-red-600 text-white px-4 py-2 rounded-t font-semibold mb-4">Play FreeJobAlert Games</h3>
      <div className="text-center">
        <div className="bg-green-100 p-4 rounded-lg mb-4">
          <p className="text-green-800 font-semibold">🎮 Game Section</p>
          <p className="text-sm text-gray-600">Test your knowledge with our quiz games</p>
        </div>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
          📱 Join WhatsApp Channel
        </button>
      </div>
    </div>
  );
};

// Latest Jobs Component
const LatestJobs = () => {
  const jobs = [
    {
      title: "BHEL 515 Artisan Online Form 2025",
      date: "2025-07-13",
      category: "Engineering",
      status: "Active"
    },
    {
      title: "Railway Apprentice Online Form 2025",
      date: "2025-07-12",
      category: "Railway",
      status: "Active"
    },
    {
      title: "Indian Coast Guard Assistant Commandant Online Form 2025",
      date: "2025-07-11",
      category: "Defence",
      status: "Active"
    },
    {
      title: "SSC MTS Online Form 2025",
      date: "2025-07-10",
      category: "SSC",
      status: "Active"
    },
    {
      title: "Bank of Baroda 2500 LBO Online Form 2025",
      date: "2025-07-09",
      category: "Banking",
      status: "Active"
    },
    {
      title: "UPSC EPFO Online Form 2025",
      date: "2025-07-08",
      category: "UPSC",
      status: "Active"
    },
    {
      title: "CISF 1124 Constable Apply Online",
      date: "2025-07-07",
      category: "Police",
      status: "Active"
    },
    {
      title: "SBI 6238 Technician Vacancy 2025",
      date: "2025-07-06",
      category: "Banking",
      status: "Active"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="bg-blue-600 text-white px-4 py-3 rounded-t">
        <h3 className="font-semibold">New Updates</h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {jobs.map((job, index) => (
            <div key={index} className="border-b pb-3 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-blue-700 hover:underline cursor-pointer font-medium text-sm">
                    ● {job.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-gray-500">{job.date}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {job.category}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

// Job Categories Component
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
          <p className="text-sm text-center text-gray-600 bg-orange-100 p-2 rounded">
            Click Here for Education Homepage
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((category, index) => (
            <div key={index} className={`${category.color} text-white p-3 rounded text-sm hover:opacity-90 cursor-pointer transition-opacity`}>
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Jobs by Education Component
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
            <a key={index} href="#" className="block text-blue-700 hover:underline text-sm">
              ● {item.level}
            </a>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

// Admit Cards Component
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
      <div className="bg-orange-600 text-white px-4 py-3 rounded-t">
        <h3 className="font-semibold">Admit Card</h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {admitCards.map((card, index) => (
            <div key={index} className="text-blue-700 hover:underline cursor-pointer text-sm">
              ● {card}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

// Results Component
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
      <div className="bg-green-600 text-white px-4 py-3 rounded-t">
        <h3 className="font-semibold">Results</h3>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {results.map((result, index) => (
            <div key={index} className="text-blue-700 hover:underline cursor-pointer text-sm">
              ● {result}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

// State Jobs Component
const StateJobs = ({ selectedState, setSelectedState }) => {
  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 
    'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg mt-8">
      <div className="bg-blue-700 text-white px-4 py-3 rounded-t">
        <h3 className="font-semibold">State Wise Government Jobs</h3>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <select 
            value={selectedState} 
            onChange={(e) => setSelectedState(e.target.value)}
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
              <div className="text-blue-700 text-sm">● {selectedState} Police Constable Recruitment 2025</div>
              <div className="text-blue-700 text-sm">● {selectedState} Teacher Recruitment 2025</div>
              <div className="text-blue-700 text-sm">● {selectedState} Clerk Position 2025</div>
              <div className="text-blue-700 text-sm">● {selectedState} Forest Department Jobs 2025</div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
          {states.map((state, index) => (
            <button 
              key={index}
              onClick={() => setSelectedState(state)}
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

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold mb-4">About FreeJobAlert</h4>
            <p className="text-gray-300 text-sm">
              India's leading government job portal providing latest job notifications, 
              admit cards, and results for all competitive exams.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Latest Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Admit Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Results</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Syllabus</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Banking Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Railway Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Teaching Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Defence Jobs</a></li>
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
            © 2025 FreeJobAlert.com. All rights reserved. | 
            <span className="text-red-400"> Beware of duplicate websites with FreeJobAlert name.</span>
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
  StateJobs
};

export default Components;