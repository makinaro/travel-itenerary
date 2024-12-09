const express = require('express');
const router = express.Router({ mergeParams: true }); // Merge params to access userId
const tripController = require('../controllers/tripController.cjs');
const authenticateToken = require('../middleware/authMiddleware.cjs'); // Import auth middleware

// Protect the routes with the authentication middleware
router.use(authenticateToken);

// Define trip routes
router.get('/', tripController.getTripsByUserId); // Route to get trips by user ID
router.post('/', tripController.createTripForUser); // Route to create a trip for a user

module.exports = router;