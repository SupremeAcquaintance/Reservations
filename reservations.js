// reservations.js
const express = require('express');
const sql = require('mssql');
const router = express.Router();
const connectDB = require('./config');

router.get('/', async (req, res) => {
    try {
        await connectDB();
        console.log("Connected to Database Entity successfully for Reservations");

        const result = await sql.query(`
            SELECT r.id AS reservationId, 
                   r.userEmail, 
                   r.mealId, 
                   r.quantity, 
                   r.bookingDate, 
                   u.username, 
                   m.name AS mealName, 
                   m.description AS mealDescription 
            FROM Reservations.dbo.reservations r
            JOIN Reservations.dbo.Users u ON r.userEmail = u.email
            JOIN Reservations.dbo.Meals m ON r.mealId = m.id
        `);

        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;