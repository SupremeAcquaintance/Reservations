//SearchFilter.js

import React, { useState } from 'react';
import axios from 'axios';
import './SearchFilter.css'; // Import the CSS file for styling
import { useAuth } from '../AuthContext'; // Import the useAuth hook

const SearchFilter = () => {
  const { userEmail } = useAuth(); // Get the user's email from context
  const [filters, setFilters] = useState({
    date: '',
    time: '',
    location: '',
    cuisine: '',
    price: ''
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(null); // Reset error state

    // Prepare user credentials for authentication
    const userData = {
      email: userEmail, // Use the authenticated user's email
      password: 'userPassword', // Replace with the actual password if needed
      filters
    };

    try {
      const response = await axios.post('/api/search', userData);
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search for Reservations</h2>
      <form onSubmit={handleSearch} className="search-inputs">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={filters.time}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          value={filters.cuisine}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          value={filters.price}
          onChange={handleChange}
        />
        <button type="submit" className="btn">Search</button>
      </form>
      {loading && <div className="loading">Loading results...</div>}
      {error && <div className="error">{error}</div>}
      {results.length > 0 ? (
        <ul className="results-list">
          {results.map(result => (
            <li key={result.id} className="result-item">
              <div className="meal-details">
                <h3>{result.meal}</h3>
                <p><strong>Location:</strong> {result.location}</p>
                <p><strong>Cuisine:</strong> {result.cuisine}</p>
                <p><strong>Price:</strong> ${result.price}</p>
                <p><strong>Date:</strong> {result.reservation_date}</p>
                <p><strong>Time:</strong> {result.reservation_time}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <div className="no-results">No results found. Please adjust your filters.</div>
      )}
    </div>
  );
};

export default SearchFilter;

