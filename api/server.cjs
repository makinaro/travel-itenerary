// server.cjs
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware.cjs'); // Ensure it's implemented correctly

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
const authController = require('./controllers/authController.cjs');
const collaboratorRouter = require('./routes/collaboratorRouter.cjs'); // New route for collaborators
const tripEventRouter = require('./routes/tripEventRouter.cjs'); // New route for trip events

app.use('/users', userRouter);
app.post('/login', authController.loginUser);
app.use('/trips', tripRouter);
app.use('/collaborators', collaboratorRouter); // Add collaborator route
app.use('/trip-events', tripEventRouter); // Add trip events route

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Grandline' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
