const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');  // Assuming your database connection logic is inside this folder
const userRoutes = require('./src/routes/userRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes'); // Import the user routes (assuming routes are in the 'src/routes' folder)
const studentRoutes = require('./src/routes/studentRoutes'); // Import the user routes (assuming routes are in the 'src/routes' folder)
const noticeRoutes = require('./src/routes/noticeRoutes'); // Import the user routes (assuming routes are in the 'src/routes' folder)
const eventRoutes = require('./src/routes/eventRoutes'); // Import the user routes (assuming routes are in the 'src/routes' folder)
const examRoutes = require('./src/routes/examRoutes'); // Import the user routes (assuming routes are in the 'src/routes' folder)
const contactRoutes = require('./src/routes/contactRoutes'); // Import the user routes (assuming routes are in the 'src/routes' folder)
const admissionRoutes = require('./src/routes/admissionRoutes'); // Import the user routes (assuming routes are in the 'src/routes' folder)


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
app.use('/api/teacher', teacherRoutes); // Prefix the route with '/api'
app.use('/api/student', studentRoutes); // Prefix the route with '/api'
app.use('/api/notice', noticeRoutes); // Prefix the route with '/api'
app.use('/api/event', eventRoutes); // Prefix the route with '/api'
app.use('/api/exam', examRoutes); // Prefix the route with '/api'
app.use('/api/contact', contactRoutes); // Add the contact routes
app.use('/api/addmission', admissionRoutes); 

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
