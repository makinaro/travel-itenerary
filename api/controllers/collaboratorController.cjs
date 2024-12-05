// collaboratorController.cjs
const db = require('../models/index.cjs');

// Get all collaborators for a specific trip
const getCollaborators = async (req, res) => {
  try {
    const { trip_id } = req.params;
    const collaborators = await db.collaborator.findAll({
      where: { trip_id },
      include: [{ model: db.user, attributes: ['username', 'email'] }] // Join user table to get user details
    });
    res.json(collaborators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a collaborator to a trip
const addCollaborator = async (req, res) => {
  const { user_id, trip_id, access_level } = req.body;
  try {
    const collaborator = await db.collaborator.create({
      user_id,
      trip_id,
      access_level,
    });
    res.status(201).json(collaborator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a collaborator's access level
const updateCollaborator = async (req, res) => {
  try {
    const { collaborator_id } = req.params;
    const { access_level } = req.body;

    const collaborator = await db.collaborator.findByPk(collaborator_id);
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }

    await collaborator.update({ access_level });
    res.json(collaborator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a collaborator from a trip
const deleteCollaborator = async (req, res) => {
  try {
    const { collaborator_id } = req.params;

    const collaborator = await db.collaborator.findByPk(collaborator_id);
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }

    await collaborator.destroy();
    res.json({ message: 'Collaborator removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCollaborators,
  addCollaborator,
  updateCollaborator,
  deleteCollaborator,
};
