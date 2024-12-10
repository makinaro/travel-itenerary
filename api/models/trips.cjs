module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    trip_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    status: {
      type: DataTypes.ENUM('Planned', 'In progress', 'Completed'),
      allowNull: false,
      defaultValue: 'Planned'
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
    tableName: 'trips' 
  });

  Trip.associate = (models) => {
    // A trip belongs to one user (the owner)
    Trip.belongsTo(models.User, { foreignKey: 'owner_id', as: 'Owner' });
    // A trip can have many collaborators
    Trip.hasMany(models.Collaborator, { foreignKey: 'trip_id' });
    // A trip can have many trip events
    Trip.hasMany(models.TripEvent, { foreignKey: 'trip_id' });
    // Through collaborators, many users can collaborate on a trip
    Trip.belongsToMany(models.User, {
      through: models.Collaborator,
      foreignKey: 'trip_id',
      as: 'Collaborators'
    });
  };

  return Trip;
};
