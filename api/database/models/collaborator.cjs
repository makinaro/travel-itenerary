const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Collaborator = sequelize.define('Collaborator', {
    collaborator_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    access_level: DataTypes.ENUM('view', 'edit'),
    user_id: DataTypes.INTEGER,
    itinerary_id: DataTypes.INTEGER
  }, {});

  Collaborator.associate = (models) => {
    Collaborator.belongsTo(models.User, { foreignKey: 'user_id' });
    Collaborator.belongsTo(models.Itinerary, { foreignKey: 'itinerary_id' });
  };

  return Collaborator;
};