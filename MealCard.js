import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import './MealCard.css'; 

const MealCard = ({ meal, onSelect }) => {
  // Fallback image URL
  const fallbackImage = require('./foods/default_image.jpeg'); 

  // Function to check if the image exists
  const getImageSrc = (imageUrl) => {
    try {
      // Attempt to require the image
      return require(`./${imageUrl}`);
    } catch (error) {
      // If there's an error (image not found), return the fallback image
      return fallbackImage;
    }
  };

  return (
    <div className="meal-card" onClick={() => onSelect(meal)}>
      <div className="meal-image">
        <img src={getImageSrc(meal.imageUrl)} alt={meal.name} />{/*fetch and display the image*/}
      </div>
      <div className="meal-details">
        <h3>{meal.name}</h3>{/*Display the meal name.*/}
        <p>{meal.description}</p> {/* Display the meal description */}
        <p className="meal-price">${meal.price}</p>
        <button className="select-button">
          <FontAwesomeIcon icon={faUtensils} /> Select
        </button>
      </div>
    </div>
  );
};

export default MealCard;