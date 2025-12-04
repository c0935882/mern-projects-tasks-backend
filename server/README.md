# mern-projects-tasks-backend
A backend API built with Node.js, Express, and MongoDB using Mongoose. Supports full CRUD for Projects and Tasks with data validation, relationships, and RESTful routing.

# TaskFlow (CSD-3103 Project Part 1 - Backend)

## Overview
TaskFlow is a backend API built using **Node.js, Express, and MongoDB (Mongoose)**.  
It allows users to manage **Projects** and **Tasks**, where each Project can have multiple Tasks associated with it.  
This backend will be used later with a React frontend in Part 2 of the project.

---

## Data Models

### **Project Model**
| Field       | Type   | Description |
|------------|--------|-------------|
| `name`     | String | Required, unique, min 3 chars, max 60 chars |
| `status`   | String | Enum: `planned`, `active`, `completed` |
| `description` | String | Optional, max length 1000 characters |

### **Task Model**
| Field       | Type   | Description |
|------------|--------|-------------|
| `projectId` | ObjectId (Ref → Project) | Required, links Task to Project |
| `title`     | String | Required, min 3 chars, max 100 chars |
| `description` | String | Optional, max length 2000 characters |
| `priority`  | Number | Range 1–5 |
| `state`     | String | Enum: `todo`, `doing`, `done` |
| `dueDate`   | Date | Must be today or later |

---

## Relationship Between Models
- **One Project → Many Tasks**
- `Task.projectId` stores a **reference** to the Project `_id`.

This allows retrieving all tasks belonging to a project and ensures referential consistency.

---

## Endpoints (Routes)

### **Projects (`/api/projects`)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/projects` | Create a new project |
| GET    | `/api/projects` | Get all projects |
| GET    | `/api/projects/:id` | Get one project by ID |
| PATCH  | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

### **Tasks (`/api/tasks`)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/tasks` | Create a new task (requires projectId) |
| GET    | `/api/tasks` | Get all tasks or filter by `projectId` or `state` |
| GET    | `/api/tasks/:id` | Get one task by ID |
| PATCH  | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Running the Server

### 1. Install Dependencies
```bash
npm install
