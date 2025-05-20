# 📝 Taskly – Task Tracker Application

**Taskly** is a full-stack task management application that allows users to manage and track progress on their personal projects. Each user can create up to four projects, and within each project, create and manage tasks that include titles, descriptions, statuses, and timestamps. The app features secure authentication, a clean UI, and a modern development stack.

---

## 🧰 Tech Stack

**Frontend**
- React (TypeScript)
- Tailwind CSS
- Recoil
- Vite

**Backend**
- Express.js (TypeScript)
- MongoDB (Mongoose)
- JWT Authentication

---

## 📁 Project Structure

```
taskly/
├── frontend/     # React app
└── backend/      # Express server
```

---

## ✅ Features

- Signup & Login with JWT
- Each user can manage up to 4 projects
- Create, Read, Update, Delete (CRUD) tasks within projects
- Task progress tracking with statuses: Pending, In Progress, Completed
- Task creation and completion timestamps
- Fully responsive UI
- Recoil for clean global state management

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/taskly.git
cd taskly
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
DB_URL=your_mongodb_connection_string
ORIGIN=http://localhost:5173
SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:

```
VITE_SERVER_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

By default, the app will run at: [http://localhost:5173](http://localhost:5173)

