// UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import './User Profile.css'; 

const UserProfile = () => {
  const { userEmail } = useAuth(); // Get the user's email from the context
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log(userEmail);
        const response = await axios.get('http://localhost:3000/api/user/profile', {
          params: { email: userEmail }
        });
        setUser (response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.response?.data?.error || 'Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchUserProfile();
    }
  }, [userEmail]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>User Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Joined on:</strong> {user.created_at}</p>
      <button className="btn" onClick={() => alert('Edit Profile functionality to be implemented')}>Edit Profile</button>
    </div>
  );
};

export default UserProfile;