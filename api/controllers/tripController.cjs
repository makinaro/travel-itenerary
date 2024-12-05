const db = require('../models/index.cjs'); // Import the models

const createTrip = async (req, res) => {
    const { title, description, country, startDate, endDate, userId } = req.body;
  
    try {
      // Create the itinerary with all required fields
      const newTrip = await db.Itinerary.create({
        title,
        description,  // New field added
        country,      // New field added
        start_date: startDate,
        end_date: endDate,
        user_id: userId  // Assuming you need the user_id
      });
  
      // Return the created itinerary as JSON
      res.status(201).json(newTrip);  
    } catch (error) {
      console.error("Error creating trip:", error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { createTrip };
