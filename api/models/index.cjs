const dbConfig = require('../config/dbConfig.cjs');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize connection
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importing models and associating them
db.User = require('./user.cjs')(sequelize, DataTypes);
db.Trip = require('./trips.cjs')(sequelize, DataTypes);
db.Collaborator = require('./collaborators.cjs')(sequelize, DataTypes);
db.TripEvent = require('./trip_events.cjs')(sequelize, DataTypes);

// Associations
db.User.hasMany(db.Trip, { foreignKey: 'owner_id', as: 'ownedTrips' });
db.Trip.belongsTo(db.User, { foreignKey: 'owner_id', as: 'owner' });

db.Trip.hasMany(db.TripEvent, { foreignKey: 'trip_id', as: 'events' });
db.TripEvent.belongsTo(db.Trip, { foreignKey: 'trip_id' });

db.Trip.hasMany(db.Collaborator, { foreignKey: 'trip_id', as: 'collaborators' });
db.Collaborator.belongsTo(db.Trip, { foreignKey: 'trip_id' });

db.User.hasMany(db.Collaborator, { foreignKey: 'user_id', as: 'collaborations' });
db.Collaborator.belongsTo(db.User, { foreignKey: 'user_id' });

// Sync database
db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synced.');
});

module.exports = db;
