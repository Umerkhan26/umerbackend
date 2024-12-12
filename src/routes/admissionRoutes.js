const express = require('express');
const { createAdmission } = require('../controllers/admissionController');

const router = express.Router();

// Routes
router.post('/createAddmission', createAdmission);
// url look like http://localhost:3001/api/contact/create



module.exports = router;
