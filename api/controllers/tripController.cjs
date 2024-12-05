const db = require('../models/index.cjs'); // Import the models

const createTrip = async (req, res) => {
    const { title, description, country, startDate, endDate, userId } = req.body;

    // Check for missing fields
    if (!title || !description || !country || !startDate || !endDate || !userId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Validate the user ID (Ensure the user exists in the database)
        const user = await db.User.findByPk(userId); // Assuming the User model has an ID field
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create the trip with all required fields
        const newTrip = await db.Trip.create({
            title,
            description,  // New field added
            country,      // New field added
            start_date: startDate,
            end_date: endDate,
            owner_id: userId  // Updated to match new model field
        });

        // Return the created trip as JSON
        res.status(201).json(newTrip);  
    } catch (error) {
        console.error("Error creating trip:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTrip };
