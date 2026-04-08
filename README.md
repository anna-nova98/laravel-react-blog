# Blog Project

A full-stack blog application built with **Laravel** (backend API) and **React** (frontend), orchestrated with Docker Compose.

---

## Tech Stack

- **Backend** — Laravel 13, PHP 8.3, MySQL 8
- **Frontend** — React 18, Vite, Axios
- **Infrastructure** — Docker, Docker Compose

---

## Prerequisites

Make sure the following are installed on your machine:

- [Docker](https://docs.docker.com/get-docker/) (v24+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+)

Verify with:

```bash
docker --version
docker compose version
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Run the project

```bash
docker compose up --build -d
```

This single command will:

- Build the backend (PHP 8.3 + Laravel) and frontend (Node 20 + Vite) images
- Start a MySQL 8 database
- Run all database migrations automatically
- Seed the database with sample articles and comments
- Start all three services

### 3. Open in browser

| Service  | URL                              |
|----------|----------------------------------|
| Frontend | http://localhost:3000            |
| API      | http://localhost:8000/api        |
| Database | localhost:3306 (user: `root`, password: `root`, db: `blog`) |

---

## API Endpoints

| Method | Endpoint                          | Description              |
|--------|-----------------------------------|--------------------------|
| GET    | `/api/articles`                   | List all articles        |
| GET    | `/api/articles/{id}`              | Get article with comments|
| POST   | `/api/articles`                   | Create a new article     |
| GET    | `/api/articles/{id}/comments`     | List comments            |
| POST   | `/api/articles/{id}/comments`     | Add a comment            |

---

## Stopping the Project

Stop and remove containers:

```bash
docker compose down
```

Stop and remove containers **including the database volume** (fresh start):

```bash
docker compose down -v
```

---

## Rebuilding After Code Changes

If you make changes to the source code:

```bash
docker compose up --build -d
```

---

## Migrations & Seeds

Migrations and seeds run **automatically** on every startup via the entrypoint script. If you need to run them manually:

**Run migrations:**

```bash
docker exec blog-backend php artisan migrate
```

**Run seeds:**

```bash
docker exec blog-backend php artisan db:seed
```

**Fresh migration + seed (wipes all data):**

```bash
docker exec blog-backend php artisan migrate:fresh --seed
```

---

## Troubleshooting

**Port already in use**

If port `8000` or `3000` is occupied, stop the conflicting process or change the ports in `docker-compose.yml`.

**Database connection errors on first run**

The backend waits for MySQL to be ready automatically. If it fails on the very first run, restart it:

```bash
docker compose restart backend
```
