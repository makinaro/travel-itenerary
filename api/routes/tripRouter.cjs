const tripController = require('../controllers/tripController.cjs'); // Add the trip controller
const router = require('express').Router();

// router.get('/', tripController.createTrip);
router.post('/', tripController.createTrip);

module.exports = router;