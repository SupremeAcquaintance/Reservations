//BusinessDashboard backend
const express = require('express');
const sql = require('mssql');
/*const authenticateUser  = require('../authMiddleware');*/
const sqlConfig = require('../config');
const router = express.Router();

// Fetch bookings for the authenticated user
router.get('/bookings', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const userId = req.user.id;
    const result = await sql.query`SELECT * FROM reservations WHERE userId = ${userId}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  } finally {
    await sql.close();
  }
});

// Fetch all meals
router.get('/meals', async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`SELECT * FROM Meals`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ message: 'Error fetching meals' });
  } finally {
    await sql.close();
  }
});

// Add a new meal
router.post('/meals', async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }

  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`INSERT INTO Meals (name, description) VALUES (${name}, ${description})`;
    res.status(201).json({ message: 'Meal added successfully', id: result.recordset.insertId });
  } catch (error) {
    console.error('Error adding meal:', error);
    res.status(500).json({ message: 'Failed to add meal' });
  } finally {
    await sql.close();
  }
});

// Delete a meal
router.delete('/meals/:id', async (req, res) => {
  const mealId = req.params.id;

  try {
    await sql.connect(sqlConfig);
    await sql.query`DELETE FROM Meals WHERE id = ${mealId}`;
    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (error) {
    console.error('Error deleting meal:', error);
    res.status(500).json({ message: 'Failed to delete meal' });
  } finally {
    await sql.close();
  }
});

module.exports = router;