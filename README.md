# Task Manager API

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Create a New Task](#create-a-new-task)
  - [Retrieve All Tasks](#retrieve-all-tasks)
  - [Retrieve a Specific Task by ID](#retrieve-a-specific-task-by-id)
  - [Update a Task by ID](#update-a-task-by-id)
  - [Delete a Task by ID](#delete-a-task-by-id)
  - [Filter Tasks by Completion Status](#filter-tasks-by-completion-status)
  - [Sort Tasks by Creation Date](#sort-tasks-by-creation-date)
  - [Retrieve Tasks Based on Priority Level](#retrieve-tasks-based-on-priority-level)
- [Contributing](#contributing)

## Description

This Task Manager API is a RESTful web service built with Node.js, Express, and TypeScript. It allows users to manage tasks with features like creating, retrieving, updating, and deleting tasks. Additionally, you can filter and sort tasks based on various criteria. This API is designed for educational purposes and can serve as a foundation for building more complex task management applications.

## Features

- Create new tasks with a title, description, completion status, and priority level.
- Retrieve a list of all tasks.
- Retrieve a single task by its unique ID.
- Update existing tasks by their ID.
- Delete tasks by their ID.
- Filter tasks based on completion status (true or false).
- Sort tasks by creation date in ascending or descending order.
- Assign priority levels to tasks (low, medium, high).
- Retrieve tasks based on priority level.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Task-Manager-API.git
   cd Task-Manager-API
   1.  Install project dependencies:
       `npm install`
   2.  Start the server:
       `npm start`
       The API will be available at `http://localhost:3000`.

## Usage

   You can interact with the API using tools like `curl` or Postman. Here are some example API requests:

   ### Create a New Task

   ```bash
   `curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{
     "title": "Sample Task",
     "description": "This is a sample task.",
     "completed": false,
     "priority": "medium"
   }'`

   ### Retrieve All Tasks

   ```bash
   `curl http://localhost:3000/api/tasks`

   ### Retrieve a Specific Task by ID

   ```bash
   `curl http://localhost:3000/api/tasks/your-task-id`

   ### Update a Task by ID

   ```bash
   `curl -X PUT http://localhost:3000/api/tasks/your-task-id -H "Content-Type: application/json" -d '{
     "title": "Updated Task",
     "description": "This task has been updated.",
     "completed": true,
     "priority": "high"
   }'`

   ### Delete a Task by ID

   ```bash
   `curl -X DELETE http://localhost:3000/api/tasks/your-task-id`

   ### Filter Tasks by Completion Status

   ```bash
   `curl http://localhost:3000/api/tasks?completed=true`

   ### Sort Tasks by Creation Date (Ascending)

   ```bash
   `curl http://localhost:3000/api/tasks?sort=asc`

   ### Sort Tasks by Creation Date (Descending)

   ```bash
   `curl http://localhost:3000/api/tasks?sort=desc`

   ### Retrieve Tasks Based on Priority Level

   ```bash
   `curl http://localhost:3000/api/tasks/priority/medium`

   Please refer to the API documentation for more details on available endpoints and request/response formats.
## Contributing

   Contributions are welcome! Feel free to open issues or create pull requests for any improvements or bug fixes.
