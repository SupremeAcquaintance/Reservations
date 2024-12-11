// userProfile.js
const express = require('express');
const sql = require('mssql');
const app = express.Router();
const connectDB = require('./config');

app.use(express.json());

app.get('/', async (req, res) => { 
    const { email } = req.query;

    if (!email) {
        console.log('Email is required');
        return res.status(400).send('Email is required');
    }

    try {
        await connectDB();
        console.log("Connected to Database Entity successfully for User Profile");
        const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
        if (result.recordset.length === 0) {
            console.log('User Profile  not found');
            return res.status(404).send('User Profile not found');
        }

        const user = result.recordset[0];
        // Return the user data as JSON
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Server Error');
    } finally {
        await sql.close();
    }
});

module.exports = app;