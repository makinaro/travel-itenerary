const { sequelize } = require('../db.cjs');
const { User } = require('../models/user.cjs');


const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

module.exports = {
  getAllUsers,
  createUser
};