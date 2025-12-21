# Cervoa

Sales automation dashboard + backend API, documentation, and workflow automation.

## Overview
- Frontend: Vite + React dashboard in the repo root (see `src/`, `vite.config.js`).
- Backend API: Express server in `backend/` exposing `/api/dashboard`, `/api/leads`, `/api/meetings`, `/api/webhooks`.
- Docs: All Markdown moved under `docs/` (start with `docs/START_HERE.md`).
 - Docs: All Markdown moved under `docs/` (start with `docs/START_HERE.md`). See `docs/ARCHITECTURE.md`, `docs/TOOL_COSTS.md`, `docs/N8N_WEBHOOKS.md` for the demo deliverables.
- Workflows: Ready-to-import n8n JSONs in `n8n-workflows/` and detailed flows in `Workflows/`.
- Scripts: Utility scripts in `scripts/` for setup and maintenance.

## Prerequisites
- Node.js 18+ (Vite 5 requires Node 18 or newer)
- npm (or pnpm/yarn) installed

## Setup
Install dependencies for the frontend and backend:

```bash
# From repo root
npm install
cd backend && npm install && cd -
```

Configure environment:
- Backend reads `.env` via `dotenv` (see `backend/server.js`). Typical variables:
  - `PORT=3001`
  - `AIRTABLE_API_KEY=...`
  - `AIRTABLE_BASE_ID=...`
  - `FRONTEND_URL=http://localhost:5173`
- Frontend can point to the backend with `VITE_API_URL`:
  - Create `.env` (or `.env.local`) in repo root: `VITE_API_URL=http://localhost:3001`
- See `API_KEYS_TEMPLATE.txt` and docs in `docs/` for provider-specific keys.

Airtable setup (optional):
```bash
# Helpers available
node setup-airtable.js
./setup-airtable.sh
node create-airtable-tables.js
```

## Run
Start the backend and frontend in separate terminals:

```bash
# Terminal 1: Backend API
cd backend
npm run dev   # nodemon server.js (http://localhost:3001)

# Terminal 2: Frontend
npm run dev   # vite (http://localhost:5173)
```

Adjust frontend API base URL if needed (`src/services/api.js` uses `VITE_API_URL` or defaults to `http://localhost:3001`).

API docs (Swagger UI):
```text
http://localhost:3001/api/docs
```

## API Endpoints
- Health: `GET /health`
- Dashboard: `GET /api/dashboard`
- Leads: `GET /api/leads`, `PUT /api/leads/:id`
- Meetings: `GET /api/meetings`
- Webhooks: `POST /api/webhooks/*`
- Integrations (stubs/n8n forwarders): `POST /api/integrations/{discover|nurture|schedule|proposal|payment|delivery}`

## Documentation
- Start here: `docs/START_HERE.md`
- Index of all docs: `docs/ALL_MARKDOWN_INDEX.md`
- Setup guides: `docs/COMPLETE_SETUP_GUIDE.md`, `docs/N8N_WORKFLOWS_SETUP_GUIDE.md`, `docs/GETTING_STARTED.md`

## n8n Workflows
- Simplified workflows: `n8n-workflows/*` (import JSON files into n8n)
- Detailed tested flows: `Workflows/files/*`
- New demo workflows: `n8n-workflows/WORKFLOW_4_Payment_Success.json`, `WORKFLOW_5_Delivery_Lovable.json`, `WORKFLOW_6_Proposal_Gamma.json`

## Demo Flow UI
- Use the “Demo Flow” tab in the app to trigger integration stubs; if `N8N_BASE_URL` is set, calls are forwarded to n8n webhooks.

## Maintenance
- Resync any stray Markdown into docs:
```bash
./scripts/move-md-to-docs.sh
```

## Environment Safety
- Do not overwrite `.env` with `>`; use `>>` to append or edit in an editor.
- Keep secrets in `backend/.env`; use root `.env` for frontend vars like `VITE_API_URL`.
- Ensure env files are ignored by git (see `.gitignore`).

Safe examples:
```bash
# Append without overwriting
printf "\nVITE_API_URL=http://localhost:3001\n" >> .env

# Edit in GUI
open -a TextEdit .env
```

---
For questions or improvements, open an issue or contribute with a pull request.