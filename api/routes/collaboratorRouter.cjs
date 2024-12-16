const express = require('express');
const collaboratorController = require('../controllers/collaboratorController.cjs');
const router = express.Router();

// Get all collaborators for a specific trip
router.get('/', collaboratorController.getCollaborators);

module.exports = router;
