const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING(16),
    email: DataTypes.STRING(255),
    password: DataTypes.CHAR(60),
    contact_number: DataTypes.STRING(32)
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Todo, { foreignKey: 'user_id' });
    User.hasMany(models.Itinerary, { foreignKey: 'user_id' });
    User.hasMany(models.Collaborator, { foreignKey: 'user_id' });
    User.hasMany(models.ItineraryEvent, { foreignKey: 'user_id' });
  };

  return User;
};