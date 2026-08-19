# Todo Application (Full-Stack MVC Architecture)

A complete production-ready Todo List application with a React frontend and Node.js/Express backend using a clean Layered / MVC Architecture with SQLite.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide React, Axios, React Hook Form, Zod.
- **Backend:** Node.js, TypeScript, Express, SQLite3, Zod validation, Swagger / OpenAPI docs.
- **Architecture:** Clean Layered MVC Architecture (Routes -> Controllers -> Services -> Models -> Database).

---

## Backend Architecture

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts             # SQLite connection & table creation
│   ├── models/
│   │   └── todo.model.ts     # Data Access Layer / Model (SQL Queries)
│   ├── services/
│   │   └── todo.service.ts   # Business Logic Layer (Pagination, Filtering)
│   ├── controllers/
│   │   └── todo.controller.ts# HTTP Request/Response handling
│   ├── routes/
│   │   └── todo.routes.ts    # REST API Routes
│   ├── middleware/
│   │   └── errorHandler.ts   # Error & 404 middleware
│   ├── schemas/
│   │   └── todo.schema.ts    # Zod validation schemas
│   ├── app.ts                # Express application configuration
│   └── server.ts             # Server entry point
├── Dockerfile                # Production Dockerfile
└── package.json              # Clean dependencies (no Prisma)
```

---

## Running Locally

### 1. Backend

```bash
cd backend
npm install
npm run dev
```
Backend will start on `http://localhost:5000`.
Swagger API Docs available at `http://localhost:5000/api/docs`.

### 2. Frontend

```bash
npm install
npm run dev
```
Frontend will start on `http://localhost:3000`.

---

## Docker (Backend Only)

```bash
cd backend
docker build -t todo-backend .
docker run -p 5000:5000 todo-backend
```
Or via Docker Compose:
```bash
docker compose up --build -d
```
