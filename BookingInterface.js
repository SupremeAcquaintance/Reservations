import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealCard from './MealCard';
import './BookingInterface.css';
import BookingModal from './BookingModal'; // Import the modal component

const BookingInterface = ({ userEmail }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/api/meals'); // Fetch meals from the backend
        setMeals(response.data);
        console.log("Meals Fetched");
      } catch (error) {
        console.error('Error fetching meals:', error);
        setError('Failed to load meals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const openModal = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
    setQuantity(1);
  };

  const bookMeal = async () => {
    if (!selectedMeal) {
      alert('Please select a meal to book.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/book', { 
        mealId: selectedMeal.id, 
        quantity, 
        userEmail 
      });
      alert(response.data.message);
      closeModal(); // Close modal after booking
    } catch (error) {
      console.error('Error booking meal:', error);
      alert('Booking failed! Please try again.');
    }
  };

  return (
    <main className="booking-interface">
      <h2 className="booking-title">All the Best Meals in Town Now!</h2>
      {loading && <p>Loading meals...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="meal-grid">
        {meals.map(meal => (
          <MealCard key={meal.id} meal={meal} onSelect={openModal} />
        ))}
      </div>
      {isModalOpen && (
        <BookingModal 
          meal={selectedMeal} 
          quantity={quantity} 
          setQuantity={setQuantity} 
          onClose={closeModal} 
          onBook={bookMeal} 
        />
      )}
    </main>
  );
};

export default BookingInterface;