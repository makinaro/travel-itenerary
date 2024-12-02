module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    collaborator_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    access_level: DataTypes.ENUM('view', 'edit'),
    user_id: DataTypes.INTEGER,
    itinerary_id: DataTypes.INTEGER
  }, {tableName: 'collaborators'});

  Collaborator.associate = (models) => {
    Collaborator.belongsTo(models.User, { foreignKey: 'user_id' });
    Collaborator.belongsTo(models.Itinerary, { foreignKey: 'itinerary_id' });
  };

  return Collaborator;
};