const express = require("express");
const {
  createStudentWithUser,
  getAllStudents,
  updateStudentProfile,
} = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddleware"); // Import the middleware
const router = express.Router();

// POST: Create a new student
router.post("/create", authMiddleware, createStudentWithUser);

// GET: Get all students
router.get("/getStudents", getAllStudents);
router.put("/update", authMiddleware, updateStudentProfile);

module.exports = router;
