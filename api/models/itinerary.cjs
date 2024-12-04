module.exports = (sequelize, DataTypes) => {
  const Itinerary = sequelize.define('Itinerary', {
    itinerary_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING(255),
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {tableName: "itinerary"});

  Itinerary.associate = (models) => {
    Itinerary.belongsTo(models.User, { foreignKey: 'user_id' });
    Itinerary.hasMany(models.ItineraryEvent, { foreignKey: 'itinerary_id' });
    Itinerary.hasMany(models.Collaborator, { foreignKey: 'itinerary_id' });
  };

  return Itinerary;
};