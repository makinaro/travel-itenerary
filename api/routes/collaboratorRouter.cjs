const express = require('express');
const collaboratorController = require('../controllers/collaboratorController.cjs');
const router = express.Router();

// Get all collaborators for a specific trip
router.get('/trip/:trip_id', collaboratorController.getCollaborators);
// Add a collaborator to a trip
router.post('/', collaboratorController.addCollaborator);
// Update a collaborator's access level
router.put('/:collaborator_id', collaboratorController.updateCollaborator);
// Delete a collaborator from a trip
router.delete('/:collaborator_id', collaboratorController.deleteCollaborator);

module.exports = router;
