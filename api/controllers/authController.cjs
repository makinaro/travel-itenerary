const jwt = require('jsonwebtoken'); // jwt for creating tokens
const db = require('../models/index.cjs');
const bcrypt = require('bcryptjs'); // bcrypt for password hashing
const { generateToken,  } = require('../utils/authUtils.cjs');
const { getUserByToken } = require('./userController.cjs');

const loginUser = async (req, res) => {
  const { identifier, password } = req.body; // Use 'identifier' to represent either username or email

  try {
    const user = await db.User.findOne({
      where: {
        [db.Sequelize.Op.or]: [{ username: identifier }, { email: identifier }]
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or email or password' });
    }
    const user_id = user.user_id;
    const token = generateToken(user_id);
    // user = getUserByToken(token);
    res.json({ token , user_id});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser };