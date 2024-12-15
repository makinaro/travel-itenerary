const db = require('../models/index.cjs');
const bcrypt = require('bcryptjs');
const { getUserFromToken } = require('../utils/authUtils.cjs');

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

// Fetch user by username
const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: user.id , username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    // Check if the new username or email is already taken by another user
    if (username) {
      const existingUserWithUsername = await db.User.findOne({ where: { username } });
      if (existingUserWithUsername && existingUserWithUsername.id !== user.id) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
    }
    if (email) {
      const existingUserWithEmail = await db.User.findOne({ where: { email } });
      if (existingUserWithEmail && existingUserWithEmail.id !== user.id) {
        return res.status(400).json({ message: 'Email is already taken' });
      }
    }
    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // If newPassword is provided, hash it and update the user's password
      if (newPassword) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedNewPassword });
      }
    }
    // Update other fields
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    await user.update(updateData);
    res.status(200).json(user);
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

const searchUsersByUsername = async (req, res) => {
  const { searchTerm } = req.params;
  try {
    const users = await db.User.findAll({
      where: {
        username: {
          [db.Sequelize.Op.like]: `%${searchTerm}%`
        }
      },
      attributes: ['user_id', 'username', 'email'] // Ensure these columns exist in your model
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, getUserById, getUserByUsername, createUser, updateUser, deleteUser, searchUsersByUsername };