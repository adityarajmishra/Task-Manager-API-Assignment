"use strict";
// routes/task.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
router.get('/tasks', task_controller_1.getAllTasks);
router.get('/tasks/:id', task_controller_1.getTaskById);
router.get('/tasks/priority/:level', task_controller_1.getTasksByPriority);
router.post('/tasks', task_controller_1.createTask);
router.put('/tasks/:id', task_controller_1.updateTask);
router.delete('/tasks/:id', task_controller_1.deleteTask);
exports.default = router;
