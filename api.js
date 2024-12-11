import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Handle api request to handle error and avoid crushing the server
const handleRequest = async (request, headers = {}) => {
  try {
    const response = await request({ headers });
    return response.data; // Return only the data part of the response
  } catch (error) {
    let errorMessage = 'An unexpected error occurred.';

    // if we encounter an error
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
      errorMessage = error.response.data.message || 'An error occurred while processing your request.';
    } else if (error.request) {
      console.error('No response received:', error.request);
      errorMessage = 'No response received from the server. Please check your network connection.';
    } else {
      console.error('Error:', error.message);
      errorMessage = 'An error occurred while making the request.';
    }

    throw new Error(errorMessage);
  }
};
// User authentication functions (sign in and sign up)
const login = async (userData) => axios.post(`${API_URL}/login`, userData);
export default login;

export const register = async (userData) => {
  return await handleRequest(() => axios.post(`${API_URL}/register`, userData));
};

// User Profile function
export const fetchUserProfile = async (userEmail) => {
  return await handleRequest(() => axios.get(`${API_URL}/user/profile`, userEmail));
};

// Meal functions
// Fetch available meals
export const fetchMeals = async () => {
  return await handleRequest(() => axios.get(`${API_URL}/meals`));
};

// Add a meal to the menu (business side).
export const addMeal = async (mealData) => {
  const response = await axios.post(`${API_URL}/add`, mealData);
  return response.data;
};

//delete meal from the menu (business side).
export const deleteMeal = async (mealId) => {
  const response = await axios.delete(`${API_URL}/delete/${mealId}`);
  return response.data;
};

// Booking function for adding booking to the database server.
export const bookMeal = async (bookingData) => {
  return await handleRequest(() => axios.post(`${API_URL}/book`, bookingData));
};

// Fetch reservations function for retrieving current reservations (Business side).
export const fetchBusinessReservations = async (userEmail) => {
  return await handleRequest(() => axios.get(`${API_URL}/business/reservations`));
};

// Get bookings function
export const getBookings = async (userEmail) => {
  const response = await axios.get(`${API_URL}/business/bookings?email=${userEmail}`);
  return response.data;
};
