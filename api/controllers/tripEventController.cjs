// tripEventController.cjs
const db = require('../models/index.cjs');

// Create a new trip event
const createTripEvent = async (req, res) => {
  const { title, start_time, end_time, collaborators } = req.body;
  const { tripId } = req.params;

  console.log("Request body:", req.body); // Log the request body

  if (!title || !start_time || !end_time) {
    console.error("Missing required fields:", { title, start_time, end_time });
    return res.status(400).json({ message: 'Title, start time, and end time are required' });
  }

  try {
    // Create the trip event with the provided data
    const newTripEvent = await db.TripEvent.create({
      title,
      start_time,
      end_time,
      trip_id: tripId, // Ensure trip_id is correctly mapped
    });

    // Handle collaborators if provided
    if (collaborators && collaborators.length > 0) {
      // Assuming you have a model and association for collaborators
      await newTripEvent.setCollaborators(collaborators);
    }

    // Return the created trip event as JSON
    res.status(201).json(newTripEvent);
  } catch (error) {
    console.error("Error creating trip event:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all events for a specific trip
const getTripEvents = async (req, res) => {
  const { tripId } = req.params;
  try {
    const tripEvents = await db.TripEvent.findAll({
      where: { trip_id: tripId },
    });
    res.json(tripEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a trip event
const updateTripEvent = async (req, res) => {
  const { trip_event_id } = req.params;
  const { title, start_time, end_time } = req.body;

  try {
    const tripEvent = await db.TripEvent.findByPk(trip_event_id);
    if (!tripEvent) {
      return res.status(404).json({ message: 'Trip event not found' });
    }

    await tripEvent.update({
      title,
      start_time,
      end_time,
    });

    res.json(tripEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a trip event
const deleteTripEvent = async (req, res) => {
  const { trip_event_id } = req.params;

  try {
    const tripEvent = await db.TripEvent.findByPk(trip_event_id);
    if (!tripEvent) {
      return res.status(404).json({ message: 'Trip event not found' });
    }

    await tripEvent.destroy();
    res.json({ message: 'Trip event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTripEvent,
  getTripEvents,
  updateTripEvent,
  deleteTripEvent,
};
