// meals.js
const express = require('express');
const sql = require('mssql');
const router = express.Router();
const connectDB = require('./config');

router.post('/', async (req, res) => {
    const { name, description, price, category_id, imageUrl } = req.body;

    if (!name || !description || !price || !category_id || !imageUrl) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
        return res.status(400).json({ error: 'Price must be a positive number.' });
    }

    if (isNaN(category_id) || parseInt(category_id) <= 0) {
        return res.status(400).json({ error: 'Category ID must be a positive integer.' });
    }

    try {
        await connectDB();
        console.log("Connected to Database Entity successfully for Meals");

        const result = await sql.query(`
            INSERT INTO Reservations.dbo.Meals (name, description, price, category_id, imageUrl)
            OUTPUT INSERTED.id, INSERTED.name, INSERTED.description, INSERTED.price, INSERTED.category_id, INSERTED.imageUrl
            VALUES ('${name}', '${description}', ${price}, ${category_id}, '${imageUrl}')
        `);

        res.status(201).json(result.recordset[0]);
    } catch (error) {
        console.error('Error adding meal:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;