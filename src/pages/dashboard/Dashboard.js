// components/Dashboard.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DonationManager from './DonationManager';
import AvailableFood from './FoodAvailability';
import NGODirectory from './NGODirectory';
import Contact from './Contact';
import Header from './Header';
// import HowItWorks from './HowItWorks'; // Import the HowItWorks component
import '../styles/dashboard.css';

const Dashboard = () => {
  const userType = localStorage.getItem('userType');
  
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  const stats = [
    { label: 'Active Donors', value: '500+' },
    { label: 'NGO Partners', value: '50+' },
    { label: 'Meals Donated', value: '10,000+' },
    { label: 'Cities Covered', value: '10+' },
  ];

  return (
    <div className="dashboard-container">
      <Header userType={userType} />

      <main className="dashboard-main">
        <Routes>
          <Route path="/" element={
            <div className="welcome-section">
              <section className="intro">
                <h1 className="welcome-title">Welcome to Food Donation Network</h1>
                <p className="welcome-description">Connecting generous donors with NGOs to reduce food waste and feed those in need.</p>
              </section>

              <div className="stats-container">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <p className="stat-value">{stat.value}</p>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="services-section">
                <div className="donor-services">
                  <h2 className="services-title">For Donors</h2>
                  <ul className="services-list">
                    <li>Easy-to-use donation platform</li>
                    <li>Real-time tracking of donations</li>
                    <li>Direct connection with local NGOs</li>
                    <li>Impact tracking and reporting</li>
                  </ul>
                </div>

                <div className="ngo-services">
                  <h2 className="services-title">For NGOs</h2>
                  <ul className="services-list">
                    <li>Real-time food availability updates</li>
                    <li>Efficient claim and pickup system</li>
                    <li>Donor communication platform</li>
                    <li>Distribution management tools</li>
                  </ul>
                </div>
              </div>

              {/* Removed How It Works section */}
            </div>
          } />
          {/* <Route path="/how-it-works" element={<HowItWorks />} /> Keep this route for the How It Works page */}
          
          {userType === 'donor' && (
            <Route path="/donate" element={<DonationManager />} />
          )}
          <Route path="/available-food" element={<AvailableFood />} />
          <Route path="/ngo-directory" element={<NGODirectory />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
