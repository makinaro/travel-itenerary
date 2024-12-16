// collaboratorController.cjs
const db = require('../models/index.cjs');

// Get all collaborators for a specific trip
const getCollaborators = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    console.log('tripId', tripId);
    const collaborators = await db.Collaborator.findAll({
      where: { trip_id: tripId },
      include: [{
        model: db.User,
        attributes: ['user_id', 'username', 'email'] // Join user table to get user details
      }],
      attributes: [] // Exclude all attributes from Collaborator model
    });

    // Map the result to return only the required fields
    const result = collaborators.map(collaborator => ({
      user_id: collaborator.User.user_id,
      username: collaborator.User.username,
      email: collaborator.User.email
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getCollaborators
};
