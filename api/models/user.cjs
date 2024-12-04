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
    contact_number: {
      type: DataTypes.STRING(32),
      allowNull: true
    }
  }, {tableName: 'users'});

  User.associate = (models) => {
    User.hasMany(models.Todo, { foreignKey: 'user_id' });
    User.hasMany(models.Itinerary, { foreignKey: 'user_id' });
    User.hasMany(models.Collaborator, { foreignKey: 'user_id' });
    User.hasMany(models.ItineraryEvent, { foreignKey: 'user_id' });
  };

  return User;
};