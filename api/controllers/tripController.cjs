const db = require('../models/index.cjs');

// Get trips by user ID
const getTripsByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const trips = await db.Trip.findAll({ where: { owner_id: userId } });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a trip for a user
const createTripForUser = async (req, res) => {
  const userId = req.params.id;
  const { title, description, country, start_date, end_date } = req.body;
  try {
    const trip = await db.Trip.create({ owner_id: userId, title, description, country, start_date, end_date });
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTripsByUserId, createTripForUser };