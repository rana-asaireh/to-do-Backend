import express from 'express';
import * as tasksController from './tasksController.js';
import verifyToken from '../../middlewares/authMiddleware.js';


const router = express.Router();
  
router.use(verifyToken); 


// 1. Get all tasks for the logged-in user
router.get('/', tasksController.getAllTasks);

// 2. Create a new task for the logged-in user with status 'pending'
router.post('/', tasksController.createTask);

// 3. Delete a specific task for the logged-in user
router.delete('/:taskId', tasksController.deleteTask);

// 4. Update the name of a specific task
router.put('/:taskId', tasksController.updateTaskController);

// 5. Update the status of a task to 'completed'
router.patch('/:taskId/status', tasksController.updateTaskStatusController);

// 6. Filter tasks by status (all, pending, completed)
router.post('/filter', tasksController.filterTasksByStatus);

// 7. Get a task by ID for the logged-in user
router.get('/:taskId', tasksController.getTaskById);

export default router;





