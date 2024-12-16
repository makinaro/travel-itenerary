const express = require('express');
const router = express.Router({ mergeParams: true }); // Merge params to access userId
const tripController = require('../controllers/tripController.cjs');
const collaboratorController = require('../controllers/collaboratorController.cjs');
const authenticateToken = require('../middleware/authMiddleware.cjs'); // Import auth middleware

// Protect the routes with the authentication middleware
router.use(authenticateToken);

// Define trip routes
router.get('/', tripController.getTripsByUserId); // Route to get trips by user ID
router.post('/', tripController.createTripForUser); // Route to create a trip for a user
router.put('/:tripId', tripController.editTripForUser); // Route to edit a trip for a user
router.delete('/:tripId', tripController.deleteTripForUser); // Route to delete a trip for a user
router.get('/:tripId/collaborators', collaboratorController.getCollaborators); // Route to get collaborators for a trip
module.exports = router;