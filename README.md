# Task Manager

A full-stack Task Manager app built with **React** (frontend) and **Node.js + Express** (backend).

### 🌐 Live : https://task-manager-phi-lime.vercel.app/

---

## Project Structure

```
task-manager/
├── backend/
│   ├── routes/
│   │   └── tasks.js        # All API route handlers
│   ├── store/
│   │   └── taskStore.js    # In-memory data store
│   ├── server.js           # Express app entry point
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── tasks.js    # API service functions
│   │   ├── components/
│   │   │   ├── FilterBar.jsx / .module.css
│   │   │   ├── TaskForm.jsx / .module.css
│   │   │   └── TaskItem.jsx / .module.css
│   │   ├── App.jsx
│   │   ├── App.module.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

---

## Setup & Run

### Prerequisites
- Node.js v18+
- npm

### 1. Backend

```bash
cd backend
npm install
npm run dev        # uses nodemon for auto-reload
# OR
npm start          # plain node
```

Backend runs at: `http://localhost:5000`

### 2. Frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`  
It proxies API calls to `http://localhost:5000` automatically.

---

## API Endpoints

| Method | Endpoint        | Description                     |
|--------|-----------------|---------------------------------|
| GET    | /tasks          | Get all tasks (supports `?status=completed\|incomplete`) |
| POST   | /tasks          | Create a task `{ title: "..." }` |
| PATCH  | /tasks/:id      | Update `{ completed: bool }` or `{ title: "..." }` |
| DELETE | /tasks/:id      | Delete a task                   |

---

## Features

- **Create** tasks with validation (empty title rejected)
- **Complete / Uncomplete** tasks with a checkbox
- **Edit** task titles inline
- **Delete** tasks
- **Filter** by All / Incomplete / Completed
- Loading and error states throughout
- Clean error messages from the API

---

## Assumptions & Trade-offs

- **In-memory storage**: Tasks reset on server restart. This was intentional per the assignment — no database required.
- **No auth**: Single-user, no authentication needed for this scope.
- **Proxy setup**: React's `proxy` field in `package.json` forwards `/tasks` calls to the backend — no CORS issues in development.
- **Bonus features included**: Filter by status, edit task title — both completed within the 1-2 hour scope.
- **No Docker**: Kept it simple; Docker setup was marked as optional.

---

## Tech Stack

| Layer    | Tech                   |
|----------|------------------------|
| Frontend | React 18, CSS Modules  |
| Backend  | Node.js, Express       |
| Storage  | In-memory (array)      |
| IDs      | uuid v4                |
