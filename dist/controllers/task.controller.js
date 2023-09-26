"use strict";
// controllers/task.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasksByPriority = exports.getTaskById = exports.getAllTasks = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const dbFilePath = path_1.default.join(__dirname, '..', '..', 'db.json');
let tasks = [];
// Initialize 'tasks' array from the JSON file when the server starts
try {
    const data = fs_1.default.readFileSync(dbFilePath, 'utf-8');
    tasks = JSON.parse(data).tasks;
}
catch (error) {
    console.error('Error reading JSON database file:', error);
}
// Create a function to save 'tasks' array to the JSON file
function saveTasksToDatabase() {
    try {
        const dataToWrite = JSON.stringify({ tasks }, null, 2);
        fs_1.default.writeFileSync(dbFilePath, dataToWrite, 'utf-8');
    }
    catch (error) {
        console.error('Error writing to JSON database file:', error);
    }
}
const getAllTasks = (req, res) => {
    let filteredTasks = tasks;
    // Filter by completion status if query parameter 'completed' is provided
    const { completed } = req.query;
    if (completed === 'true' || completed === 'false') {
        filteredTasks = tasks.filter((task) => task.completed === (completed === 'true'));
    }
    // Sort by creation date
    const { sort } = req.query;
    if (sort === 'asc') {
        filteredTasks.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
    }
    else if (sort === 'desc') {
        filteredTasks.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }
    res.json(filteredTasks);
};
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => {
    const { id } = req.params;
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        res.status(404).json({ error: 'Task not found' });
    }
    else {
        res.json(task);
    }
};
exports.getTaskById = getTaskById;
const getTasksByPriority = (req, res) => {
    const { level } = req.params;
    const filteredTasks = tasks.filter((task) => task.priority === level);
    res.json(filteredTasks);
};
exports.getTasksByPriority = getTasksByPriority;
const createTask = (req, res) => {
    const { title, description, completed, priority } = req.body;
    if (!title || !description || typeof completed !== 'boolean' || !priority) {
        res.status(400).json({ error: 'Invalid request data' });
        return;
    }
    const newTask = {
        id: (0, uuid_1.v4)(),
        title,
        description,
        completed,
        priority,
        createdAt: new Date(),
    };
    tasks.push(newTask);
    saveTasksToDatabase();
    res.status(201).json(newTask);
};
exports.createTask = createTask;
const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, completed, priority } = req.body;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    if (!title || !description || typeof completed !== 'boolean' || !priority) {
        res.status(400).json({ error: 'Invalid request data' });
        return;
    }
    tasks[taskIndex] = Object.assign(Object.assign({}, tasks[taskIndex]), { title,
        description,
        completed,
        priority });
    saveTasksToDatabase();
    res.json(tasks[taskIndex]);
};
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    tasks.splice(taskIndex, 1);
    saveTasksToDatabase();
    res.sendStatus(204);
};
exports.deleteTask = deleteTask;
