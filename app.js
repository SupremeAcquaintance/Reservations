import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import UserDashboard from './UserDashboard';
import { AuthProvider, useAuth } from './AuthContext'; // Import the AuthProvider and useAuth
import './reserve.css';

function App() {
  return (
    <AuthProvider> {/* Wrap your application with AuthProvider */}
      <div className="app-container">
        <h1>Reservation Manager: Get the best meals in town now.</h1>
        <AppRoutes /> {/* Use a separate component for routes */}
      </div>
    </AuthProvider>
  );
}

// Create a separate component for routes
const AppRoutes = () => {
  const { userEmail } = useAuth(); // Get userEmail from AuthContext

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<UserRegistration />} />
      <Route path="/login" element={<UserLogin />} />
      {/* Pass userEmail to UserDashboard */}
      <Route path="/dashboard" element={<UserDashboard userEmail={userEmail} />} /> 
    </Routes>
  );
};

export default App;