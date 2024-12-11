const express = require('express');
const cors = require('cors');
const mealsRouter = require('./meals'); 
const bookingsRouter = require('./bookings'); 
const loginRouter = require('./login'); 
const registerRouter = require('./register'); 
const businessDashboardRouter = require('./routes/businessDashboard');
const userProfileRooter = require('./profile');
const reservations = require('./reservations');
const addmeals = require('./addmeals');
const deletemeal = require('./deletemeal');


const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware for communication with the other server
app.use(cors({
    // origin server
    origin: 'http://localhost:3001',
    // Specify allowed methods
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allow credentials 
    credentials: true 
}));

// Use the meals, bookings, login, registration, and business dashboard routes
app.use('/api/meals', mealsRouter);
app.use('/api/book', bookingsRouter);
app.use('/api/login', loginRouter); 
app.use('/api/register', registerRouter);
app.use('/api/business', businessDashboardRouter); 
app.use('/api/user/profile', userProfileRooter);
app.use('/api/reservations', reservations);
app.use('/api/add', addmeals);
app.use('/api/delete', deletemeal);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});