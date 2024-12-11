const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const app = express.Router();
const connectDB = require('./config');

// Middleware for parsing JSON bodies
app.use(express.json());

app.post('/', async (req, res) => {
    const { username, email, phone, password, category } = req.body; 

    // Validate input
    if (!username || !email || !phone || !password || !category) { 
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Connect to the database
        await connectDB();

        // Check if the user already exists
        const existingUser  = await sql.query`SELECT * FROM Users WHERE email = ${email} OR username = ${username}`;
        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ message: 'Email or username already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await sql.query`INSERT INTO Users (username, email, phone, password, category) VALUES (${username}, ${email}, ${phone}, ${hashedPassword}, ${category})`;

        // Check if the insertion was successful
        if (result.rowsAffected[0] > 0) {
            return res.status(201).send( 'User  registered successfully' );
        } else {
            return res.status(500).send( 'Registration failed' );
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).send( 'Registration failed due to server error' );
    } finally {
        // Ensure the database connection is closed
        try {
            await sql.close();
        } catch (closeError) {
            console.error('Error closing SQL connection:', closeError);
        }
    }
});

module.exports = app;