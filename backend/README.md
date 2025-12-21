# Cervoa Backend API

Express-based API for the Cervoa dashboard.

## Getting Started

```bash
cd backend
npm install
npm run dev   # nodemon server.js
# or
npm start     # node server.js
```

Environment variables: copy `.env.example` to `.env` and adjust values.

## Endpoints
- `GET /health` – service health
- `GET /api/dashboard` – dashboard metrics
- `GET /api/leads` – list leads, `PUT /api/leads/:id` to update
- `GET /api/meetings` – meeting data
- `POST /api/webhooks/*` – webhook receiver(s)

## API Docs
Interactive docs are available at `/api/docs` once the server is running.

```text
http://localhost:3001/api/docs
```

CORS is restricted to known origins; set `FRONTEND_URL` in `.env` accordingly.