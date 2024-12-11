// deletemeals.js
const express = require('express');
const sql = require('mssql');
const router = express.Router();
const connectDB = require('./config');

router.delete('/:id', async (req, res) => {
    const mealId = req.params.id;

    try {
        await connectDB();
        console.log("Connected to Database Entity successfully for Meals");

        const result = await sql.query(`
            DELETE FROM Reservations.dbo.Meals
            WHERE id = ${mealId}
        `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Meal not found.' });
        }

        res.status(200).json({ message: 'Meal deleted successfully.' });
    } catch (error) {
        console.error('Error deleting meal:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;