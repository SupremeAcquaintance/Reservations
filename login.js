const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const app = express.Router();
const connectDB = require('./config');

app.use(express.json());

app.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await connectDB();
        console.log("Connected to Database Entity successfully");

        // Query to find the user by email
        const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;

        // Check if user exists
        if (result.recordset.length === 0) {
            return res.status(401).send('Account does not exist! Please Register.');
        }

        const user = result.recordset[0];

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid password!');
        }

        // If everything is valid, send a success response
        return res.status(200).send('Sign in successful!');
    } catch (error) {
        console.error('Error during sign in:', error);
        return res.status(500).send('Sign in failed. Failed to render database connection.');
    } finally {
        await sql.close();
    }
});

module.exports = app;