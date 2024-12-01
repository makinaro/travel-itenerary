const express = require('express');
const { sequelize, connectDB } = require('./db.cjs'); // Import db.cjs
const apiRoutes = require('./routes/index.cjs'); // Import combined routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use combined routes
app.use('/api', apiRoutes);

sequelize.sync();

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB(); // Connect to the database
  try {
    await sequelize.sync(); // Sync all models
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
});