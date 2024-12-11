import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUserPlus, faClipboardList, faComments, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css'; // Import the CSS file for styling
/*"A reservation isn't just a plan; its an invitation to savor the moment."*/
const HomePage = () => {
  return (
    <main className="home-page">
      <header className="hero-section">
        <h1>Welcome to Reservation Manager</h1>
        <p>Your one-stop solution for booking meals effortlessly!</p> <br></br>
        <Link to="/register" className="btn">Get Started</Link>
      </header>

      <section className="features">
      <p>
          Join us, where food enthusiasts unite under the banner of exploration
          and delight. Whether you are a connoisseur of fine dining or a seeker of hidden gems,
          our reservation system is your passport to the extraordinary. Connect with fellow food 
          lovers, Share your discoveries, your recipies, and savor the joy of anticipation as 
          you secure your place at tables that celebrate the very essence of life.
        </p><br></br>
        <h2>Key Features</h2>
        <div className="feature-list">
          <div className="feature">
            <FontAwesomeIcon icon={faUtensils} size="3x" />
            <h3>Easy Meal Reservations</h3>
            <p>Book your meals in advance and skip the queues.</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faUserPlus} size="3x" />
            <h3>User Registration</h3>
            <p>Create an account to manage your bookings and preferences.</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faClipboardList} size="3x" />
            <h3>Search & Filter</h3>
            <p>Find meals by date, time, location, and dietary preferences.</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faComments} size="3x" />
            <h3>Reviews & Ratings</h3>
            <p>Share your dining experiences and read others' reviews.</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faChartLine} size="3x" />
            <h3>Business Dashboard</h3>
            <p>Businesses can manage reservations and view analytics.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Reservation Manager. Created by Adonis Shumba. All rights reserved.</p><br></br>
      </footer>
    </main>
  );
};

export default HomePage;