const dbConfig = require('../config/dbConfig.cjs');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate().then(() => {
    console.log('Connected to the database.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.cjs')(sequelize, DataTypes);
db.itinerary = require('./itinerary.cjs')(sequelize, DataTypes);
db.collaborator = require('./collaborator.cjs')(sequelize, DataTypes);
db.itineraryEvent = require('./itineraryEvent.cjs')(sequelize, DataTypes);
db.todo = require('./todo.cjs')(sequelize, DataTypes);

db.sequelize.sync({force: false}).then(() => {
    console.log('Database synced.');
});

module.exports = db;