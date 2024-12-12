const Admission = require('../models/admissionModel');
const User = require('../models/userModel');
const { userIdFromToken } = require('../utils/userIdFromToken');


const createAdmission = async (req, res) => {
  try {
    const { studentName, studentClass, parentName, gender, contact,address } = req.body;
   
    // Create the teacher with or without a user reference
    const admission = new Admission({
      studentName,
      studentClass,
      parentName,
      gender,
      contact,
      address,
      
    });

    await admission.save();
    res.status(201).json({ message: 'Admission created successfully', admission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAdmission };

  
