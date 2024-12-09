require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { authenticateToken } = require('./utils/authUtils.cjs'); // Import authenticateToken

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'] // Add more origins if necessary
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRouter = require('./routes/userRouter.cjs');
const tripRouter = require('./routes/tripRouter.cjs');
const collaboratorRouter = require('./routes/collaboratorRouter.cjs');
const tripEventRouter = require('./routes/tripEventRouter.cjs');
const authController = require('./controllers/authController.cjs');

app.post('/login', authController.loginUser);
app.use('/users', userRouter);
app.use('/users/:id/trips', authenticateToken, tripRouter);
app.use('/collaborators', authenticateToken, collaboratorRouter);
app.use('/users/:id/trips/:tripId/events', authenticateToken, tripEventRouter); // Mount tripEventRouter with /users/:id/trips/:tripId/events prefix

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Grandline' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});