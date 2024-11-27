const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');  // Assuming your database connection logic is inside this folder
const userRoutes = require('./src/routes/userRoutes'); // Import the user routes (assuming routes are in the 'src/routes' folder)
var cors = require('cors')

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('API is running...'));

// Use user routes
app.use('/api/users', userRoutes); // Mount the user routes under /api/users

// Handle unknown routes (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler (optional, for general error catching)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong, please try again later' });
});

// Set the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
