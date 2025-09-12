import { DataTypes } from 'sequelize'; 
import _tasks from './tasks.js';
import _users from './users.js';

function initModels(sequelize) {
  const tasks = _tasks(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  // Defining relationships
  users.hasMany(tasks, { as: "tasks", foreignKey: "user_id" });
  tasks.belongsTo(users, { as: "user", foreignKey: "user_id" });

  return {
    tasks,
    users
  };
}

export default initModels;
