module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    collaborator_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trips',
        key: 'trip_id'
      }
    },
    access_level: {
      type: DataTypes.ENUM('View', 'Edit'),
      allowNull: false
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
    tableName: 'collaborators'
  });

  Collaborator.associate = (models) => {
    // A collaborator belongs to one user
    Collaborator.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
    // A collaborator belongs to one trip
    Collaborator.belongsTo(models.Trip, { foreignKey: 'trip_id', as: 'Trip' });
  };

  return Collaborator;
};
