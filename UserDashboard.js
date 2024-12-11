import React, { useState } from 'react';
import UserProfile from './components/UserProfile.js';
import BookingInterface from './components/BookingInterface.js';
import BusinessDashboard from './components/BusinessDashboard.js';
import SearchFilter from './components/SearchFilter.js';
import './User Dashboard.css';

const UserDashboard = ({ userEmail }) => {
  const [activeTab, setActiveTab] = useState('booking'); // Default active tab

  const renderTabContent = () => {
    switch (activeTab) {
      case 'booking':
        return <BookingInterface userEmail={userEmail} />;
      case 'profile':
        return <UserProfile userEmail={userEmail} />;
      case 'business':
        return <BusinessDashboard />;
      case 'search':
        return <SearchFilter />;
      default:
        return <BookingInterface userEmail={userEmail} />;
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Easily get the best meals in town! Indoor Dining, Takeaway or Delivery. In Advance.</h2>
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'booking' ? 'active' : ''}`} 
          onClick={() => setActiveTab('booking')}
        >
          Booking
        </button>
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`} 
          onClick={() => setActiveTab('profile')}
        >
          User Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'business' ? 'active' : ''}`} 
          onClick={() => setActiveTab('business')}
        >
          Business Dashboard
        </button>
        <button 
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`} 
          onClick={() => setActiveTab('search')}
        >
          Search Reservations
        </button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Reservation Manager. All rights reserved.</p>
        <br />
        <p>Welcome! {userEmail ? userEmail : 'Guest'}</p> {/* Display userEmail or 'Guest' */}
        <br />
      </footer>
    </div>
  );
};

export default UserDashboard;