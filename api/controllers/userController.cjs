const db = require('../models/index.cjs');
const bcrypt = require('bcryptjs');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user ID by username
const getUserByUsername = async (req, res) => {
  const { username } = req.query;  
  try {
    const users = await db.User.findAll({
      where: {
        username: {
          [db.Sequelize.Op.like]: `%${username}%`
        }
      }
    });

    // Convert Sequelize instances to plain objects
    const usersPlain = users.map(user => user.toJSON());

    if (usersPlain.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Respond with user ids and usernames
    res.json(usersPlain.map(user => ({ id: user.id, username: user.username })));  
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { username, email, password } = req.body;  // Removed contact_number

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      username,
      email,
      password: hashedPassword
    });

    res.json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, getUserById, getUserByUsername, createUser, updateUser, deleteUser };