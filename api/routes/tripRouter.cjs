const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController.cjs');

router.post('/', tripController.createTrip);  // Route to create a trip

module.exports = router;
