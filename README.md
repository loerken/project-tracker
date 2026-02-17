# Minimalist Kanban Board

A minimalist Kanban board application built with **Node.js**, **Express**, **SQLite3**, and **vanilla JavaScript**. This project features a full-stack architecture with a persistent database and an interactive drag-and-drop interface and it was mainly created for learning purposes.

## Features

* **Persistent Storage**: All tasks are saved in a local SQLite database.
* **Full CRUD**: Create, Read, Update, and Delete tasks.
* **Interactive UI**: Drag and drop tasks between columns to update their status.
* **RESTful API**: A clean backend API to handle task management.

## Tech Stack

* **Frontend**: HTML5, CSS3, Vanilla JavaScript
* **Backend**: Node.js, Express.js
* **Database**: SQLite3

## API endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update task status/content |
| `DELETE` | `/api/tasks/:id` | Remove a task |