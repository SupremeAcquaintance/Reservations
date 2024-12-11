// BookingModal.js
import React from 'react';
import './BookingModal.css'; 

const BookingModal = ({ meal, quantity, setQuantity, onClose, onBook }) => {
  if (!meal) return null; // Return null if no meal is selected

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Booking Details for {meal.name}</h3>
        <p>Description: {meal.description}</p>
        <p>Price: ${meal.price}</p>
        <label>
          Quantity:
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))} 
            min="1" 
          />
        </label>
        <div className="modal-buttons">
          <button className="btn" onClick={onBook}>Book Now</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;