module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    todo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(255),
    is_complete: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {tableName: 'todos'});

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Todo;
};