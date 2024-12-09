// tripEventRouter.cjs
const express = require('express');
const tripEventController = require('../controllers/tripEventController.cjs'); // Import the controller
const router = express.Router({ mergeParams: true }); // Merge params to access tripId

// Route to create a new trip event
router.post('/', tripEventController.createTripEvent);

// Route to get all trip events for a specific trip
router.get('/', tripEventController.getTripEvents);

// Route to update a specific trip event
router.put('/:trip_event_id', tripEventController.updateTripEvent);

// Route to delete a specific trip event
router.delete('/:trip_event_id', tripEventController.deleteTripEvent);

module.exports = router;