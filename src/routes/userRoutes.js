const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,  // Import the login function
} = require('../controllers/userController');

// Register a new user
router.post('/register', createUser);

// Get all users
router.get('/', getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

// Update user by ID
router.put('/:id', updateUser);

// Delete user by ID
router.delete('/:id', deleteUser);
router.post('/login', loginUser);  // Add the login route

module.exports = router;
