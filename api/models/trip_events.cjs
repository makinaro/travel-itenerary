module.exports = (sequelize, DataTypes) => {
  const TripEvent = sequelize.define('TripEvent', {
    trip_event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trips',
        key: 'trip_id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'trip_events'
  });

  TripEvent.associate = (models) => {
    // A trip event belongs to one trip
    TripEvent.belongsTo(models.Trip, { foreignKey: 'trip_id', as: 'Trip' });
  };

  return TripEvent;
};
