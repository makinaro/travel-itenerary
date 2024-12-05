module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.CHAR(60),
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
  }, { tableName: 'users' });

  User.associate = (models) => {
    // A user can own many trips
    User.hasMany(models.Trip, { foreignKey: 'owner_id', as: 'OwnedTrips' });
    // A user can be a collaborator on many trips
    User.hasMany(models.Collaborator, { foreignKey: 'user_id' });
    // Through the collaborators table, a user can be associated with multiple trips
    User.belongsToMany(models.Trip, {
      through: models.Collaborator,
      foreignKey: 'user_id',
      as: 'CollaboratingTrips'
    });
  };

  return User;
};
