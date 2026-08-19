# Full-Stack Todo Application

A complete production-ready Todo List application with a React frontend and Node.js/Express backend, connected to a PostgreSQL database via Prisma ORM.

## Technology Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form, Zod, TanStack Query, Axios.
- **Backend:** Node.js, TypeScript, Express, Prisma ORM, PostgreSQL, JWT Authentication, bcrypt, Zod validation.
- **DevOps:** Docker, Docker Compose.

## Architecture

This project is structured as a monorepo integrated into the existing `सूर्यपुरा ग्राम विकास पोर्टल` project:
- The React application is at the root.
- The Node.js backend is located in the `/backend` directory.
- `docker-compose.yml` orchestrates the entire stack (PostgreSQL, pgAdmin, Backend, Frontend).

## Setup & Environment

Ensure you have Docker and Docker Compose installed.

### Environment Variables
The `.env.example` file contains the default configuration.

```env
DATABASE_URL="postgresql://todo_user:todo_password@postgres:5432/todo_db?schema=public"
POSTGRES_USER="todo_user"
POSTGRES_PASSWORD="todo_password"
POSTGRES_DB="todo_db"
JWT_SECRET="supersecretjwtkey_replace_me_in_production"
JWT_EXPIRES_IN="7d"
PORT=5000
FRONTEND_URL="http://localhost:3000"
PGADMIN_DEFAULT_EMAIL="admin@admin.com"
PGADMIN_DEFAULT_PASSWORD="admin"
```

## How to Start the Project

Run the following command from the root directory to build and start all services:

```bash
docker compose up --build -d
```

> **Note:** The backend container will automatically run the Prisma migrations and seed script when it starts. If it fails to connect to the DB initially, it will retry based on the health checks defined in `docker-compose.yml`.

## Important URLs

Once the containers are running, you can access the application at:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)
- **Swagger Documentation:** [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
- **pgAdmin:** [http://localhost:5050](http://localhost:5050)

### pgAdmin Database Credentials

When logging into pgAdmin at `http://localhost:5050`:
- **Email:** admin@admin.com
- **Password:** admin

Add a new server with:
- **Host:** postgres
- **Port:** 5432
- **Database:** todo_db
- **Username:** todo_user
- **Password:** todo_password

## Demo Login Credentials

The database is seeded with a demo user:
- **Email:** demo@demo.com
- **Password:** demo1234

## Important Docker Commands

- Start services: `docker compose up -d`
- Stop services: `docker compose down`
- Rebuild containers: `docker compose up --build -d`
- View logs: `docker compose logs -f`

## Important Prisma Commands (run inside `backend/` directory)

- Generate Client: `npx prisma generate`
- Push schema to DB: `npx prisma db push`
- Seed database: `npm run db:seed`
- Open Prisma Studio: `npx prisma studio`

## API Examples

**Login:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "demo@demo.com",
  "password": "demo1234"
}
```

**Get Todos (with pagination and filtering):**
```http
GET /api/todos?page=1&limit=10&completed=false&priority=HIGH
Authorization: Bearer <your_jwt_token>
```
