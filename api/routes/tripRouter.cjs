const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController.cjs');
const authenticateToken = require('../middleware/authMiddleware.cjs'); // Import auth middleware

// Protect the create trip route with the authentication middleware
router.post('/', authenticateToken, tripController.createTrip);  // Route to create a trip

module.exports = router;
