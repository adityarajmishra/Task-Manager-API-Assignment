// routes/task.routes.ts

import { Router } from 'express';
import {
  getAllTasks,
  getTaskById,
  getTasksByPriority,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller';

const router = Router();

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.get('/tasks/priority/:level', getTasksByPriority);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
