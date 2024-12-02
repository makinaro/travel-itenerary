const express = require('express');
const cors = require('cors'); // cors for cross-origin requests
const authMiddleware = require('./middleware/authMiddleware.cjs');

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173']
}

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const userRouter = require('./routes/userRouter.cjs');
const authController = require('./controllers/authController.cjs');
app.use('/users', userRouter);
app.post('/login', authController.loginUser); // Login route

//test
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Grandline' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});