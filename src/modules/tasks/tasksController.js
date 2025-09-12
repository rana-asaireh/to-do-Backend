import * as tasksService from './tasksService.js';

// 1. Get all tasks for the logged-in user
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await tasksService.getAllTasks(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving tasks', error });
  }
};

// 2. Create a new task for the logged-in user with status 'pending'
export const createTask = async (req, res) => {
  console.log('createTask called', req.body, req.user);
  try {
    const userId = req.user.id;
    const { task_name, description, dueDate  } = req.body;
    const newTask = await tasksService.createTask(userId, task_name, description, dueDate );
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating task', error });
  }
};

// 3. Delete a specific task for the logged-in user
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;
    await tasksService.deleteTask(userId, taskId);
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error });
  }
};


//4. Update a task (name, description, dueDate)
export const updateTaskController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;
    const { task_name, description, dueDate } = req.body;

    if (!task_name) return res.status(400).json({ message: 'task_name is required' });

    const updatedTask = await tasksService.updateTask(userId, taskId, task_name, description, dueDate);

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};


// // 5. Update task status 

export const updateTaskStatusController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;
    const { task_status } = req.body; // frontend sends this

    if (!task_status) return res.status(400).json({ message: 'task_status is required' });

    const updatedTask = await tasksService.updateTaskStatus(userId, taskId, task_status);

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error); // log error to see the crash reason
    return res.status(500).json({ message: 'Error updating task status', error: error.message });
  }
};


// 6. Filter tasks by status (All, Pending, Completed)
export const filterTasksByStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.body; // status can be 'all', 'pending', or 'completed'
    const tasks = await tasksService.filterTasksByStatus(userId, status);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error filtering tasks', error });
  }
};


// 7. Get a task by ID for the logged-in user
export const getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;
    const task = await tasksService.getTaskById(userId, taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving task', error });
  }
};