const express = require('express');
const sql = require('mssql');
const app = express.Router();
const connectDB = require('./config');

// Middleware for parsing JSON bodies
app.use(express.json());

app.post('/', async (req, res) => {
    const { mealId, quantity, userEmail } = req.body;

    // Validate input
    if (!mealId || !quantity || !userEmail) {
        return res.status(400).send('Meal ID, quantity, and user email are required' );
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).send('Quantity must be a positive integer');
    }

    try {
        await connectDB(); // Use the connectDB function from the config to connect to the database
        console.log("Connected to Database Entity successfully for Bookings");
        
        const result = await sql.query`INSERT INTO reservations (userEmail, mealId, quantity) VALUES (${userEmail}, ${mealId}, ${quantity})`;

        if (result.rowsAffected[0] > 0) {
            return res.status(200).send('Booking successful' );
        } else {
            return res.status(500).send('Booking failed');
        }
    } catch (error) {
        console.error('Error during booking:', error);
        return res.status(500).send('Booking failed due to server error' );
    } finally {
        await sql.close(); 
    }
});

module.exports = app;