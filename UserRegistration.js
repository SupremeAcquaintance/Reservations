import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './User Registration.css';
import './BusinessDashboard.css';
import axios from 'axios';

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Personal'); // Default category
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password, phone, category }; 

    setLoading(true);

    try {
        const response = await axios.post('http://localhost:3000/api/register', userData);

        if (response.status === 201) {
            alert('Registration successful!');
            setEmail(email);
            navigate('/login');
        } else {
            alert('Registration failed! Please check your details.');
        }

        // Reset form fields
        setUsername('');
        setEmail('');
        setPhone('');
        setPassword('');
        // Reset category to default
        setCategory('Personal'); 
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed! Please try again.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="registration-container">
      <h2>Register and Join the Community</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
        </select>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="login-prompt">
        Already have an account? <button onClick={() => navigate('/login')} className="link-btn">Sign In</button>
      </p>
    </div>
  );
};

export default UserRegistration;