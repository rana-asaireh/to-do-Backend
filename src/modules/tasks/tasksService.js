import { sequelize } from '../../config/db.js'
import  initModels  from '../../sequelize-models/init-models.js';

const models = initModels(sequelize);
const tasks = models.tasks;




// 1. Get all tasks for the logged-in user
export const getAllTasks = async (userId) => {
  return await tasks.findAll({
    where: { user_id: userId },
    attributes: ['id', 'task_name', 'task_status', 'description', 'dueDate'],
  });
};



// 2. Create a new task for the logged-in user with status 'pending'
export const createTask = async (userId, taskName,description = null, dueDate = null) => {
   const existingTask = await tasks.findOne({
      where: { task_name: taskName, task_status: 'pending', user_id: userId }
    });

    if (existingTask) {
      throw new Error('Pending task with the same name already exists');
    } 

  return await tasks.create({
    task_name: taskName,
    task_status: 'pending',
    description,
    dueDate,
    user_id: userId,
  });
};



// 3. Delete a specific task for the logged-in user
export const deleteTask = async (userId, taskId) => {
  const task = await tasks.findOne({ where: { id: taskId, user_id: userId } });
  if (!task) throw new Error('Task not found or not authorized');
  await task.destroy();
};



// 4.  Update a task (name, description, dueDate) for the logged-in user
export const updateTask = async (userId, taskId, taskName, description, dueDate) => {
  const task = await tasks.findOne({ where: { id: taskId, user_id: userId } });
  if (!task) throw new Error('Task not found or not authorized');

  task.task_name = taskName;
  if (description !== undefined) task.description = description;
  if (dueDate !== undefined) task.dueDate = dueDate;

  return await task.save();
};


// 5. Update the task status 
export const updateTaskStatus = async (userId, taskId, newStatus) => {
  const task = await tasks.findOne({ where: { id: taskId, user_id: userId } });
  if (!task) throw new Error('Task not found or not authorized');

  task.task_status = newStatus; // ✅ dynamic
  return await task.save();
};


// 6. Filter tasks based on status (All, Pending, Completed)
export const filterTasksByStatus = async (userId, status) => {
  const whereClause = { user_id: userId };

  if (status && status !== 'all') {
    whereClause.task_status = status;
  }

  return await tasks.findAll({
    where: whereClause,
    attributes: ['id', 'task_name', 'task_status', 'description', 'dueDate'],
  });
};


// 7. Get a task by ID for the logged-in user
export const getTaskById = async (userId, taskId) => {
  const task = await tasks.findOne({
    where: { id: taskId, user_id: userId },
    attributes: ['id', 'task_name', 'task_status', 'description', 'dueDate'],
  });
  return task;
};


