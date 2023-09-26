// controllers/task.controller.ts

import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task.model';

const dbFilePath = path.join(__dirname, '..', '..', 'db.json');

let tasks: Task[] = [];

// Initialize 'tasks' array from the JSON file when the server starts
try {
  const data = fs.readFileSync(dbFilePath, 'utf-8');
  tasks = JSON.parse(data).tasks;
} catch (error) {
  console.error('Error reading JSON database file:', error);
}

// Create a function to save 'tasks' array to the JSON file
function saveTasksToDatabase() {
  try {
    const dataToWrite = JSON.stringify({ tasks }, null, 2);
    fs.writeFileSync(dbFilePath, dataToWrite, 'utf-8');
  } catch (error) {
    console.error('Error writing to JSON database file:', error);
  }
}

export const getAllTasks = (req: Request, res: Response): void => {
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

  } else if (sort === 'desc') {

    filteredTasks.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  }
  res.json(filteredTasks);
};


export const getTaskById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(task);
  }
};

export const getTasksByPriority = (req: Request, res: Response): void => {
  const { level } = req.params;
  const filteredTasks = tasks.filter((task) => task.priority === level);
  res.json(filteredTasks);
};

export const createTask = (req: Request, res: Response): void => {
  const { title, description, completed, priority } = req.body;
  if (!title || !description || typeof completed !== 'boolean' || !priority) {
    res.status(400).json({ error: 'Invalid request data' });
    return;
  }
  const newTask: Task = {
    id: uuidv4(),
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

export const updateTask = (req: Request, res: Response): void => {
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
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description,
    completed,
    priority,
  };
  saveTasksToDatabase();
  res.json(tasks[taskIndex]);
};

export const deleteTask = (req: Request, res: Response): void => {
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
