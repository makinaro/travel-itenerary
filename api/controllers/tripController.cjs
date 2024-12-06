const db = require('../models/index.cjs'); // Import the models

const createTrip = async (req, res) => {
  const { title, description, country, startDate, endDate } = req.body;
  const userId = req.user.userId; // Already available from the JWT

  // Check for missing fields
  if (!title || !description || !country || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
  }

  try {
      // The userId is already decoded and available, no need to query the database again
      const newTrip = await db.Trip.create({
          title,
          description,
          country,
          start_date: startDate,
          end_date: endDate,
          owner_id: userId, // Using the userId directly from the JWT
      });

      // Return the created trip as JSON
      res.status(201).json(newTrip);  
  } catch (error) {
      console.error("Error creating trip:", error);
      res.status(500).json({ message: error.message });
  }
};

module.exports = { createTrip };
