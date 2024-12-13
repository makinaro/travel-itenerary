const db = require('../models/index.cjs');
// Get trips by user ID
const getTripsByUserId = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Simpler query first to test
    const ownerTrips = await db.Trip.findAll({
      where: { owner_id: userId }
    });

    // Separate query for collaborator trips - note the lowercase 'collaborators'
    const collaboratorTrips = await db.Trip.findAll({
      include: [{
        model: db.Collaborator,
        as: 'collaborators',  // Changed from 'Collaborators' to 'collaborators'
        where: { user_id: userId }
      }]
    });

    // Combine results
    const allTrips = [...ownerTrips, ...collaboratorTrips];

    if (allTrips.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }

    return res.json(allTrips);

  } catch (error) {
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({ message: error.message });
  }
};

// Create a trip for a user
const createTripForUser = async (req, res) => {
  const userId = req.params.id;
  const { title, country, startDate, endDate, collaborators } = req.body;
  try {
    const trip = await db.Trip.create({
      owner_id: userId,
      title,
      country,
      status: 'Planned',
      start_date: startDate,
      end_date: endDate
    });

    if (collaborators && collaborators.length > 0) {
      const collaboratorEntries = collaborators.map(user_id => ({
        user_id,
        trip_id: trip.trip_id,
        access_level: 'View' // or 'edit', depending on your logic
      }));
      await db.Collaborator.bulkCreate(collaboratorEntries);
    }

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTripsByUserId, createTripForUser };