module.exports = (sequelize, DataTypes) => {
  const ItineraryEvent = sequelize.define('ItineraryEvent', {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING(255),
    description: DataTypes.STRING(255),
    date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    location: DataTypes.STRING(255),
    itinerary_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {tableName: 'itinerary_events'});

  ItineraryEvent.associate = (models) => {
    ItineraryEvent.belongsTo(models.Itinerary, { foreignKey: 'itinerary_id' });
    ItineraryEvent.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return ItineraryEvent;
};