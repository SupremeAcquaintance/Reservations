// UserLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import './User Login.css';

const UserLogin = () => {
  const { setUserEmail } = useAuth(); // Use the useAuth hook to get setUser Email
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    setLoading(true); // Set loading to true when the sign-in process starts

    try {
      const response = await axios.post('http://localhost:3000/api/login', userData);
      alert('Sign in successful!');
      console.log('Login Successful:', response.data);
      setUserEmail(email); // Set the user's email in the context
      navigate('/dashboard', { state: { userEmail: email } });
    } catch (error) {
      console.error('Error during sign in:', error);
      alert('Sign in failed. Check your email and password then try again!');
      setEmail('');
      setPassword('');
    } finally {
      setLoading(false); // Set loading to false when the process is complete
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p className="register-prompt">
        Don’t have an account? <button onClick={() => navigate('/register')} className="link-btn">Register</button>
      </p>
    </div>
  );
};

export default UserLogin;