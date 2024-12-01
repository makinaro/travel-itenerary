const fs = require('fs');
const path = require('path');
const { sequelize } = require('../db.cjs');

const basename = path.basename(__filename);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-4) === '.cjs');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, require('sequelize').DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

db.Sequelize.sync().then(() => {
  console.log('Database synced');
});

module.exports = db;